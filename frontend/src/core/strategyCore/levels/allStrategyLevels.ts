import {List} from "immutable";
import {IGameLevel} from "../battleRunner/IGameLevel";
import {basicScanKillAllLevel} from "./singleLevels/basicScanKillAllLevel";
import {starCollectDiamondsBasicLevel} from "./singleLevels/starCollectDiamondsBasicLevel";
import {basicRaceLevel} from "./singleLevels/basicRaceLevel";
import {narrowAlleyPassLevel} from "./singleLevels/narrowAlleyPassLevel";
import {starWithDiamondsLevel} from "./singleLevels/starWithDiamondsLevel";
import {flyLeftShootLevel} from "./singleLevels/introductoryLevels/FlyLeftShootLevel";
import {turnPickUpLevel} from "./singleLevels/introductoryLevels/TurnPickUpLevel";
import {firstChallengeLevel} from "./singleLevels/introductoryLevels/firstChallengeLevel";
import {firstRepeatLevel} from "./singleLevels/introductoryLevels/firstRepeatLevel";
import {firstWhileLevel} from "./singleLevels/introductoryLevels/firstWhileLevel";
import {secondWhileLevel} from "./singleLevels/introductoryLevels/secondWhileLevel";
import {firstIfsLevel} from "./singleLevels/introductoryLevels/firstIfsLevel";
import {secondIfsLevel} from "./singleLevels/introductoryLevels/secondIfsLevel";
import {translate} from "../../../localization";

const introductoryLevels = [
    flyLeftShootLevel,
    turnPickUpLevel,
    firstChallengeLevel,
    firstRepeatLevel,
    firstIfsLevel,
    secondIfsLevel,
    firstWhileLevel,
    secondWhileLevel,
];

const otherLevels = [
    basicScanKillAllLevel,
    starCollectDiamondsBasicLevel,
    basicRaceLevel,
    narrowAlleyPassLevel,
    starWithDiamondsLevel,
];

export const strategyLevelsCategories: List<[string, List<IGameLevel>]> = List([
    [translate('level.category.introduction'), List(introductoryLevels)],
    [translate('level.category.others'), List(otherLevels)],
]);

export const allStrategyLevels: List<IGameLevel> = List([
    ...introductoryLevels,
    ...otherLevels,
]);
