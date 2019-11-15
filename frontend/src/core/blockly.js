import Blockly from 'node-blockly/browser';
import blocks from './blocks';


export function initGlobalBlockly() {
  global.Blockly = Blockly;
  initBlocks(blocks);
}


function initBlocks(allBlocks) {
  allBlocks.forEach(block => {
    Blockly.Blocks[block.id] = {
      init: initBlock(block),
    };
  });
}


function initBlock(block) {
  return function init() {
    this.jsonInit(block);
  };
}


export function blocklyXmlToRoboAst(blocklyXml) {
  const blocklyDom = Blockly.Xml.textToDom(blocklyXml);
  return blocklyDomToRoboAst(blocklyDom);
}

function blocklyDomToRoboAst(dom) {
  const startBlock = dom.querySelector('block[type="start"]');
  const mainFunction = blockToAst(startBlock);

  const otherFunctionDefinitions = dom.querySelectorAll('block[type="function_definition"]');
  const otherFunctions = [...otherFunctionDefinitions]
    .map(blockToAst);

  return [mainFunction, ...otherFunctions];
}


function blockToAst(block) {
  if (block == null) {
    return null;
  }
  const type = block.getAttribute('type');
  switch (type) {
    case 'start':
      return startBlockToAst(block);
    case 'repeat':
      return repeatBlockToAst(block);
    case 'while':
      return whileBlockToAst(block);
    case 'if':
      return ifBlockToAst(block);
    case 'if-else':
      return ifElseBlockToAst(block);
    case 'fly':
      return flyBlockToAst(block);
    case 'shoot':
      return shootBlockToAst(block);
    case 'pick_up_diamond':
      return pickupBlockToAst(block);
    case 'color':
      return colorBlockToAst(block);
    case 'position':
      return positionBlockToAst(block);
    case 'turn':
      return turnBlockToAst(block);
    case 'tile':
      return tileBlockToAst(block);
    case 'position_value':
      return positionValueBlockToAst(block, false);
    case 'position_value_relative':
      return positionValueBlockToAst(block, true);
    case 'setVariable':
      return setVariableBlockToAst(block);
    case 'setVariableNumeric':
      return setVariableNumericBlockToAst(block);
    case 'getStringVariable':
      return getStringVariableBlockToAst(block);
    case 'getNumericVariable':
      return getNumericVariableBlockToAst(block);
    case 'stringCompare':
      return stringCompareBlockToAst(block);
    case 'numericCompare':
      return numericCompareBlockToAst(block);
    case 'logic_binary':
      return logicBinaryBlockToAst(block);
    case 'logic_not':
      return logicNotBlockToAst(block);
    case 'constant_boolean':
      return constantBooleanToAst(block);
    case 'constant_number':
      return constantNumberToAst(block);
    case 'random_number':
      return randomNumberToAst(block);
    case 'constant_string':
      return constantStringToAst(block);
    case 'number_binary':
      return numberBinaryToAst(block);
    case 'tile_accessible':
      return isTileAccessibleToAst(block);
    case 'function_call_void':
      return functionCallToAst(block, 'void');
    case 'function_call_string':
      return functionCallToAst(block, 'string');
    case 'function_call_number':
      return functionCallToAst(block, 'number');
    case 'function_call_boolean':
      return functionCallToAst(block, 'boolean');
    case 'function_definition':
      return functionDefinitionToAst(block);
    case 'function_return':
      return functionReturnToAst(block);
    case 'get_ship_position':
      return getShipPositionToAst(block);
    case 'get_position_coordinate':
      return getPositionCoordinateToAst(block);
    case 'get_direction_of_ship':
      return getDirectionOfShipToAst(block);
    default:
      throw new Error(`Unknown block type: ${type}`);
  }
}

function startBlockToAst(block) {
  const nextBlock = getNextBlock(block);
  const body = getSequence(nextBlock);
  return { head: 'start', body, location: getLocation(block) };
}


function repeatBlockToAst(block) {
  const count = parseInt(getFieldValue(block, 'count'), 10);
  const body = getBody(block);
  return {head: 'repeat', count, body};
}


function whileBlockToAst(block) {
  const test = blockToAst(getValueBlock(block, 'test'));
  const body = getBody(block);
  return {head: 'while', test, body};
}


function ifBlockToAst(block) {
  const test = blockToAst(getValueBlock(block, 'test'));
  const body = getBody(block);
  return {head: 'if', test, body};
}


function ifElseBlockToAst(block) {
  const test = blockToAst(getValueBlock(block, 'test'));
  const body = getBody(block);
  const bodyElse = getBody(block, 'body-else');
  const orelse = {
    statement: { head: 'else', body: bodyElse },
    location: getLocation(block),
  };
  return {head: 'if', test, body, orelse};
}


function flyBlockToAst(block) {
  const direction = getFieldValue(block, 'direction');
  const command = (direction === 'ahead') ? 'fly' : direction;
  return {head: command};
}

function turnBlockToAst(block) {
  const direction = getFieldValue(block, 'direction');
  return { head: `turn-${direction}` };
}


function shootBlockToAst() {
  return {head: 'shoot'};
}

function pickupBlockToAst() {
  return {head: 'pick_up_diamond'};
}

function colorBlockToAst(block) {
  const comparator = getFieldValue(block, 'comparator');
  const value = getFieldValue(block, 'value');
  return { head: 'color', comparator, value };
}


function positionBlockToAst(block) {
  const comparator = getFieldValue(block, 'comparator');
  const value = parseInt(getFieldValue(block, 'value'), 10);
  return { head: 'position', comparator, value };
}

