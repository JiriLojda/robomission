import {IFunctionCallParameter, IRuntimeContext} from "../models/programTypes";

export const getFunctionExecutionId = (context: IRuntimeContext, fncName: string, fncArgs?: (IFunctionCallParameter | string)[]): string =>
    `${JSON.stringify(context.position)}|${fncName}(...${JSON.stringify(fncArgs)})`;
