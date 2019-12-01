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
import {allStrategyCategories, categoryNames, filterCategories} from "../../../../constants/strategyToolbox";
import {BattleType} from "../../../../battleRunner/BattleType";
import {createMaxNumberOfBlocksValidator} from "../../../additionalValidators/createMaxNumberOfBlocksValidator";
import {createSelectiveShotResolver} from "../../../../gameBehaviours/createSelectiveShotResolver";
import {createTranslatedHelp, findTranslatedName} from "../../../utils/findTranslatedHelp";
import {HelpTranslationKey} from "../../../../../../localization/helpTranslationKey";
import {createWinModalWithStandardMessage} from "../../../utils/createWinModal";
import {createStandardObjectCollisionResolver} from "../../../../gameBehaviours/createStandardObjectCollisionResolver";
import {Position} from "../../../../models/position";
import {noFunctionsValidator} from "../../../additionalValidators/noFunctionsValidator";
import {standardPlayerShipIds} from "../../../constants/standardShipIds";
import {createSingleRunRetryPolicy} from "../../../utils/createSingleRunRetryPolicy";
import {labyrinth2World} from "../../../worlds/intorductoryLevelsWorlds/advancedConcepts/labyrinth2World";

const shipIds = standardPlayerShipIds.take(1).toArray();

const behaviours: IGameBehaviours = {
    mapBorderCollisionResolver: explosionCollisionResolver,
    shipCollisionResolver: createStandardObjectCollisionResolver(false),
    shotResolver: createSelectiveShotResolver([]),
};
const help = List([
    createTranslatedHelp(HelpTranslationKey.Labyrinth2Level),
]);

const additionalValidators: List<RoboAstValidator> = List([
    noFunctionsValidator,
    createMaxNumberOfBlocksValidator(15),
]);

const additionalObjectGenerators: List<WorldObjectGenerator> = List([
]);

const finalPositions = [
    new Position({x: 10, y: 0}),
];

const teams = createOnTheirOwnTeams(shipIds);

export const labyrinth2Level: IGameLevel = {
    name: findTranslatedName(HelpTranslationKey.Labyrinth2Level),
    urlSlug: 'second-labyrinth',
    battleType: BattleType.GetThereFirst,
    battleParams: {turnsRan: 0, maxTurns: 100, finishPositions: List(finalPositions)},
    turnsOrder: List(shipIds),
    shipsAsts: Map([]),
    teams,
    sameAstGroups: createOnTheirOwnGroups(shipIds),
    world: labyrinth2World,
    gameBehaviours: behaviours,
    toolbox: filterCategories(allStrategyCategories, Object.values(categoryNames).filter(n => n !== categoryNames.functions)),
    help,
    winModal: createWinModalWithStandardMessage(),
    additionalValidators,
    additionalObjectGenerators,
    isDecisiveWin: winner => winner === shipIds[0],
    retryPolicy: createSingleRunRetryPolicy(),
};

