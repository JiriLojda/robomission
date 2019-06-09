import {SystemVariableName} from "../enums/systemVariableName";
import {ConditionType} from "../enums/conditionType";
import {Comparator} from "../enums/comparator";
import {TileColor} from "../enums/tileColor";
import {StatementType} from "../enums/statementType";
import {WorldObject} from "../enums/worldObject";
import {NumberOperation} from "../enums/numberOperation";

export interface IPositionItem {
    index: number;
    elseBranchEntered: boolean;
    repeatCount?: number;
}

export type Variable = { name: string; value: string };
export type SystemVariable = { name: SystemVariableName, value: unknown };

export interface IRuntimeContext {
    position: IPositionItem[]
    variables: Variable[];
    systemVariables: SystemVariable[];
    wasActionExecuted: boolean;
    minorActionsLeft: number;
}

export interface ICondition {
    head: ConditionType;
    comparator?: Comparator;
    value?: TileColor | number | WorldObject | ICondition | string;
}

export interface IPositionValue {
    head: 'position_value';
    x: IStatement;
    y: IStatement;
}

export interface ITileCondition extends ICondition {
    head: ConditionType.Tile;
    value: WorldObject;
    comparator: Comparator.Contains | Comparator.NotContains;
    position: IPositionValue;
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

export type Condition =
    IColorCondition |
    IPositionCondition |
    ITileCondition |
    INotCondition |
    IBinaryLogicCondition |
    ICompareCondition |
    IConstantBoolean;

export interface IBlock {
    location: { blockId: string };
    statement: IStatement;
}

export interface IStatement {
    head: StatementType;
    body?: IBlock[];
    orelse?: IBlock;
    test?: Condition;
    count?: number;
    name?: string;
    value?: string;
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
    operation: NumberOperation;
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

export interface IRoboAst extends IStatement {
    head: StatementType.Start;
    body: IBlock[];
}
