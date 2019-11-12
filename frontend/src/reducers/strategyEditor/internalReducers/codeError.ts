import {AnyAction} from "redux";
import {CODE_ERROR_CLEARED, CODE_ERROR_RAISED, EDITOR_INITIALIZED, EDITOR_RESETED} from "../../../action-types";

const defaultState = null;

export const codeError = (state: string | null = defaultState, action: AnyAction): string | null => {
    switch (action.type) {
        case CODE_ERROR_RAISED:
            return action.payload.error;
        case EDITOR_RESETED:
        case EDITOR_INITIALIZED:
        case CODE_ERROR_CLEARED:
            return defaultState;
        default:
            return state;
    }
};
