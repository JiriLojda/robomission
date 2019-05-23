import {StatementType} from "./enums/statementType";
import {Comparator} from "./enums/comparator";
import {ConditionType} from "./enums/conditionType";
import {TileColor} from "./enums/tileColor";
import {SystemVariableName} from "./enums/systemVariableName";
import {canMove, getShip, getShipPosition, makeShipShoot, moveShip, turnShip} from "./utils/worldModelUtils";
import {MovingDirection} from "./enums/movingDirection";
import {
    getObjectsOnPositionWithShips,
    removeLaserAndExplosionObjects,
    updateShipInWorld,
    World
} from "./models/world";
import {Position} from "./models/position";
import {isUserProgramError, UserProgramError} from "./enums/userProgramError";
import {Condition, IPositionItem, IRoboAst, IRuntimeContext, IStatement} from "./models/programTypes";
import {List, Set} from "immutable";
import {unifyShips, WorldObject} from "./enums/worldObject";
import {convertUserPositionToInternal} from "./utils/positionUtils";

const defaultMinorActionsCount = 100;

export const emptyRuntimeContext: IRuntimeContext = {
    position: [{index: 0, elseBranchEntered: false, repeatCount: undefined}],
    variables: [],
    systemVariables: [],
    wasActionExecuted: false,
    minorActionsLeft: defaultMinorActionsCount,
};

const scopeStatements = Set([
    StatementType.While,
    StatementType.Repeat,
    StatementType.If,
    StatementType.Else,
]);

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

const getComparedObject = (condition: Condition, world: World, shipPosition: Position): number | TileColor | List<WorldObject> => {
    switch (condition.head) {
        case ConditionType.Color:
            const tile = world.surface.get(shipPosition.y)!.get(shipPosition.x);
            return tile || TileColor.Black;
        case ConditionType.Position:
            return shipPosition.x + 1;
        case ConditionType.Tile:
            const internalPosition = convertUserPositionToInternal(condition.position.x, condition.position.y, world);
            return getObjectsOnPositionWithShips(world, internalPosition.x, internalPosition.y);
        default:
            throw new Error(`Unknown condition type: ${condition!.head}.`);
    }
};

