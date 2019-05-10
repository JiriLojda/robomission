import {Position} from "./position";
import {Record} from "immutable";
import {Direction} from "../enums/direction";

interface IShipParameters {
    id: string;
    position: Position;
    direction: Direction;
}

const defaultParameters: IShipParameters = {
    id: 'S',
    position: new Position(),
    direction: Direction.Up,
};

export class Ship extends Record<IShipParameters>(defaultParameters) {
}
