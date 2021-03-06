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
import {createEmptyAst} from "../../../../../../utils/createEmptyAst";
import {flyLeftShootWorld} from "../../../worlds/intorductoryLevelsWorlds/basicConcepts/flyLeftShootWorld";
import {noFunctionsValidator} from "../../../additionalValidators/noFunctionsValidator";
import {createMaxNumberOfBlocksValidator} from "../../../additionalValidators/createMaxNumberOfBlocksValidator";
import {createTranslatedHelp, findTranslatedName} from "../../../utils/findTranslatedHelp";
import {HelpTranslationKey} from "../../../../../../localization/helpTranslationKey";
import {createWinModalWithStandardMessage} from "../../../utils/createWinModal";
import {turnPickUpLevel} from "./TurnPickUpLevel";
import {createStandardObjectCollisionResolver} from "../../../../gameBehaviours/createStandardObjectCollisionResolver";
import {createSelectiveShotResolver} from "../../../../gameBehaviours/createSelectiveShotResolver";
import {createSingleRunRetryPolicy} from "../../../utils/createSingleRunRetryPolicy";
import {singlePlayerAiStartsShipIds} from "../../../constants/standardShipIds";

const shipIds = singlePlayerAiStartsShipIds.toArray();

const behaviours: IGameBehaviours = {
    mapBorderCollisionResolver: explosionCollisionResolver,
    shipCollisionResolver: createStandardObjectCollisionResolver(),
    shotResolver: createSelectiveShotResolver(shipIds),
};

const help = List([
    createTranslatedHelp(HelpTranslationKey.FlyLeftShoot),
    createTranslatedHelp(HelpTranslationKey.FlyLeftShoot2, 5 * 60, 3),
    createTranslatedHelp(HelpTranslationKey.FlyLeftShoot3, 3 * 60, 0),
]);

const additionalValidators: List<RoboAstValidator> = List([
    noFunctionsValidator,
    createMaxNumberOfBlocksValidator(4),
]);

export const flyLeftShootLevel: IGameLevel = {
    name: findTranslatedName(HelpTranslationKey.FlyLeftShoot),
    urlSlug: 'first-mission',
    battleType: BattleType.KillAll,
    battleParams: {turnsRan: 0, maxTurns: 100},
    turnsOrder: List(shipIds),
    shipsAsts: Map([[shipIds[0], createEmptyAst()]]),
    teams: createOnTheirOwnTeams(shipIds),
    sameAstGroups: createOnTheirOwnGroups(shipIds),
    world: flyLeftShootWorld,
    gameBehaviours: behaviours,
    toolbox: filterCategories(allStrategyCategories, [categoryNames.commands]),
    help,
    winModal: createWinModalWithStandardMessage(turnPickUpLevel),
    additionalValidators,
    additionalObjectGenerators: List(),
    isDecisiveWin: winner => winner === shipIds[1],
    retryPolicy: createSingleRunRetryPolicy(),
};

