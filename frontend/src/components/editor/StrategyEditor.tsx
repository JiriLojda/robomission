import React from 'react';
import * as ReactBlocklyComponent from 'react-blockly-component';
import {BlocklyEditor} from 'react-blockly-component';
import {blocklyXmlToRoboAst} from '../../core/blockly';
import {generateBlocklyXml} from '../../core/strategyCore/codeEditor/xmlGenerator/blocklyXmlGenerator';
import SplitPane from "react-split-pane";
import SpaceWorld from "../SpaceWorld";
import RaisedButton from "material-ui/RaisedButton";
import {convertWorldToEditorModel, World} from '../../core/strategyCore/models/world'
import {getUserProgramErrorDisplayName, UserProgramError} from "../../core/strategyCore/enums/userProgramError";
import {ErrorMessage} from "../uiComponents/ErrorMessage";
import {IRoboAst, IRuntimeContext} from "../../core/strategyCore/models/programTypes";
import {isRoboAstValid} from "../../core/strategyCore/validator/programValidator";
import {
    getInvalidProgramReasonDisplayName,
    InvalidProgramReason
} from "../../core/strategyCore/enums/invalidProgramReason";
import {getEmptyRuntimeContext} from "../../core/strategyCore/utils/getEmptyRuntimeContext";
import {runBattle} from "../../core/strategyCore/battleRunner/runBattle";
import {List} from "immutable";
import {createDrawHistory} from "../../core/strategyCore/battleRunner/historyPrinter";
import {BattleResult, BattleResultType} from "../../core/strategyCore/battleRunner/BattleResult";
import {ResultMessage, ResultMessageType} from "../uiComponents/ResultMessage";
import {invalidProgramError} from "../../core/strategyCore/utils/invalidProgramError";
import {ICancelablePromise} from "../../utils/cancelablePromise";
import {IGameLevel} from "../../core/strategyCore/battleRunner/IGameLevel";
import {parseStrategyRoboCode} from "../../core/strategyCore/codeEditor/parser/strategyParser";
import CodeEditor from "./CodeEditor";
import {generateStrategyRoboCode} from "../../core/strategyCore/codeEditor/codeGenerator/strategyRoboCodeGenerator";
import {Toggle} from "material-ui";
import StrategyRoboCodeHighlighter from '../../core/strategyCore/codeEditor/strategyRoboCodeHighlighter.js';
import {MapOverlay} from "./MapOverlay";
import {HelpModal} from "../uiComponents/HelpModal";
import {getValidatorResult} from "../../core/strategyCore/validator/programValidationUtils";

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

export interface IStrategyEditorProps {
    readonly level: IGameLevel;
    readonly canRunBattle: boolean;
    readonly onCodeSubmit?: (code: IRoboAst) => void;
    readonly initialAst: IRoboAst;
    readonly showMapAndHelpOnMount: boolean;
}

interface IState {
    blocklySettings: {trashcan: boolean, disable: boolean};
    roboAst: IRoboAst;
    runtimeContext: IRuntimeContext;
    world: World;
    userProgramError?: UserProgramError;
    validationResult: InvalidProgramReason;
    battleResult?: BattleResult;
    drawingPromise?: ICancelablePromise<List<World> | undefined>;
    useCodeEditor: boolean;
    codeError?: string;
    code?: string;
    isMapOverlayShown: boolean;
    isHelpModalShown: boolean;
}

const shouldShowMinimap = (world: World) => world.size.x <= 5 && world.size.y <= 10;

export class StrategyEditor extends React.PureComponent<IStrategyEditorProps, IState> {

    constructor(props: IStrategyEditorProps) {
        super(props);
        this.state = {
            blocklySettings: { trashcan: true, disable: false },
            roboAst: props.initialAst,
            runtimeContext: getEmptyRuntimeContext(),
            world: props.level.world,
            userProgramError: undefined,
            validationResult: InvalidProgramReason.None,
            useCodeEditor: false,
            isMapOverlayShown: props.level.world.size.x > 5 && props.showMapAndHelpOnMount,
            isHelpModalShown: props.showMapAndHelpOnMount,
        };
    }

    blocklyEditor: BlocklyEditor | null = null;

    _onXmlChange = (e: unknown) => {
        const roboAst = blocklyXmlToRoboAst(e);
        const validationResult = isRoboAstValid(roboAst);
        const withAdditionalValidation = !validationResult.isValid ?
            validationResult :
            this.props.level.additionalValidators
                .reduce(
                    (found, validator) => !found.isValid ? found : validator(roboAst),
                    getValidatorResult(true, InvalidProgramReason.None)
                );
        this.setState(() => ({roboAst, runtimeContext: getEmptyRuntimeContext(), validationResult: withAdditionalValidation.reason}));
    };

    _onCodeChange = (code: string) => {
        this.setState(() => ({code: code }));
        const parseResult = parseStrategyRoboCode(code);
        if (!parseResult.isSuccessful) {
            this.setState(() => ({
                codeError: parseResult.error,
                validationResult: InvalidProgramReason.CodeNotParsed,
            }));
            return;
        } else {
            const validationResult = isRoboAstValid(parseResult.result);
            const withAdditionalValidation = !validationResult.isValid ?
                validationResult :
                this.props.level.additionalValidators
                    .reduce(
                        (found, validator) => !found.isValid ? found : validator(parseResult.result),
                        getValidatorResult(true, InvalidProgramReason.None)
                    );
            this.setState(() => ({
                roboAst: parseResult.result,
                runtimeContext: getEmptyRuntimeContext(),
                validationResult: withAdditionalValidation.reason,
                codeError: undefined,
            }));
        }
    };

