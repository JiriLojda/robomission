import {List, Map} from "immutable";
import {IGameBehaviours} from "../../../gameBehaviours/IGameBehaviours";
import {explosionCollisionResolver} from "../../../gameBehaviours/exposionCollisionResolver";
import {IGameLevel, RoboAstValidator} from "../../../battleRunner/IGameLevel";
import {createTranslatedHelp, findTranslatedName} from "../../utils/findTranslatedHelp";
import {HelpTranslationKey} from "../../../../../localization/helpTranslationKey";
import {BattleType} from "../../../battleRunner/BattleType";
import {addShipIdConstants, allStrategyCategories} from "../../../constants/strategyToolbox";
import {createWinModalWithStandardMessage} from "../../utils/createWinModal";
import {createSelectiveShotResolver} from "../../../gameBehaviours/createSelectiveShotResolver";
import {createStandardObjectCollisionResolver} from "../../../gameBehaviours/createStandardObjectCollisionResolver";
import {createSingleRunRetryPolicy} from "../../utils/createSingleRunRetryPolicy";
import {standardAiShipIds, twoPlayersShipIds} from "../../constants/standardShipIds";
import {justShootingStrategy} from "../../../predefinedStrategies/justShootingStrategy";
import {teamShootingLevelWorld} from "../../worlds/distributedLevelsWorlds/teamShootingLevelWorld";
import {createMaxNumberOfBlocksValidator} from "../../additionalValidators/createMaxNumberOfBlocksValidator";

const teams = List([
    {name: 'player', members: twoPlayersShipIds},
    {name: 'ai', members: standardAiShipIds.take(1)},
]);

const shipIds = twoPlayersShipIds.concat(standardAiShipIds.take(1));

const behaviours: IGameBehaviours = {
    mapBorderCollisionResolver: explosionCollisionResolver,
    shipCollisionResolver: createStandardObjectCollisionResolver(),
    shotResolver: createSelectiveShotResolver(shipIds.toArray()),
};

const help = List([
    createTranslatedHelp(HelpTranslationKey.TeamShooting),
    createTranslatedHelp(HelpTranslationKey.TeamShooting2, 4 * 60, 4),
    createTranslatedHelp(HelpTranslationKey.TeamShooting3, 4 * 60, 4),
]);

const additionalValidators: List<RoboAstValidator> = List([
    createMaxNumberOfBlocksValidator(15),
]);

export const teamShootingLevel: IGameLevel = {
    name: findTranslatedName(HelpTranslationKey.TeamShooting),
    urlSlug: 'team-shooting',
    battleType: BattleType.TeamKillAll,
    battleParams: {turnsRan: 0, maxTurns: 100, teams},
    turnsOrder: shipIds,
    shipsAsts: Map([[standardAiShipIds.get(0)!, justShootingStrategy]]),
    teams,
    sameAstGroups: List([twoPlayersShipIds.toSet(), standardAiShipIds.take(1).toSet()]),
    world: teamShootingLevelWorld,
    gameBehaviours: behaviours,
    toolbox: addShipIdConstants(allStrategyCategories, twoPlayersShipIds.toArray()),
    help,
    winModal: createWinModalWithStandardMessage(),
    additionalValidators,
    additionalObjectGenerators: List(),
    isDecisiveWin: winner => winner === 'player',
    retryPolicy: createSingleRunRetryPolicy(),
};

