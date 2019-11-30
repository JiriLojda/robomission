import {BattleResult} from "../../../core/strategyCore/battleRunner/BattleResult";
import {AnyAction} from "redux";
import {
    EDITOR_INITIALIZED,
    EDITOR_RESETED,
    STRATEGY_EDITOR_GAME_RUN_FINISHED,
    STRATEGY_EDITOR_GAME_RUN_PARTIAL_RESULT, STRATEGY_EDITOR_GAME_SERIES_FINISHED
} from "../../../action-types";

const defaultState = null;

export const battleResult = (state: BattleResult | null = defaultState, action: AnyAction): BattleResult | null => {
    switch (action.type) {
        case STRATEGY_EDITOR_GAME_RUN_FINISHED:
        case STRATEGY_EDITOR_GAME_RUN_PARTIAL_RESULT:
            return action.payload.battleResult;
        case EDITOR_RESETED:
        case EDITOR_INITIALIZED:
        case STRATEGY_EDITOR_GAME_SERIES_FINISHED:
            return defaultState;
        default:
            return state;
    }
};
