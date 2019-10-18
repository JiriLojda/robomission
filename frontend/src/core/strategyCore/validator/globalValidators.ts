import {
    Condition,
    IFunctionCall,
    IFunctionCallBoolean,
    IFunctionCallParameter, INumberBinaryStatement,
    IRoboAst,
    IStatement
} from "../models/programTypes";
import {StatementType} from "../enums/statementType";
import {invalidProgramError} from "../utils/invalidProgramError";
import {Map, Set} from 'immutable';
import {getValidatorResult, GlobalValidator} from "./programValidationUtils";
import {InvalidProgramReason} from "../enums/invalidProgramReason";
import {ConditionType} from "../enums/conditionType";

const isValueStatement = (statement?: IStatement | Condition): boolean =>
    !!statement && [
        StatementType.FunctionCallNumber,
        StatementType.FunctionCallString,
        StatementType.ConstantNumber,
        StatementType.ConstantString,
        StatementType.GetNumericVariable,
        StatementType.GetStringVariable,
        StatementType.NumberBinary,
        ConditionType.FunctionCallBoolean,
        ConditionType.Color,
        ConditionType.ConstantBoolean,
        ConditionType.IsTileAccessible,
        ConditionType.LogicBinaryOperation,
        ConditionType.Not,
        ConditionType.NumericCompare,
        ConditionType.Position,
        ConditionType.StringCompare,
        ConditionType.Tile,
    ].includes(statement.head);

const findValueStatements = (statement?: IStatement | Condition): (IStatement | Condition)[] =>
    findInnerValueStatements(statement).concat(isValueStatement(statement) && !!statement ? [statement] : []);

const findInnerValueStatements = (statement?: IStatement | Condition): (IStatement | Condition)[] => {
    if (!statement)
        return [];

    switch (statement.head) {
        case StatementType.If:
        case StatementType.While:
            return findValueStatements(statement.test);
        case StatementType.FunctionReturn:
        case StatementType.SetVariableNumeric:
            return findValueStatements(statement.value as IStatement);
        case ConditionType.NumericCompare:
        case ConditionType.StringCompare:
        case ConditionType.LogicBinaryOperation:
            return findValueStatements(statement.leftValue)
                .concat(findValueStatements(statement.rightValue));
        case ConditionType.Not:
            return findValueStatements(statement.value);
        case ConditionType.FunctionCallBoolean:
        case StatementType.FunctionCallString:
        case StatementType.FunctionCallNumber:
        case StatementType.FunctionCallVoid:
            return (statement.parameters! as IFunctionCallParameter[])
                .flatMap(p => findValueStatements(p.value));
        case ConditionType.IsTileAccessible:
        case ConditionType.Tile:
            return findValueStatements(statement.position.x)
                .concat(findValueStatements(statement.position.y));
        case StatementType.NumberBinary:
            return findValueStatements((statement as INumberBinaryStatement).leftValue)
                .concat(findValueStatements((statement as INumberBinaryStatement).rightValue));
        default:
            return [];
    }
};

const findAllStatementsOfTypesInScope = (fnc: IStatement, searchedTypes: Set<StatementType>): IStatement[] => {
    if (!fnc.body)
        throw invalidProgramError('This function is supposed to be called with scoped statements only.');
    const searched = fnc.body
        .filter(s => searchedTypes.contains(s.statement.head))
        .map(s => s.statement);
    const innerScoped = fnc.body
        .filter(s => !!s.statement.body)
        .flatMap(s => findAllStatementsOfTypesInScope(s.statement, searchedTypes));

    return [...searched, ...innerScoped];
};

const makeFirstLetterLowerCase = (input: string): string => input.length > 0 ? `${input[0].toLocaleLowerCase()}${input.slice(1)}` : input;
const getAllStatements = (roboAst: IRoboAst): IStatement[] =>
    findAllStatementsOfTypes(roboAst, Set(Object.keys(StatementType).map(makeFirstLetterLowerCase) as StatementType[]));

const findAllStatementsOfTypes = (roboAst: IRoboAst, searchedTypes: Set<StatementType>): IStatement[] =>
    roboAst
        .flatMap(s => findAllStatementsOfTypesInScope(s, searchedTypes));

const createFncsParamsMap = (roboAst: IRoboAst): Map<string, number> =>
    Map(roboAst
        .filter(s => s.head === StatementType.FunctionDefinition)
        .map(s => [s.name || '', ((s.parameters as string[]) || []).length])
    );

const getAllFncsNames = (roboAst: IRoboAst): string[] =>
    roboAst
        .filter(s => s.head === StatementType.FunctionDefinition)
        .map(s => s.name || '');

const getAllFunctionCalls = (roboAst: IRoboAst): (IFunctionCallBoolean | IFunctionCall)[] => {
    const fncCallTypes = [
        StatementType.FunctionCallVoid,
        StatementType.FunctionCallString,
        StatementType.FunctionCallNumber,
    ];
    const conditionCalltypes = [ConditionType.FunctionCallBoolean];

    const allStatementCalls = findAllStatementsOfTypes(roboAst, Set(fncCallTypes)) as IFunctionCall[];
    const allValueStatementsCalls = getAllStatements(roboAst)
        .flatMap(s => findValueStatements(s))
        .filter(s => [...fncCallTypes, ...conditionCalltypes].includes(s.head));

    return [...allStatementCalls, ...allValueStatementsCalls] as any;
};

const validateProperFncParams: GlobalValidator = roboAst => {
    const fncsParamsMap = createFncsParamsMap(roboAst);

    const isValid = getAllFunctionCalls(roboAst)
        .map(s => ({name: s.name as string,count:  s.parameters.length}))
        .every(c => fncsParamsMap.has(c.name) && fncsParamsMap.get(c.name) === c.count);

    return getValidatorResult(isValid, InvalidProgramReason.FncCallWithInvalidNumberOfParameters);
};

const validateExistingFncsCalled: GlobalValidator = roboAst => {
    const allFncsNames = Set(getAllFncsNames(roboAst));

    const isValid = getAllFunctionCalls(roboAst)
        .map(s => ({name: s.name as string,count:  s.parameters.length}))
        .every(c => allFncsNames.contains(c.name));

    return getValidatorResult(isValid, InvalidProgramReason.UnknownFunctionCalled);
};

const validateFncsHaveUniqueName: GlobalValidator = roboAst => {
    const allFncsNames = getAllFncsNames(roboAst);

    return getValidatorResult(Set(allFncsNames).count() === allFncsNames.length, InvalidProgramReason.DuplicateFunctionName);
};

export const allGlobalValidators: GlobalValidator[] = [
    validateFncsHaveUniqueName,
    validateExistingFncsCalled,
    validateProperFncParams,
];
