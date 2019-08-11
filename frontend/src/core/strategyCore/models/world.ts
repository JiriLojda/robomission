import {TileColor} from "../enums/tileColor";
import {shipBlockingObjects, WorldObjectType} from "../enums/worldObjectType";
import {Ship} from "./ship";
import {isOnPosition, Position} from "./position";
import {List, Record} from "immutable";
import {EditorWorldModel} from "./editorWorldModel";
import {Direction} from "../enums/direction";
import {WorldObject} from "./worldObject";
import {convertArraysToLists} from "../../../utils/arrays";

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

const assertPositionInWorld = (world: World, x: number, y: number): void => {
    if (world.size.x <= x || world.size.y <= y) {
        throw new Error(`Position [${x}, ${y}] is outside of world size [${world.size.x}, ${world.size.y}].`);
    }
    if (!world.objects.get(y) || !world.objects.get(y)!.get(x)) {
        throw new Error(`The world is badly constructed, position [${x}, ${y}] is within world.size, but undefined.`);
    }
};

export const addObjectOnPosition = (world: World, x: number, y: number, obj: WorldObjectType): World => {
    assertPositionInWorld(world, x, y);

    return world.set('objects', world.objects.set(y, world.objects.get(y)!.set(x, world.objects.get(y)!.get(x)!.push(new WorldObject({type: obj})))));
};

export const getObjectsOnPosition = (world: World, x: number, y: number): List<WorldObject> => {
    assertPositionInWorld(world, x, y);

    return world.objects.get(y)!.get(x)!;
};

export const getObjectsOnPositionWithShips = (world: World, x: number, y: number): List<WorldObject> => {
    const otherObjects = getObjectsOnPosition(world, x, y);
    if (world.ships.some(ship => isOnPosition(ship.position, x, y))) {
        return otherObjects.push(new WorldObject({type: WorldObjectType.Ship}));
    }
    return otherObjects;
};

export const setObjectsOnPosition = (world: World, x: number, y: number, newObjects: List<WorldObject>): World => {
    assertPositionInWorld(world, x, y);

    return world.set('objects', world.objects.set(y, world.objects.get(y)!.set(x, newObjects)));
};

export const removeLaserAndExplosionObjects = (world: World): World =>
    world.set('objects', world.objects.map(line => line.map(tile => tile
        .filter(item => item.type !== WorldObjectType.Laser &&
            item.type !== WorldObjectType.Explosion &&
            item.type !== WorldObjectType.LaserHorizontal
        ))));

export const convertEditorWorldModelToWorld = (editorModel: EditorWorldModel, ships: List<Ship>): World => new World({
    surface: convertArraysToLists(editorModel.map(line => line.map(tile => tile[0]))),
    ships,
    objects: convertArraysToLists(editorModel.map(line => line.map(tile => convertTileTraitsToObjects(tile[1])))),
    size: new Position({y: editorModel.length, x: editorModel[0].length}),
});

export const convertWorldToEditorModel = (worldModel: World): EditorWorldModel =>
    worldModel.surface.map((line, y) => line.map((tileColor, x): [TileColor, string[]] => {
        const tileObjects: string[] = worldModel.objects.get(y)!.get(x)!.map(o => o.type).toArray();
        const foundShip = worldModel.ships.find(ship => ship.position.x === x && ship.position.y === y);

        if (foundShip) {
            tileObjects.push(getShipIdentifier(foundShip) + `__${foundShip.shipColor}`);
        }

        return [tileColor, tileObjects];
    }).toArray()).toArray();

const getShipIdentifier = (ship: Ship): WorldObjectType => {
    if (ship.isDestroyed)
        return WorldObjectType.ShipBroken;

    switch (ship.direction) {
        case Direction.Up:
            return WorldObjectType.ShipUp;
        case Direction.Down:
            return WorldObjectType.ShipDown;
        case Direction.Left:
            return WorldObjectType.ShipLeft;
        case Direction.Right:
            return WorldObjectType.ShipRight;
        default:
            throw new Error(`Unknown ship.direction '${ship.direction}'.`);
    }
};

const convertTileTraitsToObjects = (tileTraits: string[]): WorldObjectType[] =>
    tileTraits.map(convertStringToWorldObject);

const convertStringToWorldObject = (input: string): WorldObjectType => {
    for (const key in Object.keys(WorldObjectType)) {
        if (input === WorldObjectType[key]) {
            return <WorldObjectType>key;
        }
    }
    throw new Error(`Unknown world object '${input}'`);
};

export const isEnterablePosition = (position: Position, world: World): boolean => {
    if (position.x < 0 || position.y < 0 || position.x >= world.size.x || position.y >= world.size.y) {
        return false;
    }

    const objects = getObjectsOnPositionWithShips(world, position.x, position.y);

    return objects.every(o => !shipBlockingObjects.contains(o.type));
};

export const isPositionInWorld = (position: Position, world: World): boolean =>
    position.x >= 0 && position.y >= 0 && position.x < world.size.x && position.y < world.size.y;
