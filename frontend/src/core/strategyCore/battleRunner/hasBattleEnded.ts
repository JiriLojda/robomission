import {World} from "../models/world";
import {BattleType} from "./BattleType";
import {invalidProgramError} from "../utils/invalidProgramError";
import {arePositionsEqual, Position} from "../models/position";
import {List} from "immutable";

export interface IBattleEndParams {
    readonly turnsRan: number;
    readonly finishPositions?: List<Position>;
    readonly maxTurns: number;
}

export const hasBattleEnded = (world: World, battleType: BattleType, params: IBattleEndParams): boolean => {
    assertInput(battleType, params);

    switch (battleType) {
        case BattleType.KillAll:
        case BattleType.CollectOrKill:
            return areAllShipsDestroyed(world) || isTimeUp(params!.turnsRan!, params!.maxTurns!);
        case BattleType.GetThereFirst:
            return areAllShipsDestroyed(world) ||
                isTimeUp(params!.turnsRan!, params!.maxTurns!) ||
                someShipReachedDestination(world, params!.finishPositions!);
        default:
            throw invalidProgramError(`Unknown battle type ${battleType}`);
    }
};

const areAllShipsDestroyed = (world: World): boolean =>
    world.ships.count(ship => !ship.isDestroyed) <= 1;

const someShipReachedDestination = (world: World, positions: List<Position>): boolean =>
    world.ships.some(ship => positions.some(position => arePositionsEqual(ship.position, position)));

const isTimeUp = (realTurns: number, maxTurns: number): boolean => realTurns >= maxTurns;

const assertInput = (battleType: BattleType, params?: IBattleEndParams): void => {
    switch (battleType) {
        case BattleType.KillAll:
        case BattleType.CollectOrKill:
            if (battleType === BattleType.KillAll && !hasExactlyThis(["maxTurns", "turnsRan"], params)) {
                throw invalidProgramError('Kill all battle type does not expect params.');
            }
            return;
        case BattleType.GetThereFirst:
            if (!hasExactlyThis(['finishPositions', "turnsRan", "maxTurns"], params)) {
                throw invalidProgramError(`Battle type ${battleType} needs everything set up.`);
            }
            return;
        default:
            throw invalidProgramError(`Unknown battle type ${battleType}.`, 'hasBattleEnded');
    }
};

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
