import {
    INewEditingCallbackProps,
    INewEditingDataProps,
    StrategyEditor as NewEditingComponent
} from '../../components/editor/StrategyEditor';
import {IGameLevel} from "../../core/strategyCore/battleRunner/IGameLevel";
import {IStore} from "../../reducers/IStore";
import {Dispatch} from "redux";
import {
    battleResultChanged, editorInitialized,
    editorReseted,
    helpShowToggled,
    mapShowToggled, roboAstChanged,
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

const mapStateToProps = (state: IStore, ownProps: INewEditingProps): INewEditingDataProps => ({
    isHelpShown: state.strategyEditor.isHelpModalShown,
    isMapShown: state.strategyEditor.isMapOverlayShown,
    roboAst: state.strategyEditor.editedRoboAst,
    canRunBattle: ownProps.canRunBattle,
    level: ownProps.level,
    currentWorld: state.strategyEditor.currentWorld,
});

const mapDispatchToProps = (dispatch: Dispatch<IStore>, ownProps: INewEditingProps): INewEditingCallbackProps => ({
    toggleMap: () => dispatch(mapShowToggled()),
    onHelpClosed: () => dispatch(helpShowToggled()),
    onCodeSubmit: ownProps.onCodeSubmit,
    worldChanged: newWorld => dispatch(worldChanged(newWorld)),
    battleResultChanged: newBattleResult => dispatch(battleResultChanged(newBattleResult)),
    reset: originalWorld => dispatch(editorReseted(originalWorld)),
    initializeStore: level => {
        dispatch(editorInitialized(level, ownProps.showMapAndHelpOnMount, ownProps.showMapAndHelpOnMount));

        if (ownProps.initialRoboAst) {
            dispatch(roboAstChanged(ownProps.initialRoboAst));
        }
    },
});

export const StrategyEditor: React.ComponentType<INewEditingProps> = connect(mapStateToProps, mapDispatchToProps)(NewEditingComponent);
