import {List, Map} from "immutable";
import {IGameBehaviours} from "../../../../gameBehaviours/IGameBehaviours";
import {explosionCollisionResolver} from "../../../../gameBehaviours/exposionCollisionResolver";
import {destroyFirstShotResolver} from "../../../../gameBehaviours/destroyFirstShotResolver";
import {IGameLevel, LevelHelp, RoboAstValidator} from "../../../../battleRunner/IGameLevel";
import {allStrategyCategories, categoryNames, filterCategories} from "../../../../constants/strategyToolbox";
import {BattleType} from "../../../../battleRunner/BattleType";
import {addSimpleStatementToRoboAstBody, createEmptyAst} from "../../../../../../utils/createEmptyAst";
import {noFunctionsValidator} from "../../../additionalValidators/noFunctionsValidator";
import {createMaxNumberOfBlocksValidator} from "../../../additionalValidators/createMaxNumberOfBlocksValidator";
import {turnDiamondsWorld} from "../../../worlds/intorductoryLevelsWorlds/basicConcepts/TurnDiamondsWorld";
import {StatementType} from "../../../../enums/statementType";
import {createTranslatedHelp, findTranslatedName} from "../../../utils/findTranslatedHelp";
import {HelpTranslationKey} from "../../../../../../localization/helpTranslationKey";

const behaviours: IGameBehaviours = {
    mapBorderCollisionResolver: explosionCollisionResolver,
    shipCollisionResolver: explosionCollisionResolver,
    shotResolver: destroyFirstShotResolver,
};

const shipIds = ['aiShip', 'playerShip'] as const;

const help: LevelHelp = createTranslatedHelp(HelpTranslationKey.TurnPickUp);

const additionalValidators: List<RoboAstValidator> = List([
    noFunctionsValidator,
    createMaxNumberOfBlocksValidator(13),
]);

const aiRoboAst = addSimpleStatementToRoboAstBody(StatementType.PickUpDiamond, createEmptyAst());

export const turnPickUpLevel: IGameLevel = {
    name: findTranslatedName(HelpTranslationKey.TurnPickUp),
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

