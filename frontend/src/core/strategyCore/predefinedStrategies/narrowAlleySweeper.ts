import {IRoboAst} from "../models/programTypes";
/*
Code:
def Start():
    while true:
        if isShipOnLine('0'):
            shoot
        if (isShipOnLine('1') and canAdvance('1')):
            right
        if canAdvance('-1'):
            left

def canAdvance(y):
    return boolean is Tile[~1, ~y] accessible

def isShipOnLine(y):
    x = 1
    while x < 13:
        if Tile[~x, ~y] contains Ship:
            return boolean true
        x = (x + 1)
    return boolean false
 */
export const narrowAlleySweeper: IRoboAst = JSON.parse('[{"head":"start","body":[{"statement":{"head":"while","test":{"head":"constant_boolean","value":"true"},"body":[{"statement":{"head":"if","test":{"head":"function_call_boolean","name":"isShipOnLine","parameters":[{"value":{"head":"constant_string","value":"0"}}]},"body":[{"statement":{"head":"shoot"},"location":4}],"orelse":null},"location":3},{"statement":{"head":"if","test":{"head":"logic_binary","comparator":"and","leftValue":{"head":"function_call_boolean","name":"isShipOnLine","parameters":[{"value":{"head":"constant_string","value":"1"}}]},"rightValue":{"head":"function_call_boolean","name":"canAdvance","parameters":[{"value":{"head":"constant_string","value":"1"}}]}},"body":[{"statement":{"head":"right"},"location":6}],"orelse":null},"location":5},{"statement":{"head":"if","test":{"head":"function_call_boolean","name":"canAdvance","parameters":[{"value":{"head":"constant_string","value":"-1"}}]},"body":[{"statement":{"head":"left"},"location":8}],"orelse":null},"location":7}]},"location":2}]},{"head":"function_definition","name":"canAdvance","body":[{"statement":{"head":"function_return","value":{"head":"tile_accessible","position":{"head":"position_value_relative","x":{"head":"constant_number","value":1},"y":{"head":"getNumericVariable","name":"y"}}}},"location":11}],"parameters":["y"]},{"head":"function_definition","name":"isShipOnLine","body":[{"statement":{"head":"setVariableNumeric","name":"x","value":{"head":"constant_number","value":1}},"location":14},{"statement":{"head":"while","test":{"head":"numericCompare","leftValue":{"head":"getNumericVariable","name":"x"},"rightValue":{"head":"constant_number","value":13},"comparator":"<"},"body":[{"statement":{"head":"if","test":{"head":"tile","position":{"head":"position_value_relative","x":{"head":"getNumericVariable","name":"x"},"y":{"head":"getNumericVariable","name":"y"}},"comparator":"contains","value":"S"},"body":[{"statement":{"head":"function_return","value":{"head":"constant_boolean","value":"true"}},"location":17}],"orelse":null},"location":16},{"statement":{"head":"setVariableNumeric","name":"x","value":{"head":"number_binary","operator":"+","leftValue":{"head":"getNumericVariable","name":"x"},"rightValue":{"head":"constant_number","value":1}}},"location":18}]},"location":15},{"statement":{"head":"function_return","value":{"head":"constant_boolean","value":"false"}},"location":19}],"parameters":["y"]}]');
