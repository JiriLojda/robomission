import {IFunctionCallParameter, INumberBinaryStatement, IStatement} from "../models/programTypes";
import {ValueStatementType} from "../enums/valueStatementType";
import {
    areCallParametersValid,
    getValidatorResult,
    hasExactProperties,
    StatementValidator,
    useValidators
} from "./programValidationUtils";
import {InvalidProgramReason} from "../enums/invalidProgramReason";
import {StatementType} from "../enums/statementType";
import {IValidatorResult} from "./programValidator";
import {getStatementValidator} from "./getStatementValidator";
import {getValueStatementType} from "../utils/getValueStatementType";

export const isValueStatementValid = (statement: IStatement, type?: ValueStatementType): IValidatorResult => {
    if (!statement || !statement.head) {
        return getValidatorResult(false, InvalidProgramReason.InvalidStatement);
    }

    switch (statement.head) {
        case StatementType.ConstantString:
        case StatementType.ConstantNumber:
            return useValidators(
                [
                    isConstantStatementValid,
                    s => validateCorrectValueType(s, type),
                ],
                statement,
            );
        case StatementType.GetStringVariable:
            return useValidators(
                [
                    isGetStringVariableStatementValid,
                    s => validateCorrectValueType(s, type),
                ],
                statement,
            );
        case StatementType.GetNumericVariable:
            return useValidators(
                [
                    isGetNumericVariableStatementValid,
                    s => validateCorrectValueType(s, type),
                ],
                statement,
            );
        case StatementType.NumberBinary:
            return useValidators(
                [
                    isNumberBinaryValid,
                    s => validateCorrectValueType(s, type),
                ],
                statement,
            );
        case StatementType.FunctionCallNumber:
        case StatementType.FunctionCallString:
            return useValidators(
                [
                    s => hasExactProperties(s, ['head', 'name', 'parameters']),
                    s => validateCorrectValueType(s, type),
                    s => areCallParametersValid(s.parameters as IFunctionCallParameter[]),
                ],
              statement,
            );
        case StatementType.PositionValue:
        case StatementType.PositionValueRelative:
            return useValidators([
                s => hasExactProperties(s, ['head', 'x', 'y']),
                s => validateCorrectValueType(s, type),
                s => isValueStatementValid(s.x as IStatement, ValueStatementType.Number),
                s => isValueStatementValid(s.y as IStatement, ValueStatementType.Number),
            ],
                statement
            );
        case StatementType.GetShipPosition:
            return useValidators([
                s => hasExactProperties(s, ['head', 'shipId']),
                s => validateCorrectValueType(s, type),
                s => isValueStatementValid(s.shipId as IStatement, ValueStatementType.String),
            ],
                statement
            );
        case StatementType.GetPositionCoordinate:
            return useValidators([
                s => hasExactProperties(s, ['head', 'position', 'coordinate']),
                s => validateCorrectValueType(s, type),
                s => isValueStatementValid(s.position as IStatement, ValueStatementType.Position),
                s => isValueStatementValid(s.coordinate as IStatement, ValueStatementType.String),
            ],
                statement
            );
        case StatementType.GetDirectionOfShip:
            return useValidators([
                s => hasExactProperties(s, ['head', 'shipId']),
                s => validateCorrectValueType(s, type),
                s => isValueStatementValid(s.shipId as IStatement, ValueStatementType.String),
            ], statement);
        case StatementType.RandomNumber:
            return hasExactProperties(statement, ['head']);
        default:
            return getValidatorResult(false, InvalidProgramReason.UnknownStatementType);
    }
};

const isGetNumericVariableStatementValid = getStatementValidator(['head', 'name']);
const isGetStringVariableStatementValid = getStatementValidator(['head', 'name']);
const isConstantStatementValid: StatementValidator = statement => hasExactProperties(statement, ['head', 'value']);


const isNumberBinaryValid = (statement: IStatement) => useValidators(
    [
        s => hasExactProperties(s as INumberBinaryStatement, ["leftValue", "rightValue", "operator", "head"]),
        s => validateCorrectValueType((s as INumberBinaryStatement).leftValue, ValueStatementType.Number),
        s => validateCorrectValueType((s as INumberBinaryStatement).rightValue, ValueStatementType.Number),
    ],
    statement
);

const validateCorrectValueType = (statement: IStatement, type?: ValueStatementType): IValidatorResult => {
    if (!type) {
        return getValidatorResult(true, InvalidProgramReason.None);
    }

    return getValidatorResult(type === getValueStatementType(statement), InvalidProgramReason.InvalidValueType);
};
