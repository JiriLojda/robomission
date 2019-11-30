import {Ship, ShipColor} from "../../../../models/ship";
import {Position} from "../../../../models/position";
import {Direction} from "../../../../enums/direction";
import {World} from "../../../../models/world";
import {convertReadableMapToWorld} from "../../../utils/convertReadableMapToWorld";
import {standardAiShipIds, standardPlayerShipIds} from "../../../constants/standardShipIds";

const map = [
    ['k-', 'k-', 'k-', 'k-', 'k-', 'k-', 'k-', 'k-', 'k-', 'k-B'],
    ['k-', 'k-', 'k-', 'k-', 'k-', 'k-', 'k-', 'k-', 'k-P', 'k-'],
    ['k-', 'k-', 'k-', 'k-', 'k-', 'k-', 'k-', 'k-', 'k-', 'k-A'],
    ['k-', 'k-', 'k-', 'k-', 'k-', 'k-', 'k-', 'k-', 'k-', 'k-'],
    ['k-', 'k-', 'k-', 'k-', 'k-', 'k-', 'k-', 'k-', 'k-', 'k-'],
    ['k-', 'k-', 'k-', 'k-', 'g-', 'k-', 'k-', 'k-', 'k-', 'k-'],
    ['k-', 'k-', 'k-', 'k-', 'k-', 'k-', 'k-', 'k-', 'k-', 'k-'],
    ['k-', 'k-', 'k-', 'k-', 'k-', 'k-', 'k-', 'k-', 'k-', 'k-'],
    ['k-', 'k-', 'k-', 'k-', 'k-', 'k-', 'k-', 'k-', 'k-', 'k-'],
];

const playerShip = new Ship({
    id: standardPlayerShipIds.get(0),
    position: new Position(),
    direction: Direction.Left,
    shipColor: ShipColor.Green,
});
const aiShip1 = new Ship({
    id: standardAiShipIds.get(0),
    position: new Position(),
    direction: Direction.Left,
    shipColor: ShipColor.Blue,
});

const aiShip2 = new Ship({
    id: standardAiShipIds.get(1),
    position: new Position(),
    direction: Direction.Left,
    shipColor: ShipColor.Blue,
});

const ships = {
    P: playerShip,
    A: aiShip1,
    B: aiShip2,
};

export const labyrinthWorld: World = convertReadableMapToWorld(map, ships);

