import {
    Condition,
    IBinaryLogicCondition,
    ICompareCondition, INumberBinaryStatement,
    IRuntimeContext,
    isCompareCondition,
    IStatement,
    ITileCondition
} from "../models/programTypes";
import {getObjectsOnPositionWithShips, World} from "../models/world";
import {Position} from "../models/position";
import {TileColor} from "../enums/tileColor";
import {List} from "immutable";
import {unifyShips, WorldObject} from "../enums/worldObject";
import {ConditionType} from "../enums/conditionType";
import {convertUserPositionToInternal} from "./positionUtils";
import {getShip, getShipPosition} from "./worldModelUtils";
import {Comparator} from "../enums/comparator";
import {StatementType} from "../enums/statementType";
import {isUserProgramError, UserProgramError} from "../enums/userProgramError";
import {doesUserVariableExist, getUserVariable, getUserVariableAsNumber, isUserVariableNumber} from "./variableUtils";
import {invalidProgramError} from "./invalidProgramError";
import {NumberOperation} from "../enums/numberOperation";
import {Ship} from "../models/ship";

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

const getObjectFromStatement = (statement: IStatement, context: IRuntimeContext): number | string | UserProgramError => {
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
            if (statement.value === undefined) {
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

            return evaluateNumberBinaryOperation(leftValue, rightValue, statementTyped.operation);
        }
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

const getWorldObjectsOnTile = (position: Position, world: World): List<WorldObject> => {
    const internalPosition = convertUserPositionToInternal(position.x, position.y, world);
    return getObjectsOnPositionWithShips(world, internalPosition.x, internalPosition.y);
};

const getPositionArgument = (condition: ITileCondition, context: IRuntimeContext, world: World, ship: Ship): Position | UserProgramError => {
    const x = getObjectFromStatement(condition.position.x, context);
    if (isUserProgramError(x))
        return x;
    if (typeof x === 'string')
        throw invalidProgramError('position can only have number arguments');

    const y = getObjectFromStatement(condition.position.y, context);
    if (isUserProgramError(y))
        return y;
    if (typeof y === 'string')
        throw invalidProgramError('position can only have number arguments');

    if (x < 1 || x > world.size.x || y < 1 || y > world.size.y)
        return UserProgramError.ReferencedPositionIsNotOnMap;

    if (condition.position.head === 'position_value_relative') {
        return new Position({x: ship.position.x + x, y: ship.position.y + y});
    }

    return new Position({x, y});
};

const handleObjectComparison = (condition: Condition, world: World, shipId: string, context: IRuntimeContext): boolean | UserProgramError => {
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
        if (isUserProgramError(position))
            return position;
        const objects = getWorldObjectsOnTile(position, world);
        return unifyShips(objects).contains(condition.value);
    }

    if (condition.comparator === Comparator.NotContains) {
        const position = getPositionArgument(condition, context, world, ship);
        if (isUserProgramError(position))
            return position;
        const objects = getWorldObjectsOnTile(position, world);
        return !unifyShips(objects).contains(condition.value);
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

const handleLogicalBinaryOperation = (condition: IBinaryLogicCondition, world: World, shipId: string, context: IRuntimeContext): boolean | UserProgramError => {
    const leftValue = evaluateCondition(condition.leftValue, world, shipId, context);
    const rightValue = evaluateCondition(condition.rightValue, world, shipId, context);

    if (isUserProgramError(leftValue))
        return leftValue;
    if (isUserProgramError(rightValue))
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

export const evaluateCondition = (condition: Condition, world: World, shipId: string, context: IRuntimeContext): boolean | UserProgramError => {
    if (condition.head === ConditionType.Not) {
        return !evaluateCondition(condition.value, world, shipId, context);
    }

    if (condition.head === ConditionType.LogicBinaryOperation) {
        return handleLogicalBinaryOperation(condition, world, shipId, context);
    }

    if (condition.head === ConditionType.ConstantBoolean) {
        return Boolean(condition.value);
    }

    if (isCompareCondition(condition)) {
        return handleComparatorConditions(condition, context);
    }

    return handleObjectComparison(condition, world, shipId, context);
};
