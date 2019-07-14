import {Set} from "immutable";
import {StatementType} from "../enums/statementType";

export const defaultMinorActionsCount = 100;

export const scopeStatements = Set([
    StatementType.While,
    StatementType.Repeat,
    StatementType.If,
    StatementType.Else,
]);
