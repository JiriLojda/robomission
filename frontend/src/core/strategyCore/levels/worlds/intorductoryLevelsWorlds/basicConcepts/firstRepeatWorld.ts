import {convertReadableMapToWorld} from "../../../utils/convertReadableMapToWorld";
import {World} from "../../../../models/world";
import {Ship, ShipColor} from "../../../../models/ship";
import {Direction} from "../../../../enums/direction";
import {Position} from "../../../../models/position";
import {List} from "immutable";
import {range} from "../../../../../../utils/arrays";
import {WorldObjectType} from "../../../../enums/worldObjectType";


const map = [
    ['k-A', 'k-', 'kA', 'kA', 'k-'],
    ['k-', 'kA', 'kD', 'kA', 'k-'],
    ['k-', 'kA', 'kD', 'kA', 'k-'],
    ['k-', 'kA', 'kD', 'kA', 'k-'],
    ['k-', 'kA', 'kD', 'kA', 'k-'],
    ['k-', 'kA', 'kD', 'kA', 'k-'],
    ['k-', 'kA', 'k-P', 'kA', 'k-'],
];

const playerShip = new Ship({id: 'playerShip', position: new Position(), direction: Direction.Up, shipColor: ShipColor.Red});
const aiShip = new Ship({
    id: 'aiShip',
    position: new Position(),
    direction: Direction.Down,
    shipColor: ShipColor.Blue,
    carriedObjects: List(range(4).map(_ => WorldObjectType.Diamond)),
});

const ships = {
    P: playerShip,
    A: aiShip,
};

export const firstRepeatWorld: World = convertReadableMapToWorld(map, ships);
