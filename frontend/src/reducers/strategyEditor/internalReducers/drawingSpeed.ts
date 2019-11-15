import {AnyAction} from "redux";
import {STRATEGY_EDITOR_DRAWING_SPEED_CHANGED} from "../../../action-types";

const defaultState = 400;

export const drawingSpeed = (state: number = defaultState, action: AnyAction): number => {
    switch (action.type) {
        case STRATEGY_EDITOR_DRAWING_SPEED_CHANGED:
            return action.payload.speed;
        default:
            return state;
    }
};
