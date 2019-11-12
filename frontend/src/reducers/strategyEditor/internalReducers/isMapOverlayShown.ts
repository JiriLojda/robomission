import {AnyAction} from "redux";
import {EDITOR_INITIALIZED, MAP_SHOW_TOGGLED} from "../../../action-types";

export const isMapOverlayShown = (state: boolean = false, action: AnyAction): boolean => {
    switch (action.type) {
        case MAP_SHOW_TOGGLED:
            return !state;
        case EDITOR_INITIALIZED:
            return action.payload.showMap;
        default:
            return state;
    }
};
