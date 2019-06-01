import {StatementType} from "./enums/statementType";
import {InvalidProgramReason} from "./enums/invalidProgramReason";
import {Condition, IBinaryLogicCondition, ICompareCondition, IRoboAst, IStatement} from "./models/programTypes";
import {ConditionType} from "./enums/conditionType";

export interface IValidatorResult {
    isValid: boolean;
    reason: InvalidProgramReason;
}

const getValidatorResult = (isValid: boolean, reason: InvalidProgramReason): IValidatorResult => {
    if (!isValid) {
        return {isValid, reason};
    }

    return {isValid, reason: InvalidProgramReason.None};
};

export const isRoboAstValid = (roboAst: IRoboAst): IValidatorResult => {
    if (!roboAst.head || roboAst.head !== StatementType.Start || !roboAst.body) {
        return {isValid: false, reason: InvalidProgramReason.NoOrBadStartStatement};
    }

    return isStatementValid(roboAst);
};

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
        case StatementType.Start: {
            const validation = isStartStatementValid(statement);
            if (!validation.isValid) {
                return validation;
            }

            for (const innerStatement of statement.body!) {
                const innerValidation = isStatementValid(innerStatement.statement);
                if (!innerValidation.isValid) {
                    return innerValidation;
                }
            }
            return getValidatorResult(true, InvalidProgramReason.None);
        }

        case StatementType.TurnLeft:
            return isTurnLeftStatementValid(statement);
        case StatementType.TurnRight:
            return isTurnRightStatementValid(statement);
        case StatementType.If: {
            const validation = isIfStatementValid(statement);
            if (!validation.isValid) {
                return validation;
            }

            for (const innerStatement of statement.body!) {
                const innerValidation = isStatementValid(innerStatement.statement);
                if (!innerValidation.isValid) {
                    return innerValidation;
                }
            }
            if (!!statement.orelse) {
                for (const innerStatement of statement.orelse.statement.body!) {
                    const innerValidation = isStatementValid(innerStatement.statement);
                    if (!innerValidation.isValid) {
                        return innerValidation;
                    }
                }
            }
            return getValidatorResult(true, InvalidProgramReason.None);
        }
        case StatementType.Repeat: {
            const validation = isRepeatStatementValid(statement);
            if (!validation.isValid) {
                return validation;
            }

            for (const innerStatement of statement.body!) {
                const innerValidation = isStatementValid(innerStatement.statement);
                if (!innerValidation.isValid) {
                    return innerValidation;
                }
            }
            return getValidatorResult(true, InvalidProgramReason.None);
        }
        case StatementType.While: {
            const validation = isWhileStatementValid(statement);
            if (!validation.isValid) {
                return validation;
            }

            for (const innerStatement of statement.body!) {
                const innerValidation = isStatementValid(innerStatement.statement);
                if (!innerValidation.isValid) {
                    return innerValidation;
                }
            }
            return getValidatorResult(true, InvalidProgramReason.None);
        }
        case StatementType.SetVariable:
            return isSetVariableStatementValid(statement);
        case StatementType.GetNumericVariable:
            return isGetNumericVariableStatementValid(statement);
        case StatementType.GetStringVariable:
            return isGetStringVariableStatementValid(statement);
        case StatementType.Else:
            throw new Error('Else type should be handled inside If case.');
        default:
            return getValidatorResult(false, InvalidProgramReason.UnknownStatementType);
    }
};

const hasTestProperty = (statement: IStatement): IValidatorResult =>
    getValidatorResult(!!statement.test, InvalidProgramReason.MissingTestCondition);

