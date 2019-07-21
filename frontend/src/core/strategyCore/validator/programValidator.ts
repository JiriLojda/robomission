import {StatementType} from "../enums/statementType";
import {InvalidProgramReason} from "../enums/invalidProgramReason";
import {IRoboAst, IStatement} from "../models/programTypes";
import {getValidatorResult, useValidators} from "./programValidationUtils";
import {
    isFlyStatementValid,
    isIfStatementValid,
    isLeftStatementValid, isPickUpDiamondStatementValid,
    isRepeatStatementValid,
    isRightStatementValid,
    isSetVariableNumericStatementValid,
    isSetVariableStatementValid,
    isShootStatementValid,
    isStartStatementValid,
    isTurnLeftStatementValid,
    isTurnRightStatementValid,
    isWhileStatementValid
} from "./statementValidators";
import {memoizeOne} from "../../../utils/memoizeOne";

export interface IValidatorResult {
    isValid: boolean;
    reason: InvalidProgramReason;
}

export const isRoboAstValid = memoizeOne(
    (roboAst: IRoboAst): IValidatorResult => {
        if (!roboAst.head || roboAst.head !== StatementType.Start || !roboAst.body) {
            return {isValid: false, reason: InvalidProgramReason.NoOrBadStartStatement};
        }

        return isStatementValid(roboAst);
    },
    args => JSON.stringify(args[0]),
);

const isStatementValid = (statement: IStatement): IValidatorResult => {
    if (!statement.head) {
        return getValidatorResult(false, InvalidProgramReason.InvalidStatement);
    }
    switch (statement.head) {
        case StatementType.Right:
            return isRightStatementValid(statement);
        case StatementType.Left:
            return isLeftStatementValid(statement);
        case StatementType.Fly:
            return isFlyStatementValid(statement);
        case StatementType.Shoot:
            return isShootStatementValid(statement);
        case StatementType.PickUpDiamond:
            return isPickUpDiamondStatementValid(statement);
        case StatementType.Start:
            return useValidators(
                [isStartStatementValid, validateBody],
                statement,
            );
        case StatementType.TurnLeft:
            return isTurnLeftStatementValid(statement);
        case StatementType.TurnRight:
            return isTurnRightStatementValid(statement);
        case StatementType.If:
            return useValidators(
                [isIfStatementValid, validateBody, validateElseBody],
                statement,
            );
        case StatementType.Repeat:
            return useValidators(
                [isRepeatStatementValid, validateBody],
                statement,
            );
        case StatementType.While:
            return useValidators(
                [isWhileStatementValid, validateBody],
                statement,
            );
        case StatementType.SetVariable:
            return isSetVariableStatementValid(statement);
        case StatementType.SetVariableNumeric:
            return isSetVariableNumericStatementValid(statement);
        case StatementType.Else:
            throw new Error('Else type should be handled inside If case.');
        default:
            return getValidatorResult(false, InvalidProgramReason.UnknownStatementType);
    }
};

const validateBody = (statement: IStatement): IValidatorResult => {
    if (!statement.body)
        return getValidatorResult(false, InvalidProgramReason.UndefinedRequiredProp);

    for (const innerStatement of statement.body!) {
        const innerValidation = isStatementValid(innerStatement.statement);
        if (!innerValidation.isValid) {
            return innerValidation;
        }
    }

    return getValidatorResult(true, InvalidProgramReason.None);
};

const validateElseBody = (statement: IStatement): IValidatorResult => {
    if (!!statement.orelse) {
        return validateBody(statement.orelse.statement);
    }
    return getValidatorResult(true, InvalidProgramReason.None);
};
