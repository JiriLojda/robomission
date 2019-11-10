import {List, Map} from "immutable";
import {explosionCollisionResolver} from "../../../gameBehaviours/exposionCollisionResolver";
import {IGameBehaviours} from "../../../gameBehaviours/IGameBehaviours";
import {IGameLevel, LevelHelp} from "../../../battleRunner/IGameLevel";
import {BattleType} from "../../../battleRunner/BattleType";
import {empty77World} from "../../worlds/empty77World";
import {destroyFirstShotResolver} from "../../../gameBehaviours/destroyFirstShotResolver";
import {addShipIdConstants, allStrategyCategories} from "../../../constants/strategyToolbox";
import {createTranslatedHelp} from "../../utils/findTranslatedHelp";
import {HelpTranslationKey} from "../../../../../localization/helpTranslationKey";

const behaviours: IGameBehaviours = {
    mapBorderCollisionResolver: explosionCollisionResolver,
    shipCollisionResolver: explosionCollisionResolver,
    shotResolver: destroyFirstShotResolver,
};

const shipIds = ['first', 'second'] as const;

const help: LevelHelp = createTranslatedHelp(HelpTranslationKey.EmptyWorldDuel);

export const emptyWorldDuel: IGameLevel = {
    name: 'Empty world duel',
    urlSlug: 'empty-world-duel',
    battleType: BattleType.KillAll,
    battleParams: {turnsRan: 0, maxTurns: 100},
    turnsOrder: List(shipIds),
    shipsAsts: Map(),
    world: empty77World,
    gameBehaviours: behaviours,
    toolbox: addShipIdConstants(allStrategyCategories, shipIds),
    help,
    additionalValidators: List(),
};
