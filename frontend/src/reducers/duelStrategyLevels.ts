import {List} from "immutable";
import {IGameLevel} from "../core/strategyCore/battleRunner/IGameLevel";
import {AnyAction} from "redux";
import {STRATEGY_PART_ENTERED} from "../action-types";
import {allDuelLevels} from "../core/strategyCore/levels/worlds/allDuelLevels";

//                                      remove after action is really dispatched
const defaultState: List<IGameLevel> = allDuelLevels;

export const duelStrategyLevels = (state: List<IGameLevel> = defaultState, action: AnyAction) => {
    switch (action.type) {
        case STRATEGY_PART_ENTERED:
            return allDuelLevels;
        default:
            return state;
    }
};
