import React from 'react';
import PropTypes from 'prop-types';
import ReactBlocklyComponent from 'react-blockly-component';
import {blocklyXmlToRoboAst} from '../../core/blockly';
import {generateBlocklyXml} from '../../core/blocklyXmlGenerator';
import {completeToolbox} from "../../core/toolbox";
import SplitPane from "react-split-pane";
import SpaceWorld from "../SpaceWorld";
import RaisedButton from "material-ui/RaisedButton";
import {doNextStep, emptyRuntimeContext} from "../../core/strategyCore/astInterpreter.ts";
import {demoWorld, convertWorldToEditorModel} from '../../core/strategyCore/models/world.ts'
import {isUserProgramError, getUserProgramErrorDisplayName} from "../../core/strategyCore/enums/userProgramError";

const getEmptyXml = () => generateBlocklyXml({body: []});

const getDeepCopy = obj => JSON.parse(JSON.stringify(obj));

export class TestEditor extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            blocklySettings: { trashcan: true, disable: false },
            roboAst: blocklyXmlToRoboAst(getEmptyXml()),
            runtimeContext: emptyRuntimeContext,
            world: demoWorld,
            userProgramError: undefined,
        };
    }

    _onXmlChange = (e) => {
        const roboAst = blocklyXmlToRoboAst(e);
        console.log(e);
        this.setState(() => ({roboAst, runtimeContext: emptyRuntimeContext}));
    };

    _makeStep = () => {
        this.setState(() => ({blocklySettings: {...this.state.blocklySettings, disable: true}, userProgramError: undefined}));

        const result = doNextStep(this.state.roboAst, this.state.world, 'S1', this.state.runtimeContext);

        if (isUserProgramError(result)) {
            this.setState(() => ({blocklySettings: {...this.state.blocklySettings, disable: false}, userProgramError: result}));
            return;
        }

        const [runtimeContext, world] = result;

        this.setState(() => ({blocklySettings: {...this.state.blocklySettings, disable: false}, world, runtimeContext }));
    };

    _resetRuntimeContext = () => {
        this.setState(() => ({runtimeContext: emptyRuntimeContext, world: demoWorld}));
    };

    render() {
        return <SplitPane
            split="vertical"
            minSize={200}
            maxSize={-400}
            size={200}
            resizerStyle={{
                backgroundColor: '#aaa',
                width: 4,
                cursor: 'col-resize',
            }}
            onChange={() => this.blocklyEditor.resize()}
        >
            <span>
                <SpaceWorld
                    fields={convertWorldToEditorModel(this.state.world)}
                    width={200}
                />
                <RaisedButton
                    label={'do a step'}
                    primary
                    style={{ margin: 2, minWidth: 50 }}
                    onClick={this._makeStep}
                />
                <RaisedButton
                    label={'reset'}
                    secondary
                    style={{ margin: 2, minWidth: 50 }}
                    onClick={this._resetRuntimeContext}
                />
                {getUserProgramErrorDisplayName(this.state.userProgramError)}
            </span>
            <ReactBlocklyComponent.BlocklyEditor
                ref={(ref) => {
                    this.blocklyEditor = ref;
                }}
                workspaceConfiguration={{trashcan: true, collapse: true}}
                toolboxCategories={[{name: 'default', blocks: completeToolbox}]}
                initialXml={getEmptyXml()}
                xmlDidChange={this._onXmlChange}
                wrapperDivClassName="flocs-blockly"
            />
        </SplitPane>
    }
}
