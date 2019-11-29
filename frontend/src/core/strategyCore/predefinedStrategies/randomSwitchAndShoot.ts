import {IRoboAst} from "../models/programTypes";

/*
def Start():
    x = '1'
    while true:
        if 5 <= 50:
            if x == '1':
                goRight()
                x = '0'
            else:
                goLeft()
                x = '1'
        shoot

def goRight():
    turn-right
    fly
    turn-left

def goLeft():
    turn-left
    fly
    turn-right

* */
export const randomSwitchAndShootStrategy: IRoboAst = JSON.parse('[{"head":"start","body":[{"statement":{"head":"setVariable","name":"x","value":{"head":"constant_string","value":"1"}},"location":2},{"statement":{"head":"while","test":{"head":"constant_boolean","value":"true"},"body":[{"statement":{"head":"if","test":{"head":"numericCompare","leftValue":{"head":"random_number"},"rightValue":{"head":"constant_number","value":50},"comparator":"<="},"body":[{"statement":{"head":"if","test":{"head":"stringCompare","leftValue":{"head":"getStringVariable","name":"x"},"rightValue":{"head":"constant_string","value":"1"},"comparator":"=="},"body":[{"statement":{"head":"function_call_void","name":"goRight","parameters":[]},"location":6},{"statement":{"head":"setVariable","name":"x","value":{"head":"constant_string","value":"0"}},"location":7}],"orelse":{"statement":{"head":"else","body":[{"statement":{"head":"function_call_void","name":"goLeft","parameters":[]},"location":9},{"statement":{"head":"setVariable","name":"x","value":{"head":"constant_string","value":"1"}},"location":10}]},"location":8}},"location":5}],"orelse":null},"location":4},{"statement":{"head":"shoot"},"location":11}]},"location":3}]},{"head":"function_definition","name":"goRight","body":[{"statement":{"head":"turn-right"},"location":14},{"statement":{"head":"fly"},"location":15},{"statement":{"head":"turn-left"},"location":16}],"parameters":[]},{"head":"function_definition","name":"goLeft","body":[{"statement":{"head":"turn-left"},"location":19},{"statement":{"head":"fly"},"location":20},{"statement":{"head":"turn-right"},"location":21}],"parameters":[]}]');
