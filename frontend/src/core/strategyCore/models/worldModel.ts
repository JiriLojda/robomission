import {TileColor} from "../enums/tileColor";
import {EditorWorldModel} from "./editorWorldModel";
import {WorldObject} from "../enums/worldObject";

export interface IPosition {
    x: number;
    y: number;
}

export interface IShip {
    id: string;
    position: IPosition;
}

export interface IWorldModel {
    surface: TileColor[][];
    ships: IShip[];
    objects: WorldObject[][][];
    size: IPosition;
}

export const convertEditorWorldModelToIWorldModel = (editorModel: EditorWorldModel, ships: IShip[]): IWorldModel => ({
    surface: editorModel.map(line => line.map(tile => tile[0])),
    ships,
    objects: editorModel.map(line => line.map(tile => convertTileTraitsToObjects(tile[1]))),
    size: {y: editorModel.length, x: editorModel[0].length},
});

export const convertIWorldModelToEditorModel = (worldModel: IWorldModel): EditorWorldModel =>
    worldModel.surface.map((line, y) => line.map((tileColor, x) => {
        const tileObjects = [...worldModel.objects[y][x]];
        const doesContainShip = worldModel.ships.find(ship => ship.position.x === x && ship.position.y === y);

        if (doesContainShip) {
            tileObjects.push(WorldObject.Ship);
        }

        return [tileColor, tileObjects];
    }));

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
export const demoWorld: IWorldModel = {
    surface: range(5).map(_ =>
        range(5).map(_ => TileColor.Black)),
    ships: [{id: 'S1', position: {x: 2, y: 4}}],
    objects: range(5).map(_ =>
        range(5).map(_ => [])),
    size: { x: 5, y: 5 },
};
