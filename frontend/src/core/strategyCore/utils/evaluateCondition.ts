import {
    Condition,
    IBinaryLogicCondition,
    IColorCondition,
    ICompareCondition,
    IFunctionCall,
    IFunctionCallBoolean,
    IGetPositionCoordinateStatement,
    IGetShipDirectionStatement,
    IGetShipPositionStatement,
    INumberBinaryStatement,
    IPositionCondition,
    IPositionValueStatement,
    IRuntimeContext,
    isCompareCondition,
    isPosition,
    IStatement,
    ITileAccessibleCondition,
    ITileCondition
} from "../models/programTypes";
import {getObjectsOnPositionWithShips, isPositionInWorld, World} from "../models/world";
import {Position} from "../models/position";
import {TileColor} from "../enums/tileColor";
import {List} from "immutable";
import {shipBlockingObjects, unifyShips, WorldObjectType} from "../enums/worldObjectType";
import {ConditionType} from "../enums/conditionType";
import {getShip, getShipPosition} from "./worldModelUtils";
import {Comparator} from "../enums/comparator";
import {StatementType} from "../enums/statementType";
import {isUserProgramError, UserProgramError} from "../enums/userProgramError";
import {
    doesUserVariableExist,
    getSystemVariable,
    getUserVariable,
    getUserVariableAsNumber,
    isUserVariableNumber,
    setSystemVariable
} from "./variableUtils";
import {invalidProgramError} from "./invalidProgramError";
import {NumberOperation} from "../enums/numberOperation";
import {ShipId} from "../models/ship";
import {endOfMapConstant} from "../constants/astConstants";
import {WorldObject} from "../models/worldObject";
import {getFunctionExecutionId} from "./getFunctionExecutionId";
import {SystemVariableName} from "../enums/systemVariableName";

export type EvaluationInProgress = 'EvaluationInProgress';
export const evaluationInProgress: EvaluationInProgress = 'EvaluationInProgress';

const basicComparators = List<Comparator>([
    Comparator.Equal,
    Comparator.NonEqual,
    Comparator.Bigger,
    Comparator.BiggerOrEqual,
    Comparator.Smaller,
    Comparator.SmallerOrEqual,
]);
type GetObjectFromStatementParams = {
    readonly context: IRuntimeContext;
    readonly world: World;
    readonly shipId: ShipId;
}
const getValidatedInput = <T extends number | string | Position>(statement: IStatement, params: GetObjectFromStatementParams, expectedReturnType: 'string' | 'number' | 'Position'): T | UserProgramError | EvaluationInProgress => {
    const result = getObjectFromStatement(statement, params.context, params.world, params.shipId);
    if (isUserProgramError(result) || result === evaluationInProgress)
        return result;
    if (expectedReturnType === 'Position' && !isPosition(result))
        throw invalidProgramError('Expected position here, but got ' + result);
    if (typeof result !== expectedReturnType)
        throw invalidProgramError(`Expected ${expectedReturnType} here, but got ${typeof result} with value ${JSON.stringify(result)}.`);

    return result as T;
};

const getValidatedInputsLazily = <T extends number | string | Position>(statements: IStatement[], params: GetObjectFromStatementParams, expectedReturnType: 'string' | 'number' | 'Position'): T[] | UserProgramError | EvaluationInProgress =>
    statements
        .reduce((result: T[] | UserProgramError | EvaluationInProgress, statement) => {
            if (isUserProgramError(result) || result === evaluationInProgress)
                return result;
            const newInput = getValidatedInput<T>(statement, params, expectedReturnType);
            if (isUserProgramError(newInput) || newInput === evaluationInProgress)
                return newInput as any;
            return result.concat([newInput]);
        }, []);

const evaluateNumberBinaryOperation = (leftValue: number, rightValue: number, operation: NumberOperation): number => {
    switch (operation) {
        case NumberOperation.Plus:
            return leftValue + rightValue;
        case NumberOperation.Minus:
            return leftValue - rightValue;
        case NumberOperation.Multiply:
            return leftValue * rightValue;
        case NumberOperation.Divide:
            return leftValue / rightValue;
        case NumberOperation.Power:
            return leftValue ** rightValue;
        default:
            throw invalidProgramError(`unknown number operation ${operation}`);
    }
};

const evaluateBasicComparator = <T>(leftValue: T, rightValue: T, comparator: Comparator): boolean => {
    switch (comparator) {
        case Comparator.Equal:
            return leftValue === rightValue;
        case Comparator.NonEqual:
            return leftValue !== rightValue;
        case Comparator.Bigger:
            return leftValue > rightValue;
        case Comparator.BiggerOrEqual:
            return leftValue >= rightValue;
        case Comparator.Smaller:
            return leftValue < rightValue;
        case Comparator.SmallerOrEqual:
            return leftValue <= rightValue;
        default:
            throw new Error(`Unknown basic comparator ${comparator}.`);
    }
};

