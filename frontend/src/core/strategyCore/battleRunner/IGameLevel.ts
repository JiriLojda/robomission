import {BattleType} from "./BattleType";
import {isEnterablePosition, World} from "../models/world";
import {IBattleEndParams} from "./hasBattleEnded";
import {List, Map, Set} from "immutable";
import {ShipId} from "../models/ship";
import {IRoboAst} from "../models/programTypes";
import {IGameBehaviours} from "../gameBehaviours/IGameBehaviours";
import {BlocklyToolbox} from "../constants/strategyToolbox";
import {IValidatorResult} from "../validator/programValidator";

export type LevelHelp = {
    readonly text: string | JSX.Element;
    readonly title: string;
    readonly timeoutToShowSeconds: number;
    readonly timeoutToShowFailures: number;
}

export type RoboAstValidator = (roboAst: IRoboAst) => IValidatorResult;

export type Team = {
    readonly name: string;
    readonly members: List<ShipId>;
}

export interface IWinModal {
    readonly message: string;
    readonly nextLevelLink: string | undefined;
    readonly nextLevelName: string | undefined;
}

export interface IGameLevel {
    readonly name: string;
    readonly urlSlug: string;
    readonly battleType: BattleType;
    readonly world: World;
    readonly battleParams: IBattleEndParams;
    readonly turnsOrder: List<ShipId>;
    readonly shipsAsts: Map<ShipId, IRoboAst>;
    readonly teams: List<Team>;
    readonly sameAstGroups: List<Set<ShipId>>;
    readonly gameBehaviours: IGameBehaviours;
    readonly toolbox: BlocklyToolbox;
    readonly help: List<LevelHelp>;
    readonly winModal: IWinModal;
    readonly additionalValidators: List<RoboAstValidator>;
    readonly isDecisiveWin: (winner: string) => boolean;
}

export const findGroupsWithoutAst = (level: IGameLevel): List<Set<ShipId>> => {
    const astDefinedFor = level.shipsAsts.keySeq().toSet();

    return level.sameAstGroups
        .filter(group => group.every(id => !astDefinedFor.has(id)));
};

export const createOnTheirOwnTeams = (shipIds: ReadonlyArray<ShipId>): List<Team> =>
    List(shipIds.map(id => ({name: id, members: List([id])})));

export const createOnTheirOwnGroups = (shipIds: ReadonlyArray<ShipId>): List<Set<ShipId>> =>
    List(shipIds.map(id => Set([id])));

export const defineAstForGroups = (groupsAsts: Map<Set<ShipId>, IRoboAst>, level: IGameLevel): Map<ShipId, IRoboAst> =>
    groupsAsts
        .flatMap((ast, group) => group.map(id => [id, ast]))
        .reduce((result, ast, id) => result.set(id, ast), level.shipsAsts);

export const isGameLevelValid = (level: IGameLevel): boolean =>
    doesShipsMatchTurnOrder(level) &&
    doesShipsAstsMatchesShips(level) &&
    areShipsOnValidPosition(level) &&
    areShipIdsUnique(level);

type GameLevelCondition = (level: IGameLevel) => boolean;

const doesShipsMatchTurnOrder: GameLevelCondition = level =>
    level.turnsOrder.count() !== level.world.ships.count() &&
    level.world.ships.map(s => s.id).toSet().intersect(level.turnsOrder.toSet()).isEmpty();

const doesShipsAstsMatchesShips: GameLevelCondition = level =>
    level.turnsOrder.toSet().intersect(level.shipsAsts.keySeq().toSet()).count() <= 1;

const areShipsOnValidPosition: GameLevelCondition = level =>
    level.world.ships.some(s => !isEnterablePosition(s.position, level.world));

const areShipIdsUnique: GameLevelCondition = level =>
    level.turnsOrder.toSet().count() === level.turnsOrder.count();
