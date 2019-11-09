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

export const shipRepresentingObjects: Set<WorldObjectType> = Set([
    WorldObjectType.ShipRight,
    WorldObjectType.ShipLeft,
    WorldObjectType.ShipDown,
    WorldObjectType.ShipUp,
    WorldObjectType.Ship,
    WorldObjectType.ShipBroken,
]);

export const standardDestructibleObjects: Set<WorldObjectType> = Set([
    ...shipRepresentingObjects.toArray(),
    WorldObjectType.Meteoroid,
    WorldObjectType.Asteroid,
]);

export const standardLaserBlockingObjects: Set<WorldObjectType> = Set([
    ...standardDestructibleObjects.toArray(),
]);

export const shipBlockingObjects: Set<WorldObjectType> = Set([
    ...shipRepresentingObjects.toArray(),
    WorldObjectType.Meteoroid,
    WorldObjectType.Asteroid,
]);

export const unifyShips = (objects: List<WorldObjectType>): List<WorldObjectType> =>
    objects.map(o => shipRepresentingObjects.contains(o) ? WorldObjectType.Ship : o);
