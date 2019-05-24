export const allStrategyCategories = [
    {
        name: 'commands',
        blocks: [
            {
                type: 'fly',
                fields: {direction: 'ahead'},
            },
            {
                type: 'fly',
                fields: {direction: 'left'},
            },
            {
                type: 'fly',
                fields: {direction: 'right'},
            },
            {type: 'shoot'},
            {
                type: 'turn',
                fields: {direction: 'left'},
            },
            {
                type: 'turn',
                fields: {direction: 'right'},
            },
        ],
    },
    {
        name: 'variables',
        blocks: [
            {type: 'setVariable'},
            {type: 'getStringVariable'},
            {type: 'getNumericVariable'},
        ],
    },
    {
        name: 'cycles',
        blocks: [
            {type: 'repeat'},
            {type: 'while'},
        ]
    },
    {
        name: 'values',
        blocks: [
            {type: 'position_value'},
        ]
    },
    {
        name: 'conditions',
        blocks: [
            {type: 'tile'},
            {type: 'color'},
            {type: 'position'},
        ]
    },
    {
        name: 'branching',
        blocks: [
            {type: 'if'},
            {type: 'if-else'},
        ]
    },
];
