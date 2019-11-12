import React from "react";
import {IGameLevel} from "../../core/strategyCore/battleRunner/IGameLevel";
import {IRoboAst} from "../../core/strategyCore/models/programTypes";
import {World} from "../../core/strategyCore/models/world";
import {BattleResult} from "../../core/strategyCore/battleRunner/BattleResult";
import {ICancelablePromise} from "../../utils/cancelablePromise";
import {List} from "immutable";
import {HelpModal} from "../uiComponents/HelpModal";
import SplitPane from "react-split-pane";
import {StandardEditorSidebar} from "../../containers/strategyEditor/StandardEditorSidebar";
import {StrategyInnerEditor} from "../../containers/strategyEditor/StrategyInnerEditor";
import {createDrawHistory} from "../../core/strategyCore/battleRunner/historyPrinter";
import {runBattle} from "../../core/strategyCore/battleRunner/runBattle";
import {MapOverlay} from "./MapOverlay";

export interface INewEditingDataProps {
    readonly level: IGameLevel;
    readonly canRunBattle: boolean;
    readonly roboAst: IRoboAst;
    readonly isMapShown: boolean;
    readonly isHelpShown: boolean;
    readonly currentWorld: World;
}

export interface INewEditingCallbackProps {
    readonly onCodeSubmit: (() => void) | undefined;
    readonly onHelpClosed: () => void;
    readonly worldChanged: (newWorld: World) => void;
    readonly reset: (originalWorld: World) => void;
    readonly battleResultChanged: (newBattleResult: BattleResult) => void;
    readonly toggleMap: () => void;
    readonly initializeStore: (level: IGameLevel) => void;
}

type Props = INewEditingDataProps & INewEditingCallbackProps;

interface IState {
    drawingPromise?: ICancelablePromise<List<World> | undefined>;
    useCodeEditor: boolean;
}

const shouldShowMinimap = (world: World) => world.size.x <= 5 && world.size.y <= 10;

export class StrategyEditor extends React.PureComponent<Props, IState> {
    constructor(props: Props) {
        super(props);
        this.state = {
            useCodeEditor: false,
        }
    }

    componentWillMount(): void {
        this.props.initializeStore(this.props.level);
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
            .then(h => !h || this._drawHistory(h))
    };

    private _runBattle = (): void => {
        if (!this.props.canRunBattle) {
            console.warn('This should not be called when cannotRunBattle.');
            return;
        }
        this.props.toggleMap();
        const level = this.props.level;
        const userShipId = level.turnsOrder.find(id => !level.shipsAsts.has(id)) || 'userShip';
        const allAsts = level.shipsAsts.set(userShipId, this.props.roboAst);
        const result = runBattle({
            world: this.props.level.world,
            battleParams: level.battleParams,
            battleType: level.battleType,
            shipsOrder: level.turnsOrder,
            roboAsts: level.turnsOrder.map(id => allAsts.get(id)!).toList(),
            behaviours: level.gameBehaviours,
        });
        this.props.battleResultChanged(result);

        this._drawHistory(result.history.reverse());
    };

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        if (this.props.isMapShown)
            return <span>
                <HelpModal
                    title={this.props.level.help.title}
                    message={this.props.level.help.text}
                    isOpened={this.props.isHelpShown}
                    onClose={this.props.onHelpClosed}
                />
                <MapOverlay
                    world={this.props.currentWorld}
                    onLeave={this.props.toggleMap}
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
            >
                <StandardEditorSidebar
                    onCodeSubmit={this.props.onCodeSubmit}
                    canRunBattle={this.props.canRunBattle}
                    isCodeEditorShown={this.state.useCodeEditor}
                    onHideCodeEditor={this._hideCodeEditor}
                    onShowCodeEditor={this._showCodeEditor}
                    onReset={this._reset}
                    onRunBattle={this._runBattle}
                    shouldShowMinimap={shouldShowMinimap(this.props.level.world)}
                />
                <StrategyInnerEditor
                    additionalValidators={this.props.level.additionalValidators}
                    showCodeEditor={this.state.useCodeEditor}
                    toolbox={this.props.level.toolbox}
                />
            </SplitPane>
            <HelpModal
                title={this.props.level.help.title}
                message={this.props.level.help.text}
                isOpened={this.props.isHelpShown}
                onClose={this.props.onHelpClosed}
            />
        </span>
    }
}
