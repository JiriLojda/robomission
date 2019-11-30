import {combineReducers} from 'redux';
import {currentWorld} from "./internalReducers/currentWorld";
import {editedRoboAst} from "./internalReducers/editedRoboAst";
import {isHelpModalShown} from "./internalReducers/isHelpModalShown";
import {isMapOverlayShown} from "./internalReducers/isMapOverlayShown";
import {runtimeError} from "./internalReducers/runtimeError";
import {validationResult} from "./internalReducers/validationResult";
import {codeError} from "./internalReducers/codeError";
import {battleResult} from "./internalReducers/battleResult";
import {drawingSpeed} from "./internalReducers/drawingSpeed";
import {IStrategyEditor} from "../IStore";
import {isGameRunning} from "./internalReducers/isGameRunning";
import {battleSeriesResult} from "./internalReducers/battleSeriesResult";

export const strategyEditor = combineReducers<IStrategyEditor>({
    currentWorld,
    editedRoboAst,
    isHelpModalShown,
    isMapOverlayShown,
    runtimeError,
    validationResult,
    codeError,
    battleResult,
    drawingSpeed,
    isGameRunning,
    battleSeriesResult,
});
