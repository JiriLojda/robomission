import {
    INewEditorCallbackProps,
    INewEditorDataProps,
    StrategyInnerEditor as StrategyInnerEditorComponent
} from '../../components/editor/StrategyInnerEditor';
import {IStore} from "../../reducers/IStore";
import {BlocklyToolbox} from "../../core/strategyCore/constants/strategyToolbox";
import {RoboAstValidator} from "../../core/strategyCore/battleRunner/IGameLevel";
import {List} from "immutable";
import {Dispatch} from "redux";
import {
    codeErrorCleared,
    codeErrorRaised,
    roboAstChanged,
    syntaxErrorRaised
} from "../../actions/strategy/editorActions";
import {connect} from "react-redux";
import React from "react";

interface IOwnProps {
    readonly showCodeEditor: boolean;
    readonly toolbox: BlocklyToolbox;
    readonly additionalValidators: List<RoboAstValidator>;
    readonly height: number;
    readonly isReadonly: boolean;
    readonly highlightedLine: number | undefined;
    readonly highlightedBlockId: string | undefined;
}

const mapStateToProps = (state: IStore, ownProps: IOwnProps): INewEditorDataProps => ({
    roboAst: state.strategyEditor.editedRoboAst,
    showCodeEditor: ownProps.showCodeEditor,
    additionalValidators: ownProps.additionalValidators,
    toolbox: ownProps.toolbox,
    height: ownProps.height,
    isReadOnly: state.strategyEditor.isGameRunning || ownProps.isReadonly,
    highlightedLine: ownProps.highlightedLine,
    highlightedBlockId: ownProps.highlightedBlockId,
});

const mapDispatchToProps = (dispatch: Dispatch<IStore>): INewEditorCallbackProps => ({
    onCodeErrorRaised: error => dispatch(codeErrorRaised(error)),
    onCodeErrorCleared: () => dispatch(codeErrorCleared()),
    onRoboAstChanged: roboAst => dispatch(roboAstChanged(roboAst)),
    onSyntaxErrorRaised: error => dispatch(syntaxErrorRaised(error)),
});

export const StrategyInnerEditor: React.ComponentType<IOwnProps> = connect(
    mapStateToProps,
    mapDispatchToProps
)(StrategyInnerEditorComponent);
