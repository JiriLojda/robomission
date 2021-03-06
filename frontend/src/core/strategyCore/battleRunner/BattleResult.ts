import {getUserProgramErrorDisplayName, UserProgramError} from "../enums/userProgramError";
import {IRuntimeContext} from "../models/programTypes";
import {List, Set} from "immutable";
import {World} from "../models/world";
import {ShipId} from "../models/ship";
import {invalidProgramError} from "../utils/invalidProgramError";
import {ResultMessageType} from "../../../components/uiComponents/ResultMessage";
import {translate} from "../../../localization";

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

type IsDecisiveWinCallback = (winner: string) => boolean;
//TODO: just temporary (hardcoded id...)
const isSuccess = (result: BattleResult | undefined, isDecisiveWin: IsDecisiveWinCallback): boolean =>
    !!result && result.type === BattleResultType.Decisive && isDecisiveWin(result.winner);

export const getBattleResultMessage = (result: BattleResult | undefined, isDecisiveWin: IsDecisiveWinCallback): string | undefined => {
    if (!result)
        return undefined;
    if (isSuccess(result, isDecisiveWin))
        return translate('BattleResult.Win');
    if (result.type === BattleResultType.Draw)
        return `${translate('BattleResult.Draw')} ${result.between.join(', ')}.`;
    if (result.type === BattleResultType.ProgramError)
        return `${result.blame} ${translate('BattleResult.UserProgramError')} ${getUserProgramErrorDisplayName(result.error)}`;
    if (result.type === BattleResultType.Decisive)
        return translate('BattleResult.Loose');
    throw invalidProgramError(`This should not happen. type: ${result.type}.`, 'getBattleResultMessage');
};

export const getMessageTypeForResult = (result: BattleResult | undefined, isDecisiveWin: IsDecisiveWinCallback): ResultMessageType => {
    if (!result)
        return ResultMessageType.Success;
    if (isSuccess(result, isDecisiveWin))
        return ResultMessageType.Success;

    switch (result.type) {
        case BattleResultType.Decisive:
        case BattleResultType.ProgramError:
            return ResultMessageType.Bad;
        case BattleResultType.Draw:
            return ResultMessageType.Draw;
        default:
            throw invalidProgramError('This should not happen.');
    }
};
