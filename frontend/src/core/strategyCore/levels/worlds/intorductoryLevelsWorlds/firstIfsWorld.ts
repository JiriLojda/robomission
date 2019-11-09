import {convertReadableMapToWorld} from "../../utils/convertReadableMapToWorld";
import {World} from "../../../models/world";
import {Ship, ShipColor} from "../../../models/ship";
import {Direction} from "../../../enums/direction";
import {Position} from "../../../models/position";
import {List} from "immutable";
import {range} from "../../../../../utils/arrays";
import {WorldObjectType} from "../../../enums/worldObjectType";


const map = [
    ['kD', 'k-', 'k-', 'k-', 'k-A'],
    ['k-', 'kD', 'kA', 'kM', 'k-'],
    ['kA', 'kM', 'kD', 'kA', 'k-'],
    ['k-', 'kM', 'k-', 'kD', 'kM'],
    ['k-', 'k-', 'kD', 'k-', 'k-'],
    ['k-', 'k-', 'kA', 'kD', 'k-'],
    ['kM', 'kA', 'k-P', 'k-', 'k-'],
];

const playerShip = new Ship({id: 'playerShip', position: new Position(), direction: Direction.Up, shipColor: ShipColor.Red});
const aiShip = new Ship({
    id: 'aiShip',
    position: new Position(),
    direction: Direction.Down,
    shipColor: ShipColor.Blue,
    carriedObjects: List(range(5).map(_ => WorldObjectType.Diamond)),
});

const ships = {
    P: playerShip,
    A: aiShip,
};

export const firstIfsWorld: World = convertReadableMapToWorld(map, ships);
