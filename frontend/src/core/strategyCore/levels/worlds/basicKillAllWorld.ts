import {Ship, ShipColor} from "../../models/ship";
import {Position} from "../../models/position";
import {Direction} from "../../enums/direction";
import {World} from "../../models/world";
import {convertReadableMapToWorld} from "../utils/convertReadableMapToWorld";
import {standardAiShipIds, standardPlayerShipIds} from "../constants/standardShipIds";

const map = [
    ['k-', 'k-', 'k-', 'k-', 'k-P'],
    ['kF', 'kF', 'kF', 'kF', 'kF'],
    ['k-', 'k-', 'k-', 'k-', 'k-'],
    ['k-', 'k-', 'k-', 'k-', 'k-'],
    ['k-A', 'k-', 'k-', 'k-', 'k-'],
];

const playerShip = new Ship({
    id: standardPlayerShipIds.get(0),
    position: new Position(),
    direction: Direction.Down,
    shipColor: ShipColor.Green,
});
const aiShip = new Ship({
    id: standardAiShipIds.get(0),
    position: new Position(),
    direction: Direction.Up,
    shipColor: ShipColor.Red,
});

const ships = {
    P: playerShip,
    A: aiShip,
};

export const basicKillAllWorld: World = convertReadableMapToWorld(map, ships);
