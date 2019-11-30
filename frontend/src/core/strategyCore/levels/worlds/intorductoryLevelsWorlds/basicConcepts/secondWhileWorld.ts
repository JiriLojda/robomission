import {convertReadableMapToWorld} from "../../../utils/convertReadableMapToWorld";
import {World} from "../../../../models/world";
import {Ship, ShipColor} from "../../../../models/ship";
import {Direction} from "../../../../enums/direction";
import {Position} from "../../../../models/position";
import {standardAiShipIds, standardPlayerShipIds} from "../../../constants/standardShipIds";


const map = [
    ['k-', 'k-A'],
    ['g-', 'k-'],
    ['k-', 'k-'],
    ['k-', 'k-'],
    ['k-', 'k-'],
    ['k-', 'k-'],
    ['k-', 'k-'],
    ['k-', 'k-'],
    ['k-', 'k-'],
    ['k-', 'k-'],
    ['k-', 'k-'],
    ['k-', 'k-'],
    ['k-P', 'k-'],
];

const playerShip = new Ship({
    id: standardPlayerShipIds.get(0),
    position: new Position(),
    direction: Direction.Up,
    shipColor: ShipColor.Red,
});
const aiShip = new Ship({
    id: standardAiShipIds.get(0),
    position: new Position(),
    direction: Direction.Down,
    shipColor: ShipColor.Blue,
});

const ships = {
    P: playerShip,
    A: aiShip,
};

export const secondWhileWorld: World = convertReadableMapToWorld(map, ships);
