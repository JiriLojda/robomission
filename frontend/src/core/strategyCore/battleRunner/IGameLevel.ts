import {BattleType} from "./BattleType";
import {isEnterablePosition, isPositionInWorld, World} from "../models/world";
import {IBattleEndParams} from "./hasBattleEnded";
import {List, Map} from "immutable";
import {ShipId} from "../models/ship";
import {IRoboAst} from "../models/programTypes";
import {IGameBehaviours} from "../gameBehaviours/IGameBehaviours";
import {BlocklyToolbox} from "../constants/strategyToolbox";
import {IValidatorResult} from "../validator/programValidator";

export type LevelHelp = {
    readonly text: string;
    readonly title: string;
}

export type RoboAstValidator = (roboAst: IRoboAst) => IValidatorResult;

export interface IGameLevel {
    readonly name: string;
    readonly urlSlug: string;
    readonly battleType: BattleType;
    readonly world: World;
    readonly battleParams: IBattleEndParams;
    readonly turnsOrder: List<ShipId>;
    readonly shipsAsts: Map<ShipId, IRoboAst>;
    readonly gameBehaviours: IGameBehaviours;
    readonly toolbox: BlocklyToolbox;
    readonly help: LevelHelp;
    readonly additionalValidators: List<RoboAstValidator>;
}

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
