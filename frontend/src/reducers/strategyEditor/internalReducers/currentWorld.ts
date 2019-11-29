import {World} from "../../../core/strategyCore/models/world";
import {AnyAction} from "redux";
import {
    EDITOR_INITIALIZED,
    EDITOR_RESETED,
    STRATEGY_EDITOR_GAME_RUN_STARTED,
    WORLD_CHANGED
} from "../../../action-types";
import {IGameLevel} from "../../../core/strategyCore/battleRunner/IGameLevel";

const defaultState = new World();

export const currentWorld = (state: World = defaultState, action: AnyAction): World => {
    switch (action.type) {
        case WORLD_CHANGED:
        case STRATEGY_EDITOR_GAME_RUN_STARTED:
            return action.payload.world;
        case EDITOR_RESETED:
            return action.payload.originalWorld;
        case EDITOR_INITIALIZED: {
            const level = action.payload.level as IGameLevel;
            return level.world;
        }
        default:
            return state;
    }
};
