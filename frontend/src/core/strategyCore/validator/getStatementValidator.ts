import {IStatement} from "../models/programTypes";
import {InvalidProgramReason} from "../enums/invalidProgramReason";
import {isValidConditionStatement} from "./isTestStatementValid";
import {getValidatorResult, hasExactProperties, StatementValidator, useValidators} from "./programValidationUtils";

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
