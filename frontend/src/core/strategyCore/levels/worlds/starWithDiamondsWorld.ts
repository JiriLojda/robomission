import {Ship, ShipColor} from "../../models/ship";
import {Position} from "../../models/position";
import {Direction} from "../../enums/direction";
import {World} from "../../models/world";
import {convertReadableMapToWorld} from "../utils/convertReadableMapToWorld";
import {translate} from "../../../../localization";

const map = [
    ['kD', 'kA', 'kA', 'kA', 'kA', 'kA', 'kA', 'kD', 'kA', 'kA', 'kA', 'kA', 'kA', 'kA', 'kD'],
    ['kA', 'k-', 'k-', 'kA', 'kM', 'kM', 'kA', 'k-', 'kA', 'kM', 'kM', 'kA', 'k-', 'k-', 'kA'],
    ['kA', 'k-', 'k-', 'kA', 'kM', 'kA', 'kA', 'k-', 'kA', 'kA', 'kM', 'kA', 'k-', 'k-', 'kA'],
    ['kA', 'kA', 'k-', 'k-', 'kA', 'kM', 'kA', 'k-', 'kA', 'kM', 'kA', 'k-', 'k-', 'kA', 'kA'],
    ['kM', 'kA', 'k-', 'k-', 'k-', 'kA', 'k-', 'k-', 'k-', 'kA', 'k-', 'k-', 'k-', 'kA', 'kM'],
    ['kM', 'kM', 'kA', 'k-', 'k-', 'k-', 'k-', 'k-', 'k-', 'k-', 'k-', 'k-', 'kA', 'kM', 'kM'],
    ['kA', 'kA', 'kA', 'kA', 'k-', 'k-', 'k-', 'k-A', 'k-', 'k-', 'k-', 'kA', 'kA', 'kA', 'kA'],
    ['kD', 'k-', 'k-', 'k-', 'k-', 'k-', 'k-', 'kD', 'k-', 'k-', 'k-', 'k-', 'k-', 'k-', 'kD'],
    ['kA', 'kA', 'kA', 'kA', 'k-', 'k-', 'k-', 'k-P', 'k-', 'k-', 'k-', 'kA', 'kA', 'kA', 'kA'],
    ['kA', 'kM', 'kA', 'k-', 'k-', 'k-', 'k-', 'k-', 'k-', 'k-', 'k-', 'k-', 'kA', 'kM', 'kA'],
    ['kM', 'kA', 'k-', 'k-', 'k-', 'kA', 'k-', 'k-', 'k-', 'kA', 'k-', 'k-', 'k-', 'kA', 'kM'],
    ['kA', 'kA', 'k-', 'k-', 'kA', 'kA', 'kA', 'k-', 'kA', 'kA', 'kA', 'k-', 'k-', 'kA', 'kA'],
    ['kA', 'k-', 'k-', 'kA', 'kM', 'kA', 'kA', 'k-', 'kA', 'kA', 'kM', 'kA', 'k-', 'k-', 'kA'],
    ['kA', 'k-', 'k-', 'kA', 'kM', 'kM', 'kA', 'k-', 'kA', 'kM', 'kM', 'kA', 'k-', 'k-', 'kA'],
    ['kD', 'kA', 'kA', 'kA', 'kA', 'kM', 'kA', 'kD', 'kA', 'kM', 'kA', 'kA', 'kA', 'kA', 'kD'],
];

export const starWithDiamondsWorldShipIds = [
    translate('shipIds.playerShip1'),
    translate('shipIds.aiShip1'),
];

const playerShip = new Ship({
    id: starWithDiamondsWorldShipIds[0],
    position: new Position(),
    direction: Direction.Down,
    shipColor: ShipColor.Green,
});
const aiShip = new Ship({
    id: starWithDiamondsWorldShipIds[1],
    position: new Position(),
    direction: Direction.Up,
    shipColor: ShipColor.Red,
});

const ships = {
    P: playerShip,
    A: aiShip,
};

export const starWithDiamondsWorld: World = convertReadableMapToWorld(map, ships);
