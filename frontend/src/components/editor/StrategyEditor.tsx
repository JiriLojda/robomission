import React from "react";
import {defineAstForGroups, findGroupsWithoutAst, IGameLevel} from "../../core/strategyCore/battleRunner/IGameLevel";
import {IRoboAst, IRuntimeContext} from "../../core/strategyCore/models/programTypes";
import {World} from "../../core/strategyCore/models/world";
import {BattleResult, getMessageTypeForResult} from "../../core/strategyCore/battleRunner/BattleResult";
import {delay, ICancelablePromise} from "../../utils/cancelablePromise";
import {List, Map} from "immutable";
import {HelpModal} from "../uiComponents/HelpModal";
import {StandardEditorSidebar} from "../../containers/strategyEditor/StandardEditorSidebar";
import {StrategyInnerEditor} from "../../containers/strategyEditor/StrategyInnerEditor";
import {createDrawHistory} from "../../core/strategyCore/battleRunner/historyPrinter";
import {IRunBattleParams, isBattleResult, runBattle, stepBattle} from "../../core/strategyCore/battleRunner/runBattle";
import {invalidProgramError} from "../../core/strategyCore/utils/invalidProgramError";
import RaisedButton from "material-ui/RaisedButton";
import {WinModal} from "../uiComponents/WinModal";
import {ResultMessageType} from "../uiComponents/ResultMessage";
import {translate} from "../../localization";
import {createEmptyRuntimeContext} from "../../core/strategyCore/utils/createEmptyRuntimeContext";
import {EditorDebugState} from "./constants/editorDebugState";
import {range} from "../../utils/arrays";
import {applyObjectGenerators} from "../../core/strategyCore/levels/utils/applyObjectGenerators";

export interface IStrategyEditorDataProps {
    readonly level: IGameLevel;
    readonly canRunBattle: boolean;
    readonly roboAst: IRoboAst;
    readonly isMapShown: boolean;
    readonly isHelpShown: boolean;
    readonly currentWorld: World;
    readonly battleResult: BattleResult | null;
    readonly location: string;
    readonly drawingSpeed: number;
}

export interface IStrategyEditorCallbackProps {
    readonly onCodeSubmit: (() => void) | undefined;
    readonly onHelpClosed: () => void;
    readonly worldChanged: (newWorld: World) => void;
    readonly reset: (originalWorld: World) => void;
    readonly toggleMap: () => void;
    readonly initializeStore: (level: IGameLevel) => void;
    readonly onBattleRunFinished: (newBattleResult: BattleResult) => void;
    readonly onBattleRunStarted: (world: World) => void;
}

type Props = IStrategyEditorDataProps & IStrategyEditorCallbackProps;

type DebugState = {
    readonly debugState: EditorDebugState;
    readonly runtimeContexts: List<IRuntimeContext>;
    readonly executionIndex: number;
    readonly turnsRan: number;
    readonly highlightedLine: number | undefined;
    readonly highlightedBlockId: string | undefined;
}

interface IState {
    drawingPromise?: ICancelablePromise<List<World> | undefined>;
    useCodeEditor: boolean;
    editorHeight: number;
    showWinModal: boolean;
    startTime: number;
    nextExtraHelpIndex: number;
    extraHelpTimePromise?: ICancelablePromise;
    lastExtraHelpFailureCount: number;
    failureCount: number;
    showExtraHelp: boolean;
    debugState: DebugState;
}

const minimumEditorSize = 400 as const;
const changeSizeNumber = 100 as const;

const createNextLevelForWinModal = (link?: string, name?: string) =>
    link && name ? {name, link} : undefined;

const createScheduleNextExtraHelp = (level: IGameLevel, nextHelpIndex: number, showHelpCallback: () => void) => {
    const nextHelp = level.help.get(nextHelpIndex)!;
    return nextHelp.timeoutToShowSeconds > 0 ?
        delay(nextHelp.timeoutToShowSeconds * 1000)
            .then(showHelpCallback) :
        undefined;
};

