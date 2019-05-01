import {TileColor} from "../enums/tileColor";
import {WorldObject} from "../enums/worldObject";
import {Ship} from "./ship";
import {Position} from "./position";
import {List, Record} from "immutable";
import {EditorWorldModel} from "./editorWorldModel";

interface IWorldModelParameters {
    surface: List<List<TileColor>>;
    ships: List<Ship>;
    objects: List<List<List<WorldObject>>>;
    size: Position;
}

const defaultParameters: IWorldModelParameters = {
    surface: List(),
    ships: List(),
    objects: List(),
    size: new Position(),
};

export class World extends Record<IWorldModelParameters>(defaultParameters) {
}

export const updateShipInWorld = (world: World, oldShip: Ship, newShip: Ship): World => {
    const index = world.ships.indexOf(oldShip);

    if (index < 0) {
        throw new Error('updateShip: oldShip not found.');
    }

    return world.set("ships", world.ships.update(index, () => newShip));
};

type test<T> = T extends (infer U)[] ? List<U> : T;

const convertArraysToLists = <T extends unknown[], U>(array: T): U => {
    return List(array.map(e => Array.isArray(e) ? convertArraysToLists(e) : e)) as any;
};

export const convertEditorWorldModelToIWorld = (editorModel: EditorWorldModel, ships: List<Ship>): World => new World({
    surface: convertArraysToLists(editorModel.map(line => line.map(tile => tile[0]))),
    ships,
    objects: convertArraysToLists(editorModel.map(line => line.map(tile => convertTileTraitsToObjects(tile[1])))),
    size: new Position({y: editorModel.length, x: editorModel[0].length}),
});

export const convertWorldToEditorModel = (worldModel: World): EditorWorldModel =>
    worldModel.surface.map((line, y) => line.map((tileColor, x): [TileColor, string[]] => {
        const tileObjects: string[] = worldModel.objects.get(y)!.get(x)!.toArray();
        const doesContainShip = worldModel.ships.find(ship => ship.position.x === x && ship.position.y === y);

        if (doesContainShip) {
            tileObjects.push(WorldObject.Ship);
        }

        return [tileColor, tileObjects];
    }).toArray()).toArray();

const convertTileTraitsToObjects = (tileTraits: string[]): WorldObject[] =>
    tileTraits.map(convertStringToWorldObject);

const convertStringToWorldObject = (input: string): WorldObject => {
    for (const key in Object.keys(WorldObject)) {
        if (input === WorldObject[key]) {
            return <WorldObject>key;
        }
    }
    throw new Error(`Unknown world object '${input}'`);
};

const range = (size: number) => [...Array(size).keys()];
export const demoWorld: World = new World({
    surface: convertArraysToLists(range(5).map(_ =>
        range(5).map(_ => TileColor.Black))),
    ships: List([new Ship({id: 'S1', position: new Position({x: 2, y: 4})})]),
    objects: convertArraysToLists(range(5).map(_ =>
        range(5).map(_ => []))),
    size: new Position({ x: 5, y: 5 }),
});
