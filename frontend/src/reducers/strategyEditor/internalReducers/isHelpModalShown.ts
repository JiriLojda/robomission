import {AnyAction} from "redux";
import {EDITOR_INITIALIZED, HELP_HIDDEN, HELP_SHOWED} from "../../../action-types";

export const isHelpModalShown = (state: boolean = false, action: AnyAction): boolean => {
    switch (action.type) {
        case HELP_SHOWED:
            return true;
        case HELP_HIDDEN:
            return false;
        case EDITOR_INITIALIZED:
            return action.payload.showHelp;
        default:
            return state;
    }
};
