import {UserProgramError} from "../enums/userProgramError";
import {IRuntimeContext} from "../models/programTypes";
import {List} from "immutable";
import {World} from "../models/world";

type BattleResultInfo = {
    type: BattleResultType.Draw,
} | {
    type: BattleResultType.Decisive,
    winner: string,
} | {
    type: BattleResultType.ProgramError,
    error: UserProgramError,
    blame: string,
} | {
    type: BattleResultType.InProgress,
    context: List<IRuntimeContext>,
};

type BattleResultHistory = {
    history: List<World>;
}

export type BattleResult = BattleResultInfo & BattleResultHistory;

export enum BattleResultType {
    Draw = 'draw',
    Decisive = 'decisive',
    ProgramError = 'programError',
    InProgress = 'inProgress',
}
