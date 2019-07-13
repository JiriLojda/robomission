import {InvalidProgramReason} from "../enums/invalidProgramReason";
import {IValidatorResult} from "../programValidator";
import {IStatement} from "../models/programTypes";
import {isTestStatementValid} from "./isTestStatementValid";

export const getValidatorResult = (isValid: boolean, reason: InvalidProgramReason): IValidatorResult => {
    if (!isValid) {
        return {isValid, reason};
    }

    return {isValid, reason: InvalidProgramReason.None};
};

export const checkParameterExistence = <T, K extends keyof T>(statement: T, parameters: K[], customReason: InvalidProgramReason = InvalidProgramReason.MissingParameter): IValidatorResult => {
    for (const parameter of parameters) {
        if (!statement.hasOwnProperty(parameter) || !statement[parameter]) {
            return getValidatorResult(false, customReason);
        }
    }
    return getValidatorResult(true, InvalidProgramReason.None);
};

const areOnlyAllowedPropertiesSet = <T, K extends keyof T>(statement: T, allowed: K[]): IValidatorResult => {
    const stringAllowed = allowed.map(e => e.toString());
    for (const prop in statement) {
        if (statement.hasOwnProperty(prop) && stringAllowed.indexOf(prop) < 0 && !!(statement as any)[prop]) {
            return {isValid: false, reason: InvalidProgramReason.DefinedAdditionalProp};
        }
    }

    return {isValid: true, reason: InvalidProgramReason.None};
};

type GenericValidator<T> = (arg: T) => IValidatorResult;
export const useValidators = <T>(validators: GenericValidator<T>[], statement: T): IValidatorResult => {
    for (const validator of validators) {
        const result = validator(statement);
        if (!result.isValid)
            return result;
    }
    return getValidatorResult(true, InvalidProgramReason.None);
};

export const hasExactProperties = <T, K extends keyof T>(statement: T, props: K[]): IValidatorResult =>
    useValidators(
        [
            s => areOnlyAllowedPropertiesSet(s, props),
            s => checkParameterExistence(s, props),
        ],
        statement
    );

const hasTestProperty = (statement: IStatement): IValidatorResult =>
    checkParameterExistence(statement, ['test'], InvalidProgramReason.MissingTestCondition);

const isValidConditionStatement: StatementValidator = statement => useValidators(
    [hasTestProperty, s => isTestStatementValid(s.test!)],
    statement,
);

export type StatementValidator = (statement: IStatement) => IValidatorResult;

export const getStatementValidator = <T extends keyof IStatement>(
    allowedProps: T[],
    additionalValidator: StatementValidator = () => getValidatorResult(true, InvalidProgramReason.None),
    isCondition: boolean = false
): StatementValidator =>
    (statement: IStatement) => {
        const firstValidators = isCondition ? [isValidConditionStatement] : [];
        return useValidators(
            [
                ...firstValidators,
                s => hasExactProperties(s, allowedProps),
                additionalValidator
            ],
            statement,
        )
    };
