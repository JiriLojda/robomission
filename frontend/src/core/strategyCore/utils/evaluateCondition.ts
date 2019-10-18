import {
    Condition,
    IBinaryLogicCondition,
    IColorCondition,
    ICompareCondition, IFunctionCall,
    IFunctionCallBoolean,
    INumberBinaryStatement,
    IPositionCondition,
    IRuntimeContext,
    isCompareCondition,
    IStatement,
    ITileAccessibleCondition,
    ITileCondition
} from "../models/programTypes";
import {getObjectsOnPositionWithShips, World} from "../models/world";
import {Position} from "../models/position";
import {TileColor} from "../enums/tileColor";
import {List} from "immutable";
import {shipBlockingObjects, unifyShips} from "../enums/worldObjectType";
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
import {Ship, ShipId} from "../models/ship";
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
export const getCallParametersValues = (statement: IFunctionCall | IFunctionCallBoolean, context: IRuntimeContext): string[] | UserProgramError | EvaluationInProgress => {
    const result = [];
    for (const parameter of statement.parameters) {
        const parameterValue = getObjectFromStatement(parameter.value, context);
        if (isUserProgramError(parameterValue) || parameterValue === evaluationInProgress)
            return parameterValue;
        result.push(parameterValue as string);
    }

    return result;
};

export const getObjectFromStatement = (statement: IStatement, context: IRuntimeContext): number | string | UserProgramError | EvaluationInProgress => {
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
        case StatementType.ConstantString: {
            if (typeof statement.value !== 'string') {
                throw new Error('You have to define constant string value.');
            }
            return statement.value;
        }
        case StatementType.NumberBinary: {
            const statementTyped = statement as INumberBinaryStatement;
            const leftValue = getObjectFromStatement(statementTyped.leftValue, context);
            const rightValue = getObjectFromStatement(statementTyped.rightValue, context);
            if (typeof leftValue === 'string' || typeof rightValue === 'string') {
                throw invalidProgramError('number operation needs number arguments');
            }

            return evaluateNumberBinaryOperation(leftValue, rightValue, statementTyped.operator);
        }
        case StatementType.FunctionCallNumber:
            return executeFncIfNeeded<number>(context, statement as IFunctionCall, 'number');
        case StatementType.FunctionCallString:
            return executeFncIfNeeded<string>(context, statement as IFunctionCall, 'string');
        default:
            throw new Error(`Statement ${statement.head} is not a value statement.`);
    }
};

const handleComparatorConditions = (condition: ICompareCondition, context: IRuntimeContext): boolean | UserProgramError => {
    const leftValue = getObjectFromStatement(condition.leftValue, context);
    const rightValue = getObjectFromStatement(condition.rightValue, context);

    if (isUserProgramError(leftValue))
        return leftValue;
    if (isUserProgramError(rightValue))
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

const isPositionOnMap = (x: number, y: number, world: World): boolean =>
    x >= 0 && x < world.size.x && y >= 0 && y < world.size.y;

const getPositionArgument = (
    condition: ITileCondition | ITileAccessibleCondition,
    context: IRuntimeContext,
    world: World,
    ship: Ship,
): Position | UserProgramError => {
    const x = getObjectFromStatement(condition.position.x, context);
    if (isUserProgramError(x))
        return x;
    if (typeof x !== 'number')
        throw invalidProgramError('position can only have number arguments');

    const y = getObjectFromStatement(condition.position.y, context);
    if (isUserProgramError(y))
        return y;
    if (typeof y !== 'number')
        throw invalidProgramError('position can only have number arguments');

    const isRelative = condition.position.head === 'position_value_relative';
    const newX = isRelative ? ship.position.x + x : x;
    const newY = isRelative ? ship.position.y + y : y;

    if (!isPositionOnMap(newX, newY, world))
        return UserProgramError.ReferencedPositionIsNotOnMap;

    return new Position({x: newX, y: newY});
};

const handleObjectComparison = (condition: IColorCondition | IPositionCondition | ITileCondition, world: World, shipId: ShipId, context: IRuntimeContext): boolean | UserProgramError | EvaluationInProgress => {
    const ship = getShip(world, shipId);
    const shipPosition = getShipPosition(world, shipId);

    if (!shipPosition || !ship) {
        throw new Error('Cannot evaluate a condition when ship is not present.');
    }

    if (!condition.comparator) {
        throw new Error('Comparator has to be set.');
    }

    if (condition.comparator === Comparator.Contains) {
        const position = getPositionArgument(condition, context, world, ship);

        if (condition.value === endOfMapConstant)
            return position === UserProgramError.ReferencedPositionIsNotOnMap;
        if (position === UserProgramError.ReferencedPositionIsNotOnMap)
            return false;
        if (isUserProgramError(position))
            return position;
        const objects = getWorldObjectsOnTile(position, world);
        return unifyShips(objects.map(o => o.type)).contains(condition.value);
    }

    if (condition.comparator === Comparator.NotContains) {
        const position = getPositionArgument(condition, context, world, ship);

        if (condition.value === endOfMapConstant)
            return position !== UserProgramError.ReferencedPositionIsNotOnMap;
        if (position === UserProgramError.ReferencedPositionIsNotOnMap)
            return true;
        if (isUserProgramError(position))
            return position;
        const objects = getWorldObjectsOnTile(position, world);
        return !unifyShips(objects.map(o => o.type)).contains(condition.value);
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

const handleAccessibleTileCondition = (condition: ITileAccessibleCondition, world: World, context: IRuntimeContext, shipId: ShipId): boolean | UserProgramError => {
    const ship = world.ships.find(s => s.id === shipId);
    if (!ship)
        throw invalidProgramError(`ShipId ${shipId} does not exist on the map`, 'evaluateCondition');

    const position = getPositionArgument(condition, context, world, ship);

    if (isUserProgramError(position))
        return position === UserProgramError.ReferencedPositionIsNotOnMap ? false : position;

    const objectsOnTile = getObjectsOnPositionWithShips(world, position.x, position.y);

    return objectsOnTile.every(obj => !shipBlockingObjects.contains(obj.type));
};

const executeFncIfNeeded = <T extends number | boolean | string>(
    context: IRuntimeContext,
    fncCall: IFunctionCallBoolean | IFunctionCall,
    expectedType: 'boolean' | 'number' | 'string',
): T | EvaluationInProgress | UserProgramError => {
    const executionId = getFunctionExecutionId(context, fncCall.name, fncCall.parameters);
    const existingExecution = getSystemVariable(
        context,
        SystemVariableName.FunctionExecutionFinished,
        v => v.value.requestId === executionId
    );

    if (!existingExecution) {
        const parameters = getCallParametersValues(fncCall, context);
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
        return !evaluateCondition(condition.value, world, shipId, context);
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
        return executeFncIfNeeded<boolean>(context, condition, 'boolean');
    }

    if (isCompareCondition(condition)) {
        return handleComparatorConditions(condition, context);
    }

    return handleObjectComparison(condition, world, shipId, context);
};
