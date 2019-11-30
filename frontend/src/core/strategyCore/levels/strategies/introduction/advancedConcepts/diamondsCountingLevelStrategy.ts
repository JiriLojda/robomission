import {IRoboAst} from "../../../../models/programTypes";

/*
def Start():
    count = 0
    while count < 4:
        fly
        if Tile[~0, ~0] contains Diamond:
            count = (count + 1)
            collect-diamond
    turn-right
    turn-right
    while true:
        fly
* */

export const diamondsCountingStrategy: IRoboAst = JSON.parse(`[{"head":"start","body":[{"statement":{"head":"setVariableNumeric","name":"count","value":{"head":"constant_number","value":0}},"location":2},{"statement":{"head":"while","test":{"head":"numericCompare","leftValue":{"head":"getNumericVariable","name":"count"},"rightValue":{"head":"constant_number","value":4},"comparator":"<"},"body":[{"statement":{"head":"fly"},"location":4},{"statement":{"head":"if","test":{"head":"tile","position":{"head":"position_value_relative","x":{"head":"constant_number","value":0},"y":{"head":"constant_number","value":0}},"comparator":"contains","value":"D"},"body":[{"statement":{"head":"setVariableNumeric","name":"count","value":{"head":"number_binary","operator":"+","leftValue":{"head":"getNumericVariable","name":"count"},"rightValue":{"head":"constant_number","value":1}}},"location":6},{"statement":{"head":"pick_up_diamond"},"location":7}],"orelse":null},"location":5}]},"location":3},{"statement":{"head":"turn-right"},"location":8},{"statement":{"head":"turn-right"},"location":9},{"statement":{"head":"while","test":{"head":"constant_boolean","value":"true"},"body":[{"statement":{"head":"fly"},"location":11}]},"location":10}]}]`);
