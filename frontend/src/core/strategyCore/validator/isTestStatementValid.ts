import {Condition, IBinaryLogicCondition, ICompareCondition, IStatement} from "../models/programTypes";
import {ConditionType} from "../enums/conditionType";
import {InvalidProgramReason} from "../enums/invalidProgramReason";
import {ValueStatementType} from "../enums/valueStatementType";
import {IValidatorResult} from "./programValidator";
import {
    checkParameterExistence,
    getValidatorResult,
    hasExactProperties,
    StatementValidator,
    useValidators
} from "./programValidationUtils";
import {isValueStatementValid} from "./isValueStatementValid";

export const isTestStatementValid = (condition: Condition): IValidatorResult => {
    switch (condition.head) {
        case ConditionType.Color:
            return getValidatorResult(true, InvalidProgramReason.None);
        case ConditionType.Position:
            return getValidatorResult(true, InvalidProgramReason.None);
        case ConditionType.Tile:
        case ConditionType.IsTileAccessible:
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
            return isBinaryComparatorValid(condition, ValueStatementType.Boolean);
        case ConditionType.StringCompare:
            return isBinaryComparatorValid(condition, ValueStatementType.String);
        case ConditionType.NumericCompare:
            return isBinaryComparatorValid(condition, ValueStatementType.Number);
        case ConditionType.ConstantBoolean:
            return hasExactProperties(condition, ['head', 'value']);
        case ConditionType.FunctionCallBoolean:
            return hasExactProperties(condition, ['head', 'name', 'parameters']);
        default:
            throw new Error(`Unknown condition type ${condition!.head}`);
    }
};

export const isValidConditionStatement: StatementValidator = statement => useValidators(
    [hasTestProperty, s => isTestStatementValid(s.test!)],
    statement,
);

const hasTestProperty = (statement: IStatement): IValidatorResult =>
    checkParameterExistence(statement, ['test'], InvalidProgramReason.MissingTestCondition);

const validateLeftAndRightValues = (operation: IBinaryLogicCondition | ICompareCondition, type: ValueStatementType): IValidatorResult => {
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
            op => isValueStatementValid(op.leftValue, type),
            op => isValueStatementValid(op.rightValue, type),
        ],
        operation,
    );
};

const isBinaryComparatorValid = (operation: IBinaryLogicCondition | ICompareCondition, type: ValueStatementType): IValidatorResult =>
    useValidators(
        [
            op => hasExactProperties(op, ['leftValue', 'rightValue', 'head', 'comparator']),
            op => validateLeftAndRightValues(op, type),
        ],
        operation,
    );
