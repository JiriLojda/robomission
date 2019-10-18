import {StatementType} from "./enums/statementType";
import {SystemVariableName} from "./enums/systemVariableName";
import {getShip, makeShipPickupDiamond, makeShipShoot, turnShip} from "./utils/worldModelUtils";
import {MovingDirection} from "./enums/movingDirection";
import {removeLaserAndExplosionObjects, updateShipInWorld, World} from "./models/world";
import {isUserProgramError, UserProgramError} from "./enums/userProgramError";
import {
    defaultFunctionName, IFunctionCall, IFunctionDefinition,
    IPositionItem,
    IRoboAst,
    IRuntimeContext,
    ISetVariableStatement,
    IStatement
} from "./models/programTypes";
import {List, Map} from "immutable";
import {getSystemVariable, removeSystemVariable, setSystemVariable, setUserVariable} from "./utils/variableUtils";
import {
    evaluateCondition,
    evaluationInProgress,
    EvaluationInProgress, getCallParametersValues,
    getObjectFromStatement
} from "./utils/evaluateCondition";
import {defaultMinorActionsCount, scopeStatements} from "./constants/interpreterConstants";
import {ShipId} from "./models/ship";
import {IGameBehaviours} from "./gameBehaviours/IGameBehaviours";
import {handleMoveStatement} from "./actionStatementHandlers/moveStatementHandler";
import {invalidProgramError} from "./utils/invalidProgramError";
import {getFunctionExecutionId} from "./utils/getFunctionExecutionId";
import {getEmptyRuntimeContext} from "./utils/getEmptyRuntimeContext";
import {memoizeOne} from "../../utils/memoizeOne";
import {isConditionStatement} from "./utils/getValueStatementType";

const getLastImmutable = <T>(list: List<T>): T => getLast(list.toArray());

const getLast = <T>(array: T[]): T => {
    if (array.length === 0) {
        throw new Error('Cannot get the last element, given array is empty.');
    }

    return array[array.length - 1];
};

const getPositionItem = (index: number, elseBranchEntered = false, repeatCount = undefined): IPositionItem =>
    ({index, elseBranchEntered, repeatCount});

const incrementPositionItem = (item: IPositionItem) => ({...item, index: item.index + 1});

const getStatementsForPosition = (roboAst: IStatement, context: IRuntimeContext) => {
    const result: IStatement[] = [roboAst];
    let statement = result[0];

    for (const positionItem of context.position) {
        if (statement.head === StatementType.If && positionItem.elseBranchEntered) {
            if (!statement.orelse)
                throw invalidProgramError(`Statement ${statement.head} is should have an orelse.`);
            statement = statement.orelse.statement;
            result.pop();
            result.push(statement);
        }
        if (!statement.body)
            throw invalidProgramError(`Statement ${statement.head} is should have a body.`);
        statement = statement.body[positionItem.index].statement;
        result.push(statement);
    }

    return result;
};

const isScopeStatement = (statement: IStatement) => scopeStatements.contains(statement.head);

const shouldReevaluateScopeStatement = (statement: IStatement) => [StatementType.While, StatementType.Repeat].indexOf(statement.head) > -1;

const movePosition = (statements: List<IStatement>, position: List<IPositionItem>): List<IPositionItem> => {
    if (statements.isEmpty() || position.isEmpty()) {
        return List();
    }
    const lastStatement = getLastImmutable(statements);
    const lastPosition = getLastImmutable(position);
    if (!lastStatement.body) {
        return movePosition(statements.pop(), position);
    }
    if (statements.size > position.size) {
        return movePosition(statements.slice(0, position.size), position);
    }
    if (statements.size !== position.size) {
        throw new Error(`movePosition: statements.size '${statements.size}' !== position.size '${position.size}'`);
    }
    if (lastStatement.body.length > lastPosition.index + 1) {
        return position.set(position.size - 1, incrementPositionItem(lastPosition));
    }
    if (shouldReevaluateScopeStatement(lastStatement)) {
        return position.pop();
    }
    return movePosition(statements.pop(), position.pop());
};

const getNextPosition = (roboAst: IStatement, context: IRuntimeContext): IPositionItem[] => {
    const statements = getStatementsForPosition(roboAst, context);
    const result = context.position.slice(0);

    if (isScopeStatement(getLast(statements))) {
        const shouldEnterNextBlockVar = getSystemVariable(context, SystemVariableName.ShouldEnterNextBlock);

        if (shouldEnterNextBlockVar === undefined) {
            throw new Error(`Variable '${SystemVariableName.ShouldEnterNextBlock}' is not set when on block statement.`);
        }

        if (shouldEnterNextBlockVar.value && getLast(statements).body!.length > 0) {
            result.push(getPositionItem(0));
            return result;
        }

        if (!shouldEnterNextBlockVar.value && getLast(statements).orelse && getLast(statements).orelse!.statement.body!.length > 0) {
            result.push(getPositionItem(0, true));
            return result;
        }
    }

    return movePosition(List(statements), List(result)).toArray();
};