function positionValueBlockToAst(block, isRelative) {
  const x = blockToAst(getValueBlock(block, 'x'));
  const y = blockToAst(getValueBlock(block, 'y'));
  return { head: `position_value${isRelative ? '_relative' : ''}`, x, y };
}

function tileBlockToAst(block) {
  const position = blockToAst(getValueBlock(block, 'position'));
  const comparator = getFieldValue(block, 'comparator');
  const value = getFieldValue(block, 'value');
  return { head: 'tile', value, position, comparator };
}

function setVariableBlockToAst(block) {
  const name = getFieldValue(block, 'name');
  const value = blockToAst(getValueBlock(block, 'value'));
  return { head: 'setVariable', name, value };
}

function setVariableNumericBlockToAst(block) {
  const name = getFieldValue(block, 'name');
  const value = blockToAst(getValueBlock(block, 'value'));
  return { head: 'setVariableNumeric', name, value };
}

function getStringVariableBlockToAst(block) {
  const name = getFieldValue(block, 'name');
  return {head: 'getStringVariable', name};
}

function getNumericVariableBlockToAst(block) {
  const name = getFieldValue(block, 'name');
  return {head: 'getNumericVariable', name};
}

function binaryOperationBlockToAst(block, operationName) {
  const leftValue = blockToAst(getValueBlock(block, 'leftValue'));
  const rightValue = blockToAst(getValueBlock(block, 'rightValue'));
  const comparator = getFieldValue(block, 'comparator');
  return {head: operationName, leftValue, rightValue, comparator};
}

const numericCompareBlockToAst = block => binaryOperationBlockToAst(block, 'numericCompare');

const stringCompareBlockToAst = block => binaryOperationBlockToAst(block, 'stringCompare');

const logicBinaryBlockToAst = block => binaryOperationBlockToAst(block, 'logic_binary');

function logicNotBlockToAst(block) {
  const value = blockToAst(getValueBlock(block, 'value'));
  return {head: 'logic_not', value};
}

function constantToAst(block, constantType) {
  const value = getFieldValue(block, 'value');
  return {head: `constant_${constantType}`, value};
}

const constantBooleanToAst = block => constantToAst(block, 'boolean');
const constantNumberToAst = block => constantToAst(block, 'number');
const constantStringToAst = block => constantToAst(block, 'string');

function numberBinaryToAst(block) {
  const leftValue = blockToAst(getValueBlock(block, 'leftValue'));
  const rightValue = blockToAst(getValueBlock(block, 'rightValue'));
  const operator = getFieldValue(block, 'operator');

  return {head: 'number_binary', leftValue, rightValue, operator};
}

function functionDefinitionToAst(block) {
  const parameters = getFunctionDefinitionParameters(getValueBlock(block, 'parameter'));
  const name = getFieldValue(block, 'name');

  const nextBlock = getNextBlock(block);
  const body = getSequence(nextBlock);

  return {head: 'function_definition', body, name, parameters};
}

function functionCallToAst(block, type) {
  const parameters = getFunctionCallParameters(getValueBlock(block, 'parameter'));
  const name = getFieldValue(block, 'name');

  return {head: `function_call_${type}`, name, parameters};
}

function isTileAccessibleToAst(block) {
  const position = blockToAst(getValueBlock(block, 'position'));

  return {head: 'tile_accessible', position};
}

function getFunctionCallParameters(block) {
  if (!block)
    return [];

  const restBlocks = getFunctionCallParameters(getValueBlock(block, 'parameter'));

  const value = blockToAst(getValueBlock(block, 'value'));

  return [{value}, ...restBlocks];
}

function getFunctionDefinitionParameters(block) {
  if (!block)
    return [];

  const restBlocks = getFunctionDefinitionParameters(getValueBlock(block, 'parameter'));

  const name = getFieldValue(block, 'name');

  return [name, ...restBlocks];
}

function functionReturnToAst(block) {
  const value = blockToAst(getValueBlock(block, 'value'));

  return {head: 'function_return', value};
}

function getShipPositionToAst(block) {
  const shipId = blockToAst(getValueBlock(block, 'shipId'));

  return {head: 'get_ship_position', shipId};
}

function getPositionCoordinateToAst(block) {
  const position = blockToAst(getValueBlock(block, 'position'));
  const coordinate = blockToAst(getValueBlock(block, 'coordinate'));

  return {head: 'get_position_coordinate', position, coordinate};
}

function getDirectionOfShipToAst(block) {
  const shipId = blockToAst(getValueBlock(block, 'shipId'));

  return {head: 'get_direction_of_ship', shipId};
}

function randomNumberToAst(block) {
  return {head: 'random_number'};
}

//helpers
function getBody(block, name = 'body') {
  const bodyNode = getStatement(block, name);
  if (bodyNode == null) {
    return [];
  }
  const firstBlock = bodyNode.childNodes[0];
  return getSequence(firstBlock);
}


function getSequence(firstBlock) {
  const body = [];
  let next = firstBlock;
  while (next != null) {
    body.push(blockToAstWithLocation(next));
    next = getNextBlock(next);
  }
  return body;
}


function blockToAstWithLocation(block) {
  return { statement: blockToAst(block), location: getLocation(block) };
}


function getFieldValue(block, name) {
  const field = getField(block, name);
  return field.textContent;
}


function getField(block, name) {
  return block.querySelector(`field[name="${name}"]`);
}


function getStatement(block, name) {
  return block.querySelector(`statement[name="${name}"]`);
}


function getValueBlock(block, name) {
  return block.querySelector(`value[name="${name}"] > block`);
}


function getNextBlock(block) {
  return block.querySelector(`next > block`);
}


function getLocation(block) {
  return { blockId: block.getAttribute('id') };
}
