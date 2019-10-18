import {Condition, IStatement} from "../models/programTypes";
import {ValueStatementType} from "../enums/valueStatementType";
import {ConditionType} from "../enums/conditionType";
import {StatementType} from "../enums/statementType";
import {invalidProgramError} from "./invalidProgramError";

export const getValueStatementType = (statement: IStatement | Condition): ValueStatementType => {
    switch (statement.head) {
        case ConditionType.Tile:
        case ConditionType.StringCompare:
        case ConditionType.Position:
        case ConditionType.Color:
        case ConditionType.ConstantBoolean:
        case ConditionType.FunctionCallBoolean:
        case ConditionType.IsTileAccessible:
        case ConditionType.LogicBinaryOperation:
        case ConditionType.Not:
        case ConditionType.NumericCompare:
            return ValueStatementType.Boolean;
        case StatementType.NumberBinary:
        case StatementType.FunctionCallNumber:
        case StatementType.ConstantNumber:
        case StatementType.GetNumericVariable:
            return ValueStatementType.Number;
        case StatementType.ConstantString:
        case StatementType.FunctionCallString:
        case StatementType.GetStringVariable:
            return ValueStatementType.String;
        default:
            throw invalidProgramError(`Statement ${statement.head} is not a value statement.`);
    }
};

export const isConditionStatement = (statement: IStatement | Condition): statement is Condition =>
    getValueStatementType(statement) === ValueStatementType.Boolean;
