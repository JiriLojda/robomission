import {BlockType} from "../enums/blockType";

export type BlocklyBlock = {
    readonly type: BlockType,
    readonly fields?: any
};
export type BlocklyToolboxCategory = {
    readonly name: string,
    readonly blocks: BlocklyBlock[]
};

export const allStrategyCategories: BlocklyToolboxCategory[] = [
    {
        name: 'commands',
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
            {
                type: BlockType.Turn,
                fields: {direction: 'left'},
            },
            {
                type: BlockType.Turn,
                fields: {direction: 'right'},
            },
        ],
    },
    {
        name: 'variables',
        blocks: [
            {type: BlockType.SetVariable},
            {type: BlockType.GetStringVariable},
            {type: BlockType.GetNumericNumber},
        ],
    },
    {
        name: 'cycles',
        blocks: [
            {type: BlockType.Repeat},
            {type: BlockType.While},
        ]
    },
    {
        name: 'values',
        blocks: [
            {type: BlockType.PositionValue},
        ]
    },
    {
        name: 'conditions',
        blocks: [
            {type: BlockType.Tile},
            {type: BlockType.Color},
            {type: BlockType.Position},
            {type: BlockType.StringCompare},
            {type: BlockType.NumbersCompare},
        ]
    },
    {
        name: 'branching',
        blocks: [
            {type: BlockType.If},
            {type: BlockType.IfElse},
        ]
    },
    {
        name: 'logic',
        blocks: [
            {type: BlockType.LogicBinariOperation},
            {type: BlockType.LogicNot},
        ]
    },
];
