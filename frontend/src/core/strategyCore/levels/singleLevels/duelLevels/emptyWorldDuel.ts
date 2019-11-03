import {List, Map} from "immutable";
import {explosionCollisionResolver} from "../../../gameBehaviours/exposionCollisionResolver";
import {IGameBehaviours} from "../../../gameBehaviours/IGameBehaviours";
import {IGameLevel} from "../../../battleRunner/IGameLevel";
import {BattleType} from "../../../battleRunner/BattleType";
import {empty77World} from "../../worlds/empty77World";
import {destroyFirstShotResolver} from "../../../gameBehaviours/destroyFirstShotResolver";

const behaviours: IGameBehaviours = {
    mapBorderCollisionResolver: explosionCollisionResolver,
    shipCollisionResolver: explosionCollisionResolver,
    shotResolver: destroyFirstShotResolver,
};

export const emptyWorldDuel: IGameLevel = {
    name: 'Empty world duel',
    urlSlug: 'empty-world-duel',
    battleType: BattleType.KillAll,
    battleParams: {turnsRan: 0, maxTurns: 100},
    turnsOrder: List(['first', 'second']),
    shipsAsts: Map(),
    world: empty77World,
    gameBehaviours: behaviours,
};
