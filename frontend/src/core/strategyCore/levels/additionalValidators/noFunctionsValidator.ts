import {RoboAstValidator} from "../../battleRunner/IGameLevel";
import {getValidatorResult} from "../../validator/programValidationUtils";
import {StatementType} from "../../enums/statementType";
import {InvalidProgramReason} from "../../enums/invalidProgramReason";

export const noFunctionsValidator: RoboAstValidator = roboAst =>
    getValidatorResult(
        roboAst.length === 1 && roboAst[0].head === StatementType.Start,
        InvalidProgramReason.FunctionsCannotBeDefined
    );
