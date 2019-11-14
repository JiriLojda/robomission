import {List, Map, Set} from "immutable";
import {IGameBehaviours} from "../../../gameBehaviours/IGameBehaviours";
import {explosionCollisionResolver} from "../../../gameBehaviours/exposionCollisionResolver";
import {pushCollisionResolver} from "../../../gameBehaviours/pushCollisionResolver";
import {destroyFirstShotResolver} from "../../../gameBehaviours/destroyFirstShotResolver";
import {Position} from "../../../models/position";
import {IGameLevel, LevelHelp} from "../../../battleRunner/IGameLevel";
import {createTranslatedHelp, findTranslatedName} from "../../utils/findTranslatedHelp";
import {HelpTranslationKey} from "../../../../../localization/helpTranslationKey";
import {BattleType} from "../../../battleRunner/BattleType";
import {addShipIdConstants, allStrategyCategories} from "../../../constants/strategyToolbox";
import {distributedIntroLevelWorld} from "../../worlds/distributedLevelsWorlds/distributedIntroLevelWorld";

const behaviours: IGameBehaviours = {
    mapBorderCollisionResolver: explosionCollisionResolver,
    shipCollisionResolver: pushCollisionResolver,
    shotResolver: destroyFirstShotResolver,
};

const finalPositions = [
    new Position({x: 1, y: 0}),
    new Position({x: 4, y: 0}),
];

const shipIds = ['playerShip1', 'playerShip2'] as const;
const teams = List([{name: 'player', members: List(shipIds)}]);

const help: LevelHelp = createTranslatedHelp(HelpTranslationKey.DistributedIntro);

export const distributedIntroLevel: IGameLevel = {
    name: findTranslatedName(HelpTranslationKey.DistributedIntro),
    urlSlug: 'your-first-distributed-program',
    battleType: BattleType.TeamGetThereFirst,
    battleParams: {turnsRan: 0, maxTurns: 100, finishPositions: List(finalPositions), teams},
    turnsOrder: List(shipIds),
    shipsAsts: Map(),
    teams,
    sameAstGroups: List([Set(shipIds)]),
    world: distributedIntroLevelWorld,
    gameBehaviours: behaviours,
    toolbox: addShipIdConstants(allStrategyCategories, shipIds),
    help,
    additionalValidators: List(),
    isDecisiveWin: winner => winner === 'player',
};