const deepCopy = (obj: unknown) => JSON.parse(JSON.stringify(obj));

const evaluateBlockCondition = (statement: IStatement, context: IRuntimeContext, world: World, shipId: ShipId): UserProgramError | null | EvaluationInProgress => {
    switch (statement.head) {
        case StatementType.If:
        case StatementType.While: {
            if (!statement.test) {
                throw new Error(`${statement.head} statement has to have condition.`);
            }
            const conditionResult = evaluateCondition(statement.test, world, shipId, context);
            if (isUserProgramError(conditionResult) || conditionResult === evaluationInProgress) {
                return conditionResult;
            }
            setSystemVariable(
                context,
                SystemVariableName.ShouldEnterNextBlock,
                conditionResult
            );
            return null;
        }
        case StatementType.Repeat:
            const position = getLast(context.position);
            if (!statement.count || !position.repeatCount || statement.count <= 0 || position.repeatCount <= 0) {
                setSystemVariable(context, SystemVariableName.ShouldEnterNextBlock, false);
                position.repeatCount = undefined;
                return null;
            }
            position.repeatCount--;
            setSystemVariable(context, SystemVariableName.ShouldEnterNextBlock, true);
            return null;
    }
    return null
};

const setPositionAttributes = (statement: IStatement, position: IPositionItem) => {
    if (statement.head === StatementType.Repeat && position.repeatCount === undefined) {
        position.repeatCount = statement.count;
    }
};

const getUsedEvaluationResult = (result: World | UserProgramError | EvaluationInProgress) => ({result, actionUsed: true});
const getUnusedEvaluationResult = (result: World | UserProgramError | EvaluationInProgress) => ({result, actionUsed: false});
const evaluateActionStatement = (
    statement: IStatement | ISetVariableStatement,
    world: World,
    shipId: ShipId,
    context: IRuntimeContext,
    behaviours: IGameBehaviours,
): {result: World | UserProgramError | EvaluationInProgress, actionUsed: boolean} => {
    const ship = getShip(world, shipId);

    if (!ship) {
        throw new Error(`Cannot find a ship with id '${shipId}'.`);
    }

    switch (statement.head) {
        case StatementType.Fly:
            return getUsedEvaluationResult(handleMoveStatement(world, ship, MovingDirection.Forward, behaviours));
        case StatementType.Left:
            return getUsedEvaluationResult(handleMoveStatement(world, ship, MovingDirection.Left, behaviours));
        case StatementType.Right:
            return getUsedEvaluationResult(handleMoveStatement(world, ship, MovingDirection.Right, behaviours));
        case StatementType.Shoot:
            return getUsedEvaluationResult(makeShipShoot(world, shipId));
        case StatementType.PickUpDiamond:
            return getUsedEvaluationResult(makeShipPickupDiamond(world, shipId));
        case StatementType.TurnLeft:
            return getUsedEvaluationResult(updateShipInWorld(world, ship, turnShip(ship, 'left')));
        case StatementType.TurnRight:
            return getUsedEvaluationResult(updateShipInWorld(world, ship, turnShip(ship, 'right')));
        case StatementType.SetVariable:
            if (!statement.name || !statement.value || typeof statement.value !== 'string') {
                throw new Error('While setting variable statement has to have name and value.');
            }
            setUserVariable(context, statement.name, statement.value);
            return getUsedEvaluationResult(world);
        case StatementType.SetVariableNumeric:
            if (!statement.name || !statement.value || typeof statement.value === 'string' || isConditionStatement(statement.value)) {
                throw invalidProgramError('The value for the variable has different type.');
            }
            const value = getObjectFromStatement(statement.value, context);
            if (isUserProgramError(value))
                return getUnusedEvaluationResult(value);

            setUserVariable(context, statement.name, typeof value === 'number' ? value.toString() : value);
            return getUsedEvaluationResult(world);
        case StatementType.FunctionCallVoid:
            const statementTyped = statement as IFunctionCall;
            const executionId = getFunctionExecutionId(context, statementTyped.name, statementTyped.parameters);
            const existingExecution = getSystemVariable(
                context,
                SystemVariableName.FunctionExecutionFinished,
                v => v.value.requestId === executionId
            );

            if (!existingExecution) {
                const parameters = getCallParametersValues(statementTyped, context);
                if (isUserProgramError(parameters) || parameters === evaluationInProgress)
                    return getUnusedEvaluationResult(parameters);
                setSystemVariable(
                    context,
                    SystemVariableName.FunctionExecutionRequest,
                    { functionName: statementTyped.name || '', requestId: executionId, parameters });
                return getUnusedEvaluationResult(evaluationInProgress);
            }
            return getUnusedEvaluationResult(world);
        default:
            return getUnusedEvaluationResult(world);
    }
};

