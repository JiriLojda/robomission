import {convertReadableMapToWorld} from "../../../utils/convertReadableMapToWorld";
import {World} from "../../../../models/world";
import {Ship, ShipColor} from "../../../../models/ship";
import {Direction} from "../../../../enums/direction";
import {Position} from "../../../../models/position";
import {translate} from "../../../../../../localization";


const map = [
    ['k-', 'k-', 'k-', 'kDA', 'k-'],
    ['k-', 'k-', 'k-', 'k-', 'k-'],
    ['k-', 'k-', 'kM', 'k-', 'k-'],
    ['k-', 'kA', 'kM', 'kA', 'k-'],
    ['kD', 'kM', 'k-P', 'kM', 'kD'],
];

export const turnDiamondsWorldShipIds = [
    translate('shipIds.playerShip1'),
    translate('shipIds.aiShip1'),
];

const playerShip = new Ship({
    id: turnDiamondsWorldShipIds[0],
    position: new Position(),
    direction: Direction.Up,
    shipColor: ShipColor.Red,
});
const aiShip = new Ship({
    id: turnDiamondsWorldShipIds[1],
    position: new Position(),
    direction: Direction.Down,
    shipColor: ShipColor.Blue,
});

const ships = {
    P: playerShip,
    A: aiShip,
};

export const turnDiamondsWorld: World = convertReadableMapToWorld(map, ships);
