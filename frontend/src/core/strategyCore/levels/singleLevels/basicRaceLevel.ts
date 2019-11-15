import {BattleType} from "../../battleRunner/BattleType";
import {List, Map} from "immutable";
import {createOnTheirOwnGroups, createOnTheirOwnTeams, IGameLevel, LevelHelp} from "../../battleRunner/IGameLevel";
import {IGameBehaviours} from "../../gameBehaviours/IGameBehaviours";
import {explosionCollisionResolver} from "../../gameBehaviours/exposionCollisionResolver";
import {Position} from "../../models/position";
import {raceBasicWorld} from "../worlds/raceBasicWorld";
import {pushCollisionResolver} from "../../gameBehaviours/pushCollisionResolver";
import {basicRaceStrategy} from "../../predefinedStrategies/basicRaceStrategy";
import {destroyFirstShotResolver} from "../../gameBehaviours/destroyFirstShotResolver";
import {addShipIdConstants, allStrategyCategories} from "../../constants/strategyToolbox";
import {createTranslatedHelp, findTranslatedName} from "../utils/findTranslatedHelp";
import {HelpTranslationKey} from "../../../../localization/helpTranslationKey";
import {createWinModalWithStandardMessage} from "../utils/createWinModal";
import {narrowAlleyPassLevel} from "./narrowAlleyPassLevel";

const behaviours: IGameBehaviours = {
    mapBorderCollisionResolver: explosionCollisionResolver,
    shipCollisionResolver: pushCollisionResolver,
    shotResolver: destroyFirstShotResolver,
};

const finalPositions = [
    new Position({x: 0, y: 2}),
    new Position({x: 0, y: 4}),
];

const shipIds = ['aiShip', 'playerShip'] as const;

const help: LevelHelp = createTranslatedHelp(HelpTranslationKey.BasicRace);

export const basicRaceLevel: IGameLevel = {
    name: findTranslatedName(HelpTranslationKey.BasicRace),
    urlSlug: 'simple-race',
    battleType: BattleType.GetThereFirst,
    battleParams: {turnsRan: 0, maxTurns: 100, finishPositions: List(finalPositions)},
    turnsOrder: List(shipIds),
    shipsAsts: Map([[shipIds[0], basicRaceStrategy]]),
    teams: createOnTheirOwnTeams(shipIds),
    sameAstGroups: createOnTheirOwnGroups(shipIds),
    world: raceBasicWorld,
    gameBehaviours: behaviours,
    toolbox: addShipIdConstants(allStrategyCategories, shipIds),
    help,
    winModal: createWinModalWithStandardMessage(narrowAlleyPassLevel),
    additionalValidators: List(),
    isDecisiveWin: winner => winner === 'playerShip',
};

