import {BattleType} from "../../battleRunner/BattleType";
import {List, Map} from "immutable";
import {IGameLevel} from "../../battleRunner/IGameLevel";
import {centralDiamondsBasicStrategy} from "../../predefinedStrategies/centralDiamondsBasicStrategy";
import {diamondStarWorld} from "../worlds/diamondStarWorld";
import {IGameBehaviours} from "../../gameBehaviours/IGameBehaviours";
import {explosionCollisionResolver} from "../../gameBehaviours/exposionCollisionResolver";
import {destroyFirstShotResolver} from "../../gameBehaviours/destroyFirstShotResolver";

const behaviours: IGameBehaviours = {
    mapBorderCollisionResolver: explosionCollisionResolver,
    shipCollisionResolver: explosionCollisionResolver,
    shotResolver: destroyFirstShotResolver,
};
export const starCollectDiamondsBasicLevel: IGameLevel = {
    name: `Star collect basic`,
    urlSlug: 'star-collect-basic',
    battleType: BattleType.CollectOrKill,
    battleParams: {turnsRan: 0, maxTurns: 40},
    turnsOrder: List(['aiShip', 'playerShip']),
    shipsAsts: Map([['aiShip', centralDiamondsBasicStrategy]]),
    world: diamondStarWorld,
    gameBehaviours: behaviours,
};