const evaluateCondition = (condition: Condition, world: World, shipId: string) => {
    const shipPosition = getShipPosition(world, shipId);

    if (!shipPosition) {
        throw new Error('Cannot evaluate a condition when ship is not present.');
    }

    switch (condition.comparator) {
        case Comparator.Equal:
            return condition.value === getComparedObject(condition, world, shipPosition);
        case Comparator.NonEqual:
            return condition.value !== getComparedObject(condition, world, shipPosition);
        case Comparator.Bigger:
            return condition.value < getComparedObject(condition, world, shipPosition);
        case Comparator.BiggerOrEqual:
            return condition.value <= getComparedObject(condition, world, shipPosition);
        case Comparator.Smaller:
            return condition.value > getComparedObject(condition, world, shipPosition);
        case Comparator.SmallerOrEqual:
            return condition.value >= getComparedObject(condition, world, shipPosition);
        case Comparator.Contains: {
            const objects = getComparedObject(condition, world, shipPosition);
            if (!List.isList(objects)) {
                throw new Error(`Condition with contains comparator has bad value ${condition}.`);
            }
            return unifyShips(objects).contains(condition.value);
        }
        case Comparator.NotContains: {
            const objects = getComparedObject(condition, world, shipPosition);
            if (!List.isList(objects)) {
                throw new Error(`Condition with contains comparator has bad value ${condition}.`);
            }
            return !unifyShips(objects).contains(condition.value);
        }
    }
    throw new Error(`Unknown condition ${condition}.`);
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

const getSystemVariable = (context: IRuntimeContext, variableName: string) => {
    return context.systemVariables.find(variable => variable.name === variableName);
};

const setSystemVariable = (context: IRuntimeContext, variableName: SystemVariableName, variableValue: unknown) => {
    const existing = getSystemVariable(context, variableName);
    if (!existing) {
        context.systemVariables.push({name: variableName, value: variableValue});
    } else {
        existing.value = variableValue;
    }
};

const deepCopy = (obj: unknown) => JSON.parse(JSON.stringify(obj));

const evaluateBlockCondition = (statement: IStatement, context: IRuntimeContext, world: World, shipId: string) => {
    switch (statement.head) {
        case StatementType.If:
        case StatementType.While:
            if (!statement.test) {
                throw new Error(`${statement.head} statement has to have condition.`);
            }
            setSystemVariable(context, SystemVariableName.ShouldEnterNextBlock, evaluateCondition(statement.test, world, shipId));
            return;
        case StatementType.Repeat:
            const position = getLast(context.position);
            if (!statement.count || !position.repeatCount || statement.count <= 0 || position.repeatCount <= 0) {
                setSystemVariable(context, SystemVariableName.ShouldEnterNextBlock, false);
                position.repeatCount = undefined;
                return;
            }
            position.repeatCount--;
            setSystemVariable(context, SystemVariableName.ShouldEnterNextBlock, true);
            return;
    }
};

const setPositionAttributes = (statement: IStatement, position: IPositionItem) => {
    if (statement.head === StatementType.Repeat && position.repeatCount === undefined) {
        position.repeatCount = statement.count;
    }
};

const evaluateActionStatement = (statement: IStatement, world: World, shipId: string): World | UserProgramError => {
    const ship = getShip(world, shipId);

    if (!ship) {
        throw new Error(`Cannot find a ship with id '${shipId}'.`);
    }

    switch (statement.head) {
        case StatementType.Fly:
            if (!canMove(world, ship, MovingDirection.Forward)) {
                return UserProgramError.ShipCannotMove;
            }
            return updateShipInWorld(world, ship, moveShip(world, ship, MovingDirection.Forward));
        case StatementType.Left:
            if (!canMove(world, ship, MovingDirection.Left)) {
                return UserProgramError.ShipCannotMove;
            }
            return updateShipInWorld(world, ship, moveShip(world, ship, MovingDirection.Left));
        case StatementType.Right:
            if (!canMove(world, ship, MovingDirection.Right)) {
                return UserProgramError.ShipCannotMove;
            }
            return updateShipInWorld(world, ship, moveShip(world, ship, MovingDirection.Right));
        case StatementType.Shoot:
            return makeShipShoot(world, shipId);
        case StatementType.TurnLeft:
            return updateShipInWorld(world, ship, turnShip(ship, 'left'));
        case StatementType.TurnRight:
            return updateShipInWorld(world, ship, turnShip(ship, 'right'));
        default:
            return world;
    }
};

export const doNextStep = (roboAst: IRoboAst, world: World, shipId: string, context: IRuntimeContext): [IRuntimeContext, World] | UserProgramError => {
    if (context.position.length === 0) {
        console.log('Empty runtime context, reset before another run.');
        return [context, world];
    }

    if (context.minorActionsLeft <= 0) {
        console.log('No actions left, let other players play too.');
        return [context, world];
    }
    context = deepCopy(context);

    context.minorActionsLeft--;
    const statement = getStatement(roboAst, context);
    console.log(statement);

    const withoutLasers = removeLaserAndExplosionObjects(world);
    const newWorld = evaluateActionStatement(statement, withoutLasers, shipId);

    if (isUserProgramError(newWorld)) {
        return newWorld;
    }

    context.wasActionExecuted = newWorld !== world;
    if (context.wasActionExecuted) {
         context.minorActionsLeft = defaultMinorActionsCount;
    }
    setPositionAttributes(statement, getLast(context.position));
    evaluateBlockCondition(statement, context, world, shipId);

    context.position = getNextPosition(roboAst, context);

    return [context, newWorld];
};
