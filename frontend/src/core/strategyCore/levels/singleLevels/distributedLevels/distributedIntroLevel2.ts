import {List, Map} from "immutable";
import {IGameBehaviours} from "../../../gameBehaviours/IGameBehaviours";
import {explosionCollisionResolver} from "../../../gameBehaviours/exposionCollisionResolver";
import {Position} from "../../../models/position";
import {IGameLevel} from "../../../battleRunner/IGameLevel";
import {createTranslatedHelp, findTranslatedName} from "../../utils/findTranslatedHelp";
import {HelpTranslationKey} from "../../../../../localization/helpTranslationKey";
import {BattleType} from "../../../battleRunner/BattleType";
import {addShipIdConstants, allStrategyCategories} from "../../../constants/strategyToolbox";
import {createWinModalWithStandardMessage} from "../../utils/createWinModal";
import {createSelectiveShotResolver} from "../../../gameBehaviours/createSelectiveShotResolver";
import {createStandardObjectCollisionResolver} from "../../../gameBehaviours/createStandardObjectCollisionResolver";
import {distributedIntroLevel2World} from "../../worlds/distributedLevelsWorlds/distributedIntroLevel2World";
import {createSingleRunRetryPolicy} from "../../utils/createSingleRunRetryPolicy";
import {twoPlayersShipIds} from "../../constants/standardShipIds";

const teams = List([{name: 'player', members: twoPlayersShipIds}]);

const behaviours: IGameBehaviours = {
    mapBorderCollisionResolver: explosionCollisionResolver,
    shipCollisionResolver: createStandardObjectCollisionResolver(),
    shotResolver: createSelectiveShotResolver([]),
};

const finalPositions = [
    new Position({x: 1, y: 0}),
    new Position({x: 4, y: 0}),
];

const help = List([createTranslatedHelp(HelpTranslationKey.DistributedIntroLevel2)]);

export const distributedIntroLevel2: IGameLevel = {
    name: findTranslatedName(HelpTranslationKey.DistributedIntroLevel2),
    urlSlug: 'your-second-distributed-program',
    battleType: BattleType.TeamGetThereFirst,
    battleParams: {turnsRan: 0, maxTurns: 100, finishPositions: List(finalPositions), teams},
    turnsOrder: twoPlayersShipIds,
    shipsAsts: Map(),
    teams,
    sameAstGroups: List([twoPlayersShipIds.toSet()]),
    world: distributedIntroLevel2World,
    gameBehaviours: behaviours,
    toolbox: addShipIdConstants(allStrategyCategories, twoPlayersShipIds.toArray()),
    help,
    winModal: createWinModalWithStandardMessage(),
    additionalValidators: List(),
    additionalObjectGenerators: List(),
    isDecisiveWin: winner => winner === 'player',
    retryPolicy: createSingleRunRetryPolicy(),
};

