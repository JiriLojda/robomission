import {Set} from 'immutable';

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
            return getBadParserMessage('defined additional property.');
        case InvalidProgramReason.InvalidStatement:
            return getBadParserMessage('some statement is invalid.');
        case InvalidProgramReason.NoOrBadStartStatement:
            return getBadParserMessage('start statement is missing or invalid.');
        case InvalidProgramReason.UnknownStatementType:
            return getBadParserMessage('some statement has an unknown type.');
        case InvalidProgramReason.MissingTestCondition:
            return 'You have to set condition in each conditional block.';
        case InvalidProgramReason.MissingParameter:
            return 'One of your statements is missing a parameter.';
        case InvalidProgramReason.UndefinedRequiredProp:
            return 'One of the statements has some required props undefined.';
        case InvalidProgramReason.InvalidValueType:
            return 'One of your value statements has type not matching its usage.';
        case InvalidProgramReason.CodeNotParsed:
            return 'We failed to parse your code. Check the output, please.';
        case InvalidProgramReason.DuplicateFunctionName:
            return 'Function names has to be unique. Check your functions, please.';
        case InvalidProgramReason.DuplicateFunctionParameters:
            return 'Function parameter names has to be unique in the function.';
        case InvalidProgramReason.EmptyFunctionName:
            return 'Function name cannot be empty.';
        case InvalidProgramReason.EmptyParameterName:
            return 'Parameter name cannot be empty.';
        case InvalidProgramReason.FncCallWithInvalidNumberOfParameters:
            return 'Some of your function calls have incorrect number of arguments passed.';
        case InvalidProgramReason.UnknownFunctionCalled:
            return 'You tried to call an unknown function. Define the function first.';
        case InvalidProgramReason.FncShouldReturnAndNoEndingReturn:
            return 'Some of your functions should return a value and does not have return at the end.';
        case InvalidProgramReason.FncIsCalledWithDifferentReturnTypes:
            return 'Some of your functions are called with different return types expected each time.';
        case InvalidProgramReason.FncReturnsDifferentTypes:
            return 'Some of your functions return different types with each return statement.';
        case InvalidProgramReason.FncCallReturnTypeMismatch:
            return 'Some of your functions return different type the expected by it\'s calls.';
        case InvalidProgramReason.None:
            return 'No problem here.';

        // Custom levels validation errors
        case InvalidProgramReason.FunctionsCannotBeDefined:
            return wrapCustomLevelValidationMessage('usage of functions is prohibited.');
        case InvalidProgramReason.MaximumNumberOfBlocksReached:
            return wrapCustomLevelValidationMessage('there is a limit on number of blocks used and you crossed it.');
        case InvalidProgramReason.RestrictedBlockUsed:
            return wrapCustomLevelValidationMessage('you cannot use some blocks, yet you used them.');
        default:
            throw new Error(`Unknown invalid program reason ${reason}.`);
    }
};

const getBadParserMessage = (message: string): string => `Bad parser: ${message}.`;

const wrapCustomLevelValidationMessage = (message: string): string => `In this level: ${message}`;