//TODO refactor to getValueOfValueStatement or something like that
export const getCallParametersValues = (statement: IFunctionCall | IFunctionCallBoolean, context: IRuntimeContext, world: World, shipId: ShipId): string[] | UserProgramError | EvaluationInProgress => {
    const result = [];
    for (const parameter of statement.parameters) {
        const parameterValue = getObjectFromStatement(parameter.value, context, world, shipId);
        if (isUserProgramError(parameterValue) || parameterValue === evaluationInProgress)
            return parameterValue;
        result.push(parameterValue as string);
    }

    return result;
};

type ObjectStatementResult = number | string | Position | UserProgramError | EvaluationInProgress;
export const getObjectFromStatement = (statement: IStatement, context: IRuntimeContext, world: World, shipId: ShipId): ObjectStatementResult => {
    switch (statement.head) {
        case StatementType.GetNumericVariable: {
            const variableName = statement.name || '';
            if (!doesUserVariableExist(context, variableName))
                return UserProgramError.VariableDoesNotExist;
            if (!isUserVariableNumber(context, variableName))
                return UserProgramError.VariableIsNotNumerical;
            return getUserVariableAsNumber(context, variableName);
        }
        case StatementType.GetStringVariable: {
            const variableName = statement.name || '';
            if (!doesUserVariableExist(context, variableName))
                return UserProgramError.VariableDoesNotExist;
            return getUserVariable(context, variableName).value;
        }
        case StatementType.ConstantNumber: {
            const number = Number(statement.value);
            if (isNaN(number)) {
                throw new Error(`Constant number value cannot have value ${statement.value}.`);
            }
            return number;
        }
        case StatementType.RandomNumber: {
            return Math.random() * 100 % 1;
        }
        case StatementType.ConstantString: {
            if (typeof statement.value !== 'string') {
                throw new Error('You have to define constant string value.');
            }
            return statement.value;
        }
        case StatementType.NumberBinary: {
            const statementTyped = statement as INumberBinaryStatement;
            const leftValue = getObjectFromStatement(statementTyped.leftValue, context, world, shipId);
            if (isUserProgramError(leftValue) || leftValue === evaluationInProgress)
                return leftValue;
            const rightValue = getObjectFromStatement(statementTyped.rightValue, context, world, shipId);
            if (isUserProgramError(rightValue) || rightValue === evaluationInProgress)
                return rightValue;
            if (typeof leftValue !== 'number' || typeof rightValue !== 'number') {
                throw invalidProgramError('number operation needs number arguments');
            }

            return evaluateNumberBinaryOperation(leftValue, rightValue, statementTyped.operator);
        }
        case StatementType.FunctionCallNumber:
            return executeFncIfNeeded<number>(context, statement as IFunctionCall, 'number', world, shipId);
        case StatementType.FunctionCallString:
            return executeFncIfNeeded<string>(context, statement as IFunctionCall, 'string', world, shipId);
        case StatementType.PositionValue:
        case StatementType.PositionValueRelative: {
            const statementTyped = statement as IPositionValueStatement;
            const x = getObjectFromStatement(statementTyped.x, context, world, shipId);
            if (isUserProgramError(x) || x === evaluationInProgress)
                return x;
            const y = getObjectFromStatement(statementTyped.y, context, world, shipId);
            if (isUserProgramError(y) || y === evaluationInProgress)
                return y;
            if (typeof x !== 'number' || typeof y !== 'number')
                throw invalidProgramError('Expected the x and y to be number.');
            const ship = getShip(world, shipId);
            if (!ship)
                throw invalidProgramError('Invalid shipId provided to getObjectFromStatement.');
            const shipPosition = statementTyped.head === StatementType.PositionValueRelative ?
                ship.position :
                new Position();

            return new Position({x: shipPosition.x + x, y: shipPosition.y + y});
        }
        case StatementType.GetShipPosition: {
            const statementTyped = statement as IGetShipPositionStatement;
            const searchedShipId = getObjectFromStatement(statementTyped.shipId, context, world, shipId);
            if (isUserProgramError(searchedShipId) || searchedShipId === evaluationInProgress)
                return searchedShipId;
            if (typeof searchedShipId !== 'string')
                throw invalidProgramError('searchedShipId is expected to be string.');

            const foundShip = getShip(world, searchedShipId);
            if (!foundShip)
                return UserProgramError.ProvidedShipIdDoesNotExist;

            return foundShip.position;
        }
        case StatementType.GetPositionCoordinate: {
            const statementTyped = statement as IGetPositionCoordinateStatement;
            const position = getObjectFromStatement(statementTyped.position, context, world, shipId);
            const coordinate = getObjectFromStatement(statementTyped.coordinate, context, world, shipId);
            if (isUserProgramError(position) || position === evaluationInProgress)
                return position;
            if (isUserProgramError(coordinate) || coordinate === evaluationInProgress)
                return coordinate;
            if (typeof coordinate !== 'string' || !isPosition(position))
                throw invalidProgramError('Types mismatch in GetPositionCoordinate case.');
            if (coordinate.trim().toLocaleLowerCase() !== 'x' && coordinate.trim().toLocaleLowerCase() !== 'y')
                return UserProgramError.ProvidedStringIsNotCoordinate;

            return coordinate.trim().toLocaleLowerCase() === 'x' ? position.x : position.y;
        }
        case StatementType.GetDirectionOfShip: {
            const statementTyped = statement as IGetShipDirectionStatement;
            const foundShipId = getObjectFromStatement(statementTyped.shipId, context, world, shipId);
            if (isUserProgramError(foundShipId) || foundShipId == evaluationInProgress)
                return foundShipId;
            if (typeof foundShipId !== 'string')
                throw invalidProgramError(`Expected type string but ${typeof foundShipId} of ${JSON.stringify(foundShipId)} found.`);

            const ship = getShip(world, shipId);
            if (!ship)
                return UserProgramError.ProvidedShipIdDoesNotExist;

            return ship.direction;
        }
        case StatementType.GetShipId: {
            const ship = getShip(world, shipId);
            if (!ship)
                return UserProgramError.ProvidedShipIdDoesNotExist;

            return ship.id;
        }
        default:
            throw new Error(`Statement ${statement.head} is not a value statement.`);
    }
};

