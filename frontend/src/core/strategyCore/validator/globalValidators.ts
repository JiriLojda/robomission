import {IFunctionCall, IFunctionCallBoolean, IRoboAst, IStatement} from "../models/programTypes";
import {StatementType} from "../enums/statementType";
import {invalidProgramError} from "../utils/invalidProgramError";
import {Map, Set} from 'immutable';
import {getValidatorResult, GlobalValidator} from "./programValidationUtils";
import {InvalidProgramReason} from "../enums/invalidProgramReason";

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

const validateProperFncParams: GlobalValidator = roboAst => {
    const fncsParamsMap = createFncsParamsMap(roboAst);
    const fncCallTypes = [StatementType.FunctionCallVoid, StatementType.FunctionCallString, StatementType.FunctionCallNumber];
    const allCalls = findAllStatementsOfTypes(roboAst, Set(fncCallTypes)) as (IFunctionCall | IFunctionCallBoolean)[];

    const isValid = allCalls
        .map(s => ({name: s.name as string,count:  s.parameters.length}))
        .every(c => fncsParamsMap.has(c.name) && fncsParamsMap.get(c.name) === c.count);

    return getValidatorResult(isValid, InvalidProgramReason.FncCallWithInvalidNumberOfParameters);
};

const validateExistingFncsCalled: GlobalValidator = roboAst => {
    const allFncsNames = Set(getAllFncsNames(roboAst));
    const fncCallTypes = [StatementType.FunctionCallVoid, StatementType.FunctionCallString, StatementType.FunctionCallNumber];
    const allCalls = findAllStatementsOfTypes(roboAst, Set(fncCallTypes)) as (IFunctionCall | IFunctionCallBoolean)[];

    const isValid = allCalls
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
