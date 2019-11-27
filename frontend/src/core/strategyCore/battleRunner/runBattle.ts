import {removeLaserAndExplosionObjects, World} from "../models/world";
import {BlockLocation, IRoboAst, IRuntimeContext} from "../models/programTypes";
import {List} from "immutable";
import {BattleResult, BattleResultType} from "./BattleResult";
import {createEmptyRuntimeContext} from "../utils/createEmptyRuntimeContext";
import {isUserProgramError, UserProgramError} from "../enums/userProgramError";
import {doNextStep, getBlocksForPosition} from "../astInterpreter";
import {invalidProgramError} from "../utils/invalidProgramError";
import {BattleType} from "./BattleType";
import {hasBattleEnded, IBattleEndParams} from "./hasBattleEnded";
import {getBattleResult} from "./getBattleResult";
import {ShipId} from "../models/ship";
import {IGameBehaviours} from "../gameBehaviours/IGameBehaviours";
import {defaultMinorActionsCount} from "../constants/interpreterConstants";
import {getShip} from "../utils/worldModelUtils";

export interface IRunBattleParams {
    readonly world: World,
    readonly shipsOrder: List<ShipId>,
    readonly roboAsts: List<IRoboAst>,
    readonly battleType: BattleType;
    readonly battleParams: IBattleEndParams;
    readonly behaviours: IGameBehaviours;
}

export interface IDebugStepMade {
    readonly nextBlockId?: string;
    readonly nextLineNumber?: number;
    readonly newWorld: World;
    readonly nextExecutionIndex: number;
    readonly modifiedContext: IRuntimeContext;
}

export interface IDebugContext {
    readonly world: World;
    readonly executionIndex: number;
    readonly turnsRan: number;
    readonly runtimeContexts: ReadonlyArray<IRuntimeContext>;
}

export const isBattleResult = (input: BattleResult | IDebugStepMade): input is BattleResult =>
    input.hasOwnProperty('type') && input.hasOwnProperty('history');

export const runBattle = (params: IRunBattleParams): BattleResult => {
    assertParamsCorrectness(params);

    const runtimeContexts = params.shipsOrder.map(createEmptyRuntimeContext).toArray();
    let currentIndex = 0;
    let currentWorld = params.world;
    let turnsRan = 0;
    const history: World[] = [params.world];
    let battleResult: BattleResult | null = null;

    while (!battleResult) {
        const debugContext: IDebugContext = {
            executionIndex: currentIndex,
            runtimeContexts,
            turnsRan,
            world: currentWorld,
        };

        const stepResult = stepBattle(params, debugContext);
        if (!isBattleResult(stepResult)) {
            runtimeContexts[currentIndex] = stepResult.modifiedContext;
            turnsRan++;
            if (currentWorld !== stepResult.newWorld) {
                history.push(stepResult.newWorld);
                currentWorld = stepResult.newWorld;
            }
            currentIndex = stepResult.nextExecutionIndex;
        } else {
            battleResult = stepResult;
        }
    }

    history.push(removeLaserAndExplosionObjects(currentWorld));

    return {...battleResult, history: List(history)};
};

export const stepBattle = (params: IRunBattleParams, debugContext: IDebugContext, shouldDoJustMinorAction: boolean = false): BattleResult | IDebugStepMade => {
    assertParamsCorrectness(params);
    const turnFnc = shouldDoJustMinorAction ? doMinorAction : makeTurn;

    if (!hasBattleEnded(debugContext.world, params.battleType, {...params.battleParams, turnsRan: debugContext.turnsRan}) && hasSomethingToDo(debugContext.runtimeContexts)) {
        const result = turnFnc(
            {
                world: debugContext.world,
                shipsOrder: params.shipsOrder,
                roboAsts: params.roboAsts,
                behaviours: params.behaviours
            },
            debugContext.runtimeContexts[debugContext.executionIndex],
            debugContext.executionIndex
        );

        if (isUserProgramError(result))
            return {
                error: result,
                type: BattleResultType.ProgramError,
                blame: params.shipsOrder.get(debugContext.executionIndex)!,
                history: List(),
            };
        const [newContext, newWorld] = result;
        const nextExecutionIndex = newContext.wasActionExecuted || isContextEnded(newContext) ?
            (debugContext.executionIndex + 1) % params.shipsOrder.size :
            debugContext.executionIndex;
        if (newContext.wasActionExecuted) {
            newContext.minorActionsLeft = defaultMinorActionsCount;
            newContext.wasActionExecuted = false;
        }

        const location = findPositionLocation(result[0], params.roboAsts.get(debugContext.executionIndex)!);
        return {
            newWorld,
            nextBlockId: typeof location === 'object' ? location.blockId : undefined,
            nextLineNumber: typeof location === 'number' ? location : undefined,
            modifiedContext: result[0],
            nextExecutionIndex,
        }
    }

    return getBattleResult({
        world: debugContext.world,
        battleType: params.battleType,
        battleEndParams: {...params.battleParams, turnsRan: debugContext.turnsRan},
        contexts: debugContext.runtimeContexts,
        history: List(),
    })
};

