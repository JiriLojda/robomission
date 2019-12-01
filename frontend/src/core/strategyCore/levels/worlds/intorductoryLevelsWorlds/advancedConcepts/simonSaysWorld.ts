import {Ship, ShipColor} from "../../../../models/ship";
import {Position} from "../../../../models/position";
import {Direction} from "../../../../enums/direction";
import {World} from "../../../../models/world";
import {convertReadableMapToWorld} from "../../../utils/convertReadableMapToWorld";
import {standardAiShipIds, standardPlayerShipIds} from "../../../constants/standardShipIds";

const map = [
    ['k-P', 'k-', 'k-', 'k-', 'k-', 'k-', 'k-', 'k-', 'k-', 'k-', 'g-', 'k-A'],
];

const playerShip = new Ship({
    id: standardPlayerShipIds.get(0),
    position: new Position(),
    direction: Direction.Right,
    shipColor: ShipColor.Green,
});
const aiShip1 = new Ship({
    id: standardAiShipIds.get(0),
    position: new Position(),
    direction: Direction.Left,
    shipColor: ShipColor.Red,
});

const ships = {
    P: playerShip,
    A: aiShip1,
};

export const simonSaysWorld: World = convertReadableMapToWorld(map, ships);

