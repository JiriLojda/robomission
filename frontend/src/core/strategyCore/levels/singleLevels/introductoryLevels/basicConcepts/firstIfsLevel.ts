import {List, Map} from "immutable";
import {IGameBehaviours} from "../../../../gameBehaviours/IGameBehaviours";
import {explosionCollisionResolver} from "../../../../gameBehaviours/exposionCollisionResolver";
import {createOnTheirOwnGroups, IGameLevel, LevelHelp, RoboAstValidator} from "../../../../battleRunner/IGameLevel";
import {allStrategyCategories, categoryNames, filterCategories} from "../../../../constants/strategyToolbox";
import {BattleType} from "../../../../battleRunner/BattleType";
import {noFunctionsValidator} from "../../../additionalValidators/noFunctionsValidator";
import {createMaxNumberOfBlocksValidator} from "../../../additionalValidators/createMaxNumberOfBlocksValidator";
import {createSelectiveShotResolver} from "../../../../gameBehaviours/createSelectiveShotResolver";
import {createEmptyAst} from "../../../../../../utils/createEmptyAst";
import {firstIfsWorld} from "../../../worlds/intorductoryLevelsWorlds/basicConcepts/firstIfsWorld";
import {createTranslatedHelp, findTranslatedName} from "../../../utils/findTranslatedHelp";
import {HelpTranslationKey} from "../../../../../../localization/helpTranslationKey";

const shipIds = ['playerShip', 'aiShip'] as const;

const behaviours: IGameBehaviours = {
    mapBorderCollisionResolver: explosionCollisionResolver,
    shipCollisionResolver: explosionCollisionResolver,
    shotResolver: createSelectiveShotResolver([]),
};

const help: LevelHelp = createTranslatedHelp(HelpTranslationKey.FirstIfs);

const additionalValidators: List<RoboAstValidator> = List([
    noFunctionsValidator,
    createMaxNumberOfBlocksValidator(7),
]);

export const firstIfsLevel: IGameLevel = {
    name: findTranslatedName(HelpTranslationKey.FirstIfs),
    urlSlug: 'your-first-if',
    battleType: BattleType.JustCollect,
    battleParams: {turnsRan: 0, maxTurns: 100},
    turnsOrder: List(shipIds),
    shipsAsts: Map([[shipIds[1], createEmptyAst()]]),
    teams: createOnTheirOwnGroups(shipIds),
    world: firstIfsWorld,
    gameBehaviours: behaviours,
    toolbox: filterCategories(allStrategyCategories, [
        categoryNames.commands,
        categoryNames.cycles,
        categoryNames.conditions,
        categoryNames.values,
        categoryNames.constants,
        categoryNames.branching,
    ]),
    help,
    additionalValidators,
};

