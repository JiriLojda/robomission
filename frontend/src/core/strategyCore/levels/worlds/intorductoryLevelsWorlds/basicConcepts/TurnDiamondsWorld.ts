import {convertReadableMapToWorld} from "../../../utils/convertReadableMapToWorld";
import {World} from "../../../../models/world";
import {Ship, ShipColor} from "../../../../models/ship";
import {Direction} from "../../../../enums/direction";
import {Position} from "../../../../models/position";


const map = [
    ['k-', 'k-', 'k-', 'kDA', 'k-'],
    ['k-', 'k-', 'k-', 'k-', 'k-'],
    ['k-', 'k-', 'kA', 'k-', 'k-'],
    ['k-', 'kA', 'kA', 'kA', 'k-'],
    ['kD', 'kA', 'k-P', 'kA', 'kD'],
];

const playerShip = new Ship({id: 'playerShip', position: new Position(), direction: Direction.Up, shipColor: ShipColor.Red});
const aiShip = new Ship({id: 'aiShip', position: new Position(), direction: Direction.Down, shipColor: ShipColor.Blue});

const ships = {
    P: playerShip,
    A: aiShip,
};

export const turnDiamondsWorld: World = convertReadableMapToWorld(map, ships);