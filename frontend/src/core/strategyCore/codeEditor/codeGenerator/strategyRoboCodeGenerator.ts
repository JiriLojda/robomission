import {stripIndentation} from '../../../../utils/text';
import {
    Condition,
    IBinaryLogicCondition,
    IBlock,
    IFunctionCallParameter,
    IFunctionDefinition,
    IFunctionReturn,
    IGetPositionCoordinateStatement,
    IGetShipPositionStatement,
    INumberBinaryStatement,
    IPositionValueStatement,
    IRoboAst,
    IStatement
} from "../../models/programTypes";
import {StatementType} from "../../enums/statementType";
import {ConditionType} from "../../enums/conditionType";
import {Comparator} from "../../enums/comparator";
import {invalidProgramError} from "../../utils/invalidProgramError";
import {WorldObjectType} from "../../enums/worldObjectType";
import {getValueStatementType} from "../../utils/getValueStatementType";
import {ValueStatementType} from "../../enums/valueStatementType";

export function generateStrategyRoboCode(roboAst: IRoboAst): string {
    if (roboAst.length === 0 || roboAst[0].head !== StatementType.Start) {
        throw invalidProgramError('RoboAst has to have a start statement as first element.');
    }
    const main = generateStartFnc(roboAst[0]);
    const otherFncs = roboAst
        .slice(1)
        .map(s => generateFunctionDefinition(s as IFunctionDefinition));

    return [main, ...otherFncs]
        .join("\n\n");
}

function generateStartFnc(statement: IStatement): string {
    if (statement.head !== StatementType.Start)
        throw invalidProgramError(`This fnc is for start only. type: ${statement.head}`);

    const body = generateBody(statement.body!);
    return `def Start():\n${body}`;
}

function generateFunctionDefinition(fnc: IFunctionDefinition): string {
    const parameters = fnc.parameters.join(', ');
    const body = generateBody(fnc.body);

    return `def ${fnc.name}(${parameters}):\n${body}`;
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
            return `'${statement.value}'`;
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
        case StatementType.FunctionCallString:
        case StatementType.FunctionCallNumber:
        case StatementType.FunctionCallVoid:
            return `${statement.name}(${generateFunctionCallParameters(statement.parameters as IFunctionCallParameter[])})`;
        case StatementType.FunctionReturn:
            return generateFunctionReturn(statement as IFunctionReturn);
        case StatementType.PositionValue:
        case StatementType.PositionValueRelative:
            return generateTileArgument(statement as IPositionValueStatement);
        case StatementType.GetShipPosition:
            return generateGetShipPosition(statement as IGetShipPositionStatement);
        case StatementType.GetPositionCoordinate:
            return generateGetCoordinateOfPosition(statement as IGetPositionCoordinateStatement);
        default:
            return generateActionStatement(statement);
    }
}

function generateFunctionCallParameters(parameters: IFunctionCallParameter[]): string {
    return parameters
        .map(p => p.value)
        .map(generateStatement)
        .join(', ');
}

function generateFunctionReturn(statement: IFunctionReturn): string {
    const returnType = getValueStatementType(statement.value);
    switch (returnType) {
        case ValueStatementType.Boolean:
            return `return boolean ${generateTest(statement.value as Condition)}`;
        case ValueStatementType.Number:
            return `return number ${generateStatement(statement.value as IStatement)}`;
        case ValueStatementType.String:
            return `return string ${generateStatement(statement.value as IStatement)}`;
        default:
            throw invalidProgramError(`Unknown valueStatementType ${returnType}`);
    }
}

const actionStatements = [
    StatementType.Shoot,
    StatementType.Right,
    StatementType.Left,
    StatementType.TurnLeft,
    StatementType.TurnRight,
    StatementType.PickUpDiamond,
    StatementType.Fly,
];
function generateActionStatement({ head }: IStatement): string {
    if (!actionStatements.includes(head))
        throw invalidProgramError(`This is not an action statement: ${head}`);

    return head;
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
    if (statement.head !== StatementType.Else) {
        throw new Error(`Unexpected orelse head: ${statement.head}`);
    }

    return generateElse(statement);
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
            const position = generateTileArgument(node.position as IPositionValueStatement);
            return `is ${position} accessible`;
        }
        case ConditionType.Position:
            throw invalidProgramError('Unsupported condition Position.');
        case ConditionType.Tile: {
            const position = generateTileArgument(node.position as IPositionValueStatement);
            const comparator = getComparator(node.comparator);
            const test = generateObjectOnMap(node.value);

            return `${position} ${comparator} ${test}`;
        }
        case ConditionType.StringCompare:
        case ConditionType.NumericCompare: {
            const comparator = getComparator(node.comparator);
            const left = generateStatement(node.leftValue);
            const right = generateStatement(node.rightValue);

            return `${left} ${comparator} ${right}`;
        }
        case ConditionType.FunctionCallBoolean:
            return `${node.name}(${generateFunctionCallParameters(node.parameters)})`;
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

function generateTileArgument(position: IPositionValueStatement) {
    const numberPrefix = position.head === "position_value" ? '' : '~';

    return `Tile[${numberPrefix}${generateStatement(position.x)}, ${numberPrefix}${generateStatement(position.y)}]`;
}

function generateGetShipPosition(statement: IGetShipPositionStatement) {
    const shipId = generateStatement(statement.shipId);

    return `Tile[position of ship ${shipId}]`;
}

function generateGetCoordinateOfPosition(statement: IGetPositionCoordinateStatement) {
    const position = generateStatement(statement.position);
    const coordinate = statement.coordinate.head === StatementType.ConstantString ?
        statement.coordinate.value :
        `(${generateStatement(statement.coordinate)})`;

    return `${position}.${coordinate}`;
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
