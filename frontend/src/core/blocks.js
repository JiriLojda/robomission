/**
 * Defines Blockly blocks
 */
import { translate } from '../localization';

const colors = {
  header: 45,
  command: 180,
  position: 200,
  test: 65,
  loop: 120,
  conditional: 345,
  variable: 278,
  logic: 310,
  constants: 239,
};


const blocks = [
  {
    id: 'start',
    message0: translate('blockly.start'),
    args0: [],
    nextStatement: null,
    colour: colors.header,
    tooltip: '',
    helpUrl: '',
  },
  {
    id: 'fly',
    message0: `${translate('blockly.fly')} %1`,
    args0: [
      {
        type: 'field_dropdown',
        name: 'direction',
        options: [
          [translate('blockly.ahead'), 'ahead'],
          [translate('blockly.left'), 'left'],
          [translate('blockly.right'), 'right'],
        ],
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: colors.command,
    tooltip: '',
    helpUrl: '',
  },
  {
    id: 'turn',
    message0: `${translate('blockly.turn')} %1`,
    args0: [
      {
        type: 'field_dropdown',
        name: 'direction',
        options: [
          [translate('blockly.left'), 'left'],
          [translate('blockly.right'), 'right'],
        ],
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: colors.command,
    tooltip: '',
    helpUrl: '',
  },
  {
    id: 'shoot',
    message0: translate('blockly.shoot'),
    args0: [],
    previousStatement: null,
    nextStatement: null,
    colour: colors.command,
    tooltip: '',
    helpUrl: '',
  },
  {
    id: 'color',
    message0: `${translate('blockly.color')} %1 %2`,
    args0: [
      {
        type: 'field_dropdown',
        name: 'comparator',
        options: [
          ['≠', '!='],
          ['=', '=='],
        ],
      },
      {
        type: 'field_dropdown',
        name: 'value',
        options: [
          [translate('blockly.blue'), 'b'],
          [translate('blockly.green'), 'g'],
          [translate('blockly.red'), 'r'],
          [translate('blockly.yellow'), 'y'],
          [translate('blockly.black'), 'k'],
        ],
      },
    ],
    output: 'Boolean',
    colour: colors.test,
    tooltip: '',
    helpUrl: '',
  },
  {
    id: 'position_value',
    message0: `${translate('blockly.position')} x = %1 y = %2`,
    args0: [
      {
        type: 'input_value',
        name: 'x',
        check: 'Number',
      },
      {
        type: 'input_value',
        name: 'y',
        check: 'Number',
      },
    ],
    output: 'Position',
    colour: colors.position,
    tooltip: '',
    helpUrl: '',
  },
  {
    id: 'position_value_relative',
    message0: `relative ${translate('blockly.position')} to ship x = %1 y = %2`,
    args0: [
      {
        type: 'input_value',
        name: 'x',
        check: 'Number',
      },
      {
        type: 'input_value',
        name: 'y',
        check: 'Number',
      },
    ],
    output: 'Position',
    colour: colors.position,
    tooltip: '',
    helpUrl: '',
  },
  {
    id: 'number_binary',
    message0: `%1 %2 %3`,
    args0: [
      {
        type: 'input_value',
        name: 'leftValue',
        check: 'Number',
      },
      {
        type: 'field_dropdown',
        name: 'operator',
        options: [
          ['+', '+'],
          ['-', '-'],
          ['*', '*'],
          ['/', '/'],
          ['^', '^'],
          ['sqrt', 'sqrt'],
        ],
      },
      {
        type: 'input_value',
        name: 'rightValue',
        check: 'Number',
      },
    ],
    output: 'Number',
    colour: colors.position,
    tooltip: '',
    helpUrl: '',
  },
  {
    id: 'tile',
    message0: `${translate('blockly.tile')} %1 %2 %3`,
    args0: [
      {
        type: 'input_value',
        name: 'position',
        check: 'Position',
      },
      {
        type: 'field_dropdown',
        name: 'comparator',
        options: [
          [translate('blockly.contains'), 'contains'],
          [translate('blockly.notContains'), 'notContains'],
        ],
      },
      {
        type: 'field_dropdown',
        name: 'value',
        options: [
          [translate('object.ship'), 'S'],
          [translate('object.diamond'), 'D'],
          [translate('object.meteoroid'), 'M'],
          [translate('object.asteroid'), 'A'],
          [translate('object.wormhole'), 'W'],
        ],
      },
    ],
    output: 'Boolean',
    colour: colors.test,
    tooltip: '',
    helpUrl: '',
  },
  {
    id: 'tile_accessible',
    message0: `${translate('blockly.tile')} %1 is accessible`,
    args0: [
      {
        type: 'input_value',
        name: 'position',
        check: 'Position',
      },
    ],
    output: 'Boolean',
    colour: colors.test,
    tooltip: '',
    helpUrl: '',
  },
  {
    id: 'position',
    message0: `${translate('blockly.position')} %1 %2`,
    args0: [
      {
        type: 'field_dropdown',
        name: 'comparator',
        options: [
          ['=', '=='],
          ['≠', '!='],
          ['>', '>'],
          ['≥', '>='],
          ['<', '<'],
          ['≤', '<='],
        ],
      },
      {
        type: 'field_dropdown',
        name: 'value',
        options: [
          ['1', '1'],
          ['2', '2'],
          ['3', '3'],
          ['4', '4'],
          ['5', '5'],
        ],
      },
    ],
    output: 'Boolean',
    colour: colors.test,
    tooltip: '',
    helpUrl: '',
  },
  {
    id: 'repeat',
    message0: `${translate('blockly.repeat')} %1: %2 %3`,
    args0: [
      {
        type: 'field_dropdown',
        name: 'count',
        options: [
          ['2', '2'],
          ['3', '3'],
          ['4', '4'],
          ['5', '5'],
          ['6', '6'],
          ['7', '7'],
          ['8', '8'],
          ['9', '9'],
          ['10', '10'],
        ],
      },
      {
        type: 'input_dummy',
      },
      {
        type: 'input_statement',
        name: 'body',
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: colors.loop,
    tooltip: '',
    helpUrl: '',
  },
  {
    id: 'while',
    message0: `${translate('blockly.while')} %1: %2 %3`,
    args0: [
      {
        type: 'input_value',
        name: 'test',
        check: 'Boolean',
      },
      {
        type: 'input_dummy',
      },
      {
        type: 'input_statement',
        name: 'body',
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: colors.loop,
    tooltip: '',
    helpUrl: '',
  },
  {
    id: 'if',
    message0: `${translate('blockly.if')} %1: %2 %3`,
    args0: [
      {
        type: 'input_value',
        name: 'test',
        check: 'Boolean',
      },
      {
        type: 'input_dummy',
      },
      {
        type: 'input_statement',
        name: 'body',
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: colors.conditional,
    tooltip: '',
    helpUrl: '',
  },
  {
    id: 'if-else',
    message0: `${translate('blockly.if')} %1: %2 %3 ${translate('blockly.else')}: %4 %5`,
    args0: [
      {
        type: 'input_value',
        name: 'test',
        check: 'Boolean',
      },
      {
        type: 'input_dummy',
      },
      {
        type: 'input_statement',
        name: 'body',
      },
      {
        type: 'input_dummy',
      },
      {
        type: 'input_statement',
        name: 'body-else',
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: colors.conditional,
    tooltip: '',
    helpUrl: '',
  },
    //variables
  {
    id: 'setVariable',
    message0: `set %1 to %2`,
    args0: [
      {
        type: 'field_input',
        name: 'name',
        text: 'name',
      },
      {
        type: 'field_input',
        name: 'value',
        text: 'value',
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: colors.variable,
    tooltip: '',
    helpUrl: '',
  },
  {
    id: 'setVariableNumeric',
    message0: `set %1 to %2`,
    args0: [
      {
        type: 'field_input',
        name: 'name',
        text: 'name',
      },
      {
        type: 'input_value',
        name: 'value',
        check: 'Number',
      },
    ],
    previousStatement: null,
    nextStatement: null,
    colour: colors.variable,
    tooltip: '',
    helpUrl: '',
  },
  {
    id: 'getStringVariable',
    message0: `get %1 as string`,
    args0: [
      {
        type: 'field_input',
        name: 'name',
        text: 'name',
      },
    ],
    output: 'String',
    colour: colors.variable,
    tooltip: '',
    helpUrl: '',
  },
  {
    id: 'getNumericVariable',
    message0: `get %1 as a number`,
    args0: [
      {
        type: 'field_input',
        name: 'name',
        text: 'name',
      },
    ],
    output: 'Number',
    colour: colors.variable,
    tooltip: '',
    helpUrl: '',
  },
    //comparators
  {
    id: 'numericCompare',
    message0: `number %1 %2 number %3`,
    args0: [
      {
        type: 'input_value',
        name: 'leftValue',
        check: 'Number'
      },
      {
        type: 'field_dropdown',
        name: 'comparator',
        options: [
          ['=', '=='],
          ['≠', '!='],
          ['>', '>'],
          ['≥', '>='],
          ['<', '<'],
          ['≤', '<='],
        ],
      },
      {
        type: 'input_value',
        name: 'rightValue',
        check: 'Number'
      },
    ],
    output: 'Boolean',
    colour: colors.test,
    tooltip: '',
    helpUrl: '',
  },
  {
    id: 'stringCompare',
    message0: `string %1 %2 string %3`,
    args0: [
      {
        type: 'input_value',
        name: 'leftValue',
        check: 'String'
      },
      {
        type: 'field_dropdown',
        name: 'comparator',
        options: [
          ['=', '=='],
          ['≠', '!='],
          ['>', '>'],
          ['≥', '>='],
          ['<', '<'],
          ['≤', '<='],
          [translate('blockly.contains'), 'contains'],
          [translate('blockly.notContains'), 'notContains'],
        ],
      },
      {
        type: 'input_value',
        name: 'rightValue',
        check: 'String'
      },
    ],
    output: 'Boolean',
    colour: colors.test,
    tooltip: '',
    helpUrl: '',
  },
    //logic
  {
    id: 'logic_binary',
    message0: `%1 %2 %3`,
    args0: [
      {
        type: 'input_value',
        name: 'leftValue',
        check: 'Boolean'
      },
      {
        type: 'field_dropdown',
        name: 'comparator',
        options: [
            ['and', 'and'],
            ['or', 'or'],
            ['equal', 'eq'],
            ['non-equal', 'nonEq'],
        ],
      },
      {
        type: 'input_value',
        name: 'rightValue',
        check: 'Boolean'
      },
    ],
    output: 'Boolean',
    colour: colors.logic,
    tooltip: '',
    helpUrl: '',
  },
  {
    id: 'logic_not',
    message0: `not %1`,
    args0: [
      {
        type: 'input_value',
        name: 'value',
        check: 'Boolean'
      },
    ],
    output: 'Boolean',
    colour: colors.logic,
    tooltip: '',
    helpUrl: '',
  },
  {
    id: 'constant_boolean',
    message0: `%1`,
    args0: [
      {
        type: 'field_dropdown',
        name: 'value',
        options: [
          ['true', 'true'],
          ['false', 'false'],
        ],
      },
    ],
    output: 'Boolean',
    colour: colors.constants,
    tooltip: '',
    helpUrl: '',
  },
  {
    id: 'constant_string',
    message0: `%1`,
    args0: [
      {
        type: 'field_input',
        name: 'value',
        text: 'input',
      },
    ],
    output: 'String',
    colour: colors.constants,
    tooltip: '',
    helpUrl: '',
  },
  {
    id: 'constant_number',
    message0: `%1`,
    args0: [
      {
        type: 'field_number',
        name: 'value',
        value: 0,
      },
    ],
    output: 'Number',
    colour: colors.constants,
    tooltip: '',
    helpUrl: '',
  },
];

export function getAllBlocksList() {
  return blocks.map(block => block.id);
}

export default blocks;
