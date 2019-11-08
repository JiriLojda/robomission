import React from 'react';
import {StrategyLevelsOverview} from "../components/StrategyLevelsOverview";
import {IGameLevel} from "../core/strategyCore/battleRunner/IGameLevel";
import {List} from "immutable";
import {connect} from "react-redux";
import {strategyLevelsCategories} from "../core/strategyCore/levels/allStrategyLevels";

interface IProps {
    readonly allLevels: List<IGameLevel>;
}

const mapStateToProps = (state: any): IProps => ({
    allLevels: state.strategyLevels,
});

const StrategyPageComponent: React.ComponentType<IProps> = props => (
    <div
        style={{
            position: 'absolute',
            top: 64,  // TODO: unhardcode using app height in flocs-theme
            bottom: 0,
            left: 0,
            right: 0,
        }}
    >
        <StrategyLevelsOverview allLevelsCategories={strategyLevelsCategories}/>
    </div>
);

export const StrategyPage: React.ComponentType<{}> = connect(mapStateToProps)(StrategyPageComponent);
