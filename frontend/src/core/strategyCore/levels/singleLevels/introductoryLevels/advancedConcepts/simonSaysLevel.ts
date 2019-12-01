import {List, Map} from "immutable";
import {IGameBehaviours} from "../../../../gameBehaviours/IGameBehaviours";
import {explosionCollisionResolver} from "../../../../gameBehaviours/exposionCollisionResolver";
import {
    createOnTheirOwnGroups,
    createOnTheirOwnTeams,
    IGameLevel,
    RoboAstValidator,
    WorldObjectGenerator
} from "../../../../battleRunner/IGameLevel";
import {
    addShipIdConstants,
    allStrategyCategories,
    categoryNames,
    filterCategories
} from "../../../../constants/strategyToolbox";
import {BattleType} from "../../../../battleRunner/BattleType";
import {createMaxNumberOfBlocksValidator} from "../../../additionalValidators/createMaxNumberOfBlocksValidator";
import {createSelectiveShotResolver} from "../../../../gameBehaviours/createSelectiveShotResolver";
import {createTranslatedHelp, findTranslatedName} from "../../../utils/findTranslatedHelp";
import {HelpTranslationKey} from "../../../../../../localization/helpTranslationKey";
import {createWinModalWithStandardMessage} from "../../../utils/createWinModal";
import {createStandardObjectCollisionResolver} from "../../../../gameBehaviours/createStandardObjectCollisionResolver";
import {Position} from "../../../../models/position";
import {singlePlayerAiStartsShipIds} from "../../../constants/standardShipIds";
import {createSingleRunRetryPolicy} from "../../../utils/createSingleRunRetryPolicy";
import {simonSaysWorld} from "../../../worlds/intorductoryLevelsWorlds/advancedConcepts/simonSaysWorld";
import {simonSaysLevelStrategy} from "../../../strategies/introduction/advancedConcepts/simonSaysLevelStrategy";
import {noFunctionsValidator} from "../../../additionalValidators/noFunctionsValidator";

const shipIds = singlePlayerAiStartsShipIds.toArray();

const behaviours: IGameBehaviours = {
    mapBorderCollisionResolver: explosionCollisionResolver,
    shipCollisionResolver: createStandardObjectCollisionResolver(false),
    shotResolver: createSelectiveShotResolver([shipIds[0]]),
};
const help = List([
    createTranslatedHelp(HelpTranslationKey.SimonSays),
]);

const additionalValidators: List<RoboAstValidator> = List([
    noFunctionsValidator,
    createMaxNumberOfBlocksValidator(30),
]);

const additionalObjectGenerators: List<WorldObjectGenerator> = List([
]);

const finalPositions = [
    new Position({x: 10, y: 0}),
];

const teams = createOnTheirOwnTeams(shipIds);

const toolbox = addShipIdConstants(
    filterCategories(allStrategyCategories, Object.values(categoryNames).filter(n => n !== categoryNames.functions)),
    shipIds,
);

export const simonSaysLevel: IGameLevel = {
    name: findTranslatedName(HelpTranslationKey.SimonSays),
    urlSlug: 'simon-says',
    battleType: BattleType.GetThereFirstOrKill,
    battleParams: {turnsRan: 0, maxTurns: 100, finishPositions: List(finalPositions)},
    turnsOrder: List(shipIds),
    shipsAsts: Map([[shipIds[0], simonSaysLevelStrategy]]),
    teams,
    sameAstGroups: createOnTheirOwnGroups(shipIds),
    world: simonSaysWorld,
    gameBehaviours: behaviours,
    toolbox,
    help,
    winModal: createWinModalWithStandardMessage(),
    additionalValidators,
    additionalObjectGenerators,
    isDecisiveWin: winner => winner === shipIds[1],
    retryPolicy: createSingleRunRetryPolicy(),
};

