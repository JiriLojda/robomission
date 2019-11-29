import {
    IStrategyEditorCallbackProps,
    IStrategyEditorDataProps,
    StrategyEditor as NewEditingComponent
} from '../../components/editor/StrategyEditor';
import {IGameLevel} from "../../core/strategyCore/battleRunner/IGameLevel";
import {IStore} from "../../reducers/IStore";
import {Dispatch} from "redux";
import {
    editorInitialized,
    editorReseted,
    gameRunFinished,
    gameRunStarted,
    helpHidden,
    mapShowToggled,
    roboAstChanged,
    worldChanged
} from "../../actions/strategy/editorActions";
import {connect} from "react-redux";
import React from "react";
import {IRoboAst} from "../../core/strategyCore/models/programTypes";

export interface INewEditingProps {
    readonly level: IGameLevel;
    readonly canRunBattle: boolean;
    readonly onCodeSubmit: (() => void) | undefined;
    readonly showMapAndHelpOnMount: boolean;
    readonly initialRoboAst: IRoboAst | undefined;
}

const mapStateToProps = (state: IStore, ownProps: INewEditingProps): IStrategyEditorDataProps => ({
    isHelpShown: state.strategyEditor.isHelpModalShown,
    isMapShown: state.strategyEditor.isMapOverlayShown,
    roboAst: state.strategyEditor.editedRoboAst,
    canRunBattle: ownProps.canRunBattle,
    level: ownProps.level,
    currentWorld: state.strategyEditor.currentWorld,
    battleResult: state.strategyEditor.battleResult,
    location: window.location.pathname,
    drawingSpeed: state.strategyEditor.drawingSpeed,
});

const mapDispatchToProps = (dispatch: Dispatch<IStore>, ownProps: INewEditingProps): IStrategyEditorCallbackProps => ({
    toggleMap: () => dispatch(mapShowToggled()),
    onHelpClosed: () => dispatch(helpHidden()),
    onCodeSubmit: ownProps.onCodeSubmit,
    worldChanged: newWorld => dispatch(worldChanged(newWorld)),
    onBattleRunFinished: newBattleResult => dispatch(gameRunFinished(newBattleResult)),
    onBattleRunStarted: world => dispatch(gameRunStarted(world)),
    reset: originalWorld => dispatch(editorReseted(originalWorld)),
    initializeStore: level => {
        dispatch(editorInitialized(level, ownProps.showMapAndHelpOnMount, ownProps.showMapAndHelpOnMount));

        if (ownProps.initialRoboAst) {
            dispatch(roboAstChanged(ownProps.initialRoboAst));
        }
    },
});

export const StrategyEditor: React.ComponentType<INewEditingProps> = connect(mapStateToProps, mapDispatchToProps)(NewEditingComponent);
