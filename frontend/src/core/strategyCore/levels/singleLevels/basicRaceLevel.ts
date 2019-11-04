import {BattleType} from "../../battleRunner/BattleType";
import {List, Map} from "immutable";
import {IGameLevel, LevelHelp} from "../../battleRunner/IGameLevel";
import {IGameBehaviours} from "../../gameBehaviours/IGameBehaviours";
import {explosionCollisionResolver} from "../../gameBehaviours/exposionCollisionResolver";
import {Position} from "../../models/position";
import {raceBasicWorld} from "../worlds/raceBasicWorld";
import {pushCollisionResolver} from "../../gameBehaviours/pushCollisionResolver";
import {basicRaceStrategy} from "../../predefinedStrategies/basicRaceStrategy";
import {destroyFirstShotResolver} from "../../gameBehaviours/destroyFirstShotResolver";
import {addShipIdConstants, allStrategyCategories} from "../../constants/strategyToolbox";

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

const help: LevelHelp = {
    title: 'Race to for the win.',
    text: 'In this level you have to be the fastest rocket and get to one of the colored tiles ' +
        'on the other side of the map. Also hitting an object does not result in a crash. ' +
        'Upon moving to an occupied tile one of two happens. 1) There is a free tile in the ' +
        'direction the ship is moving, then both, hitting object and hit objects move in this direction ' +
        'effectively pushing the hit object. 2) The tile in the direction the ship is moving is ' +
        'either occupied or out of the map. Then nothing happens, the ship just can\'t move.'
};

export const basicRaceLevel: IGameLevel = {
    name: 'Simple race',
    urlSlug: 'simple-race',
    battleType: BattleType.GetThereFirst,
    battleParams: {turnsRan: 0, maxTurns: 100, finishPositions: List(finalPositions)},
    turnsOrder: List(shipIds),
    shipsAsts: Map([[shipIds[0], basicRaceStrategy]]),
    world: raceBasicWorld,
    gameBehaviours: behaviours,
    toolbox: addShipIdConstants(allStrategyCategories, shipIds),
    help,
};

