import {BattleType} from "../../battleRunner/BattleType";
import {List, Map} from "immutable";
import {basicScanStrategy} from "../../predefinedStrategies/basicScanStrategy";
import {IGameLevel, LevelHelp} from "../../battleRunner/IGameLevel";
import {basicKillAllWorld} from "../worlds/basicKillAllWorld";
import {IGameBehaviours} from "../../gameBehaviours/IGameBehaviours";
import {explosionCollisionResolver} from "../../gameBehaviours/exposionCollisionResolver";
import {destroyFirstShotResolver} from "../../gameBehaviours/destroyFirstShotResolver";
import {addShipIdConstants, allStrategyCategories} from "../../constants/strategyToolbox";
import {createTranslatedHelp, findTranslatedName} from "../utils/findTranslatedHelp";
import {HelpTranslationKey} from "../../../../localization/helpTranslationKey";

const behaviours: IGameBehaviours = {
    mapBorderCollisionResolver: explosionCollisionResolver,
    shipCollisionResolver: explosionCollisionResolver,
    shotResolver: destroyFirstShotResolver,
};

const shipIds = ['aiShip', 'playerShip'] as const;

const help: LevelHelp = createTranslatedHelp(HelpTranslationKey.BasicScanKillAll);

export const basicScanKillAllLevel: IGameLevel = {
    name: findTranslatedName(HelpTranslationKey.BasicScanKillAll),
    urlSlug: 'kill-em-all-basic',
    battleType: BattleType.KillAll,
    battleParams: {turnsRan: 0, maxTurns: 40},
    turnsOrder: List(shipIds),
    shipsAsts: Map([[shipIds[0], basicScanStrategy]]),
    world: basicKillAllWorld,
    gameBehaviours: behaviours,
    toolbox: addShipIdConstants(allStrategyCategories, shipIds),
    help,
    additionalValidators: List(),
};
