import {UserProgramError} from "../../../core/strategyCore/enums/userProgramError";
import {AnyAction} from "redux";
import {EDITOR_INITIALIZED, EDITOR_RESETED} from "../../../action-types";

const defaultState = UserProgramError.None;

export const runtimeError = (state: UserProgramError = defaultState, action: AnyAction): UserProgramError => {
    switch (action.type) {
        case EDITOR_RESETED:
        case EDITOR_INITIALIZED:
            return defaultState;
        default:
            return state;
    }
};
