import React from "react";
import {defineAstForGroups, findGroupsWithoutAst, IGameLevel} from "../../core/strategyCore/battleRunner/IGameLevel";
import {IRoboAst} from "../../core/strategyCore/models/programTypes";
import {World} from "../../core/strategyCore/models/world";
import {BattleResult, getMessageTypeForResult} from "../../core/strategyCore/battleRunner/BattleResult";
import {ICancelablePromise} from "../../utils/cancelablePromise";
import {List, Map} from "immutable";
import {HelpModal} from "../uiComponents/HelpModal";
import {StandardEditorSidebar} from "../../containers/strategyEditor/StandardEditorSidebar";
import {StrategyInnerEditor} from "../../containers/strategyEditor/StrategyInnerEditor";
import {createDrawHistory} from "../../core/strategyCore/battleRunner/historyPrinter";
import {runBattle} from "../../core/strategyCore/battleRunner/runBattle";
import {invalidProgramError} from "../../core/strategyCore/utils/invalidProgramError";
import RaisedButton from "material-ui/RaisedButton";
import {WinModal} from "../uiComponents/WinModal";
import {ResultMessageType} from "../uiComponents/ResultMessage";

export interface IStrategyEditorDataProps {
    readonly level: IGameLevel;
    readonly canRunBattle: boolean;
    readonly roboAst: IRoboAst;
    readonly isMapShown: boolean;
    readonly isHelpShown: boolean;
    readonly currentWorld: World;
    readonly battleResult: BattleResult | null;
    readonly location: string;
}

export interface IStrategyEditorCallbackProps {
    readonly onCodeSubmit: (() => void) | undefined;
    readonly onHelpClosed: () => void;
    readonly worldChanged: (newWorld: World) => void;
    readonly reset: (originalWorld: World) => void;
    readonly battleResultChanged: (newBattleResult: BattleResult) => void;
    readonly toggleMap: () => void;
    readonly initializeStore: (level: IGameLevel) => void;
}

type Props = IStrategyEditorDataProps & IStrategyEditorCallbackProps;

interface IState {
    drawingPromise?: ICancelablePromise<List<World> | undefined>;
    useCodeEditor: boolean;
    editorHeight: number;
    showWinModal: boolean;
}

const shouldShowMinimap = (world: World) => world.size.x <= 5 && world.size.y <= 10;
const minimumEditorSize = 400 as const;
const changeSizeNumber = 100 as const;

const createNextLevelForWinModal = (link?: string, name?: string) =>
    link && name ? { name, link } : undefined;

export class StrategyEditor extends React.PureComponent<Props, IState> {
    constructor(props: Props) {
        super(props);
        this.state = {
            useCodeEditor: false,
            editorHeight: 400,
            showWinModal: false,
        };

        if (props.canRunBattle && findGroupsWithoutAst(props.level).count() !== 1) {
            throw invalidProgramError('StrategyEditor can run only levels with one ast to define.');
        }
    }

    componentWillMount(): void {
        this.props.initializeStore(this.props.level);
    }

    componentDidUpdate(prevProps: Readonly<Props>): void {
        if (prevProps.location !== this.props.location) {
            this.props.initializeStore(this.props.level);
            this._hideWinModal();
        }
    }

    private _showCodeEditor = () => this.setState({useCodeEditor: true});
    private _hideCodeEditor = () => this.setState({useCodeEditor: false});

    private _reset = () => {
        if (this.state.drawingPromise) {
            this.state.drawingPromise.cancel();
        }
        this.props.reset(this.props.level.world);
    };

    private _drawNewWorld = (newWorld: World) => {
        this.props.worldChanged(newWorld);
    };

    private _drawHistory = (history: List<World>) => {
        const callback = createDrawHistory(this._drawNewWorld, 400);

        const promise = callback(history);

        this.setState(() => ({drawingPromise: promise}));

        promise
            .then(h => !h ? this._showWinModal() : this._drawHistory(h))
    };

    private _showWinModal = () =>
        getMessageTypeForResult(this.props.battleResult || undefined, this.props.level.isDecisiveWin) === ResultMessageType.Success &&
        this.setState({showWinModal: true});

    private _hideWinModal = () => this.setState({showWinModal: false});

    private _runBattle = (): void => {
        if (!this.props.canRunBattle) {
            console.warn('This should not be called when cannotRunBattle.');
            return;
        }
        this._reset();
        const level = this.props.level;
        const groups = defineAstForGroups(Map([
            [findGroupsWithoutAst(this.props.level).get(0)!, this.props.roboAst],
        ]), this.props.level);
        const result = runBattle({
            world: this.props.level.world,
            battleParams: level.battleParams,
            battleType: level.battleType,
            shipsOrder: level.turnsOrder,
            roboAsts: level.turnsOrder.map(id => groups.get(id)!).toList(),
            behaviours: level.gameBehaviours,
        });
        this.props.battleResultChanged(result);

        this._drawHistory(result.history.reverse());
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
                shouldShowMinimap={shouldShowMinimap(this.props.level.world)}
                isDecisiveWin={this.props.level.isDecisiveWin}
            />
            <StrategyInnerEditor
                additionalValidators={this.props.level.additionalValidators}
                showCodeEditor={this.state.useCodeEditor}
                toolbox={this.props.level.toolbox}
                height={this.state.editorHeight}
            />
            <RaisedButton
                label="enlarge the editor"
                secondary
                style={{margin: 2, minWidth: 50}}
                onClick={this._enlargeTheEditor}
            />
            <RaisedButton
                label="make the editor smaller"
                secondary
                style={{margin: 2, minWidth: 50}}
                onClick={this._makeEditorSmaller}
            />
            <HelpModal
                title={this.props.level.help.title}
                message={this.props.level.help.text}
                isOpened={this.props.isHelpShown}
                onClose={this.props.onHelpClosed}
            />
            <WinModal
                isOpened={this.state.showWinModal}
                onClose={this._hideWinModal}
                message={winModal.message}
                nextLevel={createNextLevelForWinModal(winModal.nextLevelLink, winModal.nextLevelName)}
            />
        </div>
    }
}
