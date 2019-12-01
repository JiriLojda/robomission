import {Ship, ShipColor} from "../../../models/ship";
import {Position} from "../../../models/position";
import {Direction} from "../../../enums/direction";
import {World} from "../../../models/world";
import {convertReadableMapToWorld} from "../../utils/convertReadableMapToWorld";
import {standardAiShipIds, standardPlayerShipIds} from "../../constants/standardShipIds";


const map = [
    ['kM', 'kA', 'k-A', 'kA', 'kM'],
    ['kM', 'kA', 'k-', 'kA', 'kM'],
    ['kA', 'kF', 'k-', 'kF', 'kA'],
    ['k-', 'k-', 'kA', 'k-', 'k-'],
    ['k-', 'kA', 'kM', 'kA', 'k-'],
    ['kA', 'k-', 'kA', 'k-', 'kA'],
    ['k-', 'kA', 'kA', 'k-', 'kA'],
    ['k-', 'kA', 'kA', 'kA', 'k-'],
    ['kA', 'k-', 'kA', 'k-', 'kA'],
    ['k-', 'k-', 'kA', 'k-', 'k-'],
    ['k-', 'k-R', 'kA', 'k-', 'k-P'],
];

const playerShip1 = new Ship({
    id: standardPlayerShipIds.get(0),
    position: new Position(),
    direction: Direction.Up,
    shipColor: ShipColor.Green,
});
const playerShip2 = new Ship({
    id: standardPlayerShipIds.get(1),
    position: new Position(),
    direction: Direction.Up,
    shipColor: ShipColor.Red,
});
const aiShip1 = new Ship({
    id: standardAiShipIds.get(0),
    position: new Position(),
    direction: Direction.Down,
    shipColor: ShipColor.Blue,
});

const ships = {
    P: playerShip1,
    R: playerShip2,
    A: aiShip1,
};

export const teamShootingLevelWorld: World = convertReadableMapToWorld(map, ships);
