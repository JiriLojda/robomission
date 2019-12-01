import {List} from "immutable";
import {IGameLevel} from "../battleRunner/IGameLevel";
import {basicScanKillAllLevel} from "./singleLevels/basicScanKillAllLevel";
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
import {diamondsCountingLevel} from "./singleLevels/introductoryLevels/advancedConcepts/diamondsCountingLevel";
import {labyrinthLevel} from "./singleLevels/introductoryLevels/advancedConcepts/labyrinthLevel";
import {labyrinth2Level} from "./singleLevels/introductoryLevels/advancedConcepts/labyrinth2Level";

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

const advancedIntroductoryLevels = [
    diamondsCountingLevel,
    labyrinth2Level,
    labyrinthLevel,
];

const distributedLevels = [
    distributedIntroLevel,
    distributedIntroLevel2,
];

const otherLevels = [
    basicScanKillAllLevel,
    basicRaceLevel,
    narrowAlleyPassLevel,
    starWithDiamondsLevel,
];

export const strategyLevelsCategories: List<[string, List<IGameLevel>]> = List([
    [translate('level.category.introduction'), List(introductoryLevels)],
    [translate('level.category.introduction2'), List(advancedIntroductoryLevels)],
    [translate('level.category.distributed'), List(distributedLevels)],
    [translate('level.category.others'), List(otherLevels)],
]);

export const allStrategyLevels: List<IGameLevel> = List([
    ...introductoryLevels,
    ...advancedIntroductoryLevels,
    ...distributedLevels,
    ...otherLevels,
]);
