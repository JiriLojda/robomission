import {
    IStandardEditorSidebarCallbackProps,
    IStandardEditorSidebarDataProps,
    StandardEditorSidebar as StandardEditorSidebarComponent
} from '../../components/editor/StandardEditorSidebar';
import {IStore} from "../../reducers/IStore";
import {Dispatch} from "redux";
import {drawingSpeedChanged, helpShowed, mapShowToggled} from "../../actions/strategy/editorActions";
import {connect} from "react-redux";
import React from "react";

interface IOwnProps {
    readonly isCodeEditorShown: boolean;
    readonly canRunBattle: boolean;
    readonly onCodeSubmit: (() => void) | undefined;
    readonly onReset: () => void;
    readonly onHideCodeEditor: () => void;
    readonly onShowCodeEditor: () => void;
    readonly onRunBattle: () => void;
    readonly isDecisiveWin: (winner: string) => boolean;
}

const mapStateToProps = (state: IStore, ownProps: IOwnProps): IStandardEditorSidebarDataProps => ({
    world: state.strategyEditor.currentWorld,
    roboAst: state.strategyEditor.editedRoboAst,
    runtimeError: state.strategyEditor.runtimeError,
    shouldShowExportAst: process.env.NODE_ENV === 'development',
    validationResult: state.strategyEditor.validationResult,
    codeError: state.strategyEditor.codeError,
    battleResult: state.strategyEditor.battleResult,
    canRunBattle: ownProps.canRunBattle,
    isCodeEditorShown: ownProps.isCodeEditorShown,
    drawingSpeed: state.strategyEditor.drawingSpeed,
});

const mapDispatchToProps = (dispatch: Dispatch<IStore>, ownProps: IOwnProps): IStandardEditorSidebarCallbackProps => ({
    onCodeSubmit: ownProps.onCodeSubmit,
    onHideCodeEditor: ownProps.onHideCodeEditor,
    onReset: ownProps.onReset,
    onShowCodeEditor: ownProps.onShowCodeEditor,
    onRunBattle: ownProps.onRunBattle,
    onShowHelp: () => dispatch(helpShowed()),
    onShowMap: () => dispatch(mapShowToggled()),
    isDecisiveWin: ownProps.isDecisiveWin,
    onDrawingSpeedChanged: speed => dispatch(drawingSpeedChanged(speed))
});

export const StandardEditorSidebar: React.ComponentType<IOwnProps> = connect(mapStateToProps, mapDispatchToProps)(StandardEditorSidebarComponent);
