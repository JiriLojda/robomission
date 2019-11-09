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
import {createRestrictedBlocksValidator} from "../../additionalValidators/createRestrictedBlocksValidator";
import {StatementType} from "../../../enums/statementType";

const shipIds = ['playerShip', 'aiShip'] as const;

const behaviours: IGameBehaviours = {
    mapBorderCollisionResolver: explosionCollisionResolver,
    shipCollisionResolver: explosionCollisionResolver,
    shotResolver: createSelectiveShotResolver([]),
};

const help: LevelHelp = {
    title: 'Collect the diamonds',
    text: 'Now the while cycle. The while cycle will keep executing its body while the condition ' +
        'given to it is evaluated to true. ' +
        'While helps you repeat some code for amount of number you do not know upfront. For example: ' +
        'you might want to keep shooting while there is an Asteroid and then fly forward or ' +
        'keep flying while the enemy is not on the same line as your ship and then turn and shoot him. ' +
        'In this level we will keep it simple. Keep flying and picking up diamonds while the position ' +
        'in front of your ship is accessible by you ship. For that you will need to use the is-accessible-condition. ' +
        'It takes position as a parameter. You will find position block in the "values" category. ' +
        'The "position" block will determine one specific position regardless the current position of your ship. ' +
        'While the "position relative" block determines which position relatively to the current position ' +
        'of your ship to pick. So if you want to put there position that will always be one tile above your ship, ' +
        'you might want to put there "position relative" with x=0 (meaning the same column) and y=-1 (meaning one ' +
        'line above). It should probably be also noted, that the upper left corner of the map has coordinates of ' +
        '(x=0, y=0) and y grows going down on the map, while x grows going to the right of the map. ' +
        'And you cannot use repeat block, just so you try out the while ;-)'
};

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
    name: 'Your first while',
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

