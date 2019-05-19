import {SystemVariableName} from "../enums/systemVariableName";
import {ConditionType} from "../enums/conditionType";
import {Comparator} from "../enums/comparator";
import {TileColor} from "../enums/tileColor";
import {StatementType} from "../enums/statementType";

export interface IPositionItem {
    index: number;
    elseBranchEntered: boolean;
    repeatCount?: number;
}

export type Variable = {name: string; value: unknown};
export type SystemVariable = {name: SystemVariableName, value: unknown};

export interface IRuntimeContext {
    position: IPositionItem[]
    variables: Variable[];
    systemVariables: SystemVariable[];
    wasActionExecuted: boolean;
    minorActionsLeft: number;
}

export interface ICondition {
    head: ConditionType;
    comparator: Comparator;
    value: TileColor | number;
}

export interface IColorCondition extends ICondition {
    head: ConditionType.Color;
    comparator: Comparator.Equal | Comparator.NonEqual;
    value: TileColor;
}

export interface IPositionCondition extends ICondition {
    head: ConditionType.Position;
    value: number;
}

export type Condition = IColorCondition | IPositionCondition;

export interface IBlock {
    location: {blockId: string};
    statement: IStatement;
}

export interface IStatement {
    head: StatementType;
    body?: IBlock[];
    orElse?: IBlock;
    test?: Condition;
    count?: number;
}

export interface IRoboAst extends IStatement{
    head: StatementType.Start;
    body: IBlock[];
}
