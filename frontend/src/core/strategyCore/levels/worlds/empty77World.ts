import {Ship, ShipColor} from "../../models/ship";
import {Position} from "../../models/position";
import {Direction} from "../../enums/direction";
import {World} from "../../models/world";
import {convertReadableMapToWorld} from "../utils/convertReadableMapToWorld";

const map = [
    ['k-', 'k-', 'k-', 'k-', 'k-', 'k-', 'k-P'],
    ['k-', 'k-', 'k-', 'k-', 'k-', 'k-', 'k-'],
    ['k-', 'k-', 'k-', 'k-', 'k-', 'k-', 'k-'],
    ['k-', 'k-', 'k-', 'k-', 'k-', 'k-', 'k-'],
    ['k-', 'k-', 'k-', 'k-', 'k-', 'k-', 'k-'],
    ['k-', 'k-', 'k-', 'k-', 'k-', 'k-', 'k-'],
    ['k-A', 'k-', 'k-', 'k-', 'k-', 'k-', 'k-'],
];

const playerShip = new Ship({id: 'first', position: new Position(), direction: Direction.Down, shipColor: ShipColor.Green});
const aiShip = new Ship({id: 'second', position: new Position(), direction: Direction.Up, shipColor: ShipColor.Red});

const ships = {
    P: playerShip,
    A: aiShip,
};

export const empty77World: World = convertReadableMapToWorld(map, ships);
