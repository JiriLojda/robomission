import {List, Map} from "immutable";
import {explosionCollisionResolver} from "../../../gameBehaviours/exposionCollisionResolver";
import {IGameBehaviours} from "../../../gameBehaviours/IGameBehaviours";
import {IGameLevel, LevelHelp} from "../../../battleRunner/IGameLevel";
import {BattleType} from "../../../battleRunner/BattleType";
import {empty77World} from "../../worlds/empty77World";
import {destroyFirstShotResolver} from "../../../gameBehaviours/destroyFirstShotResolver";
import {addShipIdConstants, allStrategyCategories} from "../../../constants/strategyToolbox";

const behaviours: IGameBehaviours = {
    mapBorderCollisionResolver: explosionCollisionResolver,
    shipCollisionResolver: explosionCollisionResolver,
    shotResolver: destroyFirstShotResolver,
};

const shipIds = ['first', 'second'] as const;

const help: LevelHelp = {
    title: 'Simple duel level',
    text: 'This is a simple duel level. Try to shoot your opponent on an empty map.' +
        'Either of you can edit your code through the "edit first/second player code" buttons. ' +
        'Once you are satisfied with you code submit it and run the battle.',
};

export const emptyWorldDuel: IGameLevel = {
    name: 'Empty world duel',
    urlSlug: 'empty-world-duel',
    battleType: BattleType.KillAll,
    battleParams: {turnsRan: 0, maxTurns: 100},
    turnsOrder: List(shipIds),
    shipsAsts: Map(),
    world: empty77World,
    gameBehaviours: behaviours,
    toolbox: addShipIdConstants(allStrategyCategories, shipIds),
    help,
};
