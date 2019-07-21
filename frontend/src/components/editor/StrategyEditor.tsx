import React from 'react';
import * as ReactBlocklyComponent from 'react-blockly-component';
import {BlocklyEditor} from 'react-blockly-component';
import {blocklyXmlToRoboAst} from '../../core/blockly';
import {generateBlocklyXml} from '../../core/blocklyXmlGenerator';
import SplitPane from "react-split-pane";
import SpaceWorld from "../SpaceWorld";
import RaisedButton from "material-ui/RaisedButton";
import {doNextStep} from "../../core/strategyCore/astInterpreter";
import {convertWorldToEditorModel, strategyDemoWorld, World} from '../../core/strategyCore/models/world'
import {
    getUserProgramErrorDisplayName,
    isUserProgramError,
    UserProgramError
} from "../../core/strategyCore/enums/userProgramError";
import {ErrorMessage} from "../uiComponents/ErrorMessage";
import {IRoboAst, IRuntimeContext} from "../../core/strategyCore/models/programTypes";
import {isRoboAstValid} from "../../core/strategyCore/validator/programValidator";
import {
    getInvalidProgramReasonDisplayName,
    InvalidProgramReason
} from "../../core/strategyCore/enums/invalidProgramReason";
import {allStrategyCategories} from "../../core/strategyCore/constants/strategyToolbox";
import {getEmptyRuntimeContext} from "../../core/strategyCore/utils/getEmptyRuntimeContext";
import {IRunBattleParams, runBattle} from "../../core/strategyCore/battleRunner/runBattle";
import {List} from "immutable";
import {basicScanStrategy} from "../../core/strategyCore/predefinedStrategies/basicScanStrategy";
import {BattleType} from "../../core/strategyCore/battleRunner/BattleType";
import {createDrawHistory} from "../../core/strategyCore/battleRunner/historyPrinter";
import {BattleResult, BattleResultType} from "../../core/strategyCore/battleRunner/BattleResult";
import {ResultMessage, ResultMessageType} from "../uiComponents/ResultMessage";
import {invalidProgramError} from "../../core/strategyCore/utils/invalidProgramError";
import {Position} from "../../core/strategyCore/models/position";
import {getThereFirstTestStrategy} from "../../core/strategyCore/predefinedStrategies/getThereFirstTestStrategy";
import {centralDiamondsBasicStrategy} from "../../core/strategyCore/predefinedStrategies/centralDiamondsBasicStrategy";


const getEmptyXml = () => generateBlocklyXml({body: []});

//TODO: just temporary (hardcoded id...)
const isSuccess = (result?: BattleResult): boolean =>
    !!result && result.type === BattleResultType.Decisive && result.winner === 'playerShip';

const getBattleResultMessage = (result?: BattleResult): string | undefined => {
    if (!result)
        return undefined;
    if (isSuccess(result))
        return 'You won!!! Yay';
    if (result.type === BattleResultType.Draw)
        return `Ups seems we have a draw between ${result.between.join(', ')}.`;
    if (result.type === BattleResultType.ProgramError)
        return `Please, learn to write the code first... you ${result.blame}, ${getUserProgramErrorDisplayName(result.error)}`;
    if (result.type === BattleResultType.Decisive)
        return 'Damn son, you lost. Try it again.';
    throw invalidProgramError(`This should not happen. type: ${result.type}.`, 'getBattleResultMessage');
};

const getMessageTypeForResult = (result?: BattleResult): ResultMessageType => {
    if (!result)
        return ResultMessageType.Success;
    if (isSuccess(result))
        return ResultMessageType.Success;

    switch (result.type) {
        case BattleResultType.Decisive:
        case BattleResultType.ProgramError:
            return ResultMessageType.Bad;
        case BattleResultType.Draw:
            return ResultMessageType.Draw;
        default:
            throw invalidProgramError('This should not happen.');
    }
};

interface IProps {
}

interface IState {
    blocklySettings: {trashcan: boolean, disable: boolean};
    roboAst: IRoboAst;
    runtimeContext: IRuntimeContext;
    world: World;
    userProgramError?: UserProgramError;
    validationResult: InvalidProgramReason;
    battleResult?: BattleResult;
}