    _reset = () => {
        if (this.state.drawingPromise) {
            this.state.drawingPromise.cancel();
        }
        this.setState(() => ({
            runtimeContext: getEmptyRuntimeContext(),
            world: this.props.level.world,
            userProgramError: undefined,
            battleResult: undefined,
            drawingPromise: undefined,
        }));
    };

    _drawNewWorld = (newWorld: World) => {
        this.setState(() => ({world: newWorld}));
    };

    _drawHistory = (history: List<World>) => {
        const callback = createDrawHistory(this._drawNewWorld, 400);

        const promise = callback(history);

        this.setState(() => ({drawingPromise: promise}));

        promise
            .then(h => !h || this._drawHistory(h))
    };

    _runBattle = (): void => {
        if (!this.props.canRunBattle) {
            console.warn('This should not be called when cannotRunBattle.');
            return;
        }
        this.setState(() => ({isMapOverlayShown: true}));
        const level = this.props.level;
        const userShipId = level.turnsOrder.find(id => !level.shipsAsts.has(id)) || 'userShip';
        const allAsts = level.shipsAsts.set(userShipId, this.state.roboAst);
        const result = runBattle({
            world: this.state.world,
            battleParams: level.battleParams,
            battleType: level.battleType,
            shipsOrder: level.turnsOrder,
            roboAsts: level.turnsOrder.map(id => allAsts.get(id)!).toList(),
            behaviours: level.gameBehaviours,
        });
        this.setState(() => ({battleResult: result}));

        this._drawHistory(result.history.reverse());
    };

    _renderEditor = () => this.state.useCodeEditor ? (
        <CodeEditor
            code={this.state.code || ''}
            onChange={this._onCodeChange}
            highlighter={new StrategyRoboCodeHighlighter()}
        />
        ) : (
        <ReactBlocklyComponent.BlocklyEditor
            ref={(ref: BlocklyEditor) => {
                this.blocklyEditor = ref;
            }}
            workspaceConfiguration={{trashcan: true, collapse: true}}
            toolboxCategories={this.props.level.toolbox}
            initialXml={generateBlocklyXml(this.state.roboAst)}
            xmlDidChange={this._onXmlChange}
            wrapperDivClassName="flocs-blockly"
        />
    );

    render() {
        if (this.state.isMapOverlayShown)
            return <span>
                <HelpModal
                    title={this.props.level.help.title}
                    message={this.props.level.help.text}
                    isOpened={this.state.isHelpModalShown}
                    onClose={() => this.setState(() => ({isHelpModalShown: false}))}
                />
                <MapOverlay
                    world={this.state.world}
                    onLeave={() => this.setState(() => ({isMapOverlayShown: false}))}
                    columnSize={40}
                />
        </span>;

        return <span>
                <SplitPane
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
                    {shouldShowMinimap(this.state.world) &&
                        <SpaceWorld
                            fields={convertWorldToEditorModel(this.state.world)}
                            width={200}
                        />
                    }
                    {this.props.canRunBattle && <RaisedButton
                        label={'run battle'}
                        disabled={this.state.validationResult !== InvalidProgramReason.None || !!this.state.codeError}
                        primary
                        style={{ margin: 2, minWidth: 50 }}
                        onClick={this._runBattle}
                    />}
                    {!!this.props.onCodeSubmit && <RaisedButton
                      label={'submit code'}
                      disabled={this.state.validationResult !== InvalidProgramReason.None || !!this.state.codeError}
                      primary
                      style={{ margin: 2, minWidth: 50 }}
                      onClick={() => this.props.onCodeSubmit!(this.state.roboAst)}
                    />}
                    <RaisedButton
                        label={'reset'}
                        secondary
                        style={{ margin: 2, minWidth: 50 }}
                        onClick={this._reset}
                    />
                    <RaisedButton
                        label={'ast to console'}
                        style={{ margin: 2, minWidth: 50 }}
                        onClick={() => console.log(JSON.stringify(this.state.roboAst))}
                    />
                    <RaisedButton
                        label={'show help'}
                        style={{ margin: 2, minWidth: 50 }}
                        onClick={() => this.setState(() => ({isHelpModalShown: true}))}
                    />
                    <Toggle
                        toggled={this.state.useCodeEditor}
                        label="Use code editor"
                        labelStyle={{color: 'black'}}
                        onToggle={() => this.setState(prev => ({
                            useCodeEditor: !prev.useCodeEditor,
                            code: generateStrategyRoboCode(prev.roboAst),
                        }))} />
                        <RaisedButton
                            label={'Show map'}
                            secondary
                            style={{ margin: 2, minWidth: 50 }}
                            onClick={() => this.setState(() => ({isMapOverlayShown: true}))}
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
                    <ErrorMessage>
                        {this.state.codeError}
                    </ErrorMessage>
                    <ResultMessage type={getMessageTypeForResult(this.state.battleResult)}>
                        {getBattleResultMessage(this.state.battleResult)}
                    </ResultMessage>
                </span>
                {this._renderEditor()}
            </SplitPane>
            <HelpModal
                title={this.props.level.help.title}
                message={this.props.level.help.text}
                isOpened={this.state.isHelpModalShown}
                onClose={() => this.setState(() => ({isHelpModalShown: false}))}
            />
        </span>
    }
}
