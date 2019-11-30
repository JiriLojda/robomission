import {BattleType} from "../../battleRunner/BattleType";
import {List, Map} from "immutable";
import {basicScanStrategy} from "../../predefinedStrategies/basicScanStrategy";
import {createOnTheirOwnGroups, createOnTheirOwnTeams, IGameLevel} from "../../battleRunner/IGameLevel";
import {basicKillAllWorld} from "../worlds/basicKillAllWorld";
import {IGameBehaviours} from "../../gameBehaviours/IGameBehaviours";
import {explosionCollisionResolver} from "../../gameBehaviours/exposionCollisionResolver";
import {addShipIdConstants, allStrategyCategories} from "../../constants/strategyToolbox";
import {createTranslatedHelp, findTranslatedName} from "../utils/findTranslatedHelp";
import {HelpTranslationKey} from "../../../../localization/helpTranslationKey";
import {createWinModalWithStandardMessage} from "../utils/createWinModal";
import {basicRaceLevel} from "./basicRaceLevel";
import {createSelectiveShotResolver} from "../../gameBehaviours/createSelectiveShotResolver";
import {createStandardObjectCollisionResolver} from "../../gameBehaviours/createStandardObjectCollisionResolver";
import {createSingleRunRetryPolicy} from "../utils/createSingleRunRetryPolicy";
import {singlePlayerAiStartsShipIds} from "../constants/standardShipIds";

const shipIds = singlePlayerAiStartsShipIds.toArray();

const behaviours: IGameBehaviours = {
    mapBorderCollisionResolver: explosionCollisionResolver,
    shipCollisionResolver: createStandardObjectCollisionResolver(),
    shotResolver: createSelectiveShotResolver(shipIds),
};

const help = List([createTranslatedHelp(HelpTranslationKey.BasicScanKillAll)]);

export const basicScanKillAllLevel: IGameLevel = {
    name: findTranslatedName(HelpTranslationKey.BasicScanKillAll),
    urlSlug: 'kill-em-all-basic',
    battleType: BattleType.KillAll,
    battleParams: {turnsRan: 0, maxTurns: 40},
    turnsOrder: List(shipIds),
    shipsAsts: Map([[shipIds[0], basicScanStrategy]]),
    teams: createOnTheirOwnTeams(shipIds),
    sameAstGroups: createOnTheirOwnGroups(shipIds),
    world: basicKillAllWorld,
    gameBehaviours: behaviours,
    toolbox: addShipIdConstants(allStrategyCategories, shipIds),
    help,
    winModal: createWinModalWithStandardMessage(basicRaceLevel),
    additionalValidators: List(),
    additionalObjectGenerators: List(),
    isDecisiveWin: winner => winner === shipIds[1],
    retryPolicy: createSingleRunRetryPolicy(),
};
