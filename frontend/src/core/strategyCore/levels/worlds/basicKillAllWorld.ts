import {Ship, ShipColor} from "../../models/ship";
import {Position} from "../../models/position";
import {Direction} from "../../enums/direction";
import {World} from "../../models/world";
import {convertReadableMapToWorld} from "../utils/convertReadableMapToWorld";

const map = [
    ['k-', 'k-', 'k-', 'k-', 'k-P'],
    ['kF', 'kF', 'kF', 'kF', 'kF'],
    ['k-', 'k-', 'k-', 'k-', 'k-'],
    ['k-', 'k-', 'k-', 'k-', 'k-'],
    ['k-A', 'k-', 'k-', 'k-', 'k-'],
];

const playerShip = new Ship({id: 'playerShip', position: new Position(), direction: Direction.Down, shipColor: ShipColor.Green});
const aiShip = new Ship({id: 'aiShip', position: new Position(), direction: Direction.Up, shipColor: ShipColor.Red});

const ships = {
    P: playerShip,
    A: aiShip,
};

export const basicKillAllWorld: World = convertReadableMapToWorld(map, ships);