const isValidConditionStatement: StatementValidator = statement => {
    const testExistance = hasTestProperty(statement);
    if (!testExistance.isValid) {
        return testExistance;
    }

    return isTestStatementValid(statement.test!);
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

type StatementValidator = (statement: IStatement) => IValidatorResult;

const getStatementValidator = <T extends keyof IStatement>(
    allowedProps: T[],
    additionalValidator: StatementValidator = () => getValidatorResult(true, InvalidProgramReason.None),
    isCondition: boolean = false
): StatementValidator =>
    (statement: IStatement) => {
        if (isCondition) {
            const statementValidation = isValidConditionStatement(statement);
            if (!statementValidation.isValid) {
                return statementValidation;
            }
        }
        const propValidation = areOnlyAllowedPropertiesSet(statement, allowedProps);
        if (!propValidation.isValid) {
            return propValidation;
        }

        return additionalValidator(statement);
    };

const isBinaryOperationValid = (operation: IBinaryLogicCondition | ICompareCondition): IValidatorResult => {
    const valuesExistanceValidation = areOnlyAllowedPropertiesSet(
        operation,
        ['leftValue', 'rightValue', 'head', 'comparator']
    );
    if (!valuesExistanceValidation.isValid)
        return valuesExistanceValidation;
    if (!operation.rightValue || !operation.leftValue)
        return getValidatorResult(false, InvalidProgramReason.MissingParameter);
    const leftValueValidation = operation.head === ConditionType.LogicBinaryOperation ?
        isTestStatementValid(operation.leftValue) :
        isStatementValid(operation.leftValue);
    if (!leftValueValidation.isValid)
        return leftValueValidation;
    const rightValueValidation = operation.head === ConditionType.LogicBinaryOperation ?
        isTestStatementValid(operation.rightValue) :
        isStatementValid(operation.leftValue);
    if (!rightValueValidation.isValid)
        return rightValueValidation;
    return getValidatorResult(
        !!operation.comparator,
        InvalidProgramReason.MissingParameter
    );
};

const isTestStatementValid = (condition: Condition): IValidatorResult => {
    switch (condition.head) {
        case ConditionType.Color:
            return getValidatorResult(true, InvalidProgramReason.None);
        case ConditionType.Position:
            return getValidatorResult(true, InvalidProgramReason.None);
        case ConditionType.Tile:
            return getValidatorResult(
                !!condition.position && !!condition.position.x && !!condition.position.y,
                InvalidProgramReason.MissingParameter
            );
        case ConditionType.Not: {
            const valuesExistanceValidation = areOnlyAllowedPropertiesSet(
                condition,
                ['head', 'comparator', 'value']
            );
            if (!valuesExistanceValidation.isValid)
                return valuesExistanceValidation;
            if (!condition.value)
                return getValidatorResult(false, InvalidProgramReason.MissingParameter);
            return isTestStatementValid(condition.value);
        }
        case ConditionType.LogicBinaryOperation:
            return isBinaryOperationValid(condition);
        case ConditionType.StringCompare:
            return isBinaryOperationValid(condition);
        case ConditionType.NumericCompare:
            return isBinaryOperationValid(condition);
        default:
            throw new Error(`Unknown condition type ${condition!.head}`);
    }
};

// single statement validators
const isStartStatementValid: StatementValidator = () => ({isValid: true, reason: InvalidProgramReason.None});

const isFlyStatementValid = getStatementValidator(['head']);
const isRightStatementValid = getStatementValidator(['head']);
const isLeftStatementValid = getStatementValidator(['head']);

const isShootStatementValid = getStatementValidator(['head']);

const isTurnRightStatementValid = getStatementValidator(['head']);
const isTurnLeftStatementValid = getStatementValidator(['head']);

const isSetVariableStatementValid = getStatementValidator(['head', 'name', 'value']);
const isGetStringVariableStatementValid = getStatementValidator(['head', 'name']);
const isGetNumericVariableStatementValid = getStatementValidator(['head', 'name']);

const isElseStatementValid = getStatementValidator(['head', 'body']);
const isIfStatementValid = getStatementValidator(
    ['head', 'body', 'test', 'orelse'],
    statement => {
        if (!!statement.orelse) {
            const orElseValidation = isElseStatementValid(statement.orelse.statement);
            if (!orElseValidation.isValid) {
                return orElseValidation;
            }
        }
        return getValidatorResult(true, InvalidProgramReason.None);
    },
    true
);

const isWhileStatementValid = getStatementValidator(
    ['head', 'body', 'test'],
    undefined,
    true);

const isRepeatStatementValid = getStatementValidator(['head', 'body', 'count']);
