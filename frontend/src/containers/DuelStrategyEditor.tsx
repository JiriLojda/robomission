import React from "react";
import { connect } from 'react-redux';
import {DualStrategyMainBoard, IStrategyEditorProps} from "../components/editor/DualStrategyMainBoard";

interface IOwnProps {
    readonly levelUrlSlug: string;
}

const mapStateToProps = (state: any, ownProps: IOwnProps): IStrategyEditorProps => {
    const level = state.duelStrategyLevels.find((s: any) => s.urlSlug === ownProps.levelUrlSlug);

    return {
        level,

    };
};

export const DuelStrategyEditor: React.ComponentType<IOwnProps> = connect(mapStateToProps)(DualStrategyMainBoard);
