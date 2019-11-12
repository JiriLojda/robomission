import {InvalidProgramReason} from "../../../core/strategyCore/enums/invalidProgramReason";
import {AnyAction} from "redux";
import {EDITOR_INITIALIZED, EDITOR_RESETED, SYNTAX_ERROR_RAISED} from "../../../action-types";

const defaultState = InvalidProgramReason.None;

export const validationResult = (state: InvalidProgramReason = defaultState, action: AnyAction): InvalidProgramReason => {
    switch (action.type) {
        case SYNTAX_ERROR_RAISED:
            return action.payload.error;
        case EDITOR_RESETED:
        case EDITOR_INITIALIZED:
            return defaultState;
        default:
            return state;
    }
};
