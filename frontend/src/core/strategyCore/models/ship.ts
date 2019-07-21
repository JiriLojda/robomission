import {Position} from "./position";
import {List, Record} from "immutable";
import {Direction} from "../enums/direction";
import {WorldObject} from "../enums/worldObject";

export type ShipId = string;

interface IShipParameters {
    id: ShipId;
    position: Position;
    direction: Direction;
    isDestroyed: boolean;
    carriedObjects: List<WorldObject>;
}

const defaultParameters: IShipParameters = {
    id: 'S',
    position: new Position(),
    direction: Direction.Up,
    isDestroyed: false,
    carriedObjects: List(),
};

export class Ship extends Record<IShipParameters>(defaultParameters) {
}
