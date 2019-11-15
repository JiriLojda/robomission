import React from 'react';
import SpaceWorld from "../SpaceWorld";
import RaisedButton from "material-ui/RaisedButton";
import {convertWorldToEditorModel, World} from '../../core/strategyCore/models/world'
import {getUserProgramErrorDisplayName, UserProgramError} from "../../core/strategyCore/enums/userProgramError";
import {ErrorMessage} from "../uiComponents/ErrorMessage";
import {IRoboAst, IRuntimeContext} from "../../core/strategyCore/models/programTypes";
import {getEmptyRuntimeContext} from "../../core/strategyCore/utils/getEmptyRuntimeContext";
import {runBattle} from "../../core/strategyCore/battleRunner/runBattle";
import {List, Map} from "immutable";
import {createDrawHistory} from "../../core/strategyCore/battleRunner/historyPrinter";
import {BattleResult, BattleResultType} from "../../core/strategyCore/battleRunner/BattleResult";
import {ResultMessage, ResultMessageType} from "../uiComponents/ResultMessage";
import {invalidProgramError} from "../../core/strategyCore/utils/invalidProgramError";
import {ICancelablePromise} from "../../utils/cancelablePromise";
import {defineAstForGroups, findGroupsWithoutAst, IGameLevel} from "../../core/strategyCore/battleRunner/IGameLevel";
import {createEmptyAst} from "../../utils/createEmptyAst";
import {HelpModal} from "../uiComponents/HelpModal";
import {StrategyEditor} from "../../containers/strategyEditor/StrategyEditor";
import {WinModal} from "../uiComponents/WinModal";


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
    readonly editedRoboAst: IRoboAst;
}

type Player = "first" | "second" | "none";

interface IState {
    blocklySettings: {trashcan: boolean, disable: boolean};
    roboAsts: {first: IRoboAst, second: IRoboAst};
    runtimeContext: IRuntimeContext;
    world: World;
    userProgramError: UserProgramError;
    battleResult?: BattleResult;
    drawingPromise?: ICancelablePromise<List<World> | undefined>;
    showEditorFor: Player;
    isHelpModalShown: boolean;
    isWinModalShown: boolean;
}

export class DualStrategyMainBoard extends React.PureComponent<IStrategyEditorProps, IState> {

    constructor(props: IStrategyEditorProps) {
        super(props);
        this.state = {
            blocklySettings: { trashcan: true, disable: false },
            roboAsts: {first: createEmptyAst(), second: createEmptyAst() },
            runtimeContext: getEmptyRuntimeContext(),
            world: props.level.world,
            userProgramError: UserProgramError.None,
            showEditorFor: "none",
            isHelpModalShown: true,
            isWinModalShown: false,
        };
    }

    _reset = () => {
        if (this.state.drawingPromise) {
            this.state.drawingPromise.cancel();
        }
        this.setState(() => ({
            runtimeContext: getEmptyRuntimeContext(),
            world: this.props.level.world,
            userProgramError: UserProgramError.None,
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
            .then(h => !h ? this._showWinModal() : this._drawHistory(h))
    };

    private _showWinModal = () =>
        getMessageTypeForResult(this.state.battleResult) === ResultMessageType.Success &&
        this.setState({isWinModalShown: true});

    private _hideWinModal = () => this.setState({isWinModalShown: false});

    _runBattle = (): void => {
        this._reset();
        const level = this.props.level;
        const groupsWithoutAsts = findGroupsWithoutAst(this.props.level);
        const allAsts = defineAstForGroups(Map([
            [groupsWithoutAsts.get(0)!, this.state.roboAsts.first],
            [groupsWithoutAsts.get(1)!, this.state.roboAsts.second],
        ]), this.props.level);
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

    private _codeSubmitted = () => {
        const newAst = this.props.editedRoboAst;
        switch (this.state.showEditorFor) {
            case "second":
                return this.setState(prev => ({roboAsts: {...prev.roboAsts, second: newAst}, showEditorFor: "none"}));
            case "first":
                return this.setState(prev => ({roboAsts: {...prev.roboAsts, first: newAst}, showEditorFor: "none"}));
            default:
                throw invalidProgramError(`Editor is for ${this.state.showEditorFor} right after code submitted.`);
        }
    };

    render() {
        if (this.state.showEditorFor === "first") {
            return <StrategyEditor
                level={this.props.level}
                canRunBattle={false}
                initialRoboAst={this.state.roboAsts.first}
                showMapAndHelpOnMount={false}
                onCodeSubmit={this._codeSubmitted}
            />;
        }
        if (this.state.showEditorFor === "second") {
            return <StrategyEditor
                level={this.props.level}
                canRunBattle={false}
                initialRoboAst={this.state.roboAsts.second}
                showMapAndHelpOnMount={false}
                onCodeSubmit={this._codeSubmitted}
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
            <WinModal
                message={this.props.level.winModal.message}
                isOpened={this.state.isWinModalShown}
                onClose={this._hideWinModal}
                durationSeconds={0}
            />
        </span>
    }
}

