import {World} from "../../models/world";
import {Ship} from "../../models/ship";
import {WorldObjectType} from "../../enums/worldObjectType";
import {TileColor} from "../../enums/tileColor";
import {Position} from "../../models/position";
import {convertArraysToLists} from "../../../../utils/arrays";
import {WorldObject} from "../../models/worldObject";

export type ReadableMap = string[][];

export const convertReadableMapToWorld = (map: ReadableMap, shipsMap: {[k: string]: Ship}): World => {
    const colors = map
        .map(line => line.map(tile => getTileColor(tile[0])));
    const objects = map
        .map(line => line.map(tile => tile[1] === '-' ? [] : [new WorldObject({ type: getWorldObjectType(tile[1])})]));
    const ships = map
        .map((line, y) => line.map((tile, x) => tile[2] ? positionShip(shipsMap[tile[2]], x, y) : undefined ).filter(s => !!s))
        .flat();

    return new World({
       objects: convertArraysToLists(objects),
       surface: convertArraysToLists(colors),
       ships: convertArraysToLists(ships),
       size: new Position({x: map[0].length, y: map.length}),
    });
};

const getWorldObjectType = (input: string): WorldObjectType =>
    WorldObjectType[Object.keys(WorldObjectType).find(t => WorldObjectType[t as any] === input) as any] as any;

const getTileColor = (input: string): TileColor =>
    TileColor[Object.keys(TileColor).find(t => TileColor[t as any] === input) as any] as any;

const positionShip = (ship: Ship, x: number, y: number): Ship =>
    ship.set("position", new Position({x, y}));
