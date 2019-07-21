import {UserProgramError} from "../enums/userProgramError";
import {IRuntimeContext} from "../models/programTypes";
import {List, Set} from "immutable";
import {World} from "../models/world";
import {ShipId} from "../models/ship";

type BattleResultInfo = {
    type: BattleResultType.Draw,
    between: Set<ShipId>
} | {
    type: BattleResultType.Decisive,
    winner: ShipId,
} | {
    type: BattleResultType.ProgramError,
    error: UserProgramError,
    blame: ShipId,
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
