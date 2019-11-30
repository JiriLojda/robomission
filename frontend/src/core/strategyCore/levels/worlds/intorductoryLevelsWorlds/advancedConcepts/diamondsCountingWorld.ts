import {Ship, ShipColor} from "../../../../models/ship";
import {Position} from "../../../../models/position";
import {Direction} from "../../../../enums/direction";
import {World} from "../../../../models/world";
import {convertReadableMapToWorld} from "../../../utils/convertReadableMapToWorld";
import {standardAiShipIds, standardPlayerShipIds} from "../../../constants/standardShipIds";

const map = [
    ['k-', 'k-', 'k-', 'k-', 'k-', 'k-', 'k-', 'k-', 'k-', 'k-', 'k-', 'g-P'],
    ['k-', 'k-', 'k-', 'k-', 'k-', 'k-', 'k-', 'k-', 'k-', 'k-', 'k-', 'r-A'],
];

const playerShip = new Ship({
    id: standardPlayerShipIds.get(0),
    position: new Position(),
    direction: Direction.Left,
    shipColor: ShipColor.Green,
});
const aiShip = new Ship({
    id: standardAiShipIds.get(0),
    position: new Position(),
    direction: Direction.Left,
    shipColor: ShipColor.Red,
});

const ships = {
    P: playerShip,
    A: aiShip,
};

export const diamondsCountingWorld: World = convertReadableMapToWorld(map, ships);

