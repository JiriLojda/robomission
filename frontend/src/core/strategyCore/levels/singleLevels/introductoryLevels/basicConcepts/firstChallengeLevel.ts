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
import {
    firstChallengeWorld,
    firstChallengeWorldShipIds
} from "../../../worlds/intorductoryLevelsWorlds/basicConcepts/firstChallengeWorld";
import {createSelectiveShotResolver} from "../../../../gameBehaviours/createSelectiveShotResolver";
import {shipRepresentingObjects} from "../../../../enums/worldObjectType";
import {justShootingStrategy} from "../../../../predefinedStrategies/justShootingStrategy";
import {createTranslatedHelp, findTranslatedName} from "../../../utils/findTranslatedHelp";
import {HelpTranslationKey} from "../../../../../../localization/helpTranslationKey";
import {createWinModalWithStandardMessage} from "../../../utils/createWinModal";
import {firstRepeatLevel} from "./firstRepeatLevel";
import {createStandardObjectCollisionResolver} from "../../../../gameBehaviours/createStandardObjectCollisionResolver";

const shipIds = firstChallengeWorldShipIds;

const behaviours: IGameBehaviours = {
    mapBorderCollisionResolver: explosionCollisionResolver,
    shipCollisionResolver: createStandardObjectCollisionResolver(),
    shotResolver: createSelectiveShotResolver(shipIds, shipRepresentingObjects),
};
const help = List([
    createTranslatedHelp(HelpTranslationKey.FirstChallenge),
    createTranslatedHelp(HelpTranslationKey.FirstChallenge2, 8 * 60, 4),
]);

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

