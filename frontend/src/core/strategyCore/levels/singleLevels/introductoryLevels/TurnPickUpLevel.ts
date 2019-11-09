import {List, Map} from "immutable";
import {IGameBehaviours} from "../../../gameBehaviours/IGameBehaviours";
import {explosionCollisionResolver} from "../../../gameBehaviours/exposionCollisionResolver";
import {destroyFirstShotResolver} from "../../../gameBehaviours/destroyFirstShotResolver";
import {IGameLevel, LevelHelp, RoboAstValidator} from "../../../battleRunner/IGameLevel";
import {allStrategyCategories, categoryNames, filterCategories} from "../../../constants/strategyToolbox";
import {BattleType} from "../../../battleRunner/BattleType";
import {addSimpleStatementToRoboAstBody, createEmptyAst} from "../../../../../utils/createEmptyAst";
import {noFunctionsValidator} from "../../additionalValidators/noFunctionsValidator";
import {createMaxNumberOfBlocksValidator} from "../../additionalValidators/createMaxNumberOfBlocksValidator";
import {turnDiamondsWorld} from "../../worlds/intorductoryLevelsWorlds/TurnDiamondsWorld";
import {StatementType} from "../../../enums/statementType";

const behaviours: IGameBehaviours = {
    mapBorderCollisionResolver: explosionCollisionResolver,
    shipCollisionResolver: explosionCollisionResolver,
    shotResolver: destroyFirstShotResolver,
};

const shipIds = ['aiShip', 'playerShip'] as const;

const help: LevelHelp = {
    title: 'Collect all the diamonds',
    text: 'Now lets learn the rest of the commands you can give to your ship. ' +
        'In this round you will have to collect more diamonds than your opponent. ' +
        'Remember, you cannot win by shooting you opponent. You have to have more diamonds collected. ' +
        'He is going to collect only the diamond he stands on, so you have to take the other two to win.' +
        'To pick up a diamond use the "pick up diamond" command. You will also have to turn around. ' +
        'To turn your ship use the "turn left" or "turn right" command.'
};

const additionalValidators: List<RoboAstValidator> = List([
    noFunctionsValidator,
    createMaxNumberOfBlocksValidator(13),
]);

const aiRoboAst = addSimpleStatementToRoboAstBody(StatementType.PickUpDiamond, createEmptyAst());

export const turnPickUpLevel: IGameLevel = {
    name: 'Turn around',
    urlSlug: 'turn-around',
    battleType: BattleType.JustCollect,
    battleParams: {turnsRan: 0, maxTurns: 100},
    turnsOrder: List(shipIds),
    shipsAsts: Map([[shipIds[0], aiRoboAst]]),
    world: turnDiamondsWorld,
    gameBehaviours: behaviours,
    toolbox: filterCategories(allStrategyCategories, [categoryNames.commands]),
    help,
    additionalValidators,
};

