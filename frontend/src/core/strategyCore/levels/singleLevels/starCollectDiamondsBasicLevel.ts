import {BattleType} from "../../battleRunner/BattleType";
import {List, Map} from "immutable";
import {IGameLevel, LevelHelp} from "../../battleRunner/IGameLevel";
import {centralDiamondsBasicStrategy} from "../../predefinedStrategies/centralDiamondsBasicStrategy";
import {diamondStarWorld} from "../worlds/diamondStarWorld";
import {IGameBehaviours} from "../../gameBehaviours/IGameBehaviours";
import {explosionCollisionResolver} from "../../gameBehaviours/exposionCollisionResolver";
import {destroyFirstShotResolver} from "../../gameBehaviours/destroyFirstShotResolver";
import {addShipIdConstants, allStrategyCategories} from "../../constants/strategyToolbox";
import {createTranslatedHelp} from "../utils/findTranslatedHelp";
import {HelpTranslationKey} from "../../../../localization/helpTranslationKey";

const behaviours: IGameBehaviours = {
    mapBorderCollisionResolver: explosionCollisionResolver,
    shipCollisionResolver: explosionCollisionResolver,
    shotResolver: destroyFirstShotResolver,
};

const shipIds = ['aiShip', 'playerShip'] as const;

const help: LevelHelp = createTranslatedHelp(HelpTranslationKey.StarCollectDiamondsBasic);

export const starCollectDiamondsBasicLevel: IGameLevel = {
    name: `Star collect basic`,
    urlSlug: 'star-collect-basic',
    battleType: BattleType.CollectOrKill,
    battleParams: {turnsRan: 0, maxTurns: 40},
    turnsOrder: List(shipIds),
    shipsAsts: Map([[shipIds[0], centralDiamondsBasicStrategy]]),
    world: diamondStarWorld,
    gameBehaviours: behaviours,
    toolbox: addShipIdConstants(allStrategyCategories, shipIds),
    help,
    additionalValidators: List(),
};