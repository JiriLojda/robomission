import {InvalidProgramReason} from "../enums/invalidProgramReason";
import {IValidatorResult} from "./programValidator";
import {IRoboAst, IStatement} from "../models/programTypes";

export const getValidatorResult = (isValid: boolean, reason: InvalidProgramReason): IValidatorResult => {
    if (!isValid) {
        return {isValid, reason};
    }

    return {isValid, reason: InvalidProgramReason.None};
};

export const checkParameterExistence = <T, K extends keyof T>(statement: T, parameters: K[], customReason: InvalidProgramReason = InvalidProgramReason.MissingParameter): IValidatorResult => {
    for (const parameter of parameters) {
        if (!statement.hasOwnProperty(parameter) || (!statement[parameter] && typeof statement[parameter] !== "number")) {
            return getValidatorResult(false, customReason);
        }
    }
    return getValidatorResult(true, InvalidProgramReason.None);
};

export const areOnlyAllowedPropertiesSet = <T, K extends keyof T>(statement: T, allowed: K[]): IValidatorResult => {
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

export const composeValidators = <T = IStatement>(validators: GenericValidator<T>[]): (statement: T) => IValidatorResult =>
    (statement) => useValidators(validators, statement);

export const hasExactProperties = <T, K extends keyof T>(statement: T, props: K[]): IValidatorResult =>
    useValidators(
        [
            s => areOnlyAllowedPropertiesSet(s, props),
            s => checkParameterExistence(s, props),
        ],
        statement
    );

export type StatementValidator = (statement: IStatement) => IValidatorResult;
export type GlobalValidator = (roboAst: IRoboAst) => IValidatorResult;
