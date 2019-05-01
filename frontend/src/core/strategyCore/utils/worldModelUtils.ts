import {MovingDirection} from "../enums/movingDirection";
import {World} from "../models/world";
import {Ship} from "../models/ship";
import {Position} from "../models/position";

export const getShip = (world: World, shipId: string): Ship | undefined =>
    world.ships.find(ship => ship.id === shipId);

export const getShipPosition = (world: World, shipId: string): Position | undefined => {
    const ship = getShip(world, shipId);

    if (!ship) {
        return undefined;
    }

    return {...ship.position};
};

export const moveShip = (world: World, ship: Ship, direction: MovingDirection): Ship => {
    if (!canMove(world, ship.position, direction)) {
        throw new Error('Cannot move the ship.');
    }

    const newPosition = ship.position.toJS();

    if (direction === MovingDirection.Right) {
        newPosition.x++;
    }
    if (direction === MovingDirection.Left) {
        newPosition.x--;
    }
    newPosition.y--;

    return ship.set("position", new Position(newPosition));
};

export const canMove = (world: World, position: Position, direction: MovingDirection): boolean => {
    if (direction === MovingDirection.Left && position.x === 0) {
        return false;
    }
    if (direction === MovingDirection.Right && position.x >= world.size.x - 1) {
        return false;
    }

    return position.y > 0;
};
