/**
 * Conversion from RoboAST into RoboBlocksXml.
 *
 * To see how the BlocklyXml is supposed to look use:
 * https://blockly-demo.appspot.com/static/demos/code/index.html
 */
import {
    Condition,
    IBlock,
    IFunctionCall,
    IFunctionCallBoolean,
    IFunctionCallParameter,
    IFunctionDefinition,
    IFunctionReturn,
    INumberBinaryStatement,
    IPositionValueStatement,
    IRoboAst,
    IStatement
} from "../../models/programTypes";
import {ConditionType} from "../../enums/conditionType";
import {StatementType} from "../../enums/statementType";
import {Comparator} from "../../enums/comparator";
import {invalidProgramError} from "../../utils/invalidProgramError";
import {generateUuid} from "../../utils/generateUuid";
import {isConditionStatement} from "../../utils/getValueStatementType";

const yOffset = 10;
const xOffset = 10;
const xDistanceBetween = 150;

export const generateBlocklyXml = (roboAst: IRoboAst, x = xOffset, y = yOffset) => `
    <xml xmlns="http://www.w3.org/1999/xhtml">
      <block type="start" deletable="false" x="${x}" y="${y}">
      ${generateNextBlocksIfPresent(roboAst[0].body!)}
      </block>
      ${generateFunctionsXmls(roboAst).join('')}
    </xml>
  `;

function generateFunctionsXmls(roboAst: IRoboAst): string[] {
    return roboAst.slice(1)
        .map((s, i) => generateFunctionDefinition(s as IFunctionDefinition, (s as IFunctionDefinition).body, xOffset + (i + 1) * xDistanceBetween));
}

function generateSequence(nodes: IBlock[]) {
    if (nodes == null || nodes.length === 0) {
        return '';
    }
    const [firstNode, ...nextNodes] = nodes;
    return generateStatementBlock(firstNode, nextNodes);
}


function generateStatementBlock(node: IBlock, nextNodes: IBlock[]) {
    const { statement } = node;
    switch (statement.head) {
        case StatementType.Repeat:
            return generateRepeatBlock(statement, nextNodes);
        case StatementType.While:
            return generateWhileBlock(statement, nextNodes);
        case StatementType.If:
            return generateIfBlock(statement, nextNodes);
        case StatementType.Fly:
            return generateFlyBlock('ahead', nextNodes);
        case StatementType.Left:
            return generateFlyBlock('left', nextNodes);
        case StatementType.Right:
            return generateFlyBlock('right', nextNodes);
        case StatementType.Shoot:
            return generateShootBlock(nextNodes);
        case StatementType.TurnRight:
            return generateTurnBlock('right', nextNodes);
        case StatementType.TurnLeft:
            return generateTurnBlock('left', nextNodes);
        case StatementType.PickUpDiamond:
            return generatePickupDiamondBlock(nextNodes);
        case StatementType.SetVariable:
            return generateSetStringVariableBlock(statement, nextNodes);
        case StatementType.SetVariableNumeric:
            return generateSetNumericVariableBlock(statement, nextNodes);
        case StatementType.FunctionCallVoid:
            return generateFunctionCall(statement as IFunctionCall, nextNodes);
        case StatementType.FunctionReturn:
            return generateFunctionReturn(statement as IFunctionReturn);
        default:
            throw new Error(`Unknown node type: ${statement.head}`);
    }
}

function generateSetNumericVariableBlock(statement: IStatement, nextNodes: IBlock[]) {
    return `
    <block type="setVariableNumeric">
        <field name="name">${statement.name}</field>
        <value name="value">${generateValueStatement(statement.value as IStatement)}</value>
        ${generateNextBlocksIfPresent(nextNodes)}
    </block>
    `;
}

function generateSetStringVariableBlock(statement: IStatement, nextNodes: IBlock[]) {
    return `
    <block type="setVariable">
        <field name="name">${statement.name}</field>
        <value name="value">${generateValueStatement(statement.value as IStatement)}</value>
        ${generateNextBlocksIfPresent(nextNodes)}
    </block>
    `;
}

function generatePickupDiamondBlock(nextNodes: IBlock[]) {
    return `
    <block type="pick_up_diamond">
      ${generateNextBlocksIfPresent(nextNodes)}
    </block>
    `;
}

function generateFlyBlock(direction: string, nextNodes: IBlock[]): string {
    return `
    <block type="fly">
      <field name="direction">${direction}</field>
      ${generateNextBlocksIfPresent(nextNodes)}
    </block>
  `;
}

function generateTurnBlock(direction: string, nextNodes: IBlock[]): string {
    return `
    <block type="turn">
      <field name="direction">${direction}</field>
      ${generateNextBlocksIfPresent(nextNodes)}
    </block>
  `;
}


function generateShootBlock(nextNodes: IBlock[]): string {
    return `
    <block type="shoot">
      ${generateNextBlocksIfPresent(nextNodes)}
    </block>
  `;
}


