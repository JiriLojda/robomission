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
import {noFunctionsValidator} from "../../../additionalValidators/noFunctionsValidator";
import {createMaxNumberOfBlocksValidator} from "../../../additionalValidators/createMaxNumberOfBlocksValidator";
import {createSelectiveShotResolver} from "../../../../gameBehaviours/createSelectiveShotResolver";
import {createEmptyAst} from "../../../../../../utils/createEmptyAst";
import {
    secondIfsWorld,
    secondIfsWorldShipIds
} from "../../../worlds/intorductoryLevelsWorlds/basicConcepts/secondIfsWorld";
import {createTranslatedHelp, findTranslatedName} from "../../../utils/findTranslatedHelp";
import {HelpTranslationKey} from "../../../../../../localization/helpTranslationKey";
import {createWinModalWithStandardMessage} from "../../../utils/createWinModal";
import {firstWhileLevel} from "./firstWhileLevel";
import {createStandardObjectCollisionResolver} from "../../../../gameBehaviours/createStandardObjectCollisionResolver";
import {createSingleRunRetryPolicy} from "../../../utils/createSingleRunRetryPolicy";

const shipIds = secondIfsWorldShipIds;

const behaviours: IGameBehaviours = {
    mapBorderCollisionResolver: explosionCollisionResolver,
    shipCollisionResolver: createStandardObjectCollisionResolver(),
    shotResolver: createSelectiveShotResolver([]),
};

const help = List([
    createTranslatedHelp(HelpTranslationKey.SecondIfs),
    createTranslatedHelp(HelpTranslationKey.SecondIfs2, 10 * 60, 4),
    createTranslatedHelp(HelpTranslationKey.SecondIfs3, 5 * 60, 2),
]);

const additionalValidators: List<RoboAstValidator> = List([
    noFunctionsValidator,
    createMaxNumberOfBlocksValidator(7),
]);

export const secondIfsLevel: IGameLevel = {
    name: findTranslatedName(HelpTranslationKey.SecondIfs),
    urlSlug: 'if-2',
    battleType: BattleType.JustCollect,
    battleParams: {turnsRan: 0, maxTurns: 100},
    turnsOrder: List(shipIds),
    shipsAsts: Map([[shipIds[1], createEmptyAst()]]),
    teams: createOnTheirOwnTeams(shipIds),
    sameAstGroups: createOnTheirOwnGroups(shipIds),
    world: secondIfsWorld,
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
    winModal: createWinModalWithStandardMessage(firstWhileLevel),
    additionalValidators,
    additionalObjectGenerators: List(),
    isDecisiveWin: winner => winner === secondIfsWorldShipIds[0],
    retryPolicy: createSingleRunRetryPolicy(),
};

