import { stripIndentation } from '../utils/text';

export function generateRoboCode(roboAst) {
  const { head, body } = roboAst;
  if (head !== 'start') {
    throw new Error(`Unexpected root of roboAst: ${head}`);
  }
  return (body.length > 0) ? generateBody(body, 0) : '';
}


function generateBody(nodes, indent = 4) {
  const statementCodes = (nodes.length === 0) ? ['pass'] : nodes.map(generateStatement);
  const lines = [].concat(...statementCodes.map(c => c.split('\n')));
  const indentedLines = lines.map(line => ' '.repeat(indent) + line);
  return indentedLines.join('\n');
}


function generateStatement({ statement }) {
  switch (statement.head) {
    case 'repeat':
      return generateRepeatLoop(statement);
    case 'while':
      return generateWhileLoop(statement);
    case 'if':
      return generateIfStatement(statement);
    default:
      return generateSimpleStatement(statement);
  }
}

function generateSimpleStatement({ head }) {
  // const argsList = args.map(encodeValue).join(',');
  return `${head}()`;
}


function generateRepeatLoop({ count, body }) {
  const bodyCode = generateBody(body);
  return stripIndentation`\
    repeat ${count}:
    ${bodyCode}`;
}


function generateWhileLoop({ test, body }) {
  const testCode = generateTest(test);
  const bodyCode = generateBody(body);
  return stripIndentation`\
    while ${testCode}:
    ${bodyCode}`;
}


function generateIfStatement({ test, body, orelse }) {
  const testCode = generateTest(test);
  const bodyCode = generateBody(body);
  const orelseCode = orelse ? generateOrelseBlock(orelse) : '';
  return stripIndentation`\
    if ${testCode}:
    ${bodyCode}${orelseCode}`;
}


function generateOrelseBlock({ statement }) {
  switch (statement.head) {
    case 'elif':
      return generateElif(statement);
    case 'else':
      return generateElse(statement);
    default:
      throw new Error(`Unexpected orelse head: ${statement.head}`);
  }
}


function generateElif({ test, body, orelse }) {
  const testCode = generateTest(test);
  const bodyCode = generateBody(body);
  const orelseCode = orelse ? generateOrelseBlock(orelse) : '';
  return stripIndentation`
    elif ${testCode}:
    ${bodyCode}${orelseCode}`;
}


function generateElse({ body }) {
  const bodyCode = generateBody(body);
  return stripIndentation`
    else:
    ${bodyCode}`;
}


function generateTest(node) {
  if (node == null) {
    return '';
  }
  switch (node.head) {
    case 'and':
      return generateCompoundTest('and', node.left, node.right);
    case 'or':
      return generateCompoundTest('or', node.left, node.right);
    default:
      return generateSimpleTest(node);
  }
}


function generateCompoundTest(operator, leftTestNode, rightTestNode) {
  const leftTest = generateSimpleTest(leftTestNode);
  const rightTest = generateSimpleTest(rightTestNode);
  return `(${leftTest} ${operator} ${rightTest})`;
}


function generateSimpleTest({ head, comparator, value }) {
  return `${head}() ${comparator} ${generateValue(value)}`;
}


function generateValue(value) {
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
}
