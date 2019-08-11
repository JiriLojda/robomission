/**
 * Conversion from RoboAST into RoboBlocksXml.
 *
 * To see how the BlocklyXml is supposed to look use:
 * https://blockly-demo.appspot.com/static/demos/code/index.html
 */
export function generateBlocklyXml(roboAst, x = 210, y = 10) {
  const blocklyXml = `
    <xml xmlns="http://www.w3.org/1999/xhtml">
      <block type="start" deletable="false" x="${x}" y="${y}">
      ${generateNextBlocksIfPresent(roboAst.body)}
      </block>
    </xml>
  `;
  return blocklyXml;
}


function generateSequence(nodes) {
  if (nodes == null || nodes.length === 0) {
    return '';
  }
  const [firstNode, ...nextNodes] = nodes;
  return generateStatementBlock(firstNode, nextNodes);
}


function generateStatementBlock(node, nextNodes) {
  const { statement } = node;
  switch (statement.head) {
    case 'repeat':
      return generateRepeatBlock(statement, nextNodes);
    case 'while':
      return generateWhileBlock(statement, nextNodes);
    case 'if':
      return generateIfBlock(statement, nextNodes);
    case 'fly':
      return generateFlyBlock('ahead', nextNodes);
    case 'left':
      return generateFlyBlock('left', nextNodes);
    case 'right':
      return generateFlyBlock('right', nextNodes);
    case 'shoot':
      return generateShootBlock(nextNodes);
    case 'turn-right':
      return generateTurnBlock('right', nextNodes);
    case 'turn-left':
      return generateTurnBlock('left', nextNodes);
    default:
      throw new Error(`Unknown node type: ${statement.head}`);
  }
}


function generateFlyBlock(direction, nextNodes) {
  return `
    <block type="fly">
      <field name="direction">${direction}</field>
      ${generateNextBlocksIfPresent(nextNodes)}
    </block>
  `;
}

function generateTurnBlock(direction, nextNodes) {
  return `
    <block type="turn">
      <field name="direction">${direction}</field>
      ${generateNextBlocksIfPresent(nextNodes)}
    </block>
  `;
}


function generateShootBlock(nextNodes) {
  return `
    <block type="shoot">
      ${generateNextBlocksIfPresent(nextNodes)}
    </block>
  `;
}


function generateRepeatBlock({ count, body }, nextNodes) {
  return `
    <block type="repeat">
      <field name="count">${count}</field>
      <statement name="body">${generateSequence(body)}</statement>
      ${generateNextBlocksIfPresent(nextNodes)}
    </block>
  `;
}


function generateWhileBlock({ test, body }, nextNodes) {
  return `
    <block type="while">
      ${generateTestValueIfPresent(test)}
      <statement name="body">${generateSequence(body)}</statement>
      ${generateNextBlocksIfPresent(nextNodes)}
    </block>
  `;
}


function generateIfBlock({ test, body, orelse }, nextNodes) {
  if (orelse != null) {
    return generateIfElseBlock({ test, body, orelse }, nextNodes);
  }
  return `
    <block type="if">
      ${generateTestValueIfPresent(test)}
      <statement name="body">${generateSequence(body)}</statement>
      ${generateNextBlocksIfPresent(nextNodes)}
    </block>
  `;
}


function generateIfElseBlock({ test, body, orelse }, nextNodes) {
  if (orelse.statement.head !== 'else') {
    throw new Error(`Expected else node, found ${orelse.statement.head}`);
  }
  return `
    <block type="if-else">
      ${generateTestValueIfPresent(test)}
      <statement name="body">${generateSequence(body)}</statement>
      <statement name="body-else">${generateSequence(orelse.statement.body)}</statement>
      ${generateNextBlocksIfPresent(nextNodes)}
    </block>
  `;
}


function generateNextBlocksIfPresent(nextNodes) {
  if (!nextNodes || nextNodes.length === 0) {
    return '';
  }
  return `
    <next>
      ${generateSequence(nextNodes)}
    </next>
  `;
}


function generateTestValueIfPresent(test) {
  if (test == null) {
    return '';
  }
  return generateTest(test);
}


function generateTest(node) {
  let testBlock = null;
  switch (node.head) {
    case 'color':
      testBlock =  generateColorBlock(node);
      break;
    case 'position':
      testBlock = generatePositionBlock(node);
      break;
    default:
      throw new Error(`Unknown node type: ${node.head}`);
  }
  // Name tag must match with the while/if block definition in ./blocks.js
  return `
    <value name="test">
      ${testBlock}
    </value>
  `;
}


function generateColorBlock({ comparator, value }) {
  return `
    <block type="color">
      <field name="comparator">${comparator}</field>
      <field name="value">${value}</field>
    </block>
  `;
}


function generatePositionBlock({ comparator, value }) {
  return `
    <block type="position">
      <field name="comparator">${comparator}</field>
      <field name="value">${value}</field>
    </block>
  `;
}