const createRunBattleParams = (level: IGameLevel, roboAsts: List<IRoboAst>): IRunBattleParams => ({
    world: level.world,
    battleParams: level.battleParams,
    battleType: level.battleType,
    shipsOrder: level.turnsOrder,
    roboAsts,
    behaviours: level.gameBehaviours,
});

const defineAstForOneMissingGroup = (level: IGameLevel, ast: IRoboAst) => {
    const groups = defineAstForGroups(Map([
        [findGroupsWithoutAst(level).get(0)!, ast],
    ]), level);
    return level.turnsOrder.map(id => groups.get(id)!).toList();
};

const createEmptyDebugState = (numberOfPlayers: number): DebugState => ({
    debugState: EditorDebugState.NotDebugging,
    turnsRan: 0,
    executionIndex: 0,
    runtimeContexts: List(range(numberOfPlayers).map(createEmptyRuntimeContext)),
    highlightedLine: undefined,
    highlightedBlockId: undefined,
});

export class StrategyEditor extends React.PureComponent<Props, IState> {
    constructor(props: Props) {
        super(props);
        this.state = {
            useCodeEditor: false,
            editorHeight: 600,
            showWinModal: false,
            startTime: Date.now(),
            lastExtraHelpFailureCount: 0,
            failureCount: 0,
            extraHelpTimePromise: createScheduleNextExtraHelp(
                this.props.level,
                this.props.level.help.count() > 1 ? 1 : 0,
                this._showExtraHelp,
            ),
            nextExtraHelpIndex: this.props.level.help.count() > 1 ? 1 : 0,
            showExtraHelp: false,
            debugState: createEmptyDebugState(this.props.level.turnsOrder.count())
        };

        if (props.canRunBattle && findGroupsWithoutAst(props.level).count() !== 1) {
            throw invalidProgramError('StrategyEditor can run only levels with one ast to define.');
        }
    }

    componentWillMount(): void {
        this.props.initializeStore(this.props.level);
    }

    componentWillUnmount(): void {
        this._cancelStatePromises();
        this.props.initializeStore(this.props.level);
    }

    componentDidUpdate(prevProps: Readonly<Props>): void {
        if (prevProps.location !== this.props.location) {
            this._cancelStatePromises();
            this.props.initializeStore(this.props.level);
            this._hideWinModal();
            this._hideExtraHelp();
            this.setState({
                startTime: Date.now(),
                lastExtraHelpFailureCount: 0,
                failureCount: 0,
                extraHelpTimePromise: createScheduleNextExtraHelp(
                    this.props.level,
                    this.props.level.help.count() > 1 ? 1 : 0,
                    this._showExtraHelp,
                ),
                nextExtraHelpIndex: this.props.level.help.count() > 1 ? 1 : 0,
            })
        }
    }

    private _makeDebugStep = (stepMinorAction: boolean) => {
        if (this.state.debugState.debugState !== EditorDebugState.Debugging) {
            this._reset();
            this.setState(prev => ({debugState: {...prev.debugState, debugState: EditorDebugState.Debugging}}));
        }

        const asts = defineAstForOneMissingGroup(this.props.level, this.props.roboAst);
        const params = createRunBattleParams(this.props.level, asts);
        const {runtimeContexts, turnsRan, executionIndex} = this.state.debugState;
        const isPlayerTurn = this.props.level.isDecisiveWin(this.props.level.turnsOrder.get(executionIndex) || '');
        const stepResult = stepBattle(
            params,
            {
                world: this.props.currentWorld,
                turnsRan,
                runtimeContexts: runtimeContexts.toArray(),
                executionIndex,
            },
            isPlayerTurn && stepMinorAction,
        );

        if (isBattleResult(stepResult)) {
            this.setState(prevState => ({
                debugState: {
                    ...prevState.debugState,
                    debugState: EditorDebugState.DebugFinished,
                    highlightedLine: undefined,
                    highlightedBlockId: undefined,
                }
            }));
            this.props.onBattleRunFinished(stepResult);
            this._handleWinLoseCounts(stepResult);
        } else {
            this.setState(
                prevState => {
                    const prevDebugState = prevState.debugState;
                    return ({
                        debugState: {
                            ...prevDebugState,
                            runtimeContexts: prevDebugState.runtimeContexts.set(prevDebugState.executionIndex, stepResult.modifiedContext),
                            executionIndex: stepResult.nextExecutionIndex,
                            turnsRan: prevDebugState.turnsRan + 1,
                            highlightedLine: isPlayerTurn ? stepResult.nextLineNumber : prevDebugState.highlightedLine,
                            highlightedBlockId: isPlayerTurn ? stepResult.nextBlockId : prevDebugState.highlightedBlockId,
                        }
                    });
                },
                !isPlayerTurn && this.props.currentWorld === stepResult.newWorld ?
                    () => this._makeDebugStep(stepMinorAction) : undefined
            );
            this.props.worldChanged(stepResult.newWorld);
        }
    };

