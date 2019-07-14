import {BattleResult, BattleResultType} from "./BattleResult";
import {World} from "../models/world";
import {IRuntimeContext} from "../models/programTypes";
import {BattleType} from "./BattleType";
import {hasBattleEnded, IBattleEndParams} from "./hasBattleEnded";
import {invalidProgramError} from "../utils/invalidProgramError";
import {arePositionsEqual} from "../models/position";
import {List} from "immutable";

export interface IGetBattleResultParams {
    world: World,
    contexts: ReadonlyArray<IRuntimeContext>,
    battleType: BattleType,
    battleEndParams: IBattleEndParams;
    history: List<World>;
}

export const getBattleResult = (params: IGetBattleResultParams): BattleResult => {
    if (!hasBattleEnded(params.world, params.battleType, params.battleEndParams))
        throw invalidProgramError('Cannot get battle result when the battle has not ended yet.');

    switch (params.battleType) {
        case BattleType.KillAll:
            return getKillAllResult(params);
        case BattleType.CollectOrKill:
            return getCollectOrKillResult(params);
        case BattleType.GetThereFirst:
            return getGeThereFirst(params);
        default:
            throw invalidProgramError(`Unknown battle type ${params.battleType}`);
    }
};

type BattleResultGetter = (params: IGetBattleResultParams) => BattleResult;

const getKillAllResult: BattleResultGetter = params => {
    if (params.world.ships.count(s => !s.isDestroyed) === 1)
        return addHistory(
            {type: BattleResultType.Decisive, winner: params.world.ships.find(s => !s.isDestroyed)!.id},
            params,
            );
    return addHistory({type: BattleResultType.Draw}, params);
};

//TODO: implement correctly later
const getCollectOrKillResult: BattleResultGetter = getKillAllResult;

const getGeThereFirst: BattleResultGetter = params => {
    const presentShips = params.world.ships
        .filter(s => arePositionsEqual(s.position, params.battleEndParams.finishPosition!));

    if (presentShips.size > 1)
        throw invalidProgramError('There cannot be more than one ship in the final position.');

    if (presentShips.size === 1)
        return addHistory({type: BattleResultType.Decisive, winner: presentShips.get(0)!.id}, params);

    return addHistory({type: BattleResultType.Draw}, params);
};

const addHistory = <T>(input: T, params: IGetBattleResultParams): T & {history: List<World>} =>
    ({...input, history: params.history});
