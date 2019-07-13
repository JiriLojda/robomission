import {MovingDirection} from "../enums/movingDirection";
import {getObjectsOnPosition, isEnterablePosition, setObjectsOnPosition, World} from "../models/world";
import {Ship} from "../models/ship";
import {Position} from "../models/position";
import {destructableObjects, WorldObject} from "../enums/worldObject";
import {Direction} from "../enums/direction";
import {List} from "immutable";
import {getNextDirection, getNthPositionInDirection} from "./directionUtils";

export const getShip = (world: World, shipId: string): Ship | undefined =>
    world.ships.find(ship => ship.id === shipId);

export const getShipPosition = (world: World, shipId: string): Position | undefined => {
    const ship = getShip(world, shipId);

    if (!ship) {
        return undefined;
    }

    return ship.position;
};

export const moveShip = (world: World, ship: Ship, direction: MovingDirection): Ship => {
    if (!canMove(world, ship, direction)) {
        throw new Error('Cannot move the ship.');
    }

    let newPosition = getPositionsInFrontOfShip(ship, world).get(0)!;

    if (direction === MovingDirection.Right) {
        const nextDirection = getNextDirection(ship.direction, Direction.Right);
        newPosition = getNthPositionInDirection(newPosition, nextDirection);
    }
    if (direction === MovingDirection.Left) {
        const nextDirection = getNextDirection(ship.direction, Direction.Left);
        newPosition = getNthPositionInDirection(newPosition, nextDirection);
    }

    return ship.set("position", newPosition);
};

export const canMove = (world: World, ship: Ship, direction: MovingDirection): boolean => {
    const positionsInFrontOfShip = getPositionsInFrontOfShip(ship, world);

    if (positionsInFrontOfShip.isEmpty()) {
        return false;
    }

    const newPosition = positionsInFrontOfShip.get(0)!;

    if (direction === MovingDirection.Right) {
        const nextDirection = getNextDirection(ship.direction, Direction.Right);
        const finalPosition = getNthPositionInDirection(newPosition, nextDirection);
        return isEnterablePosition(finalPosition, world);
    }
    if (direction === MovingDirection.Left) {
        const nextDirection = getNextDirection(ship.direction, Direction.Left);
        const finalPosition = getNthPositionInDirection(newPosition, nextDirection);
        return isEnterablePosition(finalPosition, world);
    }

    return isEnterablePosition(newPosition, world);
};


export const makeShipShoot = (world: World, shipId: string): World => {
    const ship = getShip(world, shipId);

    if (!ship) {
        throw new Error(`Cannot find a ship with id '${shipId}'.`);
    }

    let newWorld = world;
    getPositionsInFrontOfShip(ship, world).forEach(shootPosition => {
        let objects = getObjectsOnPosition(world, shootPosition.x, shootPosition.y);
        if (objects.some(item => destructableObjects.contains(item))) {
            objects = objects.push(WorldObject.Explosion);
        }
        if (ship.direction === Direction.Left || ship.direction === Direction.Right) {
            objects = objects.push(WorldObject.LaserHorizontal);
        } else {
            objects = objects.push(WorldObject.Laser);
        }
        objects = objects.filter(item => !destructableObjects.contains(item));
        newWorld = setObjectsOnPosition(newWorld, shootPosition.x, shootPosition.y, objects);
    });

    return newWorld;
};

const range = (from: number, to: number): List<number> =>
    List([...Array(to - from).keys()])
        .map(key => key + from);

const getPositionsInFrontOfShip = (ship: Ship, world: World): List<Position> => {
    switch (ship.direction) {
        case Direction.Up:
            return range(0, ship.position.y)
                .map(y => new Position({y, x: ship.position.x}))
                .reverse();
        case Direction.Left:
            return range(0, ship.position.x)
                .map(x => new Position({x, y: ship.position.y}))
                .reverse();
        case Direction.Down:
            return range(ship.position.y + 1, world.size.y)
                .map(y => new Position({y, x: ship.position.x}));
        case Direction.Right:
            return range(ship.position.x + 1, world.size.x)
                .map(x => new Position({x, y: ship.position.y}));
        default:
            throw new Error(`Unknown ship direction '${ship.direction}'.`);
    }
};

export const turnShip = (ship: Ship, direction: 'left' | 'right'): Ship => {
    switch (ship.direction) {
        case Direction.Right:
            return ship.set("direction", direction === 'right' ? Direction.Down : Direction.Up);
        case Direction.Left:
            return ship.set("direction", direction === 'right' ? Direction.Up : Direction.Down);
        case Direction.Up:
            return ship.set("direction", direction === 'right' ? Direction.Right : Direction.Left);
        case Direction.Down:
            return ship.set("direction", direction === 'right' ? Direction.Left : Direction.Right);
        default:
            throw new Error(`Unknown ship direction '${ship.direction}'.`);
    }
};