const executeStepInFunction = (
    fncName: string,
    fncAsts: Map<string, IStatement>,
    world: World,
    shipId: ShipId,
    context: IRuntimeContext,
    behaviours: IGameBehaviours
): [IRuntimeContext, World] | UserProgramError => {
    const fncAst = fncAsts.get(fncName);
    context.wasActionExecuted = false;
    if (!fncAst) {
        throw invalidProgramError(`Function with name ${fncName} is not defined.`);
    }

    if ((context.position.length === 0 && !context.nestedFunctionExecution.isFunctionBeingExecuted) || fncAst.body!.length === 0) {
        context.hasEnded = true;
        return [context, world];
    }

    if (context.minorActionsLeft <= 0) {
        console.log('No actions left, let other players play too.');
        return [context, world];
    }

    if (context.nestedFunctionExecution.isFunctionBeingExecuted && context.nestedFunctionExecution.functionRuntimeContext) {
        const { functionName, requestId, functionRuntimeContext } = context.nestedFunctionExecution;
        console.log('\tinner call to ', functionName);
        const stepResult = executeStepInFunction(functionName, fncAsts, world, shipId, functionRuntimeContext, behaviours);

        if (isUserProgramError(stepResult)) {
            return stepResult;
        }

        if (stepResult[0].hasEnded) {
            context.nestedFunctionExecution.isFunctionBeingExecuted = false;
            setSystemVariable(
                context,
                SystemVariableName.FunctionExecutionFinished,
                { functionName, requestId, result: undefined },
                v => v.value.requestId === requestId,
            );
        }
        context.wasActionExecuted = stepResult[0].wasActionExecuted;
        context.nestedFunctionExecution.functionRuntimeContext = stepResult[0];
        console.log('\tcalled ', functionName, ', current wasActionUsed: ', context.wasActionExecuted);

        return [context, stepResult[1]];
    }

    const statement = getLast(getStatementsForPosition(fncAst, context));
    console.log('\texecuting ', statement);
    console.log('\twasActionUsed before execution: ', context.wasActionExecuted);

    const withoutLasers = removeLaserAndExplosionObjects(world);
    const evaluationResult = evaluateActionStatement(statement, withoutLasers, shipId, context, behaviours);

    if (isUserProgramError(evaluationResult.result)) {
        return evaluationResult.result;
    }
    const newWorld = evaluationResult.result === evaluationInProgress ? world : evaluationResult.result;

    console.log('\twasActionUsed before execution: ', context.wasActionExecuted);
    context.wasActionExecuted = evaluationResult.actionUsed;
    console.log('\twasActionUsed after execution: ', context.wasActionExecuted);

    setPositionAttributes(statement, getLast(context.position));
    const conditionEvaluation = evaluateBlockCondition(statement, context, world, shipId);

    if (isUserProgramError(conditionEvaluation)) {
        return conditionEvaluation;
    }

    if (conditionEvaluation !== evaluationInProgress && evaluationResult.result !== evaluationInProgress) {
        context.position = getNextPosition(fncAst, context);
    }

    const executionRequestVar = getSystemVariable(context, SystemVariableName.FunctionExecutionRequest);
    removeSystemVariable(context, SystemVariableName.FunctionExecutionRequest);
    if (executionRequestVar) {
        const fncDefinition = fncAsts.get(executionRequestVar.value.functionName);
        const parameters = Map((fncDefinition as IFunctionDefinition).parameters
            .map((name, i) => [name, executionRequestVar.value.parameters[i]]));
        callFunctionOnContext(context, executionRequestVar.value.functionName, executionRequestVar.value.requestId, parameters);
    }

    if (context.position.length === 0 && !context.nestedFunctionExecution.isFunctionBeingExecuted) {
        context.hasEnded = true;
    }

    return [context, newWorld];
};

const callFunctionOnContext = (context: IRuntimeContext, fncName: string, requestId: string, parameters: Map<string, string>): void => {
    const childContext = getEmptyRuntimeContext(context.variables);
    context.nestedFunctionExecution.isFunctionBeingExecuted = true;
    context.nestedFunctionExecution.functionName = fncName;
    context.nestedFunctionExecution.functionRuntimeContext = childContext;
    context.nestedFunctionExecution.requestId = requestId;
    parameters.forEach((value, name) => setUserVariable(childContext, name, value));
};

const createFunctionsMap = memoizeOne((roboAst: IRoboAst): Map<string, IStatement> =>
    Map(roboAst.map(s => [s.name || defaultFunctionName, s])));

export const doNextStep = (
    roboAst: IRoboAst,
    world: World,
    shipId: ShipId,
    context: IRuntimeContext,
    behaviours: IGameBehaviours
): [IRuntimeContext, World] | UserProgramError => {
    if (context.minorActionsLeft <= 0) {
        console.log('No actions left, let others play too.');
        return [context, world];
    }
    const newContext = deepCopy(context);
    console.log('----------start step for ', shipId, '----------');

    const result = executeStepInFunction(defaultFunctionName, createFunctionsMap(roboAst), world, shipId, newContext, behaviours);

    if (isUserProgramError(result))
        return result;

    result[0].minorActionsLeft--;
    if (result[0].wasActionExecuted) {
        result[0].minorActionsLeft = defaultMinorActionsCount;
    }
    console.log('----------end step for ', shipId, ', action used: ', result[0].wasActionExecuted, '----------');

    return result;
};
