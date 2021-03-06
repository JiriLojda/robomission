import SpaceWorld from "../SpaceWorld";
import {convertWorldToEditorModel, World} from "../../core/strategyCore/models/world";
import RaisedButton from "material-ui/RaisedButton";
import {
    getInvalidProgramReasonDisplayName,
    InvalidProgramReason
} from "../../core/strategyCore/enums/invalidProgramReason";
import {Slider, Toggle} from "material-ui";
import {ErrorMessage} from "../uiComponents/ErrorMessage";
import {getUserProgramErrorDisplayName, UserProgramError} from "../../core/strategyCore/enums/userProgramError";
import {ResultMessage, ResultMessageType} from "../uiComponents/ResultMessage";
import React from "react";
import {translate} from "../../localization";
import {IRoboAst} from "../../core/strategyCore/models/programTypes";
import {
    BattleResult,
    getBattleResultMessage,
    getMessageTypeForResult
} from "../../core/strategyCore/battleRunner/BattleResult";
import {BattleSeriesResult} from "../../reducers/strategyEditor/internalReducers/battleSeriesResult";
import {allCodeDocs} from "../../core/strategyCore/constants/codeDocs/allCodeDocs";
import {DocsModal} from "../uiComponents/DocsModal";
import {DocumentationEntry} from "../../core/strategyCore/models/docsTypes";

export interface IStandardEditorSidebarDataProps {
    readonly world: World;
    readonly validationResult: InvalidProgramReason;
    readonly runtimeError: UserProgramError;
    readonly shouldShowExportAst: boolean;
    readonly codeError: string | null;
    readonly roboAst: IRoboAst;
    readonly isCodeEditorShown: boolean;
    readonly battleResult: BattleResult | null;
    readonly canRunBattle: boolean;
    readonly drawingSpeed: number;
    readonly battleSeriesResult: BattleSeriesResult;
}

export interface IStandardEditorSidebarCallbackProps {
    readonly onRunBattle: () => void;
    readonly onReset: () => void;
    readonly onShowHelp: () => void;
    readonly onShowCodeEditor: () => void;
    readonly onHideCodeEditor: () => void;
    readonly onShowMap: () => void;
    readonly onCodeSubmit: (() => void) | undefined;
    readonly isDecisiveWin: (winner: string) => boolean;
    readonly onDrawingSpeedChanged: (speed: number) => void;
    readonly onDebugStep: (stepMinorAction: boolean) => void;
}

type Props = IStandardEditorSidebarDataProps & IStandardEditorSidebarCallbackProps;

interface IStandardEditorSidebarState {
    readonly width: number;
    readonly showDocs: boolean;
    readonly currentDocsIndex: number;
}

const tileSize = 40;
const minControlsSize = 200;
const maxDrawingSpeed = 1000;
const minDrawingSpeed = 100;
const getMapWidth = (world: World) =>
    world.size.x * tileSize;
const getMapElementWidth = (world: World, width: number) =>
    Math.min(getMapWidth(world), width - 20);
const getMapElementHeight = (world: World, width: number) =>
    (getMapElementWidth(world, width) / world.size.x) * world.size.y;

const calculateControlsWidth = (world: World, width: number) =>
    width - getMapWidth(world) - 30 < minControlsSize ?
        '100%' : `calc(100% - ${getMapWidth(world)}px)`;

const getBattleSeriesMessageType = ({wonRuns, requiredWins, drawRuns, lostRuns}: BattleSeriesResult): ResultMessageType =>
    wonRuns >= requiredWins ? ResultMessageType.Success : ResultMessageType.Bad;

const createBattleSeriesMessage = ({wonRuns, requiredWins, drawRuns, lostRuns}: BattleSeriesResult): string | undefined => {
    if (wonRuns === 0 && requiredWins === 0 && drawRuns === 0 && lostRuns === 0)
        return undefined;
    if (wonRuns >= requiredWins)
        return `Great, you just won. successful rounds: ${wonRuns}, draw rounds: ${drawRuns}, lost rounds: ${lostRuns}.`;

    return `No worries, try it again later. Result: won ${wonRuns}, draw ${drawRuns}, lost ${lostRuns}.`;
};

export class StandardEditorSidebar extends React.PureComponent<Props, IStandardEditorSidebarState> {
    constructor(props: Props) {
        super(props);
        this.state = {
            width: window.innerWidth,
            showDocs: false,
            currentDocsIndex: 0,
        }
    }

    updateDimensions = () => {
        if (this.state.width === window.innerWidth)
            return;

        this.setState({width: window.innerWidth});
    };

    componentDidMount() {
        window.addEventListener('resize', this.updateDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions);
    }

    private _onDrawingSpeedChanged = (e: any, speed: number) =>
        this.props.onDrawingSpeedChanged(maxDrawingSpeed + minDrawingSpeed - speed);

    private _toggleShowDocs = () =>
        this.setState(prev => ({showDocs: !prev.showDocs}));

    private _nextDocs = () => {
        if (this.state.currentDocsIndex + 1 >= allCodeDocs.size) {
            return;
        } else {
            this.setState(prev => ({currentDocsIndex: prev.currentDocsIndex + 1}));
        }
    };

    private _prevDocs = () => {
        if (this.state.currentDocsIndex - 1 < 0) {
            return;
        } else {
            this.setState(prev => ({currentDocsIndex: prev.currentDocsIndex - 1}));
        }
    };

    private _findCurrentDoc = (): DocumentationEntry => allCodeDocs.get(this.state.currentDocsIndex) || {title: '', message: ''};

