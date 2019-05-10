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
    LaserStart = 'laser-start',
    LaserEnd = 'laser-end',
    Explosion = 'explosion',
}

export const destructableObjects: Set<WorldObject> = List([
    WorldObject.Ship,
    WorldObject.ShipUp,
    WorldObject.ShipDown,
    WorldObject.ShipLeft,
    WorldObject.ShipRight,
    WorldObject.Meteoroid,
    WorldObject.Asteroid,
]).toSet();
