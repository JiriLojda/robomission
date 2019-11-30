import {Ship, ShipColor} from "../../../models/ship";
import {Position} from "../../../models/position";
import {Direction} from "../../../enums/direction";
import {World} from "../../../models/world";
import {convertReadableMapToWorld} from "../../utils/convertReadableMapToWorld";
import {standardPlayerShipIds} from "../../constants/standardShipIds";


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

const playerShip1 = new Ship({
    id: standardPlayerShipIds.get(0),
    position: new Position(),
    direction: Direction.Up,
    shipColor: ShipColor.Green
});
const playerShip2 = new Ship({
    id: standardPlayerShipIds.get(1),
    position: new Position(),
    direction: Direction.Up,
    shipColor: ShipColor.Red
});

const ships = {
    P: playerShip1,
    A: playerShip2,
};

export const distributedIntroLevel2World: World = convertReadableMapToWorld(map, ships);
