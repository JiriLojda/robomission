import {UserProgramError} from "../core/strategyCore/enums/userProgramError";
import {InvalidProgramReason} from "../core/strategyCore/enums/invalidProgramReason";
import {IRoboAst} from "../core/strategyCore/models/programTypes";
import {World} from "../core/strategyCore/models/world";
import {BattleResult} from "../core/strategyCore/battleRunner/BattleResult";
import {List} from "immutable";
import {IGameLevel} from "../core/strategyCore/battleRunner/IGameLevel";
import {BattleSeriesResult} from "./strategyEditor/internalReducers/battleSeriesResult";

export interface IStore {
    readonly strategyEditor: IStrategyEditor;
    readonly strategyLevels: List<IGameLevel>;
    readonly duelStrategyLevels: List<IGameLevel>;
}

export interface IStrategyEditor {
    readonly isMapOverlayShown: boolean;
    readonly isHelpModalShown: boolean;
    readonly runtimeError: UserProgramError;
    readonly validationResult: InvalidProgramReason;
    readonly editedRoboAst: IRoboAst;
    readonly currentWorld: World;
    readonly codeError: string | null;
    readonly battleResult: BattleResult | null;
    readonly drawingSpeed: number;
    readonly isGameRunning: boolean;
    readonly battleSeriesResult: BattleSeriesResult;
}
