import {Ship, ShipColor} from "../../models/ship";
import {Position} from "../../models/position";
import {Direction} from "../../enums/direction";
import {World} from "../../models/world";
import {convertReadableMapToWorld} from "../utils/convertReadableMapToWorld";
import {translate} from "../../../../localization";

const map = [
    ['k-', 'k-', 'k-', 'k-', 'k-', 'k-', 'k-P'],
    ['k-', 'k-', 'k-', 'k-', 'k-', 'k-', 'k-'],
    ['k-', 'k-', 'k-', 'k-', 'k-', 'k-', 'k-'],
    ['k-', 'k-', 'k-', 'k-', 'k-', 'k-', 'k-'],
    ['k-', 'k-', 'k-', 'k-', 'k-', 'k-', 'k-'],
    ['k-', 'k-', 'k-', 'k-', 'k-', 'k-', 'k-'],
    ['k-A', 'k-', 'k-', 'k-', 'k-', 'k-', 'k-'],
];

export const empty77WorldShipIds = [
    translate('shipIds.playerShip1'),
    translate('shipIds.aiShip1'),
];

const playerShip = new Ship({
    id: empty77WorldShipIds[0],
    position: new Position(),
    direction: Direction.Down,
    shipColor: ShipColor.Green,
});
const aiShip = new Ship({
    id: empty77WorldShipIds[1],
    position: new Position(),
    direction: Direction.Up,
    shipColor: ShipColor.Red,
});

const ships = {
    P: playerShip,
    A: aiShip,
};

export const empty77World: World = convertReadableMapToWorld(map, ships);
