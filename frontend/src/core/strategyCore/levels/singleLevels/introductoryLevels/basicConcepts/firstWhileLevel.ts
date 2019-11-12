import {List, Map} from "immutable";
import {IGameBehaviours} from "../../../../gameBehaviours/IGameBehaviours";
import {explosionCollisionResolver} from "../../../../gameBehaviours/exposionCollisionResolver";
import {IGameLevel, LevelHelp, RoboAstValidator} from "../../../../battleRunner/IGameLevel";
import {allStrategyCategories, categoryNames, filterCategories} from "../../../../constants/strategyToolbox";
import {BattleType} from "../../../../battleRunner/BattleType";
import {noFunctionsValidator} from "../../../additionalValidators/noFunctionsValidator";
import {createMaxNumberOfBlocksValidator} from "../../../additionalValidators/createMaxNumberOfBlocksValidator";
import {createSelectiveShotResolver} from "../../../../gameBehaviours/createSelectiveShotResolver";
import {createEmptyAst} from "../../../../../../utils/createEmptyAst";
import {firstRepeatWorld} from "../../../worlds/intorductoryLevelsWorlds/basicConcepts/firstRepeatWorld";
import {createRestrictedBlocksValidator} from "../../../additionalValidators/createRestrictedBlocksValidator";
import {StatementType} from "../../../../enums/statementType";
import {createTranslatedHelp, findTranslatedName} from "../../../utils/findTranslatedHelp";
import {HelpTranslationKey} from "../../../../../../localization/helpTranslationKey";

const shipIds = ['playerShip', 'aiShip'] as const;

const behaviours: IGameBehaviours = {
    mapBorderCollisionResolver: explosionCollisionResolver,
    shipCollisionResolver: explosionCollisionResolver,
    shotResolver: createSelectiveShotResolver([]),
};

const help: LevelHelp = createTranslatedHelp(HelpTranslationKey.FirstWhile);

const additionalValidators: List<RoboAstValidator> = List([
    noFunctionsValidator,
    createMaxNumberOfBlocksValidator(3),
    createRestrictedBlocksValidator([StatementType.Repeat]),
]);

const allowedCategories = [
    categoryNames.commands,
    categoryNames.cycles,
    categoryNames.values,
    categoryNames.constants,
    categoryNames.conditions,
];

export const firstWhileLevel: IGameLevel = {
    name: findTranslatedName(HelpTranslationKey.FirstWhile),
    urlSlug: 'your-first-while',
    battleType: BattleType.JustCollect,
    battleParams: {turnsRan: 0, maxTurns: 100},
    turnsOrder: List(shipIds),
    shipsAsts: Map([[shipIds[1], createEmptyAst()]]),
    world: firstRepeatWorld,
    gameBehaviours: behaviours,
    toolbox: filterCategories(allStrategyCategories, allowedCategories),
    help,
    additionalValidators,
};
