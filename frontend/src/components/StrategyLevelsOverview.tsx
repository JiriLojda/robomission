import React from "react";
import {List} from "immutable";
import {IGameLevel} from "../core/strategyCore/battleRunner/IGameLevel";
import {Link} from 'react-router-dom';
import {GridList, GridTile} from "material-ui";
import Rating from "./Rating";
import {Card, CardHeader, CardText} from "material-ui/Card";
import Avatar from "material-ui/Avatar";
import {theme} from "../theme";
import LongPage from "./LongPage";

export interface IStrategyLevelsOverviewDataProps {
    readonly allLevels: List<IGameLevel>;
}

type Props = IStrategyLevelsOverviewDataProps;

export const StrategyLevelsOverview: React.ComponentType<Props> = props => (
    <LongPage>
        <Card
            style={{margin: 10}}
            initiallyExpanded
        >
            <CardHeader
                avatar={
                    <Avatar
                        color={theme.palette.canvasColor}
                        backgroundColor={theme.palette.disabledColor}
                        style={{marginRight: 10}}
                    >
                        L1
                    </Avatar>
                }
                title="First test is here"
                titleStyle={{
                    fontSize: 20
                }}
                //color: isRecommended ? theme.palette.accent2Color : null}}
                subtitleStyle={{fontSize: 16}}
                actAsExpander
                showExpandableButton
            />
            <CardText
                expandable
            >
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-around',
                }}>
                    <GridList
                        cellHeight={120}
                        // rows={1}
                        // Hack to determine number of columns. TODO: unhack (also make it
                        // respond to screen size changes.
                        cols={Math.min(5, Math.ceil(window.innerWidth / 250))}
                        style={{
                            width: '100%',
                        }}>
                        {props.allLevels.map(level => (
                            <Link to={`/strategy/level/${level.urlSlug}`} key={level.urlSlug}>
                                <GridTile title={level.name} subtitle={level.battleType} titlePosition="bottom">
                                    <div style={{
                                        backgroundColor: '#888',
                                        height: '100%',
                                        padding: '15px 10px',
                                    }}>
                                        <Rating max={1} value={1}/>
                                    </div>
                                </GridTile>
                            </Link>
                        ))}
                    </GridList>
                </div>
            </CardText>
        </Card>
    </LongPage>
);
