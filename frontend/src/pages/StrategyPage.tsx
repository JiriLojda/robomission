import React from 'react';
import {StrategyEditor} from "../components/editor/StrategyEditor";


export class StrategyPage extends React.Component {
    render() {
        return (
            <div
                style={{
                    position: 'absolute',
                    top: 64,  // TODO: unhardcode using app height in flocs-theme
                    bottom: 0,
                    left: 0,
                    right: 0,
                }}
            >
                <StrategyEditor />
            </div>
        );
    }
}
