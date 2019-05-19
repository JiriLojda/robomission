import {Set} from 'immutable';

export enum InvalidProgramReason {
    NoOrBadStartStatement = 'NoOrBadStartStatement',
    InvalidStatement = 'InvalidStatement',
    MissingTestCondition = 'MissingTestCondition',
    DefinedAdditionalProp = 'DefinedAdditionalProp',
    UnknownStatementType = 'UnknownStatementType',
    None = 'None',
}

export const userCausedProgramErrors: Set<InvalidProgramReason> = Set([
    InvalidProgramReason.MissingTestCondition,
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
        case InvalidProgramReason.None:
            return 'No problem here.';
        default:
            throw new Error(`Unknown invalid program reason ${reason}.`);
    }
};

const getBadParserMessage = (message: string): string => `Bad parser: ${message}.`;
