export enum ConditionType {
    Color = 'color',
    Position = 'position',
    Tile = 'tile',
    IsTileAccessible = 'tile_accessible',
    Not = 'logic_not',
    LogicBinaryOperation = 'logic_binary',
    NumericCompare = 'numericCompare',
    StringCompare = 'stringCompare',
    ConstantBoolean = 'constant_boolean',
    FunctionCallBoolean = 'function_call_boolean',
}
