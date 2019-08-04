import {List} from "immutable";
import {IGameLevel} from "../core/strategyCore/battleRunner/IGameLevel";
import {AnyAction} from "redux";
import {STRATEGY_PART_ENTERED} from "../action-types";
import {allStrategyLevels} from "../core/strategyCore/levels/allStrategyLevels";

//                                      remove after action is really dispatched
const defaultState: List<IGameLevel> = allStrategyLevels;

export const strategyLevels = (state: List<IGameLevel> = defaultState, action: AnyAction) => {
    switch (action.type) {
        case STRATEGY_PART_ENTERED:
            return allStrategyLevels;
        default:
            return state;
    }
};
