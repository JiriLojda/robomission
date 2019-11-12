import {
    IStandardEditorSidebarCallbackProps,
    IStandardEditorSidebarDataProps,
    StandardEditorSidebar as StandardEditorSidebarComponent
} from '../../components/editor/StandardEditorSidebar';
import {IStore} from "../../reducers/IStore";
import {Dispatch} from "redux";
import {helpShowToggled, mapShowToggled} from "../../actions/strategy/editorActions";
import {connect} from "react-redux";
import React from "react";

interface IOwnProps {
    readonly isCodeEditorShown: boolean;
    readonly shouldShowMinimap: boolean;
    readonly canRunBattle: boolean;
    readonly onCodeSubmit: (() => void) | undefined;
    readonly onReset: () => void;
    readonly onHideCodeEditor: () => void;
    readonly onShowCodeEditor: () => void;
    readonly onRunBattle: () => void;
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
    shouldShowMinimap: ownProps.shouldShowMinimap
});

const mapDispatchToProps = (dispatch: Dispatch<IStore>, ownProps: IOwnProps): IStandardEditorSidebarCallbackProps => ({
    onCodeSubmit: ownProps.onCodeSubmit,
    onHideCodeEditor: ownProps.onHideCodeEditor,
    onReset: ownProps.onReset,
    onShowCodeEditor: ownProps.onShowCodeEditor,
    onRunBattle: ownProps.onRunBattle,
    onShowHelp: () => dispatch(helpShowToggled()),
    onShowMap: () => dispatch(mapShowToggled()),
});

export const StandardEditorSidebar: React.ComponentType<IOwnProps> = connect(mapStateToProps, mapDispatchToProps)(StandardEditorSidebarComponent);
