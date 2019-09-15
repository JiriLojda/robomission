import React from 'react';
import {convertWorldToEditorModel, World} from "../../core/strategyCore/models/world";
import SpaceWorld from "../SpaceWorld";
import RaisedButton from "material-ui/RaisedButton";

interface IMapOverlayProps {
    world: World,
    onLeave: () => void;
    columnSize: number;
}

export const MapOverlay = (props: IMapOverlayProps) => (
    <div style={{
        display: 'flex',
        backgroundColor: "black",
        height: 'calc(100vh - 89px)',
        flexWrap: 'wrap'
    }}>
        <RaisedButton
            label={'Back to the editor'}
            secondary
            style={{ margin: 2, minWidth: 50, marginLeft: 'auto'}}
            onClick={props.onLeave}
        />
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            width: '100%'
        }}>
            <SpaceWorld
                fields={convertWorldToEditorModel(props.world)}
                width={props.world.size.x * props.columnSize}
            />
        </div>
    </div>
);


