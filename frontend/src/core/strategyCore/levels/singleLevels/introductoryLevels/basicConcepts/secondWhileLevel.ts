import {List, Map} from "immutable";
import {IGameBehaviours} from "../../../../gameBehaviours/IGameBehaviours";
import {explosionCollisionResolver} from "../../../../gameBehaviours/exposionCollisionResolver";
import {
    createOnTheirOwnGroups,
    createOnTheirOwnTeams,
    IGameLevel,
    RoboAstValidator
} from "../../../../battleRunner/IGameLevel";
import {allStrategyCategories, categoryNames, filterCategories} from "../../../../constants/strategyToolbox";
import {BattleType} from "../../../../battleRunner/BattleType";
import {noFunctionsValidator} from "../../../additionalValidators/noFunctionsValidator";
import {createSelectiveShotResolver} from "../../../../gameBehaviours/createSelectiveShotResolver";
import {createRestrictedBlocksValidator} from "../../../additionalValidators/createRestrictedBlocksValidator";
import {StatementType} from "../../../../enums/statementType";
import {Position} from "../../../../models/position";
import {
    secondWhileWorld,
    secondWhileWorldShipIds
} from "../../../worlds/intorductoryLevelsWorlds/basicConcepts/secondWhileWorld";
import {randomSwitchAndShootStrategy} from "../../../../predefinedStrategies/randomSwitchAndShoot";
import {createTranslatedHelp, findTranslatedName} from "../../../utils/findTranslatedHelp";
import {HelpTranslationKey} from "../../../../../../localization/helpTranslationKey";
import {createWinModalWithStandardMessage} from "../../../utils/createWinModal";
import {createStandardObjectCollisionResolver} from "../../../../gameBehaviours/createStandardObjectCollisionResolver";

const shipIds = secondWhileWorldShipIds.reverse();

const behaviours: IGameBehaviours = {
    mapBorderCollisionResolver: explosionCollisionResolver,
    shipCollisionResolver: createStandardObjectCollisionResolver(),
    shotResolver: createSelectiveShotResolver([secondWhileWorldShipIds[0]]),
};

const help = List([createTranslatedHelp(HelpTranslationKey.SecondWhile)]);

const additionalValidators: List<RoboAstValidator> = List([
    noFunctionsValidator,
    createRestrictedBlocksValidator([StatementType.Repeat]),
]);

const allowedCategories = [
    categoryNames.commands,
    categoryNames.cycles,
    categoryNames.values,
    categoryNames.constants,
    categoryNames.conditions,
];

const finishPositions = List([new Position({x: 0, y: 1})]);

export const secondWhileLevel: IGameLevel = {
    name: findTranslatedName(HelpTranslationKey.SecondWhile),
    urlSlug: 'your-second-while',
    battleType: BattleType.GetThereFirstOrKill,
    battleParams: {turnsRan: 0, maxTurns: 100, finishPositions},
    turnsOrder: List(shipIds),
    shipsAsts: Map([[shipIds[0], randomSwitchAndShootStrategy]]),
    teams: createOnTheirOwnTeams(shipIds),
    sameAstGroups: createOnTheirOwnGroups(shipIds),
    world: secondWhileWorld,
    gameBehaviours: behaviours,
    toolbox: filterCategories(allStrategyCategories, allowedCategories),
    help,
    winModal: createWinModalWithStandardMessage(),
    additionalValidators,
    additionalObjectGenerators: List(),
    isDecisiveWin: winner => winner === secondWhileWorldShipIds[1],
};

