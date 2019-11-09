import {List, Map} from "immutable";
import {IGameBehaviours} from "../../../gameBehaviours/IGameBehaviours";
import {explosionCollisionResolver} from "../../../gameBehaviours/exposionCollisionResolver";
import {IGameLevel, LevelHelp, RoboAstValidator} from "../../../battleRunner/IGameLevel";
import {allStrategyCategories, categoryNames, filterCategories} from "../../../constants/strategyToolbox";
import {BattleType} from "../../../battleRunner/BattleType";
import {noFunctionsValidator} from "../../additionalValidators/noFunctionsValidator";
import {createMaxNumberOfBlocksValidator} from "../../additionalValidators/createMaxNumberOfBlocksValidator";
import {createSelectiveShotResolver} from "../../../gameBehaviours/createSelectiveShotResolver";
import {createEmptyAst} from "../../../../../utils/createEmptyAst";
import {firstIfsWorld} from "../../worlds/intorductoryLevelsWorlds/firstIfsWorld";

const shipIds = ['playerShip', 'aiShip'] as const;

const behaviours: IGameBehaviours = {
    mapBorderCollisionResolver: explosionCollisionResolver,
    shipCollisionResolver: explosionCollisionResolver,
    shotResolver: createSelectiveShotResolver([]),
};

const help: LevelHelp = {
    title: 'Collect the diamonds',
    text: 'Now we will try ifs. "if" block will execute its body only if the condition given to it evaluates to true. ' +
        'Otherwise the whole is just skipped. The "if-else" block has additional part. This second part (else part) ' +
        'will be executed if the condition in the "if" is evaluated to false. ' +
        'Now in this mission you will have to collect all the diamonds. Your opponent here will do nothing. ' +
        'You are restricted to the maximum of 7 blocks so you better use a cycle.'
};

const additionalValidators: List<RoboAstValidator> = List([
    noFunctionsValidator,
    createMaxNumberOfBlocksValidator(7),
]);

export const firstIfsLevel: IGameLevel = {
    name: 'Your first if',
    urlSlug: 'your-first-if',
    battleType: BattleType.JustCollect,
    battleParams: {turnsRan: 0, maxTurns: 100},
    turnsOrder: List(shipIds),
    shipsAsts: Map([[shipIds[1], createEmptyAst()]]),
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

