import {SystemVariableName} from "../enums/systemVariableName";
import {ConditionType} from "../enums/conditionType";
import {Comparator} from "../enums/comparator";
import {TileColor} from "../enums/tileColor";
import {StatementType} from "../enums/statementType";
import {WorldObjectType} from "../enums/worldObjectType";
import {NumberOperation} from "../enums/numberOperation";
import {endOfMapType} from "../constants/astConstants";
import {SystemVariableForName} from "./systemVariablePayloads";

export const defaultFunctionName = '(default_function)';

export interface IPositionItem {
    index: number;
    elseBranchEntered: boolean;
    repeatCount?: number;
}

export type Variable = { name: string; value: string };
export type SystemVariable = SystemVariableForName<SystemVariableName.ShouldEnterNextBlock> |
    SystemVariableForName<SystemVariableName.FunctionExecutionRequest> |
    SystemVariableForName<SystemVariableName.FunctionExecutionFinished> |
    SystemVariableForName<SystemVariableName.FunctionExecutionInProgress>;

export interface IRuntimeContext {
    position: IPositionItem[]
    variables: Variable[];
    systemVariables: SystemVariable[];
    wasActionExecuted: boolean;
    minorActionsLeft: number;
    hasEnded: boolean;
    nestedFunctionExecution: {
        isFunctionBeingExecuted: boolean;
        functionName: string;
        requestId: string;
        functionRuntimeContext?: IRuntimeContext;
    }
}

export interface ICondition {
    head: ConditionType;
    comparator?: Comparator;
    value?: TileColor | number | WorldObjectType | ICondition | string;
}

export interface IPositionValue {
    head: 'position_value' | 'position_value_relative';
    x: IStatement;
    y: IStatement;
}

export interface ITileCondition extends ICondition {
    head: ConditionType.Tile;
    value: WorldObjectType | endOfMapType;
    comparator: Comparator.Contains | Comparator.NotContains;
    position: IPositionValue;
}

export interface ITileAccessibleCondition extends ICondition {
    head: ConditionType.IsTileAccessible;
    position: IPositionValue;
    comparator: undefined;
    value: undefined;
}

export interface IColorCondition extends ICondition {
    head: ConditionType.Color;
    comparator: Comparator.Equal | Comparator.NonEqual;
    value: TileColor;
}

export interface IPositionCondition extends ICondition {
    head: ConditionType.Position;
    comparator: Comparator.Equal | Comparator.NonEqual | Comparator.SmallerOrEqual | Comparator.Smaller | Comparator.BiggerOrEqual | Comparator.Bigger;
    value: number;
}

export interface INotCondition extends ICondition {
    head: ConditionType.Not;
    comparator: undefined;
    value: Condition;
}

export interface IBinaryLogicCondition extends ICondition {
    head: ConditionType.LogicBinaryOperation;
    comparator: Comparator.And | Comparator.Or | Comparator.Equivalent | Comparator.NonEquivalent;
    value: undefined;
    leftValue: Condition;
    rightValue: Condition;
}

export interface ICompareCondition extends ICondition {
    head: ConditionType.NumericCompare | ConditionType.StringCompare;
    comparator: Comparator.Equal | Comparator.NonEqual | Comparator.SmallerOrEqual | Comparator.Smaller | Comparator.BiggerOrEqual | Comparator.Bigger;
    value: undefined;
    leftValue: IStatement;
    rightValue: IStatement;
}

export const isCompareCondition = (condition: Condition): condition is ICompareCondition =>
    condition.head === ConditionType.NumericCompare || condition.head === ConditionType.StringCompare;

export interface IConstantBoolean extends ICondition {
    head: ConditionType.ConstantBoolean;
    value: string;
    comparator: undefined;
}

export interface IFunctionCallBoolean {
    head: ConditionType.FunctionCallBoolean;
    name: string;
    parameters: IFunctionCallParameter[];
}

export type Condition =
    IColorCondition |
    IPositionCondition |
    ITileCondition |
    INotCondition |
    IBinaryLogicCondition |
    ICompareCondition |
    ITileAccessibleCondition |
    IFunctionCallBoolean |
    IConstantBoolean;

export interface IBlock {
    location: { blockId: string };
    statement: IStatement;
}

export interface IFunctionCallParameter {
    readonly value: IStatement;
}

export interface IFunctionDefinition extends IStatement {
    head: StatementType.FunctionDefinition;
    name: string;
    parameters: string[];
    body: IBlock[]
}

export interface IFunctionCall extends IStatement {
    head: StatementType.FunctionCallNumber | StatementType.FunctionCallString | StatementType.FunctionCallVoid;
    name: string;
    parameters: IFunctionCallParameter[];
}

export interface IFunctionReturn extends IStatement {
    head: StatementType.FunctionReturn;
    value: IStatement;
    body: undefined;
    orelse: undefined;
    count: undefined;
    test: undefined;
    name: undefined;
    parameters: undefined;
}

export interface IStatement {
    head: StatementType;
    body?: IBlock[];
    orelse?: IBlock;
    test?: Condition;
    count?: number;
    name?: string;
    value?: string | IStatement;
    parameters?: string[] | IFunctionCallParameter[];
}

export interface INumberBinaryStatement extends IStatement {
    head: StatementType.NumberBinary;
    body: undefined;
    orelse: undefined;
    test: undefined;
    count: undefined;
    name: undefined;
    value: undefined;
    leftValue: IStatement;
    rightValue: IStatement;
    operator: NumberOperation;
}

export interface ISetVariableStatement extends IStatement {
    head: StatementType.SetVariable;
    body: undefined;
    orelse: undefined;
    test: undefined;
    count: undefined;
    name: string;
    value: string;
}

export interface ISetVariableNumericStatement extends IStatement {
    head: StatementType.SetVariableNumeric;
    body: undefined;
    orelse: undefined;
    test: undefined;
    count: undefined;
    name: string;
    value: IStatement;
}

export type IRoboAst = IStatement[];
