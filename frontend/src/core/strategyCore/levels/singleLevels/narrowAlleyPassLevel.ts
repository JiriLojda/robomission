import {BattleType} from "../../battleRunner/BattleType";
import {List, Map} from "immutable";
import {IGameLevel} from "../../battleRunner/IGameLevel";
import {IGameBehaviours} from "../../gameBehaviours/IGameBehaviours";
import {explosionCollisionResolver} from "../../gameBehaviours/exposionCollisionResolver";
import {Position} from "../../models/position";
import {pushCollisionResolver} from "../../gameBehaviours/pushCollisionResolver";
import {destroyFirstShotResolver} from "../../gameBehaviours/destroyFirstShotResolver";
import {narrowAlleySweeper} from "../../predefinedStrategies/narrowAlleySweeper";
import {narrowPathWorld} from "../worlds/narrowPathWorld";
import {createSelectiveShotResolver} from "../../gameBehaviours/createSelectiveShotResolver";

const behaviours: IGameBehaviours = {
    mapBorderCollisionResolver: explosionCollisionResolver,
    shipCollisionResolver: pushCollisionResolver,
    shotResolver: createSelectiveShotResolver(['aiShip']),
};

const finalPositions = [
    new Position({x: 0, y: 0}),
    new Position({x: 0, y: 1}),
    new Position({x: 0, y: 2}),
];

export const narrowAlleyPassLevel: IGameLevel = {
    name: 'Narrow alley pass',
    urlSlug: 'narrow-alley-pass',
    battleType: BattleType.GetThereFirst,
    battleParams: {turnsRan: 0, maxTurns: 100, finishPositions: List(finalPositions)},
    turnsOrder: List(['aiShip', 'playerShip']),
    shipsAsts: Map([['aiShip', narrowAlleySweeper]]),
    world: narrowPathWorld,
    gameBehaviours: behaviours,
};

