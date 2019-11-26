import {Ship, ShipColor} from "../../../models/ship";
import {Position} from "../../../models/position";
import {Direction} from "../../../enums/direction";
import {World} from "../../../models/world";
import {convertReadableMapToWorld} from "../../utils/convertReadableMapToWorld";
import {translate} from "../../../../../localization";


const map = [
    ['k-', 'r-', 'kA', 'k-', 'g-'],
    ['k-', 'kA', 'kA', 'k-', 'kA'],
    ['k-', 'kA', 'kA', 'k-', 'kA'],
    ['k-', 'k-', 'kA', 'k-', 'k-'],
    ['k-', 'k-A', 'kA', 'k-', 'k-P'],
];

export const distributedIntroWorldShipIds = [
    translate('shipIds.playerShip1'),
    translate('shipIds.playerShip2'),
];

const playerShip1 = new Ship({
    id: distributedIntroWorldShipIds[0],
    position: new Position(),
    direction: Direction.Up,
    shipColor: ShipColor.Green
});
const playerShip2 = new Ship({
    id: distributedIntroWorldShipIds[1],
    position: new Position(),
    direction: Direction.Up,
    shipColor: ShipColor.Red
});

const ships = {
    P: playerShip1,
    A: playerShip2,
};

export const distributedIntroLevelWorld: World = convertReadableMapToWorld(map, ships);
