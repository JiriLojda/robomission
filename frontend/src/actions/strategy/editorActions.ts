import {AnyAction} from "redux";
import {
    BATTLE_RESULT_CHANGED, CODE_ERROR_CLEARED,
    CODE_ERROR_RAISED, EDITOR_INITIALIZED, EDITOR_RESETED,
    HELP_SHOW_TOGGLED,
    MAP_SHOW_TOGGLED,
    ROBOAST_CHANGED,
    SYNTAX_ERROR_RAISED, WORLD_CHANGED
} from "../../action-types";
import {InvalidProgramReason} from "../../core/strategyCore/enums/invalidProgramReason";
import {IRoboAst} from "../../core/strategyCore/models/programTypes";
import {World} from "../../core/strategyCore/models/world";
import {BattleResult} from "../../core/strategyCore/battleRunner/BattleResult";
import {IGameLevel} from "../../core/strategyCore/battleRunner/IGameLevel";

export const mapShowToggled = (): AnyAction => ({
    type: MAP_SHOW_TOGGLED,
});

export const helpShowToggled = (): AnyAction => ({
    type: HELP_SHOW_TOGGLED,
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

export const battleResultChanged = (battleResult: BattleResult): AnyAction => ({
    type: BATTLE_RESULT_CHANGED,
    payload: {
        battleResult,
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