function generateRepeatBlock({ count, body }: IStatement, nextNodes: IBlock[]): string {
    return `
    <block type="repeat">
      <field name="count">${count}</field>
      <statement name="body">${generateSequence(body || [])}</statement>
      ${generateNextBlocksIfPresent(nextNodes)}
    </block>
  `;
}


function generateWhileBlock({ test, body }: IStatement, nextNodes: IBlock[]): string {
    return `
    <block type="while">
      ${generateTestValueIfPresent(test)}
      <statement name="body">${generateSequence(body || [])}</statement>
      ${generateNextBlocksIfPresent(nextNodes)}
    </block>
  `;
}


function generateIfBlock(statement: IStatement, nextNodes: IBlock[]): string {
    if (statement.orelse != null) {
        return generateIfElseBlock(statement, nextNodes);
    }
    return `
    <block type="if">
      ${generateTestValueIfPresent(statement.test)}
      <statement name="body">${generateSequence(statement.body || [])}</statement>
      ${generateNextBlocksIfPresent(nextNodes)}
    </block>
  `;
}


function generateIfElseBlock({ test, body, orelse }: IStatement, nextNodes: IBlock[]): string {
    if (orelse && orelse.statement.head !== 'else') {
        throw new Error(`Expected else node, found ${orelse.statement.head}`);
    }
    return `
    <block type="if-else">
      ${generateTestValueIfPresent(test)}
      <statement name="body">${generateSequence(body || [])}</statement>
      <statement name="body-else">${generateSequence((orelse && orelse.statement.body) || [])}</statement>
      ${generateNextBlocksIfPresent(nextNodes)}
    </block>
  `;
}


function generateNextBlocksIfPresent(nextNodes: IBlock[]): string {
    if (nextNodes.length === 0) {
        return '';
    }
    return `
    <next>
      ${generateSequence(nextNodes)}
    </next>
  `;
}


function generateTestValueIfPresent(test?: Condition): string {
    if (!test) {
        return '';
    }
    return generateTest(test);
}

const generateTest = (test: Condition) => wrapWithTestTag(getTestContent(test));

const getTestContent = (test: Condition): string => {
    switch (test.head) {
        case ConditionType.ConstantBoolean:
            return `
                <block type="constant_boolean">
                    <field name="value">${test.value}</field>
                </block>`;
        case ConditionType.IsTileAccessible:
            return `
                <block type="tile_accessible">
                    <value name="position">${generateValueStatement(test.position)}</value>
                </block>`;
        case ConditionType.LogicBinaryOperation:
            return `
                <block type="logic_binary">
                    <field name="comparator">${getComparator(test.comparator)}</field>
                    <value name="leftValue">${getTestContent(test.leftValue)}</value>
                    <value name="rightValue">${getTestContent(test.rightValue)}</value>
                </block>
            `;
        case ConditionType.Not:
            return `
                <block type="logic_not">
                    <value name="value">${getTestContent(test.value)}</value>
                </block>
            `;
        case ConditionType.NumericCompare:
            return `
                <block type="numericCompare">
                    <field name="comparator">${getComparator(test.comparator)}</field>
                    <value name="leftValue">${generateValueStatement(test.leftValue)}</value>
                    <value name="rightValue">${generateValueStatement(test.rightValue)}</value>
                </block>
            `;
        case ConditionType.StringCompare:
            return `
                <block type="stringCompare">
                    <field name="comparator">${getComparator(test.comparator)}</field>
                    <value name="leftValue">${generateValueStatement(test.leftValue)}</value>
                    <value name="rightValue">${generateValueStatement(test.rightValue)}</value>
                </block>
            `;
        case ConditionType.Tile:
            return `
                <block type="tile">
                    <field name="comparator">${getComparator(test.comparator)}</field>
                    <field name="value">${test.value}</field>
                    <value name="position">${generateValueStatement(test.position)}</value>
                </block>
            `;
        case ConditionType.FunctionCallBoolean:
            return generateFncCall(test);

        default:
            throw new Error(`Unknown node type: ${test.head}`);
    }
};

const generateFncCallParameters = (parameters: IFunctionCallParameter[]): string =>
    parameters[0] ? `
        <block type="function_parameter_call">
            <value name="value">${generateValueStatement(parameters[0].value)}</value>
            <value name="parameter">${generateFncCallParameters(parameters.slice(1))}</value>
        </block>` : '';

const generateFncCall = (call: IFunctionCallBoolean | IFunctionCall): string =>
    `
    <block type="${call.head}">
        <field name="name">${call.name || ''}</field>
        <value name="parameter">${generateFncCallParameters(call.parameters)}</value>
    </block>
    `;

const wrapWithTestTag = (input: string) => `
    <value name="test">
      ${input}
    </value>
  `;

const generatePositionValue = (position?: IPositionValueStatement): string => {
    if (!position) {
        return '';
    }
    return `<block type="${position.head}">
            <value name="x">${generateValueStatement(position.x)}</value>
            <value name="y">${generateValueStatement(position.y)}</value>
        </block>`;
};

