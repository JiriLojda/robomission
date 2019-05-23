import {List, Set} from "immutable";

export enum WorldObject {
    Ship = 'S',
    ShipDown = '1',
    ShipUp = '2',
    ShipLeft = '3',
    ShipRight = '4',
    Diamond = 'D',
    Meteoroid = 'M',
    Asteroid = 'A',
    Wormhole = 'W',
    Laser = 'laser',
    LaserHorizontal = 'laserHorizontal',
    LaserStart = 'laser-start',
    LaserEnd = 'laser-end',
    Explosion = 'explosion',
}

export const destructableObjects: Set<WorldObject> = Set([
    WorldObject.Ship,
    WorldObject.ShipUp,
    WorldObject.ShipDown,
    WorldObject.ShipLeft,
    WorldObject.ShipRight,
    WorldObject.Meteoroid,
    WorldObject.Asteroid,
]);

export const shipBlockingObjects: Set<WorldObject> = Set([
    WorldObject.Ship,
    WorldObject.ShipUp,
    WorldObject.ShipDown,
    WorldObject.ShipLeft,
    WorldObject.ShipRight,
    WorldObject.Meteoroid,
    WorldObject.Asteroid,
]);

export const shipRepresentingObjects: Set<WorldObject> = Set([
    WorldObject.ShipRight,
    WorldObject.ShipLeft,
    WorldObject.ShipDown,
    WorldObject.ShipUp,
    WorldObject.Ship,
]);

export const unifyShips = (objects: List<WorldObject>): List<WorldObject> =>
    objects.map(o => shipRepresentingObjects.contains(o) ? WorldObject.Ship : o);
