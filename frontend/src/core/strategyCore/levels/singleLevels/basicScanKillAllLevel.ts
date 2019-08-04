import {BattleType} from "../../battleRunner/BattleType";
import {List, Map} from "immutable";
import {basicScanStrategy} from "../../predefinedStrategies/basicScanStrategy";
import {IGameLevel} from "../../battleRunner/IGameLevel";
import {basicKillAllWorld} from "../worlds/basicKillAllWorld";

export const basicScanKillAllLevel: IGameLevel = {
    name: `Kill 'em all basic`,
    urlSlug: 'kill-em-all-basic',
    battleType: BattleType.KillAll,
    battleParams: {turnsRan: 0, maxTurns: 40},
    turnsOrder: List(['aiShip', 'playerShip']),
    shipsAsts: Map([['aiShip', basicScanStrategy]]),
    world: basicKillAllWorld,
};