export class StrategyEditor extends React.PureComponent<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            blocklySettings: { trashcan: true, disable: false },
            roboAst: blocklyXmlToRoboAst(getEmptyXml()),
            runtimeContext: getEmptyRuntimeContext(),
            world: strategyDemoWorld,
            userProgramError: undefined,
            validationResult: InvalidProgramReason.None,
        };
    }

    blocklyEditor: BlocklyEditor | null = null;

    _onXmlChange = (e: unknown) => {
        const roboAst = blocklyXmlToRoboAst(e);
        const validationResult = isRoboAstValid(roboAst);
        this.setState(() => ({roboAst, runtimeContext: getEmptyRuntimeContext(), validationResult: validationResult.reason}));
    };

    _makeStep = () => {
        if (this.state.validationResult !== InvalidProgramReason.None) {
            return;
        }
        this.setState((prevState) => ({blocklySettings: {...prevState.blocklySettings, disable: true}, userProgramError: undefined}));

        const result = doNextStep(this.state.roboAst, this.state.world, 'S1', this.state.runtimeContext);

        if (isUserProgramError(result)) {
            this.setState((prevState) => ({blocklySettings: {...prevState.blocklySettings, disable: false}, userProgramError: result}));
            return;
        }

        const [runtimeContext, world] = result;

        this.setState((prevState) => ({blocklySettings: {...prevState.blocklySettings, disable: false}, world, runtimeContext }));
    };

    _resetRuntimeContext = () => {
        this.setState(() => ({
            runtimeContext: getEmptyRuntimeContext(),
            world: strategyDemoWorld,
            userProgramError: undefined,
            battleResult: undefined,
        }));
    };

    _drawNewWorld = (newWorld: World) => {
        this.setState(() => ({world: newWorld}));
    };

    _drawHistory = (history: List<World>) => {
        const callback = createDrawHistory(this._drawNewWorld);

        callback(history)
            .then(h => !h || this._drawHistory(h));
    };

    _runBattle = (params: IRunBattleParams): void => {
        const result = runBattle(params);
        this.setState(() => ({battleResult: result}));

        this._drawHistory(result.history.reverse());
    };

    _runKillAllBattle = () => {
        const asts = List([
            basicScanStrategy,
            this.state.roboAst,
        ]);
        const ids = List([
            'aiShip',
            'playerShip',
        ]);
        this._runBattle({
            roboAsts: asts,
            shipsOrder: ids,
            world: this.state.world,
            battleType: BattleType.KillAll,
            battleParams: {maxTurns: 50, turnsRan: 0},
        });
    };

    _runGetThereBattle = () => {
        const asts = List([
            getThereFirstTestStrategy,
            this.state.roboAst,
        ]);
        const ids = List([
            'aiShip',
            'playerShip',
        ]);
        this._runBattle({
            roboAsts: asts,
            shipsOrder: ids,
            world: this.state.world,
            battleType: BattleType.GetThereFirst,
            battleParams: {maxTurns: 50, turnsRan: 0, finishPosition: new Position({x: 4, y: 2})},
        });
    };

    _runCollectDiamondsBattle = () => {
        const asts = List([
            centralDiamondsBasicStrategy,
            this.state.roboAst,
        ]);
        const ids = List([
            'aiShip',
            'playerShip',
        ]);
        this._runBattle({
            roboAsts: asts,
            shipsOrder: ids,
            world: this.state.world,
            battleType: BattleType.CollectOrKill,
            battleParams: {maxTurns: 50, turnsRan: 0},
        });
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
                    disabled
                    style={{ margin: 2, minWidth: 50 }}
                    onClick={this._makeStep}
                />
                <RaisedButton
                    label={'reset'}
                    secondary
                    style={{ margin: 2, minWidth: 50 }}
                    onClick={this._resetRuntimeContext}
                />
                <RaisedButton
                    label={'run kill all battle'}
                    primary
                    style={{ margin: 2, minWidth: 50 }}
                    onClick={this._runKillAllBattle}
                />
                <RaisedButton
                    label={'run get there battle'}
                    primary
                    style={{ margin: 2, minWidth: 50 }}
                    onClick={this._runGetThereBattle}
                />
                <RaisedButton
                    label={'run collection battle'}
                    primary
                    style={{ margin: 2, minWidth: 50 }}
                    onClick={this._runCollectDiamondsBattle}
                />
                <ErrorMessage>
                    {getUserProgramErrorDisplayName(this.state.userProgramError)}
                </ErrorMessage>
                <ErrorMessage>
                    {
                        this.state.validationResult !== InvalidProgramReason.None ?
                            getInvalidProgramReasonDisplayName(this.state.validationResult) :
                            undefined
                    }
                </ErrorMessage>
                <ResultMessage type={getMessageTypeForResult(this.state.battleResult)}>
                    {getBattleResultMessage(this.state.battleResult)}
                </ResultMessage>
            </span>
            <ReactBlocklyComponent.BlocklyEditor
                ref={(ref: BlocklyEditor) => {
                    this.blocklyEditor = ref;
                }}
                workspaceConfiguration={{trashcan: true, collapse: true}}
                toolboxCategories={allStrategyCategories}
                initialXml={getEmptyXml()}
                xmlDidChange={this._onXmlChange}
                wrapperDivClassName="flocs-blockly"
            />
        </SplitPane>
    }
}
