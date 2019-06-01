import {IRuntimeContext, Variable} from "../models/programTypes";
import {SystemVariableName} from "../enums/systemVariableName";

export const getSystemVariable = (context: IRuntimeContext, variableName: string) => {
    return context.systemVariables.find(variable => variable.name === variableName);
};

export const setSystemVariable = (context: IRuntimeContext, variableName: SystemVariableName, variableValue: unknown): void => {
    const existing = getSystemVariable(context, variableName);
    if (!existing) {
        context.systemVariables.push({name: variableName, value: variableValue});
    } else {
        existing.value = variableValue;
    }
};

export const doesUserVariableExist = (context: IRuntimeContext, variableName: string): boolean =>
    context.variables.some(variable => variable.name === variableName);

export const getUserVariable = (context: IRuntimeContext, variableName: string): Variable => {
    if (!doesUserVariableExist(context, variableName)) {
        throw new Error(`Tried to get non-existing variable ${variableName}, remember to check before getting.`);
    }

    return context.variables.find(variable => variable.name === variableName)!;
};

export const isUserVariableNumber = (context: IRuntimeContext, variableName: string): boolean => {
    if (!doesUserVariableExist(context, variableName)) {
        return false;
    }
    const variable = getUserVariable(context, variableName);

    return !isNaN(Number(variable.value));
};

export const getUserVariableAsNumber = (context: IRuntimeContext, variableName: string): number => {
    const variable = getUserVariable(context, variableName);

    const result = Number(variable.value);
    if (isNaN(result)) {
        throw new Error(`Tried to convert variable '${variableName}' with value '${variable.value}' to a number.`);
    }

    return result;
};

export const setUserVariable = (context: IRuntimeContext, variableName: string, variableValue: string): void => {
    if (!doesUserVariableExist(context, variableName)) {
        context.variables.push({name: variableName, value: variableValue});
    } else {
        const existing = getUserVariable(context, variableName);
        existing.value = variableValue;
    }
};
