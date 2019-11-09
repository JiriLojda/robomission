import {RoboAstValidator} from "../../battleRunner/IGameLevel";
import {IRoboAst, IStatement} from "../../models/programTypes";
import {getValidatorResult} from "../../validator/programValidationUtils";
import {InvalidProgramReason} from "../../enums/invalidProgramReason";
import {StatementType} from "../../enums/statementType";

const hasSomeOfTypes = (statement: IStatement, statementTypes: StatementType[]): boolean => !statement.body ? false :
    statement.body
        .some(b => statementTypes.includes(b.statement.head)) ||
    statement.body
        .map(b => hasSomeOfTypes(b.statement, statementTypes))
        .some(r => r);

const hasSomeOfTypesInRoboAst = (roboAst: IRoboAst, statementTypes: StatementType[]): boolean =>
    roboAst
        .some(s => hasSomeOfTypes(s, statementTypes));

export const createRestrictedBlocksValidator = (restrictedBlocks: StatementType[]): RoboAstValidator => roboAst =>
    getValidatorResult(
        !hasSomeOfTypesInRoboAst(roboAst, restrictedBlocks),
        InvalidProgramReason.RestrictedBlockUsed,
    );
