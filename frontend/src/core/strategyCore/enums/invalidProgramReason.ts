import {Set} from 'immutable';
import {translate} from "../../../localization";

export enum InvalidProgramReason {
    NoOrBadStartStatement = 'NoOrBadStartStatement',
    InvalidStatement = 'InvalidStatement',
    MissingTestCondition = 'MissingTestCondition',
    MissingParameter = 'MissingParameter',
    DefinedAdditionalProp = 'DefinedAdditionalProp',
    UnknownStatementType = 'UnknownStatementType',
    UndefinedRequiredProp = 'UndefinedRequiredProp',
    InvalidValueType = 'InvalidValueType',
    CodeNotParsed = 'CodeNotParsed',
    DuplicateFunctionParameters = 'DuplicateFunctionParameters',
    DuplicateFunctionName = 'DuplicateFunctionName',
    EmptyFunctionName = 'EmptyFunctionName',
    EmptyParameterName = 'EmptyParameterName',
    FncCallWithInvalidNumberOfParameters = 'FncCallWithInvalidNumberOfParameters',
    UnknownFunctionCalled = 'UnknownFunctionCalled',
    FncShouldReturnAndNoEndingReturn = 'FncShouldReturnAndNoEndingReturn',
    FncIsCalledWithDifferentReturnTypes = 'FncIsCalledWithDifferentReturnTypes',
    FncReturnsDifferentTypes = 'FncReturnsDifferentTypes',
    FncCallReturnTypeMismatch = 'FncCallReturnTypeMismatch',
    None = 'None',

    // custom levels validation errors
    FunctionsCannotBeDefined = 'FunctionsCannotBeDefined',
    MaximumNumberOfBlocksReached = 'MaximumNumberOfBlocksReached',
    RestrictedBlockUsed = 'RestrictedBlockUsed',
}

export const userCausedProgramErrors: Set<InvalidProgramReason> = Set([
    InvalidProgramReason.MissingTestCondition,
    InvalidProgramReason.MissingParameter,
    InvalidProgramReason.CodeNotParsed,
    InvalidProgramReason.DuplicateFunctionParameters,
    InvalidProgramReason.DuplicateFunctionName,
    InvalidProgramReason.EmptyFunctionName,
    InvalidProgramReason.EmptyParameterName,
    InvalidProgramReason.FncCallWithInvalidNumberOfParameters,
    InvalidProgramReason.UnknownFunctionCalled,
    InvalidProgramReason.FncShouldReturnAndNoEndingReturn,
    InvalidProgramReason.FncIsCalledWithDifferentReturnTypes,
    InvalidProgramReason.FncReturnsDifferentTypes,
    InvalidProgramReason.FncCallReturnTypeMismatch,
    InvalidProgramReason.FunctionsCannotBeDefined,
    InvalidProgramReason.MaximumNumberOfBlocksReached,
    InvalidProgramReason.RestrictedBlockUsed,
]);

export const getInvalidProgramReasonDisplayName = (reason: InvalidProgramReason): string => {
    switch (reason) {
        case InvalidProgramReason.DefinedAdditionalProp:
        case InvalidProgramReason.InvalidStatement:
        case InvalidProgramReason.NoOrBadStartStatement:
        case InvalidProgramReason.UnknownStatementType:
            return getBadParserMessage(translate(`InvalidProgramReason.${reason}`));

        case InvalidProgramReason.MissingTestCondition:
        case InvalidProgramReason.MissingParameter:
        case InvalidProgramReason.UndefinedRequiredProp:
        case InvalidProgramReason.InvalidValueType:
        case InvalidProgramReason.CodeNotParsed:
        case InvalidProgramReason.DuplicateFunctionName:
        case InvalidProgramReason.DuplicateFunctionParameters:
        case InvalidProgramReason.EmptyFunctionName:
        case InvalidProgramReason.EmptyParameterName:
        case InvalidProgramReason.FncCallWithInvalidNumberOfParameters:
        case InvalidProgramReason.UnknownFunctionCalled:
        case InvalidProgramReason.FncShouldReturnAndNoEndingReturn:
        case InvalidProgramReason.FncIsCalledWithDifferentReturnTypes:
        case InvalidProgramReason.FncReturnsDifferentTypes:
        case InvalidProgramReason.FncCallReturnTypeMismatch:
        case InvalidProgramReason.None:
            return translate(`InvalidProgramReason.${reason}`);

        // Custom levels validation errors
        case InvalidProgramReason.FunctionsCannotBeDefined:
        case InvalidProgramReason.MaximumNumberOfBlocksReached:
        case InvalidProgramReason.RestrictedBlockUsed:
            return wrapCustomLevelValidationMessage(translate(`InvalidProgramReason.${reason}`));
        default:
            throw new Error(`Unknown invalid program reason ${reason}.`);
    }
};

const getBadParserMessage = (message: string): string =>
    `${translate(`InvalidProgramReason.BadParserMessage`)}: ${message}.`;

const wrapCustomLevelValidationMessage = (message: string): string =>
    `${translate(`InvalidProgramReason.CustomLevelMessage`)}: ${message}`;
