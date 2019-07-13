import {Condition, IBinaryLogicCondition, ICompareCondition} from "../models/programTypes";
import {ConditionType} from "../enums/conditionType";
import {InvalidProgramReason} from "../enums/invalidProgramReason";
import {ValueStatementType} from "../enums/valueStatementType";
import {IValidatorResult} from "./programValidator";
import {getValidatorResult, hasExactProperties, useValidators} from "./programValidationUtils";
import {isValueStatementValid} from "./isValueStatementValid";

export const isTestStatementValid = (condition: Condition): IValidatorResult => {
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
            return isBinaryComparatorValid(condition, ValueStatementType.Boolean);
        case ConditionType.StringCompare:
            return isBinaryComparatorValid(condition, ValueStatementType.String);
        case ConditionType.NumericCompare:
            return isBinaryComparatorValid(condition, ValueStatementType.Number);
        case ConditionType.ConstantBoolean:
            return hasExactProperties(condition, ['head', 'value']);
        default:
            throw new Error(`Unknown condition type ${condition!.head}`);
    }
};

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
