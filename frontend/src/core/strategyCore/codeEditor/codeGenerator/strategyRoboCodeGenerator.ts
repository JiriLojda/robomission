import {stripIndentation} from '../../../../utils/text';
import {
    Condition,
    IBinaryLogicCondition,
    IBlock, INumberBinaryStatement,
    IPositionValue,
    IRoboAst,
    IStatement
} from "../../models/programTypes";
import {StatementType} from "../../enums/statementType";
import {ConditionType} from "../../enums/conditionType";
import {Comparator} from "../../enums/comparator";
import {invalidProgramError} from "../../utils/invalidProgramError";
import {WorldObjectType} from "../../enums/worldObjectType";
import {NumberOperation} from "../../enums/numberOperation";

export function generateStrategyRoboCode(roboAst: IRoboAst) {
    const { head, body } = roboAst;
    if (head !== 'start') {
        throw new Error(`Unexpected root of roboAst: ${head}`);
    }
    return (body.length > 0) ? generateBody(body, 0) : '';
}


function generateBody(nodes: IBlock[], indent = 4) {
    const statementCodes = (nodes.length === 0) ? ['pass'] : nodes.map(b => b.statement).map(generateStatement);
    const lines = [...statementCodes.flatMap(c => c.split('\n'))];
    const indentedLines = lines.map(line => ' '.repeat(indent) + line);
    return indentedLines.join('\n');
}


function generateStatement(statement: IStatement): string {
    switch (statement.head) {
        case StatementType.Repeat:
            return generateRepeatLoop(statement);
        case StatementType.While:
            return generateWhileLoop(statement);
        case StatementType.If:
            return generateIfStatement(statement);
        case StatementType.GetStringVariable:
        case StatementType.GetNumericVariable:
            return `${statement.name}`;
        case StatementType.ConstantString:
        case StatementType.ConstantNumber:
            return `${statement.value}`;
        case StatementType.NumberBinary: {
            const s = statement as INumberBinaryStatement;
            const left = generateStatement(s.leftValue);
            const right = generateStatement(s.rightValue);
            const operation = s.operator;

            return `(${left} ${operation} ${right})`;
        }
        case StatementType.SetVariableNumeric:
            return `${statement.name} = ${generateStatement(statement.value as IStatement)}`;
        case StatementType.SetVariable:
            return `${statement.name} = ${statement.value}`;
        default:
            return generateSimpleStatement(statement);
    }
}

function generateSimpleStatement({ head }: IStatement) {
    return `${head}()`;
}


function generateRepeatLoop({ count, body }: IStatement) {
    const bodyCode = generateBody(body || []);
    return stripIndentation`\
    repeat ${count}:
    ${bodyCode}`;
}


function generateWhileLoop({ test, body }: IStatement) {
    const testCode = generateTest(test!);
    const bodyCode = generateBody(body || []);
    return stripIndentation`\
    while ${testCode}:
    ${bodyCode}`;
}


function generateIfStatement({ test, body, orelse }: IStatement) {
    const testCode = generateTest(test!);
    const bodyCode = generateBody(body || []);
    const orelseCode = orelse ? generateOrelseBlock(orelse) : '';
    return stripIndentation`\
    if ${testCode}:
    ${bodyCode}${orelseCode}`;
}


function generateOrelseBlock({ statement }: IBlock) {
    switch (statement.head) {
        case StatementType.Else:
            return generateElse(statement);
        default:
            throw new Error(`Unexpected orelse head: ${statement.head}`);
    }
}


function generateElse({ body }: IStatement) {
    const bodyCode = generateBody(body || []);
    return stripIndentation`
    else:
    ${bodyCode}`;
}


function generateTest(node: Condition): string {
    if (node == null) {
        return '';
    }
    switch (node.head) {
        case ConditionType.LogicBinaryOperation:
            return generateLogicBinaryOperation(node);
        case ConditionType.Color:
            throw invalidProgramError('Unsupported condition Color.');
        case ConditionType.ConstantBoolean:
            return `${node.value}`;
        case ConditionType.Not: {
            const value = generateTest(node.value);
            return `not ${value}`;
        }
        case ConditionType.IsTileAccessible: {
            const position = generateTileArgument(node.position);
            return `isTileAccessible(${position})`;
        }
        case ConditionType.Position:
            throw invalidProgramError('Unsupported condition Position.');
        case ConditionType.Tile: {
            const position = generateTileArgument(node.position);
            const comparator = getComparator(node.comparator);
            const test = generateObjectOnMap(node.value);

            return `Tile on ${position} ${comparator} ${test}`;
        }
        case ConditionType.StringCompare:
        case ConditionType.NumericCompare: {
            const comparator = getComparator(node.comparator);
            const left = generateStatement(node.leftValue);
            const right = generateStatement(node.rightValue);

            return `(${left} ${comparator} ${right})`;
        }
        default:
            throw invalidProgramError(`Unknown condition type ${node!.head}`);
    }
}

function generateObjectOnMap(obj: WorldObjectType | "TheEndOfMap"): string {
    switch (obj) {
        case "TheEndOfMap":
            return obj;
        case WorldObjectType.Asteroid:
            return 'Asteroid';
        case WorldObjectType.Diamond:
            return 'Diamond';
        case WorldObjectType.Meteoroid:
            return 'Meteoroid';
        case WorldObjectType.Ship:
            return 'Ship';
        case WorldObjectType.Wormhole:
            return 'Wormhole';
        default:
            throw invalidProgramError(`Unsupported object on map ${obj}.`);
    }
}

function generateTileArgument(position: IPositionValue) {
    const prefix = position.head === "position_value" ? 'Tile' : 'TileRelative';

    return `${prefix}[${generateStatement(position.x)}, ${generateStatement(position.y)}]`;
}

function generateLogicBinaryOperation(node: IBinaryLogicCondition): string {
    const left = generateTest(node.leftValue);
    const right = generateTest(node.rightValue);
    const comparator = getComparator(node.comparator);

    return `(${left} ${comparator} ${right})`;
}

function getComparator(comparator: Comparator) {
    switch (comparator) {
        case Comparator.And:
            return 'and';
        case Comparator.Bigger:
            return '>';
        case Comparator.BiggerOrEqual:
            return '>=';
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
            return '<';
        case Comparator.SmallerOrEqual:
            return '<=';
        default:
            throw invalidProgramError(`Unknown comparator ${comparator}.`, 'roboCodeGenerator');
    }
}
