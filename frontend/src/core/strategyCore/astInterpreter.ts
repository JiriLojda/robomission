import {StatementType} from "./enums/statementType";
import {SystemVariableName} from "./enums/systemVariableName";
import {getShip, makeShipPickupDiamond, makeShipShoot, turnShip} from "./utils/worldModelUtils";
import {MovingDirection} from "./enums/movingDirection";
import {removeLaserAndExplosionObjects, updateShipInWorld, World} from "./models/world";
import {isUserProgramError, UserProgramError} from "./enums/userProgramError";
import {IPositionItem, IRoboAst, IRuntimeContext, ISetVariableStatement, IStatement} from "./models/programTypes";
import {List} from "immutable";
import {getSystemVariable, setSystemVariable, setUserVariable} from "./utils/variableUtils";
import {evaluateCondition, getObjectFromStatement} from "./utils/evaluateCondition";
import {defaultMinorActionsCount, scopeStatements} from "./constants/interpreterConstants";
import {ShipId} from "./models/ship";
import {IGameBehaviours} from "./gameBehaviours/IGameBehaviours";
import {handleMoveStatement} from "./actionStatementHandlers/moveStatementHandler";

const getLastImmutable = <T>(list: List<T>): T => getLast(list.toArray());

const getLast = <T>(array: T[]): T => {
    if (array.length === 0) {
        throw new Error('Cannot get the last element, given array is empty.');
    }

    return array[array.length - 1];
};

const getStatement = (roboAst: any, context: IRuntimeContext) => {
    const position = context.position;
    let statement = roboAst;
    let index = 0;

    while (statement.head === StatementType.Start || (scopeStatements.includes(statement.head) && index < position.length)) {
        statement = statement.body[position[index].index].statement;
        index++;
        if (statement.head === StatementType.If && position.length > index && position[index].elseBranchEntered) {
            statement = statement.orelse.statement;
        }
    }

    return statement;
};

const getPositionItem = (index: number, elseBranchEntered = false, repeatCount = undefined) => ({index, elseBranchEntered, repeatCount});

const incrementPositionItem = (item: IPositionItem) => ({...item, index: item.index + 1});

const getStatementsForPosition = (roboAst: any, context: IRuntimeContext) => {
    const result = [roboAst];
    let statement = roboAst;

    for (const positionItem of context.position) {
        if (statement.head === StatementType.If && positionItem.elseBranchEntered) {
            statement = statement.orelse.statement;
            result.pop();
            result.push(statement);
        }
        statement = statement.body[positionItem.index].statement;
        result.push(statement);
    }

    return result;
};

const isScopeStatement = (statement: IStatement) => scopeStatements.contains(statement.head);

const shouldReevaluateScopeStatement = (statement: IStatement) => ['while', 'repeat'].indexOf(statement.head) > -1;

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

const getNextPosition = (roboAst: IRoboAst, context: IRuntimeContext): IPositionItem[] => {
    const statements = getStatementsForPosition(roboAst, context);
    const result = context.position.slice(0);

    if (isScopeStatement(getLast(statements))) {
        const shouldEnterNextBlockVar = getSystemVariable(context, SystemVariableName.ShouldEnterNextBlock);

        if (shouldEnterNextBlockVar === undefined) {
            throw new Error(`Variable '${SystemVariableName.ShouldEnterNextBlock}' is not set when on block statement.`);
        }

        if (shouldEnterNextBlockVar.value && getLast(statements).body.length > 0) {
            result.push(getPositionItem(0));
            return result;
        }

        if (!shouldEnterNextBlockVar.value && getLast(statements).orelse && getLast(statements).orelse.statement.body.length > 0) {
            result.push(getPositionItem(0, true));
            return result;
        }
    }

    return movePosition(List(statements), List(result)).toArray();
};

const deepCopy = (obj: unknown) => JSON.parse(JSON.stringify(obj));

const evaluateBlockCondition = (statement: IStatement, context: IRuntimeContext, world: World, shipId: ShipId): UserProgramError | null => {
    switch (statement.head) {
        case StatementType.If:
        case StatementType.While: {
            if (!statement.test) {
                throw new Error(`${statement.head} statement has to have condition.`);
            }
            const conditionResult = evaluateCondition(statement.test, world, shipId, context);
            if (isUserProgramError(conditionResult)) {
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

const evaluateActionStatement = (
    statement: IStatement | ISetVariableStatement,
    world: World,
    shipId: ShipId,
    context: IRuntimeContext,
    behaviours: IGameBehaviours,
): World | UserProgramError => {
    const ship = getShip(world, shipId);

    if (!ship) {
        throw new Error(`Cannot find a ship with id '${shipId}'.`);
    }

    switch (statement.head) {
        case StatementType.Fly:
            return handleMoveStatement(world, ship, MovingDirection.Forward, behaviours);
        case StatementType.Left:
            return handleMoveStatement(world, ship, MovingDirection.Left, behaviours);
        case StatementType.Right:
            return handleMoveStatement(world, ship, MovingDirection.Right, behaviours);
        case StatementType.Shoot:
            return makeShipShoot(world, shipId);
        case StatementType.PickUpDiamond:
            return makeShipPickupDiamond(world, shipId);
        case StatementType.TurnLeft:
            return updateShipInWorld(world, ship, turnShip(ship, 'left'));
        case StatementType.TurnRight:
            return updateShipInWorld(world, ship, turnShip(ship, 'right'));
        case StatementType.SetVariable:
            if (!statement.name || !statement.value || typeof statement.value !== 'string') {
                throw new Error('While setting variable statement has to have name and value.');
            }
            setUserVariable(context, statement.name, statement.value);
            return world;
        case StatementType.SetVariableNumeric:
            if (!statement.name || !statement.value || typeof statement.value === 'string') {
                throw new Error('While setting variable statement has to have name and value.');
            }
            const value = getObjectFromStatement(statement.value, context);
            if (isUserProgramError(value))
                return value;

            setUserVariable(context, statement.name, typeof value === 'number' ? value.toString() : value);
            return world;
        default:
            return world;
    }
};

export const doNextStep = (
    roboAst: IRoboAst,
    world: World,
    shipId: ShipId,
    context: IRuntimeContext,
    behaviours: IGameBehaviours
): [IRuntimeContext, World] | UserProgramError => {
    if (context.position.length === 0) {
        console.log('Empty runtime context, reset before another run.');
        context.hasEnded = true;
        return [context, world];
    }

    if (roboAst.body.length === 0) {
        context.hasEnded = true;
        console.log('Empty program, please create something before running it.');
        return [context, world];
    }

    if (context.minorActionsLeft <= 0) {
        console.log('No actions left, let other players play too.');
        return [context, world];
    }
    context = deepCopy(context);

    context.minorActionsLeft--;
    const statement = getStatement(roboAst, context);

    const withoutLasers = removeLaserAndExplosionObjects(world);
    const newWorld = evaluateActionStatement(statement, withoutLasers, shipId, context, behaviours);

    if (isUserProgramError(newWorld)) {
        return newWorld;
    }

    context.wasActionExecuted = newWorld !== world;
    if (context.wasActionExecuted) {
         context.minorActionsLeft = defaultMinorActionsCount;
    }
    setPositionAttributes(statement, getLast(context.position));
    const conditionEvaluation = evaluateBlockCondition(statement, context, world, shipId);

    if (isUserProgramError(conditionEvaluation)) {
        return conditionEvaluation;
    }

    context.position = getNextPosition(roboAst, context);

    return [context, newWorld];
};
