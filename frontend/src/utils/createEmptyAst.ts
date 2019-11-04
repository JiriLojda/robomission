import {generateBlocklyXml} from "../core/strategyCore/codeEditor/xmlGenerator/blocklyXmlGenerator";
import {StatementType} from "../core/strategyCore/enums/statementType";
import {blocklyXmlToRoboAst} from "../core/blockly";
import {IRoboAst} from "../core/strategyCore/models/programTypes";

export const createEmptyAst = (): IRoboAst =>
    blocklyXmlToRoboAst(generateBlocklyXml([{head: StatementType.Start, body: []}]));