    private _findNextDocTitle = () => this.state.currentDocsIndex + 1 < allCodeDocs.size ?
        allCodeDocs.get(this.state.currentDocsIndex + 1)!.title :
        undefined;

    private _findPrevDocTitle = () => this.state.currentDocsIndex - 1 >= 0 ?
        allCodeDocs.get(this.state.currentDocsIndex - 1)!.title :
        undefined;

    render() {
        return (
            <div style={{width: '100%', padding: '5px', display: 'flex', flexWrap: 'wrap'}}>
                <div style={{
                    float: 'left',
                    width: `${getMapElementWidth(this.props.world, this.state.width)}px`,
                    height: `${getMapElementHeight(this.props.world, this.state.width)}px`,
                    flexShrink: 0,
                }}>
                    <SpaceWorld
                        fields={convertWorldToEditorModel(this.props.world)}
                        width={getMapElementWidth(this.props.world, this.state.width)}
                    />
                </div>
                <div style={{width: calculateControlsWidth(this.props.world, this.state.width), paddingLeft: '5px'}}>
                    {this.props.canRunBattle &&
                    <RaisedButton
                      label={translate('editor.runBattle')}
                      disabled={this.props.validationResult !== InvalidProgramReason.None || !!this.props.codeError}
                      primary
                      style={{margin: 2, minWidth: 50}}
                      onClick={this.props.onRunBattle}
                    />
                    }
                    {!!this.props.onCodeSubmit &&
                    <RaisedButton
                      label={translate('editor.submitCode')}
                      disabled={this.props.validationResult !== InvalidProgramReason.None || !!this.props.codeError}
                      primary
                      style={{margin: 2, minWidth: 50}}
                      onClick={this.props.onCodeSubmit}
                    />
                    }
                    <RaisedButton
                        label={'reset'}
                        secondary
                        style={{margin: 2, minWidth: 50}}
                        onClick={this.props.onReset}
                    />
                    {this.props.shouldShowExportAst &&
                    <RaisedButton
                      label={'ast to console'}
                      style={{margin: 2, minWidth: 50}}
                      onClick={() => console.log(JSON.stringify(this.props.roboAst))}
                    />
                    }
                    {this.props.canRunBattle &&
                    <RaisedButton
                      label={translate('editor.makeBattleStep')}
                      disabled={this.props.validationResult !== InvalidProgramReason.None || !!this.props.codeError}
                      primary
                      style={{margin: 2, minWidth: 50}}
                      onClick={() => this.props.onDebugStep(false)}
                    />
                    }
                    {this.props.canRunBattle &&
                    <RaisedButton
                      label={translate('editor.makeProgramStep')}
                      disabled={this.props.validationResult !== InvalidProgramReason.None || !!this.props.codeError}
                      primary
                      style={{margin: 2, minWidth: 50}}
                      onClick={() => this.props.onDebugStep(true)}
                    />
                    }
                    <RaisedButton
                        label={translate('editor.showHelp')}
                        style={{margin: 2, minWidth: 50}}
                        onClick={this.props.onShowHelp}
                    />
                    {this.props.isCodeEditorShown &&
                    <RaisedButton
                      label={'show docs'}
                      style={{margin: 2, minWidth: 50}}
                      onClick={this._toggleShowDocs}
                    />
                    }
                    <div style={{width: '200px', color: "white", marginBottom: '-20px'}}>
                        {translate('editor.battleSpeed')}
                        <Slider
                            name={translate('editor.battleSpeed')}
                            axis="x"
                            value={maxDrawingSpeed + minDrawingSpeed - this.props.drawingSpeed}
                            max={maxDrawingSpeed}
                            min={minDrawingSpeed}
                            onChange={this._onDrawingSpeedChanged}
                            step={20}
                        />
                    </div>
                    <div style={{width: '200px'}}>
                        <Toggle
                            toggled={this.props.isCodeEditorShown}
                            label={translate('editor.useCodeEditor')}
                            disabled={this.props.validationResult !== InvalidProgramReason.None || !!this.props.codeError}
                            onToggle={this.props.isCodeEditorShown ? this.props.onHideCodeEditor : this.props.onShowCodeEditor}
                        />
                    </div>
                    <ErrorMessage>
                        {getUserProgramErrorDisplayName(this.props.runtimeError)}
                    </ErrorMessage>
                    <ErrorMessage>
                        {
                            this.props.validationResult !== InvalidProgramReason.None ?
                                getInvalidProgramReasonDisplayName(this.props.validationResult) :
                                undefined
                        }
                    </ErrorMessage>
                    <ErrorMessage>
                        {this.props.codeError || undefined}
                    </ErrorMessage>
                    <ResultMessage
                        type={getMessageTypeForResult(this.props.battleResult || undefined, this.props.isDecisiveWin)}>
                        {getBattleResultMessage(this.props.battleResult || undefined, this.props.isDecisiveWin)}
                    </ResultMessage>
                    <ResultMessage type={getBattleSeriesMessageType(this.props.battleSeriesResult)}>
                        {createBattleSeriesMessage(this.props.battleSeriesResult)}
                    </ResultMessage>
                </div>
                <DocsModal
                    title={this._findCurrentDoc().title}
                    message={this._findCurrentDoc().message}
                    isOpened={this.state.showDocs && this.props.isCodeEditorShown}
                    onClose={this._toggleShowDocs}
                    showNext={this.state.currentDocsIndex + 1 < allCodeDocs.size}
                    onShowNext={this._nextDocs}
                    nextTitle={this._findNextDocTitle()}
                    showPrev={this.state.currentDocsIndex - 1 >= 0}
                    onShowPrev={this._prevDocs}
                    prevTitle={this._findPrevDocTitle()}
                />
            </div>
        );
    }
}
