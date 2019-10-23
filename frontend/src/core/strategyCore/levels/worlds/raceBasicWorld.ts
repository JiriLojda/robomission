import {TileColor} from "../../enums/tileColor";
import {List} from "immutable";
import {Ship, ShipColor} from "../../models/ship";
import {Position} from "../../models/position";
import {Direction} from "../../enums/direction";
import {WorldObject} from "../../models/worldObject";
import {WorldObjectType} from "../../enums/worldObjectType";
import {World} from "../../models/world";
import {convertArraysToLists, range} from "../../../../utils/arrays";
import {convertReadableMapToWorld} from "../utils/convertReadableMapToWorld";

const map = [
    ['k-', 'k-', 'k-', 'k-', 'k-', 'k-', 'k-'],
    ['k-', 'k-', 'k-', 'k-', 'k-', 'k-', 'k-P'],
    ['g-', 'k-', 'k-', 'k-', 'k-', 'k-', 'k-'],
    ['kA', 'kA', 'kA', 'kA', 'kA', 'kA', 'kA'],
    ['r-', 'k-', 'k-', 'k-', 'k-', 'k-', 'k-'],
    ['k-', 'k-', 'k-', 'k-', 'k-', 'k-', 'k-A'],
    ['k-', 'k-', 'k-', 'k-', 'k-', 'k-', 'k-'],
];

const playerShip = new Ship({id: 'playerShip', position: new Position(), direction: Direction.Left, shipColor: ShipColor.Green});
const aiShip = new Ship({id: 'aiShip', position: new Position(), direction: Direction.Left, shipColor: ShipColor.Red});

const ships = {
    P: playerShip,
    A: aiShip,
};

export const raceBasicWorld: World = convertReadableMapToWorld(map, ships);