const handleComparatorConditions = (condition: ICompareCondition, context: IRuntimeContext, world: World, shipId: ShipId): boolean | UserProgramError | EvaluationInProgress => {
    const leftValue = getObjectFromStatement(condition.leftValue, context, world, shipId);
    const rightValue = getObjectFromStatement(condition.rightValue, context, world, shipId);

    if (isUserProgramError(leftValue) || leftValue === evaluationInProgress)
        return leftValue;
    if (isUserProgramError(rightValue) || rightValue === evaluationInProgress)
        return rightValue;

    return evaluateBasicComparator(leftValue, rightValue, condition.comparator);
};

const getComparedObject = (condition: Condition, world: World, shipPosition: Position): number | TileColor => {
    switch (condition.head) {
        case ConditionType.Color:
            const tile = world.surface.get(shipPosition.y)!.get(shipPosition.x);
            return tile || TileColor.Black;
        case ConditionType.Position:
            return shipPosition.x + 1;
        default:
            throw new Error(`Unknown condition type: ${condition!.head}.`);
    }
};

const getWorldObjectsOnTile = (position: Position, world: World): List<WorldObject> =>
    getObjectsOnPositionWithShips(world, position.x, position.y);

const handleObjectComparison = (condition: IColorCondition | IPositionCondition | ITileCondition, world: World, shipId: ShipId, context: IRuntimeContext): boolean | UserProgramError | EvaluationInProgress => {
    const shipPosition = getShipPosition(world, shipId);

    if (!shipPosition) {
        throw new Error('Cannot evaluate a condition when ship is not present.');
    }

    if (!condition.comparator) {
        throw new Error('Comparator has to be set.');
    }

    if (condition.comparator === Comparator.Contains) {
        const position = getObjectFromStatement(condition.position, context, world, shipId);
        if (isUserProgramError(position) || position === evaluationInProgress)
            return position;
        if (!isPosition(position))
            throw invalidProgramError('Position is expected here.', 'handleObjectComparison');

        if (!isPositionInWorld(position, world))
            return condition.value === endOfMapConstant;
        const objects = getWorldObjectsOnTile(position, world);
        return unifyShips(objects.map(o => o.type)).contains(condition.value as WorldObjectType);
    }

    if (condition.comparator === Comparator.NotContains) {
        const position = getObjectFromStatement(condition.position, context, world, shipId);
        if (isUserProgramError(position) || position === evaluationInProgress)
            return position;
        if (!isPosition(position))
            throw invalidProgramError('Position is expected here.', 'handleObjectComparison');

        if (!isPositionInWorld(position, world))
            return condition.value !== endOfMapConstant;
        const objects = getWorldObjectsOnTile(position, world);
        return !unifyShips(objects.map(o => o.type)).contains(condition.value as WorldObjectType);
    }

    if (basicComparators.contains(condition.comparator)) {
        if (!condition.value) {
            throw new Error('Condition has to have defined value');
        }
        return evaluateBasicComparator(
            getComparedObject(condition, world, shipPosition),
            condition.value,
            condition.comparator
        );
    }

    throw new Error(`Unknown comparator ${condition.comparator}.`);
};

