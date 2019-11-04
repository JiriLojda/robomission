import {IStrategyEditorProps, StrategyEditor as StrategyEditorComponent} from "../components/editor/StrategyEditor";
import React from "react";
import { connect } from 'react-redux';
import {createEmptyAst} from "../utils/createEmptyAst";

interface IOwnProps {
    readonly levelUrlSlug: string;
}

const emptyAst = createEmptyAst();

const mapStateToProps = (state: any, ownProps: IOwnProps): IStrategyEditorProps => {
    const level = state.strategyLevels.find((s: any) => s.urlSlug === ownProps.levelUrlSlug);

    return {
        level,
        canRunBattle: true,
        initialAst: emptyAst,
        onCodeSubmit: undefined,
        showMapAndHelpOnMount: true,
    };
};

export const StrategyEditor: React.ComponentType<IOwnProps> = connect(mapStateToProps)(StrategyEditorComponent);
