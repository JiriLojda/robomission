import {BattleType} from "../../../../battleRunner/BattleType";
import {List, Map} from "immutable";
import {createOnTheirOwnGroups, createOnTheirOwnTeams, IGameLevel} from "../../../../battleRunner/IGameLevel";
import {IGameBehaviours} from "../../../../gameBehaviours/IGameBehaviours";
import {explosionCollisionResolver} from "../../../../gameBehaviours/exposionCollisionResolver";
import {Position} from "../../../../models/position";
import {raceBasicWorld} from "../../../worlds/intorductoryLevelsWorlds/basicConcepts/raceBasicWorld";
import {basicRaceStrategy} from "../../../strategies/introduction/basicConcepts/basicRaceStrategy";
import {
    addShipIdConstants,
    allStrategyCategories,
    categoryNames,
    filterCategories
} from "../../../../constants/strategyToolbox";
import {createTranslatedHelp, findTranslatedName} from "../../../utils/findTranslatedHelp";
import {HelpTranslationKey} from "../../../../../../localization/helpTranslationKey";
import {createWinModalWithStandardMessage} from "../../../utils/createWinModal";
import {createSelectiveShotResolver} from "../../../../gameBehaviours/createSelectiveShotResolver";
import {createStandardObjectCollisionResolver} from "../../../../gameBehaviours/createStandardObjectCollisionResolver";
import {createSingleRunRetryPolicy} from "../../../utils/createSingleRunRetryPolicy";
import {singlePlayerAiStartsShipIds} from "../../../constants/standardShipIds";
import {firstRepeatLevel} from "./firstRepeatLevel";
import {noFunctionsValidator} from "../../../additionalValidators/noFunctionsValidator";

const shipIds = singlePlayerAiStartsShipIds.toArray();

const behaviours: IGameBehaviours = {
    mapBorderCollisionResolver: explosionCollisionResolver,
    shipCollisionResolver: createStandardObjectCollisionResolver(true),
    shotResolver: createSelectiveShotResolver([]),
};

const finalPositions = [
    new Position({x: 0, y: 2}),
    new Position({x: 0, y: 4}),
];

const help = List([
    createTranslatedHelp(HelpTranslationKey.BasicRace),
    createTranslatedHelp(HelpTranslationKey.FirstChallenge2, 8 * 60, 5),
]);

const additionalValidators = List([
    noFunctionsValidator
]);

export const basicRaceLevel: IGameLevel = {
    name: findTranslatedName(HelpTranslationKey.BasicRace),
    urlSlug: 'simple-race',
    battleType: BattleType.GetThereFirst,
    battleParams: {turnsRan: 0, maxTurns: 100, finishPositions: List(finalPositions)},
    turnsOrder: List(shipIds),
    shipsAsts: Map([[shipIds[0], basicRaceStrategy]]),
    teams: createOnTheirOwnTeams(shipIds),
    sameAstGroups: createOnTheirOwnGroups(shipIds),
    world: raceBasicWorld,
    gameBehaviours: behaviours,
    toolbox: filterCategories(allStrategyCategories, categoryNames.commands),
    help,
    winModal: createWinModalWithStandardMessage(firstRepeatLevel),
    additionalValidators,
    additionalObjectGenerators: List(),
    isDecisiveWin: winner => winner === shipIds[1],
    retryPolicy: createSingleRunRetryPolicy(),
};