const isResultKnown = (comparator: Comparator, leftResult: boolean): boolean => {
    switch (comparator) {
        case Comparator.And:
            return !leftResult;
        case Comparator.Or:
            return leftResult;
        default:
            return false;
    }
};

const handleLogicalBinaryOperation = (condition: IBinaryLogicCondition, world: World, shipId: ShipId, context: IRuntimeContext): boolean | UserProgramError | EvaluationInProgress => {
    const leftValue = evaluateCondition(condition.leftValue, world, shipId, context);
    if (isUserProgramError(leftValue) || leftValue === evaluationInProgress)
        return leftValue;
    if (isResultKnown(condition.comparator, leftValue))
        return leftValue;

    const rightValue = evaluateCondition(condition.rightValue, world, shipId, context);
    if (isUserProgramError(rightValue) || rightValue === evaluationInProgress)
        return rightValue;

    switch (condition.comparator) {
        case Comparator.And:
            return leftValue && rightValue;
        case Comparator.Or:
            return leftValue || rightValue;
        case Comparator.Equivalent:
            return leftValue === rightValue;
        case Comparator.NonEquivalent:
            return leftValue !== rightValue;
        default:
            throw new Error(`Unknown logical comparator ${condition.comparator}.`);
    }
};

const handleAccessibleTileCondition = (condition: ITileAccessibleCondition, world: World, context: IRuntimeContext, shipId: ShipId): boolean | UserProgramError | EvaluationInProgress => {
    const position = getObjectFromStatement(condition.position, context, world, shipId);
    if (isUserProgramError(position) || position === evaluationInProgress)
        return position;
    if (!isPosition(position))
        throw invalidProgramError(`Position is expected here. Got ${JSON.stringify(position)}`, 'handleAccessibleTileCondition');
    if (!isPositionInWorld(position, world))
        return false;

    const objectsOnTile = getObjectsOnPositionWithShips(world, position.x, position.y);

    return objectsOnTile.every(obj => !shipBlockingObjects.contains(obj.type));
};

const executeFncIfNeeded = <T extends number | boolean | string>(
    context: IRuntimeContext,
    fncCall: IFunctionCallBoolean | IFunctionCall,
    expectedType: 'boolean' | 'number' | 'string',
    world: World,
    shipId: ShipId,
): T | EvaluationInProgress | UserProgramError => {
    const executionId = getFunctionExecutionId(context, fncCall.name, fncCall.parameters);
    const existingExecution = getSystemVariable(
        context,
        SystemVariableName.FunctionExecutionFinished,
        v => v.value.requestId === executionId
    );

    if (!existingExecution) {
        const parameters = getCallParametersValues(fncCall, context, world, shipId);
        if (isUserProgramError(parameters) || parameters === evaluationInProgress)
            return parameters;
        setSystemVariable(
            context,
            SystemVariableName.FunctionExecutionRequest,
            { functionName: fncCall.name, requestId: executionId, parameters });
        return evaluationInProgress;
    }

    const result = existingExecution.value.result;
    if (typeof result !== expectedType)
        throw invalidProgramError(`${fncCall.head} function execution result is ${typeof result}, but expected ${expectedType}`);

    return result as T;
};

export const evaluateCondition = (condition: Condition, world: World, shipId: ShipId, context: IRuntimeContext): boolean | UserProgramError | EvaluationInProgress => {
    if (condition.head === ConditionType.Not) {
        const innerResult = evaluateCondition(condition.value, world, shipId, context);
        if (isUserProgramError(innerResult) || innerResult === evaluationInProgress)
            return innerResult;
        return !innerResult;
    }

    if (condition.head === ConditionType.LogicBinaryOperation) {
        return handleLogicalBinaryOperation(condition, world, shipId, context);
    }

    if (condition.head === ConditionType.ConstantBoolean) {
        return condition.value === 'true';
    }

    if (condition.head === ConditionType.IsTileAccessible) {
        return handleAccessibleTileCondition(condition, world, context, shipId);
    }

    if (condition.head === ConditionType.FunctionCallBoolean) {
        return executeFncIfNeeded<boolean>(context, condition, 'boolean', world, shipId);
    }

    if (isCompareCondition(condition)) {
        return handleComparatorConditions(condition, context, world, shipId);
    }

    return handleObjectComparison(condition, world, shipId, context);
};
