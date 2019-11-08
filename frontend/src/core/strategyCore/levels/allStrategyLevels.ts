import {List} from "immutable";
import {IGameLevel} from "../battleRunner/IGameLevel";
import {basicScanKillAllLevel} from "./singleLevels/basicScanKillAllLevel";
import {starCollectDiamondsBasicLevel} from "./singleLevels/starCollectDiamondsBasicLevel";
import {basicRaceLevel} from "./singleLevels/basicRaceLevel";
import {narrowAlleyPassLevel} from "./singleLevels/narrowAlleyPassLevel";
import {starWithDiamondsLevel} from "./singleLevels/starWithDiamondsLevel";
import {flyLeftShootLevel} from "./singleLevels/introductoryLevels/FlyLeftShootLevel";

export const allStrategyLevels: List<IGameLevel> = List([
    basicScanKillAllLevel,
    starCollectDiamondsBasicLevel,
    basicRaceLevel,
    narrowAlleyPassLevel,
    starWithDiamondsLevel,
    flyLeftShootLevel,
]);

const intoductoryLevels = [
    flyLeftShootLevel,
];

const otherLevels = [
    basicScanKillAllLevel,
    starCollectDiamondsBasicLevel,
    basicRaceLevel,
    narrowAlleyPassLevel,
    starWithDiamondsLevel,
];

export const strategyLevelsCategories: List<[string, List<IGameLevel>]> = List([
    ['Introduction', List(intoductoryLevels)],
    ['Others', List(otherLevels)],
]);
