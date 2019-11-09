import {List, Map} from "immutable";
import {IGameBehaviours} from "../../../gameBehaviours/IGameBehaviours";
import {explosionCollisionResolver} from "../../../gameBehaviours/exposionCollisionResolver";
import {IGameLevel, LevelHelp, RoboAstValidator} from "../../../battleRunner/IGameLevel";
import {allStrategyCategories, categoryNames, filterCategories} from "../../../constants/strategyToolbox";
import {BattleType} from "../../../battleRunner/BattleType";
import {noFunctionsValidator} from "../../additionalValidators/noFunctionsValidator";
import {createMaxNumberOfBlocksValidator} from "../../additionalValidators/createMaxNumberOfBlocksValidator";
import {pushCollisionResolver} from "../../../gameBehaviours/pushCollisionResolver";
import {createSelectiveShotResolver} from "../../../gameBehaviours/createSelectiveShotResolver";
import {createEmptyAst} from "../../../../../utils/createEmptyAst";
import {firstRepeatWorld} from "../../worlds/intorductoryLevelsWorlds/firstRepeatWorld";

const shipIds = ['playerShip', 'aiShip'] as const;

const behaviours: IGameBehaviours = {
    mapBorderCollisionResolver: explosionCollisionResolver,
    shipCollisionResolver: pushCollisionResolver,
    shotResolver: createSelectiveShotResolver([]),
};

const help: LevelHelp = {
    title: 'Collect the diamonds',
    text: 'In this level, we will explore repeat cycle. Repeat does what the name suggests. ' +
        'It repeats the commands in its body given number of times. It is supposed to help you ' +
        'not to repeat yourself. So here you have to collect all the diamonds. while using only 3 blocks.'
};

const additionalValidators: List<RoboAstValidator> = List([
    noFunctionsValidator,
    createMaxNumberOfBlocksValidator(3),
]);

export const firstRepeatLevel: IGameLevel = {
    name: 'Your first repeat',
    urlSlug: 'your-first-repeat',
    battleType: BattleType.JustCollect,
    battleParams: {turnsRan: 0, maxTurns: 100},
    turnsOrder: List(shipIds),
    shipsAsts: Map([[shipIds[1], createEmptyAst()]]),
    world: firstRepeatWorld,
    gameBehaviours: behaviours,
    toolbox: filterCategories(allStrategyCategories, [categoryNames.commands, categoryNames.cycles]),
    help,
    additionalValidators,
};

