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
    None = 'None',
}

export const userCausedProgramErrors: Set<InvalidProgramReason> = Set([
    InvalidProgramReason.MissingTestCondition,
    InvalidProgramReason.MissingParameter,
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
        case InvalidProgramReason.None:
            return 'No problem here.';
        default:
            throw new Error(`Unknown invalid program reason ${reason}.`);
    }
};

const getBadParserMessage = (message: string): string => `Bad parser: ${message}.`;
