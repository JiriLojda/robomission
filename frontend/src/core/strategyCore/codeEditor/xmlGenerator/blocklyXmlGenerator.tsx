/**
 * Conversion from RoboAST into RoboBlocksXml.
 *
 * To see how the BlocklyXml is supposed to look use:
 * https://blockly-demo.appspot.com/static/demos/code/index.html
 */
import {
    Condition,
    IBlock,
    INumberBinaryStatement,
    IPositionValue,
    IRoboAst,
    IStatement
} from "../../models/programTypes";
import {ConditionType} from "../../enums/conditionType";
import {StatementType} from "../../enums/statementType";
import {Comparator} from "../../enums/comparator";
import {invalidProgramError} from "../../utils/invalidProgramError";

export function generateBlocklyXml(roboAst: IRoboAst, x = 210, y = 10) {
    //TODO Functions
    return `
    <xml xmlns="http://www.w3.org/1999/xhtml">
      <block type="start" deletable="false" x="${x}" y="${y}">
      ${generateNextBlocksIfPresent(roboAst[0].body!)}
      </block>
    </xml>
  `;
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
        <field name="value">${statement.value}</field>
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
                    <value name="position">${generatePositionValue(test.position)}</value>
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
                    <value name="position">${generatePositionValue(test.position)}</value>
                </block>
            `;

        default:
            throw new Error(`Unknown node type: ${test.head}`);
    }
};

const wrapWithTestTag = (input: string) => `
    <value name="test">
      ${input}
    </value>
  `;

const generatePositionValue = (position?: IPositionValue): string => {
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
            return 'equivalent';
        case Comparator.NonEqual:
            return '!=';
        case Comparator.NonEquivalent:
            return 'not equivalent';
        case Comparator.NotContains:
            return 'not contains';
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
