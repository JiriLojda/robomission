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
import {firstChallengeWorld} from "../../../worlds/intorductoryLevelsWorlds/basicConcepts/firstChallengeWorld";
import {pushCollisionResolver} from "../../../../gameBehaviours/pushCollisionResolver";
import {createSelectiveShotResolver} from "../../../../gameBehaviours/createSelectiveShotResolver";
import {shipRepresentingObjects} from "../../../../enums/worldObjectType";
import {justShootingStrategy} from "../../../../predefinedStrategies/justShootingStrategy";
import {createTranslatedHelp, findTranslatedName} from "../../../utils/findTranslatedHelp";
import {HelpTranslationKey} from "../../../../../../localization/helpTranslationKey";
import {createWinModalWithStandardMessage} from "../../../utils/createWinModal";
import {firstRepeatLevel} from "./firstRepeatLevel";

const shipIds = ['playerShip', 'aiShip'] as const;

const behaviours: IGameBehaviours = {
    mapBorderCollisionResolver: explosionCollisionResolver,
    shipCollisionResolver: pushCollisionResolver,
    shotResolver: createSelectiveShotResolver(shipIds, shipRepresentingObjects),
};
const help: LevelHelp = createTranslatedHelp(HelpTranslationKey.FirstChallenge);

const additionalValidators: List<RoboAstValidator> = List([
    noFunctionsValidator,
    createMaxNumberOfBlocksValidator(30),
]);

export const firstChallengeLevel: IGameLevel = {
    name: findTranslatedName(HelpTranslationKey.FirstChallenge),
    urlSlug: 'first-challenge',
    battleType: BattleType.KillAll,
    battleParams: {turnsRan: 0, maxTurns: 100},
    turnsOrder: List(shipIds),
    shipsAsts: Map([[shipIds[1], justShootingStrategy]]),
    teams: createOnTheirOwnTeams(shipIds),
    sameAstGroups: createOnTheirOwnGroups(shipIds),
    world: firstChallengeWorld,
    gameBehaviours: behaviours,
    toolbox: filterCategories(allStrategyCategories, [categoryNames.commands]),
    help,
    winModal: createWinModalWithStandardMessage(firstRepeatLevel),
    additionalValidators,
    isDecisiveWin: winner => winner === 'playerShip',
};

