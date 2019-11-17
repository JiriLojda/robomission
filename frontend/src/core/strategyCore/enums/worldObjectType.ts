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
    MeteoroidPushable = 'F',
    Asteroid = 'A',
    AsteroidPushable = 'G',
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
    WorldObjectType.MeteoroidPushable,
]);

export const standardLaserBlockingObjects: Set<WorldObjectType> = Set([
    ...standardDestructibleObjects.toArray(),
    WorldObjectType.Asteroid,
    WorldObjectType.AsteroidPushable,
    WorldObjectType.MeteoroidPushable,
]);

export const shipBlockingObjects: Set<WorldObjectType> = Set([
    ...shipRepresentingObjects.toArray(),
    WorldObjectType.Meteoroid,
    WorldObjectType.Asteroid,
    WorldObjectType.MeteoroidPushable,
    WorldObjectType.AsteroidPushable,
]);

export const standardPushableObjects: Set<WorldObjectType> = Set([
    WorldObjectType.AsteroidPushable,
    WorldObjectType.MeteoroidPushable,
]);

export const standardNonPushableObjects: Set<WorldObjectType> = Set([
    WorldObjectType.Asteroid,
    WorldObjectType.Meteoroid,
]);

export const unifyShips = (objects: List<WorldObjectType>): List<WorldObjectType> =>
    objects.map(o => shipRepresentingObjects.contains(o) ? WorldObjectType.Ship : o);
