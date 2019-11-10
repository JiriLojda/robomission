import {BattleType} from "../../battleRunner/BattleType";
import {List, Map} from "immutable";
import {IGameLevel, LevelHelp} from "../../battleRunner/IGameLevel";
import {IGameBehaviours} from "../../gameBehaviours/IGameBehaviours";
import {explosionCollisionResolver} from "../../gameBehaviours/exposionCollisionResolver";
import {createSelectiveShotResolver} from "../../gameBehaviours/createSelectiveShotResolver";
import {addShipIdConstants, allStrategyCategories} from "../../constants/strategyToolbox";
import {starWithDiamondsWorld} from "../worlds/starWithDiamondsWorld";
import {starWithDiamondsStrategy} from "../../predefinedStrategies/starWithDiamondsStrategy";
import {createTranslatedHelp} from "../utils/findTranslatedHelp";
import {HelpTranslationKey} from "../../../../localization/helpTranslationKey";

const behaviours: IGameBehaviours = {
    mapBorderCollisionResolver: explosionCollisionResolver,
    shipCollisionResolver: explosionCollisionResolver,
    shotResolver: createSelectiveShotResolver([]),
};

const shipIds = ['aiShip', 'playerShip'] as const;

const help: LevelHelp = createTranslatedHelp(HelpTranslationKey.StarWithDiamonds);

export const starWithDiamondsLevel: IGameLevel = {
    name: 'Star with diamonds',
    urlSlug: 'star-with-diamonds',
    battleType: BattleType.CollectOrKill,
    battleParams: {turnsRan: 0, maxTurns: 100},
    turnsOrder: List(shipIds),
    shipsAsts: Map([[shipIds[0], starWithDiamondsStrategy]]),
    world: starWithDiamondsWorld,
    gameBehaviours: behaviours,
    toolbox: addShipIdConstants(allStrategyCategories, shipIds),
    help,
    additionalValidators: List(),
};

