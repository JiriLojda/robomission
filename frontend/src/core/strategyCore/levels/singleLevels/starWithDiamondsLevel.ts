import {BattleType} from "../../battleRunner/BattleType";
import {List, Map} from "immutable";
import {createOnTheirOwnGroups, createOnTheirOwnTeams, IGameLevel} from "../../battleRunner/IGameLevel";
import {IGameBehaviours} from "../../gameBehaviours/IGameBehaviours";
import {explosionCollisionResolver} from "../../gameBehaviours/exposionCollisionResolver";
import {createSelectiveShotResolver} from "../../gameBehaviours/createSelectiveShotResolver";
import {addShipIdConstants, allStrategyCategories} from "../../constants/strategyToolbox";
import {starWithDiamondsWorld} from "../worlds/starWithDiamondsWorld";
import {starWithDiamondsStrategy} from "../../predefinedStrategies/starWithDiamondsStrategy";
import {createTranslatedHelp, findTranslatedName} from "../utils/findTranslatedHelp";
import {HelpTranslationKey} from "../../../../localization/helpTranslationKey";
import {createWinModalWithStandardMessage} from "../utils/createWinModal";
import {createStandardObjectCollisionResolver} from "../../gameBehaviours/createStandardObjectCollisionResolver";
import {createSingleRunRetryPolicy} from "../utils/createSingleRunRetryPolicy";
import {singlePlayerAiStartsShipIds} from "../constants/standardShipIds";

const behaviours: IGameBehaviours = {
    mapBorderCollisionResolver: explosionCollisionResolver,
    shipCollisionResolver: createStandardObjectCollisionResolver(),
    shotResolver: createSelectiveShotResolver([]),
};

const shipIds = singlePlayerAiStartsShipIds.toArray();

const help = List([createTranslatedHelp(HelpTranslationKey.StarWithDiamonds)]);

export const starWithDiamondsLevel: IGameLevel = {
    name: findTranslatedName(HelpTranslationKey.StarWithDiamonds),
    urlSlug: 'star-with-diamonds',
    battleType: BattleType.CollectOrKill,
    battleParams: {turnsRan: 0, maxTurns: 100},
    turnsOrder: List(shipIds),
    shipsAsts: Map([[shipIds[0], starWithDiamondsStrategy]]),
    teams: createOnTheirOwnTeams(shipIds),
    sameAstGroups: createOnTheirOwnGroups(shipIds),
    world: starWithDiamondsWorld,
    gameBehaviours: behaviours,
    toolbox: addShipIdConstants(allStrategyCategories, shipIds),
    help,
    winModal: createWinModalWithStandardMessage(),
    additionalValidators: List(),
    additionalObjectGenerators: List(),
    isDecisiveWin: winner => winner === shipIds[1],
    retryPolicy: createSingleRunRetryPolicy(),
};

