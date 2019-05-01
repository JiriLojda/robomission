import {Record} from "immutable";

interface IPositionParameters {
    x: number;
    y: number;
}

const defaultParameters: IPositionParameters = {
    x: 0,
    y: 0,
};

export class Position extends Record<IPositionParameters>(defaultParameters){
}
