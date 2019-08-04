import {List} from "immutable";
import {IGameLevel} from "../battleRunner/IGameLevel";
import {basicScanKillAllLevel} from "./singleLevels/basicScanKillAllLevel";
import {starCollectDiamondsBasicLevel} from "./singleLevels/starCollectDiamondsBasicLevel";

export const allStrategyLevels: List<IGameLevel> = List([
    basicScanKillAllLevel,
    starCollectDiamondsBasicLevel,
]);
