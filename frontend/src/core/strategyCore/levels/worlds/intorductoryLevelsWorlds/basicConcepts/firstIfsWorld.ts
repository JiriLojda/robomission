import {convertReadableMapToWorld} from "../../../utils/convertReadableMapToWorld";
import {World} from "../../../../models/world";
import {Ship, ShipColor} from "../../../../models/ship";
import {Direction} from "../../../../enums/direction";
import {Position} from "../../../../models/position";
import {List} from "immutable";
import {range} from "../../../../../../utils/arrays";
import {WorldObjectType} from "../../../../enums/worldObjectType";
import {translate} from "../../../../../../localization";


const map = [
    ['kD', 'k-', 'k-', 'k-', 'k-A'],
    ['k-', 'kD', 'kA', 'kM', 'k-'],
    ['kA', 'kM', 'kD', 'kA', 'k-'],
    ['k-', 'kM', 'k-', 'kD', 'kM'],
    ['k-', 'k-', 'kD', 'k-', 'k-'],
    ['k-', 'k-', 'kA', 'kD', 'k-'],
    ['kM', 'kA', 'k-P', 'k-', 'k-'],
];

export const firstIfsWorldShipIds = [
    translate('shipIds.playerShip1'),
    translate('shipIds.aiShip1'),
];

const playerShip = new Ship({
    id: firstIfsWorldShipIds[0],
    position: new Position(),
    direction: Direction.Up,
    shipColor: ShipColor.Red
});
const aiShip = new Ship({
    id: firstIfsWorldShipIds[1],
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
