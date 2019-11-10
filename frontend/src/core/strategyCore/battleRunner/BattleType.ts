import {translate} from "../../../localization";
import {invalidProgramError} from "../utils/invalidProgramError";

export enum BattleType {
    KillAll = 'killAll',
    CollectOrKill = 'collectOrKill',
    GetThereFirst = 'getThereFirst',
    JustCollect = 'justCollect',
    GetThereFirstOrKill = 'getThereFirstOrKill'
}

export const getBattleTypeDisplayName = (type: BattleType): string => {
    switch (type) {
        case BattleType.CollectOrKill:
        case BattleType.JustCollect:
            return translate('battleType.collect');
        case BattleType.KillAll:
            return translate('battleType.shoot');
        case BattleType.GetThereFirst:
        case BattleType.GetThereFirstOrKill:
            return translate('battleType.race');
        default:
            throw invalidProgramError(`Unknown battle type ${type}`);
    }
};
