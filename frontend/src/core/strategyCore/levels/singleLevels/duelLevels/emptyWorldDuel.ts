import {List, Map} from "immutable";
import {explosionCollisionResolver} from "../../../gameBehaviours/exposionCollisionResolver";
import {IGameBehaviours} from "../../../gameBehaviours/IGameBehaviours";
import {createOnTheirOwnGroups, createOnTheirOwnTeams, IGameLevel} from "../../../battleRunner/IGameLevel";
import {BattleType} from "../../../battleRunner/BattleType";
import {empty77World} from "../../worlds/empty77World";
import {addShipIdConstants, allStrategyCategories} from "../../../constants/strategyToolbox";
import {createTranslatedHelp, findTranslatedName} from "../../utils/findTranslatedHelp";
import {HelpTranslationKey} from "../../../../../localization/helpTranslationKey";
import {createWinModalWithStandardMessage} from "../../utils/createWinModal";
import {createSelectiveShotResolver} from "../../../gameBehaviours/createSelectiveShotResolver";
import {createStandardObjectCollisionResolver} from "../../../gameBehaviours/createStandardObjectCollisionResolver";

const shipIds = ['first', 'second'] as const;

const behaviours: IGameBehaviours = {
    mapBorderCollisionResolver: explosionCollisionResolver,
    shipCollisionResolver: createStandardObjectCollisionResolver(),
    shotResolver: createSelectiveShotResolver(shipIds),
};

const help = List([createTranslatedHelp(HelpTranslationKey.EmptyWorldDuel)]);

export const emptyWorldDuel: IGameLevel = {
    name: findTranslatedName(HelpTranslationKey.EmptyWorldDuel),
    urlSlug: 'empty-world-duel',
    battleType: BattleType.KillAll,
    battleParams: {turnsRan: 0, maxTurns: 100},
    turnsOrder: List(shipIds),
    shipsAsts: Map(),
    teams: createOnTheirOwnTeams(shipIds),
    sameAstGroups: createOnTheirOwnGroups(shipIds),
    world: empty77World,
    gameBehaviours: behaviours,
    toolbox: addShipIdConstants(allStrategyCategories, shipIds),
    help,
    winModal: createWinModalWithStandardMessage(),
    additionalValidators: List(),
    isDecisiveWin: () => true,
};
