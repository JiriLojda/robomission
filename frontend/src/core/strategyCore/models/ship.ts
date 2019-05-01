import {Position} from "./position";
import {Record} from "immutable";

interface IShipParameters {
    id: string;
    position: Position;
}

const defaultParameters: IShipParameters = {
    id: 'S',
    position: new Position(),
};

export class Ship extends Record<IShipParameters>(defaultParameters) {
}
