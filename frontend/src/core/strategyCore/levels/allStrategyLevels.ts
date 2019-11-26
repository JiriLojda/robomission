import {List} from "immutable";
import {IGameLevel} from "../battleRunner/IGameLevel";
import {basicScanKillAllLevel} from "./singleLevels/basicScanKillAllLevel";
import {starCollectDiamondsBasicLevel} from "./singleLevels/starCollectDiamondsBasicLevel";
import {basicRaceLevel} from "./singleLevels/basicRaceLevel";
import {narrowAlleyPassLevel} from "./singleLevels/narrowAlleyPassLevel";
import {starWithDiamondsLevel} from "./singleLevels/starWithDiamondsLevel";
import {flyLeftShootLevel} from "./singleLevels/introductoryLevels/basicConcepts/FlyLeftShootLevel";
import {turnPickUpLevel} from "./singleLevels/introductoryLevels/basicConcepts/TurnPickUpLevel";
import {firstChallengeLevel} from "./singleLevels/introductoryLevels/basicConcepts/firstChallengeLevel";
import {firstRepeatLevel} from "./singleLevels/introductoryLevels/basicConcepts/firstRepeatLevel";
import {firstWhileLevel} from "./singleLevels/introductoryLevels/basicConcepts/firstWhileLevel";
import {secondWhileLevel} from "./singleLevels/introductoryLevels/basicConcepts/secondWhileLevel";
import {firstIfsLevel} from "./singleLevels/introductoryLevels/basicConcepts/firstIfsLevel";
import {secondIfsLevel} from "./singleLevels/introductoryLevels/basicConcepts/secondIfsLevel";
import {translate} from "../../../localization";
import {distributedIntroLevel} from "./singleLevels/distributedLevels/distributedIntroLevel";
import {distributedIntroLevel2} from "./singleLevels/distributedLevels/distributedIntroLevel2";

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

const distributedLevels = [
    distributedIntroLevel,
    distributedIntroLevel2,
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
    [translate('level.category.distributed'), List(distributedLevels)],
    [translate('level.category.others'), List(otherLevels)],
]);

export const allStrategyLevels: List<IGameLevel> = List([
    ...introductoryLevels,
    ...distributedLevels,
    ...otherLevels,
]);
