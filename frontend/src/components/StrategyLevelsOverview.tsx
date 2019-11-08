import React from "react";
import {List} from "immutable";
import {IGameLevel} from "../core/strategyCore/battleRunner/IGameLevel";
import LongPage from "./LongPage";
import {LevelsCategoryCard} from "./LevelsCategoryCard";

export interface IStrategyLevelsOverviewDataProps {
    readonly allLevelsCategories: List<[string, List<IGameLevel>]>;
}

export const StrategyLevelsOverview: React.ComponentType<IStrategyLevelsOverviewDataProps> = props => (
    <LongPage>
        {props.allLevelsCategories.map(([categoryName, categoryLevels], index) =>
            <LevelsCategoryCard allLevels={categoryLevels} categoryName={categoryName} categoryIndex={index}/>
        )}
    </LongPage>
);
