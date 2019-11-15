import React from "react";
import {connect} from 'react-redux';
import {INewEditingProps, StrategyEditor} from "./strategyEditor/StrategyEditor";
import {IStore} from "../reducers/IStore";
import {invalidProgramError} from "../core/strategyCore/utils/invalidProgramError";

interface IOwnProps {
    readonly levelUrlSlug: string;
}

const mapStateToProps = (state: IStore, ownProps: IOwnProps): INewEditingProps => {
    const level = state.strategyLevels.find((s: any) => s.urlSlug === ownProps.levelUrlSlug);

    if (!level) {
        throw invalidProgramError(`You tried to open level ${ownProps.levelUrlSlug}. But it does not exist.`);
    }

    return {
        level,
        canRunBattle: true,
        onCodeSubmit: undefined,
        showMapAndHelpOnMount: true,
        initialRoboAst: undefined,
    };
};

export const StrategySimpleLevel: React.ComponentType<IOwnProps> = connect(mapStateToProps)(StrategyEditor);
