import React from 'react';
import SpaceWorld from "../SpaceWorld";
import RaisedButton from "material-ui/RaisedButton";
import {convertWorldToEditorModel, World} from '../../core/strategyCore/models/world'
import {getUserProgramErrorDisplayName, UserProgramError} from "../../core/strategyCore/enums/userProgramError";
import {ErrorMessage} from "../uiComponents/ErrorMessage";
import {IRoboAst, IRuntimeContext} from "../../core/strategyCore/models/programTypes";
import {getEmptyRuntimeContext} from "../../core/strategyCore/utils/getEmptyRuntimeContext";
import {runBattle} from "../../core/strategyCore/battleRunner/runBattle";
import {List} from "immutable";
import {createDrawHistory} from "../../core/strategyCore/battleRunner/historyPrinter";
import {BattleResult, BattleResultType} from "../../core/strategyCore/battleRunner/BattleResult";
import {ResultMessage, ResultMessageType} from "../uiComponents/ResultMessage";
import {invalidProgramError} from "../../core/strategyCore/utils/invalidProgramError";
import {ICancelablePromise} from "../../utils/cancelablePromise";
import {IGameLevel} from "../../core/strategyCore/battleRunner/IGameLevel";
import {MapOverlay} from "./MapOverlay";
import {StrategyEditor} from "./StrategyEditor";
import {createEmptyAst} from "../../utils/createEmptyAst";
import {HelpModal} from "../uiComponents/HelpModal";


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
}

interface IState {
    blocklySettings: {trashcan: boolean, disable: boolean};
    roboAsts: {first: IRoboAst, second: IRoboAst};
    runtimeContext: IRuntimeContext;
    world: World;
    userProgramError?: UserProgramError;
    battleResult?: BattleResult;
    drawingPromise?: ICancelablePromise<List<World> | undefined>;
    isMapOverlayShown: boolean;
    showEditorFor: "first" | "second" | "none";
    isHelpModalShown: boolean;
}

export class DualStrategyMainBoard extends React.PureComponent<IStrategyEditorProps, IState> {

    constructor(props: IStrategyEditorProps) {
        super(props);
        this.state = {
            blocklySettings: { trashcan: true, disable: false },
            roboAsts: {first: createEmptyAst(), second: createEmptyAst() },
            runtimeContext: getEmptyRuntimeContext(),
            world: props.level.world,
            userProgramError: undefined,
            isMapOverlayShown: false,
            showEditorFor: "none",
            isHelpModalShown: true,
        };
    }

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
        this.setState(() => ({isMapOverlayShown: true}));
        const level = this.props.level;
        const allAsts = level.shipsAsts
            .set("first", this.state.roboAsts.first)
            .set("second", this.state.roboAsts.second);
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

    render() {
        if (this.state.isMapOverlayShown)
            return <MapOverlay
                world={this.state.world}
                onLeave={() => this.setState(() => ({isMapOverlayShown: false}))}
                columnSize={40}
            />;
        if (this.state.showEditorFor === "first") {
            return <StrategyEditor
                level={this.props.level}
                canRunBattle={false}
                initialAst={this.state.roboAsts.first}
                showMapAndHelpOnMount={false}
                shouldDisplayExportAst={false}
                onCodeSubmit={newAst => this.setState(prev => ({roboAsts: {...prev.roboAsts, first: newAst}, showEditorFor: "none"}))}
            />;
        }
        if (this.state.showEditorFor === "second") {
            return <StrategyEditor
                level={this.props.level}
                canRunBattle={false}
                initialAst={this.state.roboAsts.second}
                showMapAndHelpOnMount={false}
                shouldDisplayExportAst={false}
                onCodeSubmit={newAst => this.setState(prev => ({roboAsts: {...prev.roboAsts, second: newAst}, showEditorFor: "none"}))}
            />;
        }

        return <span>
            <RaisedButton
                label="Run Battle"
                secondary
                style={{margin: 2, minWidth: 50}}
                onClick={this._runBattle}
            />
            <RaisedButton
                label={'reset'}
                secondary
                style={{margin: 2, minWidth: 50}}
                onClick={this._reset}
            />
            <RaisedButton
                label="Edit first player code"
                secondary
                style={{margin: 2, minWidth: 50}}
                onClick={() => this.setState({showEditorFor: "first"})}
            />
            <RaisedButton
                label="Edit second player code"
                secondary
                style={{margin: 2, minWidth: 50}}
                onClick={() => this.setState({showEditorFor: "second"})}
            />
            <RaisedButton
                label={'Show map'}
                secondary
                style={{margin: 2, minWidth: 50}}
                onClick={() => this.setState(() => ({isMapOverlayShown: true}))}
            />
            <RaisedButton
                label={'show help'}
                style={{ margin: 2, minWidth: 50 }}
                onClick={() => this.setState(() => ({isHelpModalShown: true}))}
            />
            <ErrorMessage>
                {getUserProgramErrorDisplayName(this.state.userProgramError)}
            </ErrorMessage>
            <ResultMessage type={getMessageTypeForResult(this.state.battleResult)}>
                {getBattleResultMessage(this.state.battleResult)}
            </ResultMessage>
            <SpaceWorld
                fields={convertWorldToEditorModel(this.state.world)}
                width={200}
            />
            <HelpModal
                title={this.props.level.help.title}
                message={this.props.level.help.text}
                isOpened={this.state.isHelpModalShown}
                onClose={() => this.setState(() => ({isHelpModalShown: false}))}
            />
        </span>
    }
}

