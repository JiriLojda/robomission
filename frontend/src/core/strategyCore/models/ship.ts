import {Position} from "./position";
import {Record} from "immutable";
import {Direction} from "../enums/direction";

export type ShipId = string;

interface IShipParameters {
    id: ShipId;
    position: Position;
    direction: Direction;
    isDestroyed: boolean;
}

const defaultParameters: IShipParameters = {
    id: 'S',
    position: new Position(),
    direction: Direction.Up,
    isDestroyed: false,
};

export class Ship extends Record<IShipParameters>(defaultParameters) {
}
