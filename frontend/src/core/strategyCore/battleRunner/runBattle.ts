import {World} from "../models/world";
import {IRoboAst, IRuntimeContext} from "../models/programTypes";
import {List} from "immutable";
import {BattleResult, BattleResultType} from "./BattleResult";
import {getEmptyRuntimeContext} from "../utils/getEmptyRuntimeContext";
import {isUserProgramError, UserProgramError} from "../enums/userProgramError";
import {doNextStep} from "../astInterpreter";
import {invalidProgramError} from "../utils/invalidProgramError";
import {BattleType} from "./BattleType";
import {hasBattleEnded, IBattleEndParams} from "./hasBattleEnded";
import {getBattleResult} from "./getBattleResult";
import {ShipId} from "../models/ship";
import {IGameBehaviours} from "../gameBehaviours/IGameBehaviours";

export interface IRunBattleParams {
    readonly world: World,
    readonly shipsOrder: List<ShipId>,
    readonly roboAsts: List<IRoboAst>,
    readonly battleType: BattleType;
    readonly battleParams: IBattleEndParams;
    readonly behaviours: IGameBehaviours;
}

export const runBattle = (params: IRunBattleParams): BattleResult => {
    assertParamsCorrectness(params);

    const runtimeContexts = params.shipsOrder.map(() => getEmptyRuntimeContext()).toArray();
    let currentIndex = 0;
    let currentWorld = params.world;
    let turnsRan = 0;
    const history: World[] = [params.world];

    while (!hasBattleEnded(currentWorld, params.battleType, {...params.battleParams, turnsRan}) && hasSomethingToDo(runtimeContexts)) {
        const result = makeTurn(
            {
                world: currentWorld,
                shipsOrder: params.shipsOrder,
                roboAsts: params.roboAsts,
                behaviours: params.behaviours
            },
            runtimeContexts[currentIndex],
            currentIndex
        );

        if (isUserProgramError(result))
            return {
                error: result,
                type: BattleResultType.ProgramError,
                blame: params.shipsOrder.get(currentIndex)!,
                history: List(history),
            };

        runtimeContexts[currentIndex] = result[0];
        currentWorld = result[1];
        history.push(currentWorld);
        currentIndex = (currentIndex + 1) % params.shipsOrder.size;
        turnsRan++;
    }

    return getBattleResult({
        world: currentWorld,
        battleType: params.battleType,
        battleEndParams: {...params.battleParams, turnsRan},
        contexts: runtimeContexts,
        history: List(history),
    })
};

type MakeTurnParamNames = 'shipsOrder' | 'roboAsts' | 'world' | 'behaviours';

const makeTurn = (params: Pick<IRunBattleParams, MakeTurnParamNames>, context: IRuntimeContext, playerIndex: number): [IRuntimeContext, World] | UserProgramError => {
    context.wasActionExecuted = false;
    const roboAst = params.roboAsts.get(playerIndex);
    const shipId = params.shipsOrder.get(playerIndex);

    if (!roboAst || !shipId) {
        throw invalidProgramError(
            `Player index ${playerIndex} is not a correct index for roboAsts: ${params.roboAsts.size} or ships: ${params.shipsOrder.size}.`,
            'runBattle -> makeTurn'
            );
    }

    let currentContext = context;
    let currentWorld = params.world;

    while (!currentContext.wasActionExecuted && currentContext.minorActionsLeft > 0 && !currentContext.hasEnded) {
        const result = doNextStep(
            roboAst,
            params.world,
            shipId,
            currentContext,
            params.behaviours
            );
        if (isUserProgramError(result))
            return result;

        currentContext = result[0];
        currentWorld = result[1];
    }

    return [currentContext, currentWorld];
};

const hasSomethingToDo = (contexts: IRuntimeContext[]): boolean =>
    contexts.some(c => !c.hasEnded);

const assertParamsCorrectness = (params: IRunBattleParams): void => {
    const placeName = 'runBattle';
    if (params.roboAsts.size !== params.shipsOrder.size)
        throw invalidProgramError('There should be the same number of programs and ships.', placeName);
    if (params.roboAsts.size < 1)
        throw invalidProgramError('There has to be at least one ship in the battle.', placeName);
};
