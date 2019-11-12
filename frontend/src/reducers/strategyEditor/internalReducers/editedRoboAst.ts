import {IRoboAst} from "../../../core/strategyCore/models/programTypes";
import {createEmptyAst} from "../../../utils/createEmptyAst";
import {AnyAction} from "redux";
import {EDITOR_INITIALIZED, ROBOAST_CHANGED} from "../../../action-types";

const defaultState = createEmptyAst();

export const editedRoboAst = (state: IRoboAst = defaultState, action: AnyAction): IRoboAst => {
    switch (action.type) {
        case ROBOAST_CHANGED:
            return action.payload.roboAst;
        case EDITOR_INITIALIZED:
            return defaultState;
        default:
            return state;
    }
};
