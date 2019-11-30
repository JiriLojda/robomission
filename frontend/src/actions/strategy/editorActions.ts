import {AnyAction} from "redux";
import {
    CODE_ERROR_CLEARED,
    CODE_ERROR_RAISED,
    EDITOR_INITIALIZED,
    EDITOR_RESETED,
    HELP_HIDDEN,
    HELP_SHOWED,
    MAP_SHOW_TOGGLED,
    ROBOAST_CHANGED,
    STRATEGY_EDITOR_DRAWING_SPEED_CHANGED,
    STRATEGY_EDITOR_GAME_RUN_FINISHED, STRATEGY_EDITOR_GAME_RUN_PARTIAL_RESULT,
    STRATEGY_EDITOR_GAME_RUN_STARTED, STRATEGY_EDITOR_GAME_SERIES_FINISHED,
    SYNTAX_ERROR_RAISED,
    WORLD_CHANGED
} from "../../action-types";
import {InvalidProgramReason} from "../../core/strategyCore/enums/invalidProgramReason";
import {IRoboAst} from "../../core/strategyCore/models/programTypes";
import {World} from "../../core/strategyCore/models/world";
import {BattleResult} from "../../core/strategyCore/battleRunner/BattleResult";
import {IGameLevel} from "../../core/strategyCore/battleRunner/IGameLevel";
import {BattleSeriesResult} from "../../reducers/strategyEditor/internalReducers/battleSeriesResult";

export const mapShowToggled = (): AnyAction => ({
    type: MAP_SHOW_TOGGLED,
});

export const helpShowed = (): AnyAction => ({
    type: HELP_SHOWED,
});

export const helpHidden = ():AnyAction => ({
    type: HELP_HIDDEN,
});

export const codeErrorRaised = (error: string): AnyAction => ({
    type: CODE_ERROR_RAISED,
    payload: {
        error,
    }
});

export const codeErrorCleared = (): AnyAction => ({
    type: CODE_ERROR_CLEARED,
});

export const syntaxErrorRaised = (error: InvalidProgramReason): AnyAction => ({
    type: SYNTAX_ERROR_RAISED,
    payload: {
        error,
    }
});

export const roboAstChanged = (roboAst: IRoboAst): AnyAction => ({
    type: ROBOAST_CHANGED,
    payload: {
        roboAst,
    }
});

export const worldChanged = (world: World): AnyAction => ({
    type: WORLD_CHANGED,
    payload: {
        world,
    }
});

export const editorReseted = (originalWorld: World): AnyAction => ({
    type: EDITOR_RESETED,
    payload: {
        originalWorld,
    }
});

export const editorInitialized = (level: IGameLevel, showMap: boolean, showHelp: boolean): AnyAction => ({
    type: EDITOR_INITIALIZED,
    payload: {
        level,
        showMap,
        showHelp,
    }
});

export const drawingSpeedChanged = (speed: number): AnyAction => ({
    type: STRATEGY_EDITOR_DRAWING_SPEED_CHANGED,
    payload: {
        speed,
    }
});

export const gameRunStarted = (world: World): AnyAction => ({
    type: STRATEGY_EDITOR_GAME_RUN_STARTED,
    payload: {
        world,
    }
});

export const gameRunPartialResultGot = (battleResult: BattleResult): AnyAction => ({
    type: STRATEGY_EDITOR_GAME_RUN_PARTIAL_RESULT,
    payload: {
        battleResult,
    }
});

export const gameRunFinished = (battleResult: BattleResult): AnyAction => ({
    type: STRATEGY_EDITOR_GAME_RUN_FINISHED,
    payload: {
        battleResult,
    }
});

export const gameSeriesFinished = (payload: BattleSeriesResult): AnyAction => ({
    type: STRATEGY_EDITOR_GAME_SERIES_FINISHED,
    payload
});
