import {BattleResult, BattleResultType} from "./BattleResult";
import {World} from "../models/world";
import {IRuntimeContext} from "../models/programTypes";
import {BattleType} from "./BattleType";
import {IBattleEndParams} from "./hasBattleEnded";
import {invalidProgramError} from "../utils/invalidProgramError";
import {arePositionsEqual, Position} from "../models/position";
import {List} from "immutable";
import {WorldObjectType} from "../enums/worldObjectType";
import {getShip} from "../utils/worldModelUtils";
import {Team} from "./IGameLevel";
import {Ship} from "../models/ship";

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
        case BattleType.JustCollect:
            return getJustCollectResult(params);
        case BattleType.GetThereFirstOrKill:
            return getGetThereFirstOrKill(params);
        case BattleType.TeamKillAll:
            return getTeamsKillAllResult(params);
        case BattleType.TeamJustCollect:
            return getTeamJustCollectResult(params);
        case BattleType.TeamGetThereFirst:
            return teamGetThereFirst(params);
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

const getTeamsKillAllResult: BattleResultGetter = params => {
    const survivingTeams = findSurvivingTeams(params.world, params.battleEndParams.teams!);

    if (survivingTeams.count() === 1)
        return addHistory({type: BattleResultType.Decisive, winner: survivingTeams.get(0)!.name}, params);

    const between = survivingTeams
        .map(team => team.name)
        .toSet();

    return addHistory({type: BattleResultType.Draw, between }, params);
};

const findSurvivingTeams = (world: World, teams: List<Team>) =>
    teams
        .filter(team => team.members.some(id => {
            const ship = getShip(world, id);
            return !!ship && !ship.isDestroyed;
        }));

const getCollectOrKillResult: BattleResultGetter = params => {
    const killAllResult = getKillAllResult(params);
    if (killAllResult.type === BattleResultType.Decisive)
        return killAllResult;

    return getJustCollectResult(params);
};

const countShipsDiamonds = (ship: Ship): number =>
    ship.carriedObjects.filter(o => o === WorldObjectType.Diamond).count();

const getJustCollectResult: BattleResultGetter = params => {
    const diamondCounts = params.world.ships
        .map(s => ({
            count: countShipsDiamonds(s),
            id: s.id
        }));

    return createJustCollectResult(diamondCounts, params);
};

const countTeamDiamonds = (world: World, team: Team): number =>
    team.members
        .map(id => getShip(world, id))
        .map(ship => !ship ? 0 : countShipsDiamonds(ship))
        .reduce((result, current) => result + current, 0);

const getTeamJustCollectResult: BattleResultGetter = params => {
    const diamondCounts = params.battleEndParams.teams!
        .map(team => ({
            count: countTeamDiamonds(params.world, team),
            id: team.name,
        }));

    return createJustCollectResult(diamondCounts, params);
};

const createJustCollectResult = (counts: List<{count: number, id: string}>, params: IGetBattleResultParams): BattleResult => {
    const diamondCounts = counts
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

const isShipOnSomeFinalPosition = (ship: Ship, finalPositions: List<Position>): boolean =>
    finalPositions.some(p => arePositionsEqual(ship.position, p));

const getGeThereFirst: BattleResultGetter = params => {
    const finalPositions = params.battleEndParams.finishPositions!;
    const presentShips = params.world.ships
        .filter(s => isShipOnSomeFinalPosition(s, finalPositions));

    if (presentShips.size > 1)
        throw invalidProgramError('There cannot be more than one ship in the final position.');

    if (presentShips.size === 1)
        return addHistory({type: BattleResultType.Decisive, winner: presentShips.get(0)!.id}, params);

    return addHistory({type: BattleResultType.Draw, between: params.world.ships.map(s => s.id).toSet()}, params);
};

const findNameOfTeamsInPositions = (teams: List<Team>, positions: List<Position>, world: World): List<string> =>
    teams
        .map(team => ({...team, members: team.members.map(id => getShip(world, id))}))
        .filter(team => team.members.every(ship => !!ship && isShipOnSomeFinalPosition(ship, positions)))
        .map(team => team.name);

const teamGetThereFirst: BattleResultGetter = params => {
    const finalPositions = params.battleEndParams.finishPositions!;
    const presentTeamNames = findNameOfTeamsInPositions(params.battleEndParams.teams!, finalPositions, params.world);

    if (presentTeamNames.size > 1)
        throw invalidProgramError('There cannot be more than one ship in the final position.');

    if (presentTeamNames.size === 1)
        return addHistory({type: BattleResultType.Decisive, winner: presentTeamNames.get(0)!}, params);

    return addHistory({type: BattleResultType.Draw, between: presentTeamNames.toSet()}, params);
};

const getGetThereFirstOrKill: BattleResultGetter = params => {
    const killAllResult = getKillAllResult(params);
    if (killAllResult.type === BattleResultType.Decisive)
        return killAllResult;

    return getGeThereFirst(params);
};

const addHistory = <T>(input: T, params: IGetBattleResultParams): T & {history: List<World>} =>
    ({...input, history: params.history});
