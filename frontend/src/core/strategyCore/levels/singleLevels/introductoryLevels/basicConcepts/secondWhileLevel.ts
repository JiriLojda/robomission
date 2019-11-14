import {List, Map} from "immutable";
import {IGameBehaviours} from "../../../../gameBehaviours/IGameBehaviours";
import {explosionCollisionResolver} from "../../../../gameBehaviours/exposionCollisionResolver";
import {createOnTheirOwnGroups, IGameLevel, LevelHelp, RoboAstValidator} from "../../../../battleRunner/IGameLevel";
import {allStrategyCategories, categoryNames, filterCategories} from "../../../../constants/strategyToolbox";
import {BattleType} from "../../../../battleRunner/BattleType";
import {noFunctionsValidator} from "../../../additionalValidators/noFunctionsValidator";
import {createSelectiveShotResolver} from "../../../../gameBehaviours/createSelectiveShotResolver";
import {createRestrictedBlocksValidator} from "../../../additionalValidators/createRestrictedBlocksValidator";
import {StatementType} from "../../../../enums/statementType";
import {Position} from "../../../../models/position";
import {secondWhileWorld} from "../../../worlds/intorductoryLevelsWorlds/basicConcepts/secondWhileWorld";
import {randomSwitchAndShootStrategy} from "../../../../predefinedStrategies/randomSwitchAndShoot";
import {createTranslatedHelp, findTranslatedName} from "../../../utils/findTranslatedHelp";
import {HelpTranslationKey} from "../../../../../../localization/helpTranslationKey";

const shipIds = ['aiShip', 'playerShip'] as const;

const behaviours: IGameBehaviours = {
    mapBorderCollisionResolver: explosionCollisionResolver,
    shipCollisionResolver: explosionCollisionResolver,
    shotResolver: createSelectiveShotResolver(['aiShip']),
};

const help: LevelHelp = createTranslatedHelp(HelpTranslationKey.SecondWhile);

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
    teams: createOnTheirOwnGroups(shipIds),
    world: secondWhileWorld,
    gameBehaviours: behaviours,
    toolbox: filterCategories(allStrategyCategories, allowedCategories),
    help,
    additionalValidators,
};