const generateValueStatement = (statement?: IStatement): string => {
    if (!statement)
        return '';

    switch (statement.head) {
        case StatementType.ConstantNumber:
            return `
                <block type="constant_number">
                    <field name="value">${statement.value}</field>
                </block>`;
        case StatementType.ConstantString:
            return `
            <block type="constant_string">
                <field name="value">${statement.value}</field>
            </block>`;
        case StatementType.GetNumericVariable:
            return `
                <block type="getNumericVariable">
                    <field name="name">${statement.name}</field>
                </block>`;
        case StatementType.GetStringVariable:
            return `
                <block type="getStringVariable">
                    <field name="name">${statement.name}</field>
                </block>`;
        case StatementType.NumberBinary: {
            const typedStatement = statement as INumberBinaryStatement;
            return `
                <block type="number_binary">
                    <field name="operator">${typedStatement.operator}</field>
                    <value name="leftValue">
                        ${generateValueStatement(typedStatement.leftValue)}
                    </value>
                    <value name="rightValue">
                        ${generateValueStatement(typedStatement.rightValue)}
                    </value>
                </block>
            `;
        }
        case StatementType.FunctionCallNumber:
        case StatementType.FunctionCallString:
            return generateFncCall(statement as IFunctionCall);
        case StatementType.PositionValue:
        case StatementType.PositionValueRelative:
            return generatePositionValue(statement as IPositionValueStatement);
        case StatementType.GetPositionCoordinate:
            return `
                <block type="${statement.head}">
                    <value name="coordinate">
                        ${generateValueStatement(statement.coordinate)}
                    </value>
                    <value name="position">
                        ${generateValueStatement(statement.position)}
                    </value>
                </block>
            `;
        case StatementType.GetShipPosition:
            return `
                <block type="${statement.head}">
                    <value name="shipId">
                        ${generateValueStatement(statement.shipId)}
                    </value>
                </block>
            `;
        case StatementType.GetDirectionOfShip:
            return `
                <block type="${statement.head}">
                    <value name="shipId">
                        ${generateValueStatement(statement.shipId)}
                    </value>
                </block>
            `;
        default:
            return '';
    }
};

function getComparator(comparator: Comparator) {
    switch (comparator) {
        case Comparator.And:
            return 'and';
        case Comparator.Bigger:
            return '&gt;';
        case Comparator.BiggerOrEqual:
            return '&gt;=';
        case Comparator.Contains:
            return 'contains';
        case Comparator.Equal:
            return '==';
        case Comparator.Equivalent:
            return 'eq';
        case Comparator.NonEqual:
            return '!=';
        case Comparator.NonEquivalent:
            return 'nonEq';
        case Comparator.NotContains:
            return 'notContains';
        case Comparator.Or:
            return 'or';
        case Comparator.Smaller:
            return '&lt;';
        case Comparator.SmallerOrEqual:
            return '&lt;=';
        default:
            throw invalidProgramError(`Unknown comparator ${comparator}.`, 'roboCodeGenerator');
    }
}

const generateFunctionDefinition = (statement: IFunctionDefinition, nextNodes: IBlock[], x: number): string => {
    const params = generateFunctionDefinitionParameters(statement.parameters);
    return `<block type="${statement.head}" id="${generateUuid()}" y="${yOffset}" x="${x}">
                <field name="name">${statement.name}</field>
                ${params.length === 0 ? '' : `<value name="parameter">${params}</value>`}
                ${generateNextBlocksIfPresent(nextNodes)}
            </block>`;
};

const generateFunctionDefinitionParameters = (parameters: string[]): string => {
    if (parameters.length === 0)
        return '';

    const rest = generateFunctionDefinitionParameters(parameters.slice(1));

    return `
        <block type="function_parameter_definition">
            <field name="name">${parameters[0]}</field>
            ${rest.length === 0 ? '' : `<value name="parameter">${rest}</value>`}
        </block>
    `;
};

const generateFunctionCall = (statement: IFunctionCall, nextNodes: IBlock[]): string => {
    const parameters = generateFunctionCallParameters(statement.parameters);

    return `
    <block type="${statement.head}">
        <field name="name">${statement.name}</field>
        ${parameters.length === 0 ? '' : `<value name="parameter">${parameters}</value>`}
        ${generateNextBlocksIfPresent(nextNodes)}
    </block>
    `;
};

const generateFunctionCallParameters = (parameters: IFunctionCallParameter[]): string => {
    if (parameters.length === 0)
        return '';

    const rest = generateFunctionCallParameters(parameters.slice(1));
    const value = generateValueStatement(parameters[0].value);

    return `
        <block type="function_parameter_call">
            <value name="value">${value}</value>
            ${rest.length === 0 ? '' : `<value name="parameter">${rest}</value>`}
        </block>
    `;
};

const generateFunctionReturn = (statement: IFunctionReturn): string => {
    const value = !!statement.value && isConditionStatement(statement.value) ?
        getTestContent(statement.value) :
        generateValueStatement(statement.value);

    return `
        <block type="${statement.head}">
            <value name="value">${value}</value>
        </block>
    `;
};
