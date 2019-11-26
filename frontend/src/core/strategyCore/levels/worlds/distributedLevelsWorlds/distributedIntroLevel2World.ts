import {Ship, ShipColor} from "../../../models/ship";
import {Position} from "../../../models/position";
import {Direction} from "../../../enums/direction";
import {World} from "../../../models/world";
import {convertReadableMapToWorld} from "../../utils/convertReadableMapToWorld";
import {translate} from "../../../../../localization";


const map = [
    ['k-', 'r-', 'kA', 'k-', 'g-'],
    ['kA', 'k-', 'kA', 'k-', 'kA'],
    ['k-', 'kA', 'kA', 'kA', 'k-'],
    ['kA', 'k-', 'kA', 'k-', 'kA'],
    ['k-', 'kA', 'kA', 'k-', 'kA'],
    ['k-', 'kA', 'kA', 'kA', 'k-'],
    ['kA', 'k-', 'kA', 'k-', 'kA'],
    ['k-', 'k-', 'kA', 'k-', 'k-'],
    ['k-', 'k-A', 'kA', 'k-', 'k-P'],
];

export const distributedIntroLevel2WorldShipIds = [
    translate('shipIds.playerShip1'),
    translate('shipIds.playerShip2'),
];

const playerShip1 = new Ship({
    id: distributedIntroLevel2WorldShipIds[0],
    position: new Position(),
    direction: Direction.Up,
    shipColor: ShipColor.Green
});
const playerShip2 = new Ship({
    id: distributedIntroLevel2WorldShipIds[1],
    position: new Position(),
    direction: Direction.Up,
    shipColor: ShipColor.Red
});

const ships = {
    P: playerShip1,
    A: playerShip2,
};

export const distributedIntroLevel2World: World = convertReadableMapToWorld(map, ships);
