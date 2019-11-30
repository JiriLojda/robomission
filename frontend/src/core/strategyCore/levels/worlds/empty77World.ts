import {Ship, ShipColor} from "../../models/ship";
import {Position} from "../../models/position";
import {Direction} from "../../enums/direction";
import {World} from "../../models/world";
import {convertReadableMapToWorld} from "../utils/convertReadableMapToWorld";
import {standardPlayerShipIds} from "../constants/standardShipIds";

const map = [
    ['k-', 'k-', 'k-', 'k-', 'k-', 'k-', 'k-P'],
    ['k-', 'k-', 'k-', 'k-', 'k-', 'k-', 'k-'],
    ['k-', 'k-', 'k-', 'k-', 'k-', 'k-', 'k-'],
    ['k-', 'k-', 'k-', 'k-', 'k-', 'k-', 'k-'],
    ['k-', 'k-', 'k-', 'k-', 'k-', 'k-', 'k-'],
    ['k-', 'k-', 'k-', 'k-', 'k-', 'k-', 'k-'],
    ['k-A', 'k-', 'k-', 'k-', 'k-', 'k-', 'k-'],
];

const playerShip1 = new Ship({
    id: standardPlayerShipIds.get(0),
    position: new Position(),
    direction: Direction.Down,
    shipColor: ShipColor.Green,
});
const playerShip2 = new Ship({
    id: standardPlayerShipIds.get(0),
    position: new Position(),
    direction: Direction.Up,
    shipColor: ShipColor.Red,
});

const ships = {
    P: playerShip1,
    A: playerShip2,
};

export const empty77World: World = convertReadableMapToWorld(map, ships);
