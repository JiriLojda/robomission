import {convertArraysToLists, range} from "../../../../utils/arrays";
import {TileColor} from "../../enums/tileColor";
import {List} from "immutable";
import {Ship, ShipColor} from "../../models/ship";
import {Position} from "../../models/position";
import {Direction} from "../../enums/direction";
import {WorldObject} from "../../models/worldObject";
import {WorldObjectType} from "../../enums/worldObjectType";
import {World} from "../../models/world";

export const diamondStarWorld: World = new World({
    surface: convertArraysToLists(range(5).map(_ =>
        range(5).map(_ => TileColor.Black))),
    ships: List([
        new Ship({id: 'aiShip', position: new Position({x: 0, y: 4}), direction: Direction.Up, shipColor: ShipColor.Yellow}),
        new Ship({id: 'playerShip', position: new Position({x: 4, y: 0}), direction: Direction.Down, shipColor: ShipColor.Green}),
    ]),
    objects: convertArraysToLists(range(5).map((_, lineIndex) =>
        range(5).map((_, columnIndex) => getTestObjects(columnIndex, lineIndex)))),
    size: new Position({ x: 5, y: 5 }),
});

function getTestObjects(x: number, y: number): WorldObject[] {
    const center = 2;
    const vector = Math.sqrt(((center - x) ** 2) + ((center - y) ** 2));
    const distance = Math.abs(vector);

    if (distance <= 1)
        return [new WorldObject({type: WorldObjectType.Diamond})];

    return [];
}
