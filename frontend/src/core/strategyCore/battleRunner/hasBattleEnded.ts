import {World} from "../models/world";
import {BattleType} from "./BattleType";
import {invalidProgramError} from "../utils/invalidProgramError";
import {Position} from "../models/position";
import {List} from "immutable";
import {WorldObjectType} from "../enums/worldObjectType";
import {ShipId} from "../models/ship";
import {getShip} from "../utils/worldModelUtils";
import {Team} from "./IGameLevel";
import {countTeamsDiamonds, didShipReachDestination, findTeamsReachedTheDestination} from "./utils/battleResultUtils";

export interface IBattleEndParams {
    readonly turnsRan: number;
    readonly finishPositions?: List<Position>;
    readonly maxTurns: number;
    readonly minimumNumberOfDiamonds?: number;
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
        case BattleType.TeamCollectAndGetThere:
            return areAllShipsDestroyed(world) ||
                isTimeUp(params!.turnsRan!, params!.maxTurns!) ||
                someTeamReachedTheDestinationWithDiamonds(world, params.finishPositions!, params.teams!, params.minimumNumberOfDiamonds!);
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

const someShipReachedDestination = (world: World, positions: List<Position>): boolean =>
    world.ships.some(ship => didShipReachDestination(ship, positions));

const someTeamReachedTheDestination =  (world: World, positions: List<Position>, teams: List<Team>): boolean =>
    !findTeamsReachedTheDestination(world, positions, teams).isEmpty();

const isTimeUp = (realTurns: number, maxTurns: number): boolean => realTurns >= maxTurns;

const areDiamondsLeft = (world: World): boolean =>
    world.objects.some(row =>
        row.some(tile => tile.some(obj => obj.type === WorldObjectType.Diamond))
    );

const someTeamReachedTheDestinationWithDiamonds = (
    world: World,
    positions: List<Position>,
    teams: List<Team>,
    minimumDiamonds: number,
) => findTeamsReachedTheDestination(world, positions, teams)
    .some(team => countTeamsDiamonds(team, world) >= minimumDiamonds);

const assertInput = (battleType: BattleType, params?: IBattleEndParams): void => {

};

const getExpectedProps = (battleType: BattleType, params?: IBattleEndParams): (keyof IBattleEndParams)[] => {
    switch (battleType) {
        case BattleType.KillAll:
        case BattleType.CollectOrKill:
        case BattleType.JustCollect:
            return ["maxTurns", "turnsRan"];
        case BattleType.GetThereFirst:
        case BattleType.GetThereFirstOrKill:
            return ['finishPositions', "turnsRan", "maxTurns"];
        case BattleType.TeamJustCollect:
        case BattleType.TeamKillAll:
            return ['turnsRan', 'maxTurns', 'teams'];
        case BattleType.TeamGetThereFirst:
            return ['finishPositions', 'turnsRan', 'maxTurns', 'teams'];
        case BattleType.TeamCollectAndGetThere:
            return ['finishPositions', 'turnsRan', 'maxTurns', 'teams', 'minimumNumberOfDiamonds'];
        default:
            throw invalidProgramError(`Unknown battle type ${battleType}.`, 'hasBattleEnded');
    }
}

const unexpectedParamsGiven = (battleType: BattleType, expected: string[], got: string[]) =>
    invalidProgramError(`Battle type ${battleType} does expect different params. Expected: ${expected.join(', ')}, Got: ${got.join(', ')}`);

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
