import {IGameLevel} from "../../battleRunner/IGameLevel";
import {List} from "immutable";
import {emptyWorldDuel} from "../singleLevels/duelLevels/emptyWorldDuel";

export const allDuelLevels: List<IGameLevel> = List([
    emptyWorldDuel,
]);
