import {IStrategyEditorProps, StrategyEditor as StrategyEditorComponent} from "../components/editor/StrategyEditor";
import React from "react";
import { connect } from 'react-redux';

interface IOwnProps {
    readonly levelUrlSlug: string;
}

const mapStateToProps = (state: any, ownProps: IOwnProps): IStrategyEditorProps => {
    const level = state.strategyLevels.find((s: any) => s.urlSlug === ownProps.levelUrlSlug);

    return {
        level,
    };
};

export const StrategyEditor: React.ComponentType<IOwnProps> = connect(mapStateToProps)(StrategyEditorComponent);
