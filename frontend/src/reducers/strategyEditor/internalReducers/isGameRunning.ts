import {AnyAction} from "redux";
import {
    EDITOR_INITIALIZED, EDITOR_RESETED,
    STRATEGY_EDITOR_GAME_RUN_FINISHED,
    STRATEGY_EDITOR_GAME_RUN_STARTED
} from "../../../action-types";

const defaultState = false;

export const isGameRunning = (state: boolean = defaultState, action: AnyAction): boolean => {
    switch (action.type) {
        case STRATEGY_EDITOR_GAME_RUN_STARTED:
            return true;
        case STRATEGY_EDITOR_GAME_RUN_FINISHED:
            return false;
        case EDITOR_INITIALIZED:
        case EDITOR_RESETED:
            return false;
        default:
            return state;
    }
};
