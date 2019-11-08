import {RoboAstValidator} from "../../battleRunner/IGameLevel";
import {IRoboAst, IStatement} from "../../models/programTypes";
import {getValidatorResult} from "../../validator/programValidationUtils";
import {InvalidProgramReason} from "../../enums/invalidProgramReason";

const countBlocks = (statement: IStatement): number => !statement.body ? 1 :
    statement.body
        .map(b => countBlocks(b.statement))
        .reduce((sum, current) => sum + current, 0) + 1;

const countRoboAstBlocks = (roboAst: IRoboAst): number =>
    roboAst
        .map(countBlocks)
        .reduce((sum, current) => sum + current, 0);

export const createMaxNumberOfBlocksValidator = (maximum: number): RoboAstValidator => roboAst =>
    getValidatorResult(//             for the start block
        countRoboAstBlocks(roboAst) - 1 <= maximum,
        InvalidProgramReason.MaximumNumberOfBlocksReached,
    );