type MakeTurnParamNames = 'shipsOrder' | 'roboAsts' | 'world' | 'behaviours';

const doMinorAction = (params: Pick<IRunBattleParams, MakeTurnParamNames>, context: IRuntimeContext, playerIndex: number): [IRuntimeContext, World] | UserProgramError => {
    const roboAst = params.roboAsts.get(playerIndex);
    const shipId = params.shipsOrder.get(playerIndex);

    if (!roboAst || !shipId) {
        throw invalidProgramError(
            `Player index ${playerIndex} is not a correct index for roboAsts: ${params.roboAsts.size} or ships: ${params.shipsOrder.size}.`,
            'runBattle -> makeTurn'
        );
    }
    if (context.wasActionExecuted) {
        throw invalidProgramError('Use should have initialized the context before.');
    }
    const ship = getShip(params.world, shipId);
    if (!ship || ship.isDestroyed|| isContextEnded(context))
        return [context, params.world];


    const result = doNextStep(
        roboAst,
        params.world,
        shipId,
        context,
        params.behaviours
    );
    if (isUserProgramError(result))
        return result;


    return result;
};

const makeTurn = (params: Pick<IRunBattleParams, MakeTurnParamNames>, context: IRuntimeContext, playerIndex: number): [IRuntimeContext, World] | UserProgramError => {
    context.wasActionExecuted = false;
    context.minorActionsLeft = defaultMinorActionsCount;
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
    let currentShip = getShip(params.world, shipId);

    while (!currentContext.wasActionExecuted && !isContextEnded(currentContext) && !!currentShip && !currentShip.isDestroyed) {
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
        currentShip = getShip(currentWorld, shipId);
    }

    return [currentContext, currentWorld];
};

const hasSomethingToDo = (contexts: ReadonlyArray<IRuntimeContext>): boolean =>
    contexts.some(c => !isContextEnded(c));

const assertParamsCorrectness = (params: IRunBattleParams): void => {
    const placeName = 'runBattle';
    if (params.roboAsts.size !== params.shipsOrder.size)
        throw invalidProgramError('There should be the same number of programs and ships.', placeName);
    if (params.roboAsts.size < 1)
        throw invalidProgramError('There has to be at least one ship in the battle.', placeName);
};

const isContextEnded = (context: IRuntimeContext): boolean =>
    context.minorActionsLeft <= 0 || context.hasEnded;

const findPositionLocation = (context: IRuntimeContext, ast: IRoboAst): BlockLocation | undefined => {
    const [fncName, fncContext] = findExecutedFncNameAndContext(context) || [undefined, context];
    const fnc = fncName === undefined ? ast[0] : ast.find(s => s.name === fncName);
    if (!fnc)
        throw invalidProgramError(`Unknown fncName '${fncName}'.`);
    const statements = getBlocksForPosition(fnc, fncContext);
    return statements.length > 0 && statements[statements.length - 1] ?
        statements[statements.length - 1].location :
        undefined;
};

const findExecutedFncNameAndContext = (context: IRuntimeContext, contextFncName?: string): [string, IRuntimeContext] | undefined =>
    context.nestedFunctionExecution.isFunctionBeingExecuted && context.nestedFunctionExecution.functionRuntimeContext ?
        findExecutedFncNameAndContext(context.nestedFunctionExecution.functionRuntimeContext, context.nestedFunctionExecution.functionName) :
        contextFncName ? [contextFncName, context] : undefined;

