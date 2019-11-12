import React from "react";
import { connect } from 'react-redux';
import {DualStrategyMainBoard, IStrategyEditorProps} from "../components/editor/DualStrategyMainBoard";
import {IStore} from "../reducers/IStore";
import {invalidProgramError} from "../core/strategyCore/utils/invalidProgramError";

interface IOwnProps {
    readonly levelUrlSlug: string;
}

const mapStateToProps = (state: IStore, ownProps: IOwnProps): IStrategyEditorProps => {
    const level = state.duelStrategyLevels.find((s: any) => s.urlSlug === ownProps.levelUrlSlug);

    if (!level) {
        throw invalidProgramError(`You tried to open level ${ownProps.levelUrlSlug}. But it does not exist.`);
    }

    return {
        level,
        editedRoboAst: state.strategyEditor.editedRoboAst,

    };
};

export const DuelStrategyEditor: React.ComponentType<IOwnProps> = connect(mapStateToProps)(DualStrategyMainBoard);
