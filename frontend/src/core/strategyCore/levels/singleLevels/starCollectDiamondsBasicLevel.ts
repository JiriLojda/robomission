import {BattleType} from "../../battleRunner/BattleType";
import {List, Map} from "immutable";
import {createOnTheirOwnGroups, createOnTheirOwnTeams, IGameLevel} from "../../battleRunner/IGameLevel";
import {centralDiamondsBasicStrategy} from "../../predefinedStrategies/centralDiamondsBasicStrategy";
import {diamondStarWorld} from "../worlds/diamondStarWorld";
import {IGameBehaviours} from "../../gameBehaviours/IGameBehaviours";
import {explosionCollisionResolver} from "../../gameBehaviours/exposionCollisionResolver";
import {addShipIdConstants, allStrategyCategories} from "../../constants/strategyToolbox";
import {createTranslatedHelp, findTranslatedName} from "../utils/findTranslatedHelp";
import {HelpTranslationKey} from "../../../../localization/helpTranslationKey";
import {createWinModalWithStandardMessage} from "../utils/createWinModal";
import {createSelectiveShotResolver} from "../../gameBehaviours/createSelectiveShotResolver";
import {createStandardObjectCollisionResolver} from "../../gameBehaviours/createStandardObjectCollisionResolver";

const shipIds = ['aiShip', 'playerShip'] as const;

const behaviours: IGameBehaviours = {
    mapBorderCollisionResolver: explosionCollisionResolver,
    shipCollisionResolver: createStandardObjectCollisionResolver(),
    shotResolver: createSelectiveShotResolver(shipIds),
};

const help = List([createTranslatedHelp(HelpTranslationKey.StarCollectDiamondsBasic)]);

export const starCollectDiamondsBasicLevel: IGameLevel = {
    name: findTranslatedName(HelpTranslationKey.StarCollectDiamondsBasic),
    urlSlug: 'star-collect-basic',
    battleType: BattleType.CollectOrKill,
    battleParams: {turnsRan: 0, maxTurns: 40},
    turnsOrder: List(shipIds),
    shipsAsts: Map([[shipIds[0], centralDiamondsBasicStrategy]]),
    teams: createOnTheirOwnTeams(shipIds),
    sameAstGroups: createOnTheirOwnGroups(shipIds),
    world: diamondStarWorld,
    gameBehaviours: behaviours,
    toolbox: addShipIdConstants(allStrategyCategories, shipIds),
    help,
    winModal: createWinModalWithStandardMessage(),
    additionalValidators: List(),
    isDecisiveWin: winner => winner === 'playerShip',
};