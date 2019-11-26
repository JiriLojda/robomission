import {List, Map, Set} from "immutable";
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

const shipIds = ['playerShip1', 'playerShip2'] as const;
const teams = List([{name: 'player', members: List(shipIds)}]);

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
    name: findTranslatedName(HelpTranslationKey.DistributedIntro),
    urlSlug: 'your-second-distributed-program',
    battleType: BattleType.TeamGetThereFirst,
    battleParams: {turnsRan: 0, maxTurns: 100, finishPositions: List(finalPositions), teams},
    turnsOrder: List(shipIds),
    shipsAsts: Map(),
    teams,
    sameAstGroups: List([Set(shipIds)]),
    world: distributedIntroLevel2World,
    gameBehaviours: behaviours,
    toolbox: addShipIdConstants(allStrategyCategories, shipIds),
    help,
    winModal: createWinModalWithStandardMessage(),
    additionalValidators: List(),
    isDecisiveWin: winner => winner === 'player',
};
