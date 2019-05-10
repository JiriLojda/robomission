import {List} from "immutable";

export enum WorldObject {
    Ship = 'S',
    Diamond = 'D',
    Meteoroid = 'M',
    Asteroid = 'A',
    Wormhole = 'W',
    Laser = 'laser',
    LaserStart = 'laser-start',
    LaserEnd = 'laser-end',
}

export const destructableObjects: List<WorldObject> = List([
    WorldObject.Ship,
    WorldObject.Meteoroid,
    WorldObject.Asteroid,
]);
