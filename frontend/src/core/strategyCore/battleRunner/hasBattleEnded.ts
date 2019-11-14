import {World} from "../models/world";
import {BattleType} from "./BattleType";
import {invalidProgramError} from "../utils/invalidProgramError";
import {arePositionsEqual, Position} from "../models/position";
import {List} from "immutable";
import {WorldObjectType} from "../enums/worldObjectType";
import {Ship, ShipId} from "../models/ship";
import {getShip} from "../utils/worldModelUtils";
import {Team} from "./IGameLevel";

export interface IBattleEndParams {
    readonly turnsRan: number;
    readonly finishPositions?: List<Position>;
    readonly maxTurns: number;
    readonly teams?: List<Team>;
}

export const hasBattleEnded = (world: World, battleType: BattleType, params: IBattleEndParams): boolean => {
    assertInput(battleType, params);

    switch (battleType) {
        case BattleType.KillAll:
            return isOnlyOneSurvivor(world) || isTimeUp(params!.turnsRan!, params!.maxTurns!);
        case BattleType.CollectOrKill:
            return isOnlyOneSurvivor(world) || isTimeUp(params!.turnsRan!, params!.maxTurns!) || !areDiamondsLeft(world);
        case BattleType.GetThereFirst:
            return areAllShipsDestroyed(world) ||
                isTimeUp(params!.turnsRan!, params!.maxTurns!) ||
                someShipReachedDestination(world, params!.finishPositions!);
        case BattleType.GetThereFirstOrKill:
            return isOnlyOneSurvivor(world) ||
                isTimeUp(params!.turnsRan!, params!.maxTurns!) ||
                someShipReachedDestination(world, params!.finishPositions!);
        case BattleType.JustCollect:
        case BattleType.TeamJustCollect:
            return isTimeUp(params!.turnsRan!, params!.maxTurns) || !areDiamondsLeft(world);
        case BattleType.TeamKillAll:
            return isOnlyOneTeamSurvivor(world, params.teams!) || isTimeUp(params.turnsRan!, params.maxTurns!);
        case BattleType.TeamGetThereFirst:
            return areAllShipsDestroyed(world) ||
                isTimeUp(params!.turnsRan!, params!.maxTurns!) ||
                someTeamReachedTheDestination(world, params.finishPositions!, params.teams!);
        default:
            throw invalidProgramError(`Unknown battle type ${battleType}`);
    }
};

const isOnlyOneSurvivor = (world: World): boolean =>
    world.ships.count(ship => !ship.isDestroyed) <= 1;

const isOnlyOneTeamSurvivor = (world: World, teams: List<Team>): boolean =>
    countSurvivingTeams(world, teams) <= 1;

const isShipDestroyed = (shipId: ShipId, world: World): boolean => {
    const ship = getShip(world, shipId);

    return !!ship && ship.isDestroyed;
};

const countSurvivingTeams = (world: World, teams: List<Team>): number =>
    teams
        .filter(team => team.members.some(id => !isShipDestroyed(id, world)))
        .count();

const areAllShipsDestroyed = (world: World): boolean =>
    world.ships.count(ship => !ship.isDestroyed) === 0;

const didShipReachDestination = (ship: Ship, positions: List<Position>): boolean =>
    positions.some(position => arePositionsEqual(ship.position, position));

const someShipReachedDestination = (world: World, positions: List<Position>): boolean =>
    world.ships.some(ship => didShipReachDestination(ship, positions));

const someTeamReachedTheDestination =  (world: World, positions: List<Position>, teams: List<Team>): boolean =>
    teams
        .some(team => team.members
            .map(id => getShip(world, id))
            .filter(ship => !!ship)
            .every(ship => !!ship && didShipReachDestination(ship, positions)));

const isTimeUp = (realTurns: number, maxTurns: number): boolean => realTurns >= maxTurns;

const areDiamondsLeft = (world: World): boolean =>
    world.objects.some(row =>
        row.some(tile => tile.some(obj => obj.type === WorldObjectType.Diamond))
    );

const assertInput = (battleType: BattleType, params?: IBattleEndParams): void => {
    switch (battleType) {
        case BattleType.KillAll:
        case BattleType.CollectOrKill:
        case BattleType.JustCollect:
            if (battleType === BattleType.KillAll && !hasExactlyThis(["maxTurns", "turnsRan"], params)) {
                throw unexpectedParamsGiven(battleType);
            }
            return;
        case BattleType.GetThereFirst:
        case BattleType.GetThereFirstOrKill:
            if (!hasExactlyThis(['finishPositions', "turnsRan", "maxTurns"], params)) {
                throw unexpectedParamsGiven(battleType);
            }
            return;
        case BattleType.TeamJustCollect:
        case BattleType.TeamKillAll:
            if (!hasExactlyThis(['turnsRan', 'maxTurns', 'teams'], params)) {
                throw unexpectedParamsGiven(battleType);
            }
            return;
        case BattleType.TeamGetThereFirst:
            if (!hasExactlyThis(['finishPositions', 'turnsRan', 'maxTurns', 'teams'], params)) {
                throw unexpectedParamsGiven(battleType);
            }
            return;
        default:
            throw invalidProgramError(`Unknown battle type ${battleType}.`, 'hasBattleEnded');
    }
};

const unexpectedParamsGiven = (battleType: BattleType) =>
    invalidProgramError(`Battle type ${battleType} does expect different params.`);

const hasExactlyThis = <T, K extends keyof IBattleEndParams>(expectedProps: K[], params?: T): boolean => {
    const found: string[] = [];

    for (const prop in params) {
        if (params.hasOwnProperty(prop) && !expectedProps.includes(prop as any))
            return false;
        if (params.hasOwnProperty(prop)) {
            found.push(prop);
        }
    }

    return found.length === expectedProps.length;
};