    private _cancelStatePromises = () => {
        if (this.state.drawingPromise) {
            this.state.drawingPromise.cancel();
        }
        if (this.state.extraHelpTimePromise) {
            this.state.extraHelpTimePromise.cancel();
        }
    };

    private _showCodeEditor = () => this.setState({useCodeEditor: true});
    private _hideCodeEditor = () => this.setState({useCodeEditor: false});

    private _reset = () => {
        if (this.state.drawingPromise) {
            this.state.drawingPromise.cancel();
        }
        this.setState(({debugState: createEmptyDebugState(this.props.level.turnsOrder.count())}));
        this.props.reset(this.props.level.world);
    };

    private _drawNewWorld = (newWorld: World) => {
        this.props.worldChanged(newWorld);
    };

    private _cleanUpDrawingPromise = () => this.setState({drawingPromise: undefined});

    private _drawHistory = (history: List<World>): Promise<any> => {
        const callback = createDrawHistory(this._drawNewWorld, this.props.drawingSpeed);

        const promise = callback(history);

        this.setState(() => ({drawingPromise: promise}));

        return promise
            .then(h => !h || this._drawHistory(h))
    };

    private _showWinModal = () => {
        if (this.state.extraHelpTimePromise)
            this.state.extraHelpTimePromise.cancel();
        return this.setState({showWinModal: true});
    };

    private _hideWinModal = () => this.setState({showWinModal: false});

    private _showExtraHelp = () => {
        if (this.state.extraHelpTimePromise)
            this.state.extraHelpTimePromise.cancel();

        if (!this.props.isHelpShown && !this.state.drawingPromise) {
            this.setState(({showExtraHelp: true}));
        } else {
            const extraHelpTimePromise = createScheduleNextExtraHelp(
                this.props.level,
                this.state.nextExtraHelpIndex,
                this._showExtraHelp,
            );
            this.setState({extraHelpTimePromise});
        }
    };

    private _hideExtraHelp = () => {
        if (this.state.nextExtraHelpIndex + 1 >= this.props.level.help.count()) {
            this.setState({showExtraHelp: false, nextExtraHelpIndex: 0});
            return;
        }

        const extraHelpTimePromise = createScheduleNextExtraHelp(
            this.props.level,
            this.state.nextExtraHelpIndex + 1,
            this._showExtraHelp,
        );

        this.setState(prevState => ({
            showExtraHelp: false,
            nextExtraHelpIndex: prevState.nextExtraHelpIndex + 1,
            lastExtraHelpFailureCount: prevState.failureCount,
            extraHelpTimePromise,
        }));
    };

    private _isEnoughFailuresToShowExtraHelp = () => {
        const nextHelp = this.props.level.help.get(this.state.nextExtraHelpIndex);
        return this.state.nextExtraHelpIndex > 0 &&
            nextHelp &&
            nextHelp.timeoutToShowFailures > 0 &&
            (this.state.failureCount - this.state.lastExtraHelpFailureCount) + 1 >= nextHelp.timeoutToShowFailures;
    };

