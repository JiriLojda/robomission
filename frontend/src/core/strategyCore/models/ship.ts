import {Position} from "./position";
import {List, Record} from "immutable";
import {Direction} from "../enums/direction";
import {WorldObject} from "../enums/worldObject";

export type ShipId = string;

export enum ShipColor {
    Red = 'red',
    Green = 'green',
    Blue = 'blue',
    Yellow = 'yellow',
}

interface IShipParameters {
    id: ShipId;
    shipColor: ShipColor;
    position: Position;
    direction: Direction;
    isDestroyed: boolean;
    carriedObjects: List<WorldObject>;
}

const defaultParameters: IShipParameters = {
    id: 'S',
    shipColor: ShipColor.Red,
    position: new Position(),
    direction: Direction.Up,
    isDestroyed: false,
    carriedObjects: List(),
};

export class Ship extends Record<IShipParameters>(defaultParameters) {
}
