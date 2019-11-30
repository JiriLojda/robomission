import {translate} from "../../../localization";
import {invalidProgramError} from "../utils/invalidProgramError";

export enum BattleType {
    KillAll = 'killAll',
    CollectOrKill = 'collectOrKill',
    GetThereFirst = 'getThereFirst',
    JustCollect = 'justCollect',
    GetThereFirstOrKill = 'getThereFirstOrKill',

    // team types
    TeamGetThereFirst = 'teamGetThereFirst',
    TeamKillAll = 'teamKillAll',
    TeamJustCollect = 'teamJustCollect',

    TeamCollectAndGetThere = 'teamCollectAndGetThere',
}

export const getBattleTypeDisplayName = (type: BattleType): string => {
    switch (type) {
        case BattleType.CollectOrKill:
        case BattleType.JustCollect:
        case BattleType.TeamJustCollect:
            return translate('battleType.collect');
        case BattleType.KillAll:
        case BattleType.TeamKillAll:
            return translate('battleType.shoot');
        case BattleType.GetThereFirst:
        case BattleType.GetThereFirstOrKill:
        case BattleType.TeamGetThereFirst:
            return translate('battleType.race');
        case BattleType.TeamCollectAndGetThere:
            return translate('battleType.collectAndGetThere');
        default:
            throw invalidProgramError(`Unknown battle type ${type}`);
    }
};
