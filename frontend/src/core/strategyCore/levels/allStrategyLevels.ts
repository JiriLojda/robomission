import {List} from "immutable";
import {IGameLevel} from "../battleRunner/IGameLevel";
import {basicScanKillAllLevel} from "./singleLevels/basicScanKillAllLevel";
import {starCollectDiamondsBasicLevel} from "./singleLevels/starCollectDiamondsBasicLevel";
import {basicRaceLevel} from "./singleLevels/basicRaceLevel";
import {narrowAlleyPassLevel} from "./singleLevels/narrowAlleyPassLevel";

export const allStrategyLevels: List<IGameLevel> = List([
    basicScanKillAllLevel,
    starCollectDiamondsBasicLevel,
    basicRaceLevel,
    narrowAlleyPassLevel,
]);
