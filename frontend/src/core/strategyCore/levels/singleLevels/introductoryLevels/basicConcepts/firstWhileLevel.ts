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
    firstRepeatWorld,
    firstRepeatWorldShipIds
} from "../../../worlds/intorductoryLevelsWorlds/basicConcepts/firstRepeatWorld";
import {createRestrictedBlocksValidator} from "../../../additionalValidators/createRestrictedBlocksValidator";
import {StatementType} from "../../../../enums/statementType";
import {createTranslatedHelp, findTranslatedName} from "../../../utils/findTranslatedHelp";
import {HelpTranslationKey} from "../../../../../../localization/helpTranslationKey";
import {createWinModalWithStandardMessage} from "../../../utils/createWinModal";
import {secondWhileLevel} from "./secondWhileLevel";
import {createStandardObjectCollisionResolver} from "../../../../gameBehaviours/createStandardObjectCollisionResolver";

const shipIds = firstRepeatWorldShipIds;

const behaviours: IGameBehaviours = {
    mapBorderCollisionResolver: explosionCollisionResolver,
    shipCollisionResolver: createStandardObjectCollisionResolver(),
    shotResolver: createSelectiveShotResolver([]),
};

const help = List([createTranslatedHelp(HelpTranslationKey.FirstWhile)]);

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
    name: findTranslatedName(HelpTranslationKey.FirstWhile),
    urlSlug: 'your-first-while',
    battleType: BattleType.JustCollect,
    battleParams: {turnsRan: 0, maxTurns: 100},
    turnsOrder: List(shipIds),
    shipsAsts: Map([[shipIds[1], createEmptyAst()]]),
    teams: createOnTheirOwnTeams(shipIds),
    sameAstGroups: createOnTheirOwnGroups(shipIds),
    world: firstRepeatWorld,
    gameBehaviours: behaviours,
    toolbox: filterCategories(allStrategyCategories, allowedCategories),
    help,
    winModal: createWinModalWithStandardMessage(secondWhileLevel),
    additionalValidators,
    additionalObjectGenerators: List(),
    isDecisiveWin: winner => winner === firstRepeatWorldShipIds[0],
};

