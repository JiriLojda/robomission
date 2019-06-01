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

const checkParameterExistance = <T, K extends keyof T>(statement: T, parameters: K[], customReason: InvalidProgramReason = InvalidProgramReason.MissingParameter): IValidatorResult => {
    for (const parameter of parameters) {
        if (!statement.hasOwnProperty(parameter) || !statement[parameter]) {
            return getValidatorResult(false, customReason);
        }
    }
    return getValidatorResult(true, InvalidProgramReason.None);
};

const hasTestProperty = (statement: IStatement): IValidatorResult =>
    checkParameterExistance(statement, ['test'], InvalidProgramReason.MissingTestCondition);

const isValidConditionStatement: StatementValidator = statement => useValidators(
    [hasTestProperty, s => isTestStatementValid(s.test!)],
    statement,
);

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
        const firstValidators = isCondition ? [isValidConditionStatement] : [];
        return useValidators(
            [
                ...firstValidators,
                s => areOnlyAllowedPropertiesSet(s, allowedProps),
                additionalValidator
            ],
            statement,
        )
    };

type GenericValidator<T> = (arg: T) => IValidatorResult;
const useValidators = <T>(validators: GenericValidator<T>[], statement: T): IValidatorResult => {
    for (const validator of validators) {
        const result = validator(statement);
        if (!result.isValid)
            return result;
    }
    return getValidatorResult(true, InvalidProgramReason.None);
};

const hasExactProperties = <T, K extends keyof T>(statement: T, props: K[]): IValidatorResult =>
    useValidators(
        [
            s => areOnlyAllowedPropertiesSet(s, props),
            s => checkParameterExistance(s, props),
        ],
        statement
    );

const validateLeftAndRightValues = (operation: IBinaryLogicCondition | ICompareCondition): IValidatorResult => {
    if (operation.head === ConditionType.LogicBinaryOperation) {
        return useValidators(
            [
                op => isTestStatementValid(op.leftValue),
                op => isTestStatementValid(op.rightValue),
            ],
            operation,
        );
    }

    return useValidators(
      [
          op => isStatementValid(op.leftValue),
          op => isStatementValid(op.rightValue),
      ],
      operation,
    );
};

const isBinaryOperationValid = (operation: IBinaryLogicCondition | ICompareCondition): IValidatorResult =>
    useValidators(
        [
            op => hasExactProperties(op, ['leftValue', 'rightValue', 'head', 'comparator']),
            validateLeftAndRightValues,
        ],
        operation,
    );

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
        case ConditionType.Not:
            return useValidators(
                [
                    c => hasExactProperties(c, ['head', 'value']),
                    c => isTestStatementValid(c.value),
                ],
                condition,
            );
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
            return isElseStatementValid(statement.orelse.statement);
        }
        return getValidatorResult(true, InvalidProgramReason.None);
    },
    true
);

const validateElseBody = (statement: IStatement): IValidatorResult => {
    if (!!statement.orelse) {
        return validateBody(statement.orelse.statement);
    }
    return getValidatorResult(true, InvalidProgramReason.None);
};

const isWhileStatementValid = getStatementValidator(
    ['head', 'body', 'test'],
    undefined,
    true);

const isRepeatStatementValid = getStatementValidator(['head', 'body', 'count']);
