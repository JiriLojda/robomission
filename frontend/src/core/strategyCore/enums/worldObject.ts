import {List, Set} from "immutable";

export enum WorldObject {
    Ship = 'S',
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
    WorldObject.Meteoroid,
    WorldObject.Asteroid,
]).toSet();
