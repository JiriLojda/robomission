import {BattleResult} from "../../../core/strategyCore/battleRunner/BattleResult";
import {AnyAction} from "redux";
import {EDITOR_INITIALIZED, EDITOR_RESETED, STRATEGY_EDITOR_GAME_RUN_FINISHED} from "../../../action-types";

const defaultState = null;

export const battleResult = (state: BattleResult | null = defaultState, action: AnyAction): BattleResult | null => {
    switch (action.type) {
        case STRATEGY_EDITOR_GAME_RUN_FINISHED:
            return action.payload.battleResult;
        case EDITOR_RESETED:
        case EDITOR_INITIALIZED:
            return defaultState;
        default:
            return state;
    }
};
