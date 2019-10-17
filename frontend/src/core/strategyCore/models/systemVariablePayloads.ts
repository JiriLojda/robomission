import {SystemVariableName} from "../enums/systemVariableName";

export type functionExecutionPayload = {
    readonly functionName: string;
    readonly requestId: string;
};

export type functionExecutionFinishedPayload = functionExecutionPayload & {
    readonly result: unknown;
}

type SystemVariableValuesRelations = {
    [SystemVariableName.ShouldEnterNextBlock]: boolean;
    [SystemVariableName.FunctionExecutionRequest]: functionExecutionPayload;
    [SystemVariableName.FunctionExecutionFinished]: functionExecutionFinishedPayload;
    [SystemVariableName.FunctionExecutionInProgress]: functionExecutionPayload;
};

export type SystemVariableForName<TName extends SystemVariableMapped> = {
    readonly name: TName;
    value: TName extends keyof SystemVariableValuesRelations ? SystemVariableValuesRelations[TName] : never;
};

export type SystemVariablePayloadForName<TName extends SystemVariableMapped> = SystemVariableForName<TName>['value'];

export type SystemVariableMapped = keyof SystemVariableValuesRelations;
