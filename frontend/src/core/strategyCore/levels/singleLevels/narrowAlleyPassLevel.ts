import {BattleType} from "../../battleRunner/BattleType";
import {List, Map} from "immutable";
import {createOnTheirOwnGroups, createOnTheirOwnTeams, IGameLevel} from "../../battleRunner/IGameLevel";
import {IGameBehaviours} from "../../gameBehaviours/IGameBehaviours";
import {explosionCollisionResolver} from "../../gameBehaviours/exposionCollisionResolver";
import {Position} from "../../models/position";
import {narrowAlleySweeper} from "../../predefinedStrategies/narrowAlleySweeper";
import {narrowPathWorld, narrowPathWorldShipIds} from "../worlds/narrowPathWorld";
import {createSelectiveShotResolver} from "../../gameBehaviours/createSelectiveShotResolver";
import {addShipIdConstants, allStrategyCategories} from "../../constants/strategyToolbox";
import {createTranslatedHelp, findTranslatedName} from "../utils/findTranslatedHelp";
import {HelpTranslationKey} from "../../../../localization/helpTranslationKey";
import {createWinModalWithStandardMessage} from "../utils/createWinModal";
import {starWithDiamondsLevel} from "./starWithDiamondsLevel";
import {createStandardObjectCollisionResolver} from "../../gameBehaviours/createStandardObjectCollisionResolver";

const behaviours: IGameBehaviours = {
    mapBorderCollisionResolver: explosionCollisionResolver,
    shipCollisionResolver: createStandardObjectCollisionResolver(),
    shotResolver: createSelectiveShotResolver([narrowPathWorldShipIds[0]]),
};

const finalPositions = [
    new Position({x: 0, y: 0}),
    new Position({x: 0, y: 1}),
    new Position({x: 0, y: 2}),
];

const shipIds = narrowPathWorldShipIds.reverse();

const help = List([createTranslatedHelp(HelpTranslationKey.NarrowAlleyPass)]);

export const narrowAlleyPassLevel: IGameLevel = {
    name: findTranslatedName(HelpTranslationKey.NarrowAlleyPass),
    urlSlug: 'narrow-alley-pass',
    battleType: BattleType.GetThereFirst,
    battleParams: {turnsRan: 0, maxTurns: 100, finishPositions: List(finalPositions)},
    turnsOrder: List(shipIds),
    shipsAsts: Map([[shipIds[0], narrowAlleySweeper]]),
    teams: createOnTheirOwnTeams(shipIds),
    sameAstGroups: createOnTheirOwnGroups(shipIds),
    world: narrowPathWorld,
    gameBehaviours: behaviours,
    toolbox: addShipIdConstants(allStrategyCategories, shipIds),
    help,
    winModal: createWinModalWithStandardMessage(starWithDiamondsLevel),
    additionalValidators: List(),
    additionalObjectGenerators: List(),
    isDecisiveWin: winner => winner === narrowPathWorldShipIds[1],
};

