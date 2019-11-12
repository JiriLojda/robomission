import {AnyAction} from "redux";
import {EDITOR_INITIALIZED, HELP_SHOW_TOGGLED} from "../../../action-types";

export const isHelpModalShown = (state: boolean = false, action: AnyAction): boolean => {
    switch (action.type) {
        case HELP_SHOW_TOGGLED:
            return !state;
        case EDITOR_INITIALIZED:
            return action.payload.showHelp;
        default:
            return state;
    }
};
