import {Condition} from "../models/programTypes";
import {getObjectsOnPositionWithShips, World} from "../models/world";
import {Position} from "../models/position";
import {TileColor} from "../enums/tileColor";
import {List} from "immutable";
import {unifyShips, WorldObject} from "../enums/worldObject";
import {ConditionType} from "../enums/conditionType";
import {convertUserPositionToInternal} from "./positionUtils";
import {getShipPosition} from "./worldModelUtils";
import {Comparator} from "../enums/comparator";

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

export const evaluateCondition = (condition: Condition, world: World, shipId: string) => {
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
            if (condition.value) {
                return condition.value < getComparedObject(condition, world, shipPosition);
            }
            return true;
        case Comparator.BiggerOrEqual:
            if (condition.value) {
                return condition.value <= getComparedObject(condition, world, shipPosition);
            }
            return true;
        case Comparator.Smaller:
            if (condition.value) {
                return condition.value > getComparedObject(condition, world, shipPosition);
            }
            return true;
        case Comparator.SmallerOrEqual:
            if (condition.value) {
                return condition.value >= getComparedObject(condition, world, shipPosition);
            }
            return true;
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
