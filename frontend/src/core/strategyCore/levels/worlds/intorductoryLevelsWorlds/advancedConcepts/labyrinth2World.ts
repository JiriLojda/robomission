import {Ship, ShipColor} from "../../../../models/ship";
import {Position} from "../../../../models/position";
import {Direction} from "../../../../enums/direction";
import {World} from "../../../../models/world";
import {convertReadableMapToWorld} from "../../../utils/convertReadableMapToWorld";
import {standardAiShipIds, standardPlayerShipIds} from "../../../constants/standardShipIds";

const map = [
    ['k-P', 'kA', 'k-', 'k-', 'k-', 'kA', 'k-', 'k-', 'k-', 'kA', 'g-'],
    ['k-', 'kA', 'k-', 'kA', 'k-', 'kA', 'k-', 'kA', 'k-', 'kA', 'k-'],
    ['k-', 'kA', 'k-', 'kA', 'k-', 'kA', 'k-', 'kA', 'k-', 'kA', 'k-'],
    ['k-', 'kA', 'k-', 'kA', 'k-', 'kA', 'k-', 'kA', 'k-', 'kA', 'k-'],
    ['k-', 'kA', 'k-', 'kA', 'k-', 'kA', 'k-', 'kA', 'k-', 'kA', 'k-'],
    ['k-', 'kA', 'k-', 'kA', 'k-', 'kA', 'k-', 'kA', 'k-', 'kA', 'k-'],
    ['k-', 'kA', 'k-', 'kA', 'k-', 'kA', 'k-', 'kA', 'k-', 'kA', 'k-'],
    ['k-', 'kA', 'k-', 'kA', 'k-', 'kA', 'k-', 'kA', 'k-', 'kA', 'k-'],
    ['k-', 'k-', 'k-', 'kA', 'k-', 'k-', 'k-', 'kA', 'k-', 'k-', 'k-'],
];

const playerShip = new Ship({
    id: standardPlayerShipIds.get(0),
    position: new Position(),
    direction: Direction.Down,
    shipColor: ShipColor.Green,
});
// const aiShip1 = new Ship({
//     id: standardAiShipIds.get(0),
//     position: new Position(),
//     direction: Direction.Left,
//     shipColor: ShipColor.Blue,
// });
//
// const aiShip2 = new Ship({
//     id: standardAiShipIds.get(1),
//     position: new Position(),
//     direction: Direction.Left,
//     shipColor: ShipColor.Blue,
// });

const ships = {
    P: playerShip,
    // A: aiShip1,
    // B: aiShip2,
};

export const labyrinth2World: World = convertReadableMapToWorld(map, ships);

