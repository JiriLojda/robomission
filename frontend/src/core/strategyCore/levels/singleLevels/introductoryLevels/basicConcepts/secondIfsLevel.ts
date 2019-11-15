import {List, Map} from "immutable";
import {IGameBehaviours} from "../../../../gameBehaviours/IGameBehaviours";
import {explosionCollisionResolver} from "../../../../gameBehaviours/exposionCollisionResolver";
import {
    createOnTheirOwnGroups,
    createOnTheirOwnTeams,
    IGameLevel,
    LevelHelp,
    RoboAstValidator
} from "../../../../battleRunner/IGameLevel";
import {allStrategyCategories, categoryNames, filterCategories} from "../../../../constants/strategyToolbox";
import {BattleType} from "../../../../battleRunner/BattleType";
import {noFunctionsValidator} from "../../../additionalValidators/noFunctionsValidator";
import {createMaxNumberOfBlocksValidator} from "../../../additionalValidators/createMaxNumberOfBlocksValidator";
import {createSelectiveShotResolver} from "../../../../gameBehaviours/createSelectiveShotResolver";
import {createEmptyAst} from "../../../../../../utils/createEmptyAst";
import {secondIfsWorld} from "../../../worlds/intorductoryLevelsWorlds/basicConcepts/secondIfsWorld";
import {createTranslatedHelp, findTranslatedName} from "../../../utils/findTranslatedHelp";
import {HelpTranslationKey} from "../../../../../../localization/helpTranslationKey";
import {createWinModalWithStandardMessage} from "../../../utils/createWinModal";
import {firstWhileLevel} from "./firstWhileLevel";

const shipIds = ['playerShip', 'aiShip'] as const;

const behaviours: IGameBehaviours = {
    mapBorderCollisionResolver: explosionCollisionResolver,
    shipCollisionResolver: explosionCollisionResolver,
    shotResolver: createSelectiveShotResolver([]),
};

const help = List([createTranslatedHelp(HelpTranslationKey.SecondIfs)]);

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
    isDecisiveWin: winner => winner === 'playerShip',
};

