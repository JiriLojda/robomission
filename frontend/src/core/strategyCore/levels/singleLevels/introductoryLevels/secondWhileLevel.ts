import {List, Map} from "immutable";
import {IGameBehaviours} from "../../../gameBehaviours/IGameBehaviours";
import {explosionCollisionResolver} from "../../../gameBehaviours/exposionCollisionResolver";
import {IGameLevel, LevelHelp, RoboAstValidator} from "../../../battleRunner/IGameLevel";
import {allStrategyCategories, categoryNames, filterCategories} from "../../../constants/strategyToolbox";
import {BattleType} from "../../../battleRunner/BattleType";
import {noFunctionsValidator} from "../../additionalValidators/noFunctionsValidator";
import {createSelectiveShotResolver} from "../../../gameBehaviours/createSelectiveShotResolver";
import {createRestrictedBlocksValidator} from "../../additionalValidators/createRestrictedBlocksValidator";
import {StatementType} from "../../../enums/statementType";
import {Position} from "../../../models/position";
import {secondWhileWorld} from "../../worlds/intorductoryLevelsWorlds/secondWhileWorld";
import {randomSwitchAndShootStrategy} from "../../../predefinedStrategies/randomSwitchAndShoot";

const shipIds = ['aiShip', 'playerShip'] as const;

const behaviours: IGameBehaviours = {
    mapBorderCollisionResolver: explosionCollisionResolver,
    shipCollisionResolver: explosionCollisionResolver,
    shotResolver: createSelectiveShotResolver(['aiShip']),
};

const help: LevelHelp = {
    title: 'Get on the green tile',
    text: 'Lets practice the while a bit more. Your goal now is to get to the green tile. ' +
        'You opponent will try to shoot you down, but your gun is broken. Your only hope is ' +
        'to avoid him. He will stay on the x=0 row and will randomly change columns and try to shoot there. ' +
        'Use while to go forward until the tile on [0,0] contains a ship (your enemy). Then go to the right ' +
        'to hide from him. Once the there is no ship on [0,0] go back as he is going to shoot in the other column ' +
        'now. TIP: use "while" with constant "true" instead of condition to repeat something indefinitely. ' +
        'TIP2: once your ship reach the green tile the game is stopped so you can do the algorithm above ' +
        'indefinitely without worrying about you ship flying out from the map. ' +
        'TIP3: you can use "pick up diamond" command to skip a turn. ' +
        'TIP4: while you could fly forward in the second column, you would risk missing the green tile, ' +
        'which is only in the first column. So a safer strategy is to move only in the first one and stay ' +
        'and wait for the enemy to move in the second.'
};

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
    name: 'Your second while',
    urlSlug: 'your-second-while',
    battleType: BattleType.GetThereFirstOrKill,
    battleParams: {turnsRan: 0, maxTurns: 100, finishPositions},
    turnsOrder: List(shipIds),
    shipsAsts: Map([[shipIds[0], randomSwitchAndShootStrategy]]),
    world: secondWhileWorld,
    gameBehaviours: behaviours,
    toolbox: filterCategories(allStrategyCategories, allowedCategories),
    help,
    additionalValidators,
};

