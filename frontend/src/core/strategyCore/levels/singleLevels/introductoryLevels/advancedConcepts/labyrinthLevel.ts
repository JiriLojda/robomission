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
import {standardAiShipIds, standardPlayerShipIds} from "../../../constants/standardShipIds";
import {labyrinthWorld} from "../../../worlds/intorductoryLevelsWorlds/advancedConcepts/labyrinthWorld";
import {createSingleRunRetryPolicy} from "../../../utils/createSingleRunRetryPolicy";
import {
    labyrinthLeftHandPlayerStrategy,
    labyrinthRightHandPlayerStrategy
} from "../../../strategies/introduction/advancedConcepts/labyrinthStrategies";

const shipIds = standardPlayerShipIds.take(1).concat(standardAiShipIds.take(2)).toArray();

const behaviours: IGameBehaviours = {
    mapBorderCollisionResolver: explosionCollisionResolver,
    shipCollisionResolver: createStandardObjectCollisionResolver(true),
    shotResolver: createSelectiveShotResolver(standardAiShipIds.take(2).toArray()),
};
const help = List([
    createTranslatedHelp(HelpTranslationKey.DiamondsCounting),
]);

const additionalValidators: List<RoboAstValidator> = List([
    noFunctionsValidator,
    createMaxNumberOfBlocksValidator(11),
]);

const additionalObjectGenerators: List<WorldObjectGenerator> = List([
]);

const finalPositions = [
    new Position({x: 4, y: 5}),
];

const teams = createOnTheirOwnTeams(shipIds);

export const labyrinthLevel: IGameLevel = {
    name: findTranslatedName(HelpTranslationKey.DiamondsCounting),
    urlSlug: 'labyrinth',
    battleType: BattleType.GetThereFirstOrKill,
    battleParams: {turnsRan: 0, maxTurns: 200, finishPositions: List(finalPositions)},
    turnsOrder: List(shipIds),
    shipsAsts: Map([[shipIds[1], labyrinthLeftHandPlayerStrategy], [shipIds[2], labyrinthRightHandPlayerStrategy]]),
    teams,
    sameAstGroups: createOnTheirOwnGroups(shipIds),
    world: labyrinthWorld,
    gameBehaviours: behaviours,
    toolbox: filterCategories(allStrategyCategories, Object.values(categoryNames).filter(n => n !== categoryNames.functions)),
    help,
    winModal: createWinModalWithStandardMessage(),
    additionalValidators,
    additionalObjectGenerators,
    isDecisiveWin: winner => winner === shipIds[0],
    retryPolicy: createSingleRunRetryPolicy(),
};

