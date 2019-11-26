import {convertReadableMapToWorld} from "../../../utils/convertReadableMapToWorld";
import {World} from "../../../../models/world";
import {Ship, ShipColor} from "../../../../models/ship";
import {Direction} from "../../../../enums/direction";
import {Position} from "../../../../models/position";
import {translate} from "../../../../../../localization";


const map = [
    ['k-', 'k-', 'k-', 'k-A', 'k-'],
    ['k-', 'k-', 'k-', 'k-', 'k-'],
    ['k-', 'k-', 'kA', 'k-', 'k-'],
    ['k-', 'kA', 'kM', 'kM', 'k-'],
    ['k-', 'kA', 'k-P', 'kM', 'k-'],
];

export const flyLeftShootWorldShipIds = [
    translate('shipIds.playerShip1'),
    translate('shipIds.aiShip1'),
];

const playerShip = new Ship({
    id: flyLeftShootWorldShipIds[0],
    position: new Position(),
    direction: Direction.Up,
    shipColor: ShipColor.Red,
});
const aiShip = new Ship({
    id: flyLeftShootWorldShipIds[1],
    position: new Position(),
    direction: Direction.Down,
    shipColor: ShipColor.Blue,
});

const ships = {
    P: playerShip,
    A: aiShip,
};

export const flyLeftShootWorld: World = convertReadableMapToWorld(map, ships);
