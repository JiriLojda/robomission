import {List, Set} from "immutable";

export enum WorldObjectType {
    Ship = 'S',
    ShipDown = '1',
    ShipUp = '2',
    ShipLeft = '3',
    ShipRight = '4',
    ShipBroken = 'spaceship-broken',
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

export const destructableObjects: Set<WorldObjectType> = Set([
    WorldObjectType.Ship,
    WorldObjectType.ShipUp,
    WorldObjectType.ShipDown,
    WorldObjectType.ShipLeft,
    WorldObjectType.ShipRight,
    WorldObjectType.Meteoroid,
    WorldObjectType.Asteroid,
]);

export const laserBlockingObjects: Set<WorldObjectType> = Set([
    ...destructableObjects.toArray(),
]);

export const shipRepresentingObjects: Set<WorldObjectType> = Set([
    WorldObjectType.ShipRight,
    WorldObjectType.ShipLeft,
    WorldObjectType.ShipDown,
    WorldObjectType.ShipUp,
    WorldObjectType.Ship,
    WorldObjectType.ShipBroken,
]);

export const shipBlockingObjects: Set<WorldObjectType> = Set([
    ...shipRepresentingObjects.toArray(),
    WorldObjectType.Meteoroid,
    WorldObjectType.Asteroid,
]);

export const unifyShips = (objects: List<WorldObjectType>): List<WorldObjectType> =>
    objects.map(o => shipRepresentingObjects.contains(o) ? WorldObjectType.Ship : o);
