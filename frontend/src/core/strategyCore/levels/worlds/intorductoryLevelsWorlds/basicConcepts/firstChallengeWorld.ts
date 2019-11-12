import {convertReadableMapToWorld} from "../../../utils/convertReadableMapToWorld";
import {World} from "../../../../models/world";
import {Ship, ShipColor} from "../../../../models/ship";
import {Direction} from "../../../../enums/direction";
import {Position} from "../../../../models/position";


const map = [
    ['k-', 'k-', 'k-A', 'kA', 'k-'],
    ['k-', 'kA', 'k-', 'kA', 'k-'],
    ['k-', 'kA', 'k-', 'kA', 'k-'],
    ['k-', 'kA', 'k-', 'kA', 'k-'],
    ['k-', 'kA', 'k-', 'kA', 'k-'],
    ['k-', 'kA', 'k-', 'k-', 'k-'],
    ['k-', 'kA', 'k-P', 'kA', 'k-'],
];

const playerShip = new Ship({id: 'playerShip', position: new Position(), direction: Direction.Up, shipColor: ShipColor.Red});
const aiShip = new Ship({id: 'aiShip', position: new Position(), direction: Direction.Down, shipColor: ShipColor.Blue});

const ships = {
    P: playerShip,
    A: aiShip,
};

export const firstChallengeWorld: World = convertReadableMapToWorld(map, ships);
