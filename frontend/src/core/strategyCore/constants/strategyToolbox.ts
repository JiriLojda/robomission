import {BlockType} from "../enums/blockType";
import {translate} from "../../../localization";

export type BlocklyBlock = {
    readonly type: BlockType,
    readonly fields?: any
};
export type BlocklyToolboxCategory = {
    readonly name: string,
    readonly blocks: BlocklyBlock[],
};

export type BlocklyToolbox = BlocklyToolboxCategory[];

export const addBlocksToToolbox = (toolbox: BlocklyToolbox, group: number, newBlocks: BlocklyBlock[]): BlocklyToolbox =>
    toolbox.map(
        (category, i) => i === group ?
            {...category, blocks: category.blocks.concat(newBlocks)} :
            category
    );

export const addShipIdConstants = (toolbox: BlocklyToolbox, shipIds: ReadonlyArray<string>): BlocklyToolbox =>
    addBlocksToToolbox(
        toolbox,
        4,
        shipIds.map(id => ({ type: BlockType.ConstantString, fields: { value: id } }))
    );

export const categoryNames = {
    commands: translate('blockly.categories.commands'),
    variables: translate('blockly.categories.variables'),
    cycles: translate('blockly.categories.cycles'),
    values: translate('blockly.categories.values'),
    constants: translate('blockly.categories.constants'),
    conditions: translate('blockly.categories.conditions'),
    branching: translate('blockly.categories.branching'),
    logic: translate('blockly.categories.logic'),
    functions: translate('blockly.categories.functions'),
};

export const filterCategories = (toolbox: BlocklyToolbox, categories: string[]): BlocklyToolbox =>
    toolbox
        .filter(category => categories.includes(category.name));

export const allStrategyCategories: BlocklyToolbox = [
    {
        name: categoryNames.commands,
        blocks: [
            {
                type: BlockType.Fly,
                fields: {direction: 'ahead'},
            },
            {
                type: BlockType.Fly,
                fields: {direction: 'left'},
            },
            {
                type: BlockType.Fly,
                fields: {direction: 'right'},
            },
            {type: BlockType.Shoot},
            {type: BlockType.PickUpDiamond},
            {
                type: BlockType.Turn,
                fields: {direction: 'left'},
            },
            {
                type: BlockType.Turn,
                fields: {direction: 'right'},
            },
            {
                type: BlockType.Noop,
            },
        ],
    },
    {
        name: categoryNames.variables,
        blocks: [
            {type: BlockType.SetVariable},
            {type: BlockType.SetVariableNumeric},
            {type: BlockType.GetStringVariable},
            {type: BlockType.GetNumericNumber},
        ],
    },
    {
        name: categoryNames.cycles,
        blocks: [
            {type: BlockType.Repeat},
            {type: BlockType.While},
        ]
    },
    {
        name: categoryNames.values,
        blocks: [
            {type: BlockType.PositionValue},
            {type: BlockType.PositionValueRelative},
            {type: BlockType.NumberBinary},
            {type: BlockType.GetShipPosition},
            {type: BlockType.GetPositionCoordinate},
            {type: BlockType.GetDirectionOfShip},
            {type: BlockType.GetShipId},
        ]
    },
    {
        name: categoryNames.constants,
        blocks: [
            {type: BlockType.ConstantBoolean},
            {type: BlockType.ConstantNumber},
            {type: BlockType.ConstantString},
        ]
    },
    {
        name: categoryNames.conditions,
        blocks: [
            {type: BlockType.Tile},
            {type: BlockType.Color},
            {type: BlockType.Position},
            {type: BlockType.StringCompare},
            {type: BlockType.NumericCompare},
            {type: BlockType.IsTileAccessible},
        ]
    },
    {
        name: categoryNames.branching,
        blocks: [
            {type: BlockType.If},
            {type: BlockType.IfElse},
        ]
    },
    {
        name: categoryNames.logic,
        blocks: [
            {type: BlockType.LogicBinariOperation},
            {type: BlockType.LogicNot},
        ]
    },
    {
        name: categoryNames.functions,
        blocks: [
            {type: BlockType.FunctionDefinition},
            {type: BlockType.FunctionParameterDefinition},
            {type: BlockType.FunctionCallVoid},
            {type: BlockType.FunctionCallBoolean},
            {type: BlockType.FunctionCallNumber},
            {type: BlockType.FunctionCallString},
            {type: BlockType.FunctionParameterCall},
            {type: BlockType.FunctionReturn},
        ]
    }
];
