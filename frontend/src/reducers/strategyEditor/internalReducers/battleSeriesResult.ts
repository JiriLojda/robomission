import {AnyAction} from "redux";
import {
    EDITOR_RESETED,
    STRATEGY_EDITOR_GAME_RUN_STARTED,
    STRATEGY_EDITOR_GAME_SERIES_FINISHED
} from "../../../action-types";

export type BattleSeriesResult = {
    readonly wonRuns: number;
    readonly lostRuns: number;
    readonly drawRuns: number;
    readonly requiredWins: number;
}

const emptyState: BattleSeriesResult = {
    wonRuns: 0,
    lostRuns: 0,
    drawRuns: 0,
    requiredWins: 0,
};

export const battleSeriesResult = (state: BattleSeriesResult = emptyState, action: AnyAction): BattleSeriesResult => {
    switch (action.type) {
        case STRATEGY_EDITOR_GAME_SERIES_FINISHED:
            return action.payload;
        case EDITOR_RESETED:
        case STRATEGY_EDITOR_GAME_RUN_STARTED:
            return emptyState;
        default:
            return state;
    }
};
