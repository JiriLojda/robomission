import {
    areOnlyAllowedPropertiesSet,
    composeValidators,
    getValidatorResult,
    hasExactProperties,
    StatementValidator,
    useValidators
} from "./programValidationUtils";
import {InvalidProgramReason} from "../enums/invalidProgramReason";
import {ISetVariableNumericStatement, IStatement} from "../models/programTypes";
import {isValueStatementValid} from "./isValueStatementValid";
import {ValueStatementType} from "../enums/valueStatementType";
import {getStatementValidator} from "./getStatementValidator";
import {isValidConditionStatement} from "./isTestStatementValid";

export const isWhileStatementValid = getStatementValidator(
    ['head', 'body', 'test'],
    undefined,
    true);

export const isRepeatStatementValid = getStatementValidator(['head', 'body', 'count']);

export const isStartStatementValid: StatementValidator = () => ({isValid: true, reason: InvalidProgramReason.None});

export const isFlyStatementValid = getStatementValidator(['head']);
export const isRightStatementValid = getStatementValidator(['head']);
export const isLeftStatementValid = getStatementValidator(['head']);

export const isShootStatementValid = getStatementValidator(['head']);

export const isTurnRightStatementValid = getStatementValidator(['head']);
export const isTurnLeftStatementValid = getStatementValidator(['head']);

export const isSetVariableStatementValid = getStatementValidator(['head', 'name', 'value']);
export const isSetVariableNumericStatementValid = (statement: IStatement) => useValidators(
    [
        s => hasExactProperties(s, ['head', 'name', 'value']),
        s => isValueStatementValid((s as ISetVariableNumericStatement).value, ValueStatementType.Number),
    ],
    statement,
);

const isElseStatementValid = getStatementValidator(['head', 'body']);
export const isIfStatementValid = composeValidators([
    isValidConditionStatement,
    s => areOnlyAllowedPropertiesSet(s, ['head', 'body', 'test', 'orelse']),
    statement => {
        if (!!statement.orelse) {
            return isElseStatementValid(statement.orelse.statement);
        }
        return getValidatorResult(true, InvalidProgramReason.None);
    },
]);
