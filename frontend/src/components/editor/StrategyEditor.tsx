import React from 'react';
import * as ReactBlocklyComponent from 'react-blockly-component';
import {blocklyXmlToRoboAst} from '../../core/blockly';
import {generateBlocklyXml} from '../../core/blocklyXmlGenerator';
import {completeToolbox} from "../../core/toolbox";
import SplitPane from "react-split-pane";
import SpaceWorld from "../SpaceWorld";
import RaisedButton from "material-ui/RaisedButton";
import {doNextStep, emptyRuntimeContext, IRoboAst, IRuntimeContext} from "../../core/strategyCore/astInterpreter";
import {demoWorld, convertWorldToEditorModel, World} from '../../core/strategyCore/models/world'
import {
    isUserProgramError,
    getUserProgramErrorDisplayName,
    UserProgramError
} from "../../core/strategyCore/enums/userProgramError";
import {BlocklyEditor} from "react-blockly-component";
import {ErrorMessage} from "../uiComponents/ErrorMessage";


const getEmptyXml = () => generateBlocklyXml({body: []});

interface IProps {
}

interface IState {
    blocklySettings: {trashcan: boolean, disable: boolean};
    roboAst: IRoboAst;
    runtimeContext: IRuntimeContext;
    world: World;
    userProgramError?: UserProgramError;
}

export class StrategyEditor extends React.PureComponent<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            blocklySettings: { trashcan: true, disable: false },
            roboAst: blocklyXmlToRoboAst(getEmptyXml()),
            runtimeContext: emptyRuntimeContext,
            world: demoWorld,
            userProgramError: undefined,
        };
    }

    blocklyEditor: BlocklyEditor | null = null;

    _onXmlChange = (e: unknown) => {
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
        this.setState(() => ({runtimeContext: emptyRuntimeContext, world: demoWorld, userProgramError: undefined}));
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
            onChange={() => this.blocklyEditor && this.blocklyEditor.resize()}
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
                <ErrorMessage>{getUserProgramErrorDisplayName(this.state.userProgramError)}</ErrorMessage>
            </span>
            <ReactBlocklyComponent.BlocklyEditor
                ref={(ref: BlocklyEditor) => {
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
