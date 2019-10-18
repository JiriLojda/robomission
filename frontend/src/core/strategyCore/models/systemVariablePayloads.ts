import {SystemVariableName} from "../enums/systemVariableName";

type functionExecutionPayload = {
    readonly functionName: string;
    readonly requestId: string;
};

export type functionExecutionRequestedPayload = functionExecutionPayload & {
    readonly parameters: string[];
};

export type functionExecutionFinishedPayload = functionExecutionPayload & {
    readonly result: unknown;
}

type SystemVariableValuesRelations = {
    [SystemVariableName.ShouldEnterNextBlock]: boolean;
    [SystemVariableName.FunctionExecutionRequest]: functionExecutionRequestedPayload;
    [SystemVariableName.FunctionExecutionFinished]: functionExecutionFinishedPayload;
};

export type SystemVariableForName<TName extends SystemVariableMapped> = {
    readonly name: TName;
    value: TName extends keyof SystemVariableValuesRelations ? SystemVariableValuesRelations[TName] : never;
};

export type SystemVariablePayloadForName<TName extends SystemVariableMapped> = SystemVariableForName<TName>['value'];

export type SystemVariableMapped = keyof SystemVariableValuesRelations;
