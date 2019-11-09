import {generateBlocklyXml} from "../core/strategyCore/codeEditor/xmlGenerator/blocklyXmlGenerator";
import {StatementType} from "../core/strategyCore/enums/statementType";
import {blocklyXmlToRoboAst} from "../core/blockly";
import {IBlock, IRoboAst, IStatement} from "../core/strategyCore/models/programTypes";
import {generateUuid} from "../core/strategyCore/utils/generateUuid";

export const createEmptyAst = (): IRoboAst =>
    blocklyXmlToRoboAst(generateBlocklyXml([{head: StatementType.Start, body: []}]));

const createStatement = (statementType: StatementType): IStatement => ({
    head: statementType,
});

const wrapStatementWithBlock = (statement: IStatement): IBlock => ({
    statement,
    location: {blockId: generateUuid()},
});

export const addSimpleStatementToRoboAstBody = (statementType: StatementType, roboAst: IRoboAst): IRoboAst => {
    const result = JSON.parse(JSON.stringify(roboAst));
    result[0].body!.push(wrapStatementWithBlock(createStatement(statementType)));

    return result;
};