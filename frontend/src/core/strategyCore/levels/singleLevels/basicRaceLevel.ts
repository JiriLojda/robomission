import {BattleType} from "../../battleRunner/BattleType";
import {List, Map} from "immutable";
import {IGameLevel} from "../../battleRunner/IGameLevel";
import {IGameBehaviours} from "../../gameBehaviours/IGameBehaviours";
import {explosionCollisionResolver} from "../../gameBehaviours/exposionCollisionResolver";
import {Position} from "../../models/position";
import {raceBasicWorld} from "../worlds/raceBasicWorld";
import {pushCollisionResolver} from "../../gameBehaviours/pushCollisionResolver";
import {basicRaceStrategy} from "../../predefinedStrategies/basicRaceStrategy";

const behaviours: IGameBehaviours = {
    mapBorderCollisionResolver: explosionCollisionResolver,
    shipCollisionResolver: pushCollisionResolver,
};

const finalPositions = [
    new Position({x: 0, y: 2}),
    new Position({x: 0, y: 4}),
];

export const basicRaceLevel: IGameLevel = {
    name: 'Simple race',
    urlSlug: 'simple-race',
    battleType: BattleType.GetThereFirst,
    battleParams: {turnsRan: 0, maxTurns: 100, finishPositions: List(finalPositions)},
    turnsOrder: List(['aiShip', 'playerShip']),
    shipsAsts: Map([['aiShip', basicRaceStrategy]]),
    world: raceBasicWorld,
    gameBehaviours: behaviours,
};

