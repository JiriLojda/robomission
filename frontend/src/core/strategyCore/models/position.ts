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

export const isOnPosition = (position: Position, x: number, y: number): boolean =>
    position.x === x && position.y === y;

export const arePositionsEqual = (position1: Position, position2: Position): boolean =>
    isOnPosition(position1, position2.x, position2.y);
