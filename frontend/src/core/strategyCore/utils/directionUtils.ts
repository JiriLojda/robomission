import {Direction} from "../enums/direction";
import {Position} from "../models/position";
import {MovingDirection} from "../enums/movingDirection";
import {invalidProgramError} from "./invalidProgramError";

export const getNextDirection = (direction: Direction, turnDirection: Direction): Direction => {
    if (turnDirection === Direction.Down || turnDirection === Direction.Up) {
        throw new Error('Can only get next direction with turnDirection === Left or Right');
    }

    switch (direction) {
        case Direction.Left:
            if (turnDirection === Direction.Right) {
                return Direction.Up;
            } else {
                return Direction.Down
            }
        case Direction.Down:
            if (turnDirection === Direction.Right) {
                return Direction.Left;
            } else {
                return Direction.Right;
            }
        case Direction.Right:
            if (turnDirection === Direction.Right) {
                return Direction.Down;
            } else {
                return Direction.Up;
            }
        case Direction.Up:
            if (turnDirection === Direction.Right) {
                return Direction.Right;
            } else {
                return Direction.Left;
            }
        default:
            throw new Error(`Unknown direction ${direction}`);
    }
};

export const getNthPositionInDirection = (position: Position, direction: Direction, n: number = 1): Position => {
    switch (direction) {
        case Direction.Down:
            return position.set('y', position.y + n);
        case Direction.Left:
            return position.set('x', position.x - n);
        case Direction.Right:
            return position.set('x', position.x + n);
        case Direction.Up:
            return position.set('y', position.y - n);
        default:
            throw new Error(`Unknown direction ${direction}.`);
    }
};

export const getPositionToFlyOn = (start: Position, movingDirection: MovingDirection, shipDirection: Direction): Position => {
    const aheadPosition = getNthPositionInDirection(start, shipDirection);

    switch (movingDirection) {
        case MovingDirection.Forward:
            return aheadPosition;
        case MovingDirection.Right:
            return getNthPositionInDirection(aheadPosition, getNextDirection(shipDirection, Direction.Right));
        case MovingDirection.Left:
            return getNthPositionInDirection(aheadPosition, getNextDirection(shipDirection, Direction.Left));
        default:
            throw invalidProgramError(`Unknown moving direction ${movingDirection}`);
    }
};
