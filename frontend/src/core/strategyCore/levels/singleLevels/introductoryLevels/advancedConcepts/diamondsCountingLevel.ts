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
import {
    diamondsCountingWorld,
    diamondsCountingWorldShipIds
} from "../../../worlds/intorductoryLevelsWorlds/advancedConcepts/diamondsCountingWorld";
import {Position} from "../../../../models/position";
import {createDiamondDistributionGenerator} from "../../../additionalObjectGenerators/createDiamondDistributionGenerator";
import {generateRectangularPositionGroup} from "../../../utils/generateRectangularPositionGroup";
import {diamondsCountingStrategy} from "../../../strategies/introduction/advancedConcepts/diamondsCountingLevelStrategy";
import {noFunctionsValidator} from "../../../additionalValidators/noFunctionsValidator";
import {createSingleRunRetryPolicy} from "../../../utils/createSingleRunRetryPolicy";

const shipIds = diamondsCountingWorldShipIds;

const behaviours: IGameBehaviours = {
    mapBorderCollisionResolver: explosionCollisionResolver,
    shipCollisionResolver: createStandardObjectCollisionResolver(),
    shotResolver: createSelectiveShotResolver([]),
};
const help = List([
    createTranslatedHelp(HelpTranslationKey.FirstChallenge),
]);

const additionalValidators: List<RoboAstValidator> = List([
    noFunctionsValidator,
    createMaxNumberOfBlocksValidator(30),
]);

const tileGroups = List([
    generateRectangularPositionGroup(
        {upperLeft: new Position({x: 1, y: 1}), downRight: new Position({x: 10, y: 1})}
        ),
    generateRectangularPositionGroup(
        {upperLeft: new Position({x: 1, y: 2}), downRight: new Position({x: 10, y: 2})}
    ),
]);
const additionalObjectGenerators: List<WorldObjectGenerator> = List([
    createDiamondDistributionGenerator({tileGroups, numberOfDiamondsPerGroup: 6}),
]);

const finalPositions = [
    new Position({x: 11, y: 1}),
    new Position({x: 11, y: 2}),
];

const teams = createOnTheirOwnTeams(shipIds);

export const diamondsCountingLevel: IGameLevel = {
    name: findTranslatedName(HelpTranslationKey.FirstChallenge),
    urlSlug: 'diamonds-counting',
    battleType: BattleType.TeamCollectAndGetThere,
    battleParams: {turnsRan: 0, maxTurns: 38, finishPositions: List(finalPositions), minimumNumberOfDiamonds: 3, teams},
    turnsOrder: List(shipIds),
    shipsAsts: Map([[shipIds[1], diamondsCountingStrategy]]),
    teams,
    sameAstGroups: createOnTheirOwnGroups(shipIds),
    world: diamondsCountingWorld,
    gameBehaviours: behaviours,
    toolbox: filterCategories(allStrategyCategories, Object.values(categoryNames).filter(n => n !== categoryNames.functions)),
    help,
    winModal: createWinModalWithStandardMessage(),
    additionalValidators,
    additionalObjectGenerators,
    isDecisiveWin: winner => winner === diamondsCountingWorldShipIds[0],
    retryPolicy: {winsRequired: 3, maxRounds: 3},
};

