import {combineReducers} from 'redux';
import {currentWorld} from "./internalReducers/currentWorld";
import {editedRoboAst} from "./internalReducers/editedRoboAst";
import {isHelpModalShown} from "./internalReducers/isHelpModalShown";
import {isMapOverlayShown} from "./internalReducers/isMapOverlayShown";
import {runtimeError} from "./internalReducers/runtimeError";
import {validationResult} from "./internalReducers/validationResult";
import {codeError} from "./internalReducers/codeError";
import {battleResult} from "./internalReducers/battleResult";

export const strategyEditor = combineReducers({
    currentWorld,
    editedRoboAst,
    isHelpModalShown,
    isMapOverlayShown,
    runtimeError,
    validationResult,
    codeError,
    battleResult,
});
