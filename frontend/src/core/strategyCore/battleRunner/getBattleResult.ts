import {BattleResult, BattleResultType} from "./BattleResult";
import {World} from "../models/world";
import {IRuntimeContext} from "../models/programTypes";
import {BattleType} from "./BattleType";
import {IBattleEndParams} from "./hasBattleEnded";
import {invalidProgramError} from "../utils/invalidProgramError";
import {arePositionsEqual} from "../models/position";
import {List} from "immutable";
import {WorldObjectType} from "../enums/worldObjectType";

export interface IGetBattleResultParams {
    world: World,
    contexts: ReadonlyArray<IRuntimeContext>,
    battleType: BattleType,
    battleEndParams: IBattleEndParams;
    history: List<World>;
}

export const getBattleResult = (params: IGetBattleResultParams): BattleResult => {
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
    const between = params.world.ships
        .filter(s => !s.isDestroyed)
        .map(s => s.id)
        .toSet();
    return addHistory({type: BattleResultType.Draw, between }, params);
};

const getCollectOrKillResult: BattleResultGetter = params => {
    const killAllResult = getKillAllResult(params);
    if (killAllResult.type === BattleResultType.Decisive)
        return killAllResult;

    const diamondCounts = params.world.ships
        .map(s => ({
            count: s.carriedObjects.filter(o => o === WorldObjectType.Diamond).count(),
            id: s.id
        }))
        .sort((o1, o2) => o2.count - o1.count)
        .takeWhile((o, i, iter) => i === 0 || iter.get(0)!.count === o.count);

    if (diamondCounts.count() !== 1)
        return addHistory(
            {type: BattleResultType.Draw, between: diamondCounts.map(c => c.id).toSet()},
            params
        );

    return addHistory(
        {type: BattleResultType.Decisive, winner: diamondCounts.get(0)!.id},
        params
    );
};

const getGeThereFirst: BattleResultGetter = params => {
    const presentShips = params.world.ships
        .filter(s => arePositionsEqual(s.position, params.battleEndParams.finishPosition!));

    if (presentShips.size > 1)
        throw invalidProgramError('There cannot be more than one ship in the final position.');

    if (presentShips.size === 1)
        return addHistory({type: BattleResultType.Decisive, winner: presentShips.get(0)!.id}, params);

    return addHistory({type: BattleResultType.Draw, between: params.world.ships.map(s => s.id).toSet()}, params);
};

const addHistory = <T>(input: T, params: IGetBattleResultParams): T & {history: List<World>} =>
    ({...input, history: params.history});
