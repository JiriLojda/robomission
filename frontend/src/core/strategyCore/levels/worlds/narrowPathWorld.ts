import {Ship, ShipColor} from "../../models/ship";
import {Position} from "../../models/position";
import {Direction} from "../../enums/direction";
import {World} from "../../models/world";
import {convertReadableMapToWorld} from "../utils/convertReadableMapToWorld";

const map = [
    ['g-', 'k-', 'k-', 'k-', 'k-', 'k-', 'k-', 'k-', 'k-', 'k-', 'k-', 'k-', 'k-', 'k-'],
    ['g-', 'k-', 'k-', 'k-', 'k-', 'k-', 'k-', 'k-', 'k-', 'k-', 'k-', 'k-', 'k-', 'k-P'],
    ['g-', 'k-A', 'k-', 'k-', 'k-', 'k-', 'k-', 'k-', 'k-', 'k-', 'k-', 'k-', 'k-', 'k-'],
];

const playerShip = new Ship({id: 'playerShip', position: new Position(), direction: Direction.Left, shipColor: ShipColor.Green});
const aiShip = new Ship({id: 'aiShip', position: new Position(), direction: Direction.Right, shipColor: ShipColor.Red});

const ships = {
    P: playerShip,
    A: aiShip,
};

export const narrowPathWorld: World = convertReadableMapToWorld(map, ships);
