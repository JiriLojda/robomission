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
            {type: BlockType.PickUpDiamond},
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
            {type: BlockType.SetVariableNumeric},
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
            {type: BlockType.PositionValueRelative},
            {type: BlockType.NumberBinary},
            {type: BlockType.GetShipPosition},
            {type: BlockType.GetPositionCoordinate},
            {type: BlockType.GetDirectionOfShip},
        ]
    },
    {
        name: 'constants',
        blocks: [
            {type: BlockType.ConstantBoolean},
            {type: BlockType.ConstantNumber},
            {type: BlockType.ConstantString},
            {type: BlockType.ConstantString, fields: {value: 'playerShip'}},
            {type: BlockType.ConstantString, fields: {value: 'aiShip'}},
        ]
    },
    {
        name: 'conditions',
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
    {
        name: 'functions',
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
