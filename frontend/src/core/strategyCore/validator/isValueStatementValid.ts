import {INumberBinaryStatement, IStatement} from "../models/programTypes";
import {ValueStatementType} from "../enums/valueStatementType";
import {
    getValidatorResult,
    hasExactProperties,
    StatementValidator,
    useValidators
} from "./programValidationUtils";
import {InvalidProgramReason} from "../enums/invalidProgramReason";
import {StatementType} from "../enums/statementType";
import {IValidatorResult} from "./programValidator";
import {getStatementValidator} from "./getStatementValidator";

export const isValueStatementValid = (statement: IStatement, type: ValueStatementType): IValidatorResult => {
    if (!statement.head) {
        return getValidatorResult(false, InvalidProgramReason.InvalidStatement);
    }

    switch (statement.head) {
        case StatementType.ConstantString:
        case StatementType.ConstantNumber:
            return useValidators(
                [
                    isConstantStatementValid,
                    s => validateCorrectValueType(s, type),
                ],
                statement,
            );
        case StatementType.GetStringVariable:
            return useValidators(
                [
                    isGetStringVariableStatementValid,
                    s => validateCorrectValueType(s, type),
                ],
                statement,
            );
        case StatementType.GetNumericVariable:
            return useValidators(
                [
                    isGetNumericVariableStatementValid,
                    s => validateCorrectValueType(s, type),
                ],
                statement,
            );
        case StatementType.NumberBinary:
            return useValidators(
                [
                    isNumberBinaryValid,
                    s => validateCorrectValueType(s, type),
                ],
                statement,
            );
        default:
            return getValidatorResult(false, InvalidProgramReason.UnknownStatementType);
    }
};

const isGetNumericVariableStatementValid = getStatementValidator(['head', 'name']);
const isGetStringVariableStatementValid = getStatementValidator(['head', 'name']);
const isConstantStatementValid: StatementValidator = statement => hasExactProperties(statement, ['head', 'value']);


const isNumberBinaryValid = (statement: IStatement) => useValidators(
    [
        s => hasExactProperties(s as INumberBinaryStatement, ["leftValue", "rightValue", "operator", "head"]),
        s => validateCorrectValueType((s as INumberBinaryStatement).leftValue, ValueStatementType.Number),
        s => validateCorrectValueType((s as INumberBinaryStatement).rightValue, ValueStatementType.Number),
    ],
    statement
);

const validateCorrectValueType = (statement: IStatement, type: ValueStatementType): IValidatorResult => {
    switch (statement.head) {
        case StatementType.GetStringVariable:
        case StatementType.ConstantString:
            return getValidatorResult(type === ValueStatementType.String, InvalidProgramReason.InvalidValueType);
        case StatementType.GetNumericVariable:
        case StatementType.ConstantNumber:
        case StatementType.NumberBinary:
            return getValidatorResult(type === ValueStatementType.Number, InvalidProgramReason.InvalidValueType);
    }
    throw new Error(`Tried to validate valueType of non-value type statement ${statement.head}.`);
};
