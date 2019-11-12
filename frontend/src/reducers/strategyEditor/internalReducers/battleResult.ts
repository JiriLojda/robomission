import {BattleResult} from "../../../core/strategyCore/battleRunner/BattleResult";
import {AnyAction} from "redux";
import {BATTLE_RESULT_CHANGED, EDITOR_INITIALIZED, EDITOR_RESETED} from "../../../action-types";

const defaultState = null;

export const battleResult = (state: BattleResult | null = defaultState, action: AnyAction): BattleResult | null => {
    switch (action.type) {
        case BATTLE_RESULT_CHANGED:
            return action.payload.battleResult;
        case EDITOR_RESETED:
        case EDITOR_INITIALIZED:
            return defaultState;
        default:
            return state;
    }
};
