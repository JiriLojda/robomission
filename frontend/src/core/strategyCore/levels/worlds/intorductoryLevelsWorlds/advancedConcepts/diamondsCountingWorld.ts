import {translate} from "../../../../../../localization";
import {Ship, ShipColor} from "../../../../models/ship";
import {Position} from "../../../../models/position";
import {Direction} from "../../../../enums/direction";
import {World} from "../../../../models/world";
import {convertReadableMapToWorld} from "../../../utils/convertReadableMapToWorld";

const map = [
    ['k-', 'k-', 'k-', 'k-', 'k-', 'k-', 'k-', 'k-', 'k-', 'k-', 'k-', 'k-'],
    ['k-', 'k-', 'k-', 'k-', 'k-', 'k-', 'k-', 'k-', 'k-', 'k-', 'k-', 'g-P'],
    ['k-', 'k-', 'k-', 'k-', 'k-', 'k-', 'k-', 'k-', 'k-', 'k-', 'k-', 'r-A'],
    ['k-', 'k-', 'k-', 'k-', 'k-', 'k-', 'k-', 'k-', 'k-', 'k-', 'k-', 'k-'],
];

export const diamondsCountingWorldShipIds = [
    translate('shipIds.playerShip1'),
    translate('shipIds.aiShip1'),
];

const playerShip = new Ship({
    id: diamondsCountingWorldShipIds[0],
    position: new Position(),
    direction: Direction.Left,
    shipColor: ShipColor.Green,
});
const aiShip = new Ship({
    id: diamondsCountingWorldShipIds[1],
    position: new Position(),
    direction: Direction.Left,
    shipColor: ShipColor.Red,
});

const ships = {
    P: playerShip,
    A: aiShip,
};

export const diamondsCountingWorld: World = convertReadableMapToWorld(map, ships);

