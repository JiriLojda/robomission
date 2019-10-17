import {defaultFunctionName, IRuntimeContext} from "../models/programTypes";
import {defaultMinorActionsCount} from "../constants/interpreterConstants";

export const getEmptyRuntimeContext = (): IRuntimeContext => ({
    position: [{index: 0, elseBranchEntered: false, repeatCount: undefined}],
    variables: [],
    systemVariables: [],
    wasActionExecuted: false,
    minorActionsLeft: defaultMinorActionsCount,
    hasEnded: false,
    nestedFunctionExecution: {
        isFunctionBeingExecuted: false,
        functionName: defaultFunctionName,
        requestId: 'emptyContext',
        functionRuntimeContext: undefined,
    }
});