    private _incrementFailureCount = () => {
        if (this._isEnoughFailuresToShowExtraHelp()) {
            this._showExtraHelp();
        }

        this.setState(prev => ({failureCount: prev.failureCount + 1}));
    };

    private _closeHelp = () => this.props.onHelpClosed();

    private _handleWinLoseCounts = (result: BattleResult) =>
        getMessageTypeForResult(result, this.props.level.isDecisiveWin) === ResultMessageType.Success ?
            this._showWinModal() :
            this._incrementFailureCount();

    private _runBattle = (): void => {
        if (!this.props.canRunBattle) {
            console.warn('This should not be called when cannotRunBattle.');
            return;
        }
        this._reset();
        this.props.onBattleRunStarted(applyObjectGenerators(this.props.level.world, this.props.level.additionalObjectGenerators));

        const asts = defineAstForOneMissingGroup(this.props.level, this.props.roboAst);
        const result = runBattle(createRunBattleParams(this.props.level, asts));

        this._drawHistory(result.history.reverse())
            .then(this._cleanUpDrawingPromise)
            .then(() => this.props.onBattleRunFinished(result))
            .then(() => this._handleWinLoseCounts(result));
    };

    private _enlargeTheEditor = () =>
        this.setState(prevState => ({editorHeight: prevState.editorHeight + changeSizeNumber}));

    private _makeEditorSmaller = () => {
        if (this.state.editorHeight - changeSizeNumber < minimumEditorSize)
            return;
        this.setState(prevState => ({editorHeight: prevState.editorHeight - changeSizeNumber}))
    };

    render() {
        const winModal = this.props.level.winModal;
        return <div>
            <StandardEditorSidebar
                onCodeSubmit={this.props.onCodeSubmit}
                canRunBattle={this.props.canRunBattle}
                isCodeEditorShown={this.state.useCodeEditor}
                onHideCodeEditor={this._hideCodeEditor}
                onShowCodeEditor={this._showCodeEditor}
                onReset={this._reset}
                onRunBattle={this._runBattle}
                isDecisiveWin={this.props.level.isDecisiveWin}
                onDebugStep={this._makeDebugStep}
            />
            <StrategyInnerEditor
                additionalValidators={this.props.level.additionalValidators}
                showCodeEditor={this.state.useCodeEditor}
                toolbox={this.props.level.toolbox}
                height={this.state.editorHeight}
                isReadonly={this.state.debugState.debugState === EditorDebugState.Debugging}
                highlightedLine={this.state.debugState.highlightedLine}
                highlightedBlockId={this.state.debugState.highlightedBlockId}
            />
            <RaisedButton
                label={translate('editor.enlargeEditorArea')}
                secondary
                style={{margin: 2, minWidth: 50}}
                onClick={this._enlargeTheEditor}
            />
            <RaisedButton
                label={translate('editor.shrinkEditorArea')}
                secondary
                style={{margin: 2, minWidth: 50}}
                onClick={this._makeEditorSmaller}
            />
            <HelpModal
                title={this.props.level.help.get(0)!.title}
                message={this.props.level.help.get(0)!.text}
                isOpened={this.props.isHelpShown}
                onClose={this._closeHelp}
            />
            <HelpModal
                title={this.props.level.help.get(this.state.nextExtraHelpIndex)!.title}
                message={this.props.level.help.get(this.state.nextExtraHelpIndex)!.text}
                isOpened={this.state.showExtraHelp}
                onClose={this._hideExtraHelp}
            />
            <WinModal
                isOpened={this.state.showWinModal}
                onClose={this._hideWinModal}
                message={winModal.message}
                nextLevel={createNextLevelForWinModal(winModal.nextLevelLink, winModal.nextLevelName)}
                durationSeconds={Math.floor((Date.now() - this.state.startTime) / 1000)}
            />
        </div>
    }
}
