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
import {addSimpleStatementToRoboAstBody, createEmptyAst} from "../../../../../../utils/createEmptyAst";
import {noFunctionsValidator} from "../../../additionalValidators/noFunctionsValidator";
import {createMaxNumberOfBlocksValidator} from "../../../additionalValidators/createMaxNumberOfBlocksValidator";
import {
    turnDiamondsWorld,
    turnDiamondsWorldShipIds
} from "../../../worlds/intorductoryLevelsWorlds/basicConcepts/TurnDiamondsWorld";
import {StatementType} from "../../../../enums/statementType";
import {createTranslatedHelp, findTranslatedName} from "../../../utils/findTranslatedHelp";
import {HelpTranslationKey} from "../../../../../../localization/helpTranslationKey";
import {createWinModalWithStandardMessage} from "../../../utils/createWinModal";
import {firstChallengeLevel} from "./firstChallengeLevel";
import {createSelectiveShotResolver} from "../../../../gameBehaviours/createSelectiveShotResolver";
import {createStandardObjectCollisionResolver} from "../../../../gameBehaviours/createStandardObjectCollisionResolver";

const shipIds = turnDiamondsWorldShipIds.reverse();

const behaviours: IGameBehaviours = {
    mapBorderCollisionResolver: explosionCollisionResolver,
    shipCollisionResolver: createStandardObjectCollisionResolver(),
    shotResolver: createSelectiveShotResolver(shipIds),
};

const help = List([
    createTranslatedHelp(HelpTranslationKey.TurnPickUp),
    createTranslatedHelp(HelpTranslationKey.TurnPickUp2, 8 * 60, 3),
]);

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
    teams: createOnTheirOwnTeams(shipIds),
    sameAstGroups: createOnTheirOwnGroups(shipIds),
    world: turnDiamondsWorld,
    gameBehaviours: behaviours,
    toolbox: filterCategories(allStrategyCategories, [categoryNames.commands]),
    help,
    winModal: createWinModalWithStandardMessage(firstChallengeLevel),
    additionalValidators,
    isDecisiveWin: winner => winner === turnDiamondsWorldShipIds[1],
};

