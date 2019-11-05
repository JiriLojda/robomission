import {IRoboAst} from "../models/programTypes";

/*
def Start():
    goForIt('forward')
    goBack('forward')
    pick_up_diamond
    while true:
        dir = findDir()
        goForIt(dir)
        goBack(dir)


def findDir():
    nextDir = getNextDir(direction of ship 'aiShip')
    while nextDir == 'none':
        turn-right
        nextDir = getNextDir(direction of ship 'aiShip')
    return string nextDir

def getNextDir(heading):
    if heading == 'up':
        return string getFreeUpDownDirection('0')
    if heading == 'down':
        return string getFreeUpDownDirection('14')
    if heading == 'left':
        return string getLeftRightDirection('0')
    return string getLeftRightDirection('14')

def getFreeLeftRightDirection(x):
    if Tile[x,7] contains Diamond:
        return string 'forward'
    if Tile[x,0] contains Diamond:
        if x == 0:
            return string 'right'
        return string 'left'
    if Tile[x, 14] contains Diamond:
        if x == 0:
            return string 'left'
        return string 'right'
    else:
        return string 'none'

def getFreeUpDownDirection(y):
    if Tile[7,y] contains Diamond:
        return string 'forward'
    if Tile[0,y] contains Diamond:
        if y == 0:
            return string 'left'
        else:
            return string 'right'
    if Tile[14, y] contains Diamond:
        if y == 0:
            return string 'right'
        else:
            return string 'left'
    else:
        return string 'none'

def makeStep(dir):
    if dir == 'forward':
        fly
    else:
        if dir == 'right':
            right
        else:
            left

def goForIt(dir):
    while Tile[~0, ~0] not contains Diamond:
        makeStep(dir)
    pick_up_diamond

def turnAround():
    turn-right
    turn-right

def goBack(dir):
    turnAround()
    repeat 7:
        makeStep(dir)
*/
export const starWithDiamondsStrategy: IRoboAst = JSON.parse('[{"head":"start","body":[{"statement":{"head":"function_call_void","name":"goForIt","parameters":[{"value":{"head":"constant_string","value":"forward"}}]},"location":2},{"statement":{"head":"function_call_void","name":"goBack","parameters":[{"value":{"head":"constant_string","value":"forward"}}]},"location":3},{"statement":{"head":"pick_up_diamond"},"location":4},{"statement":{"head":"while","test":{"head":"constant_boolean","value":"true"},"body":[{"statement":{"head":"setVariable","name":"dir","value":{"head":"function_call_string","name":"findDir","parameters":[]}},"location":6},{"statement":{"head":"function_call_void","name":"goForIt","parameters":[{"value":{"head":"getStringVariable","name":"dir"}}]},"location":7},{"statement":{"head":"function_call_void","name":"goBack","parameters":[{"value":{"head":"getStringVariable","name":"dir"}}]},"location":8}]},"location":5}]},{"head":"function_definition","name":"findDir","body":[{"statement":{"head":"setVariable","name":"nextDir","value":{"head":"function_call_string","name":"getNextDir","parameters":[{"value":{"head":"get_direction_of_ship","shipId":{"head":"constant_string","value":"aiShip"}}}]}},"location":12},{"statement":{"head":"while","test":{"head":"stringCompare","leftValue":{"head":"getStringVariable","name":"nextDir"},"rightValue":{"head":"constant_string","value":"none"},"comparator":"=="},"body":[{"statement":{"head":"turn-right"},"location":14},{"statement":{"head":"setVariable","name":"nextDir","value":{"head":"function_call_string","name":"getNextDir","parameters":[{"value":{"head":"get_direction_of_ship","shipId":{"head":"constant_string","value":"aiShip"}}}]}},"location":15}]},"location":13},{"statement":{"head":"function_return","value":{"head":"getStringVariable","name":"nextDir"}},"location":16}],"parameters":[]},{"head":"function_definition","name":"getNextDir","body":[{"statement":{"head":"if","test":{"head":"stringCompare","leftValue":{"head":"getStringVariable","name":"heading"},"rightValue":{"head":"constant_string","value":"up"},"comparator":"=="},"body":[{"statement":{"head":"function_return","value":{"head":"function_call_string","name":"getFreeUpDownDirection","parameters":[{"value":{"head":"constant_string","value":"0"}}]}},"location":20}],"orelse":null},"location":19},{"statement":{"head":"if","test":{"head":"stringCompare","leftValue":{"head":"getStringVariable","name":"heading"},"rightValue":{"head":"constant_string","value":"down"},"comparator":"=="},"body":[{"statement":{"head":"function_return","value":{"head":"function_call_string","name":"getFreeUpDownDirection","parameters":[{"value":{"head":"constant_string","value":"14"}}]}},"location":22}],"orelse":null},"location":21},{"statement":{"head":"if","test":{"head":"stringCompare","leftValue":{"head":"getStringVariable","name":"heading"},"rightValue":{"head":"constant_string","value":"left"},"comparator":"=="},"body":[{"statement":{"head":"function_return","value":{"head":"function_call_string","name":"getLeftRightDirection","parameters":[{"value":{"head":"constant_string","value":"0"}}]}},"location":24}],"orelse":null},"location":23},{"statement":{"head":"function_return","value":{"head":"function_call_string","name":"getLeftRightDirection","parameters":[{"value":{"head":"constant_string","value":"14"}}]}},"location":25}],"parameters":["heading"]},{"head":"function_definition","name":"getFreeLeftRightDirection","body":[{"statement":{"head":"if","test":{"head":"tile","position":{"head":"position_value","x":{"head":"getNumericVariable","name":"x"},"y":{"head":"constant_number","value":7}},"comparator":"contains","value":"D"},"body":[{"statement":{"head":"function_return","value":{"head":"constant_string","value":"forward"}},"location":29}],"orelse":null},"location":28},{"statement":{"head":"if","test":{"head":"tile","position":{"head":"position_value","x":{"head":"getNumericVariable","name":"x"},"y":{"head":"constant_number","value":0}},"comparator":"contains","value":"D"},"body":[{"statement":{"head":"function_return","value":{"head":"constant_string","value":"left"}},"location":31}],"orelse":null},"location":30},{"statement":{"head":"if","test":{"head":"tile","position":{"head":"position_value","x":{"head":"getNumericVariable","name":"x"},"y":{"head":"constant_number","value":14}},"comparator":"contains","value":"D"},"body":[{"statement":{"head":"function_return","value":{"head":"constant_string","value":"right"}},"location":33}],"orelse":{"statement":{"head":"else","body":[{"statement":{"head":"function_return","value":{"head":"constant_string","value":"none"}},"location":35}]},"location":34}},"location":32}],"parameters":["x"]},{"head":"function_definition","name":"getFreeUpDownDirection","body":[{"statement":{"head":"if","test":{"head":"tile","position":{"head":"position_value","x":{"head":"constant_number","value":7},"y":{"head":"getNumericVariable","name":"y"}},"comparator":"contains","value":"D"},"body":[{"statement":{"head":"function_return","value":{"head":"constant_string","value":"forward"}},"location":39}],"orelse":null},"location":38},{"statement":{"head":"if","test":{"head":"tile","position":{"head":"position_value","x":{"head":"constant_number","value":0},"y":{"head":"getNumericVariable","name":"y"}},"comparator":"contains","value":"D"},"body":[{"statement":{"head":"function_return","value":{"head":"constant_string","value":"left"}},"location":41}],"orelse":null},"location":40},{"statement":{"head":"if","test":{"head":"tile","position":{"head":"position_value","x":{"head":"constant_number","value":14},"y":{"head":"getNumericVariable","name":"y"}},"comparator":"contains","value":"D"},"body":[{"statement":{"head":"function_return","value":{"head":"constant_string","value":"right"}},"location":43}],"orelse":{"statement":{"head":"else","body":[{"statement":{"head":"function_return","value":{"head":"constant_string","value":"none"}},"location":45}]},"location":44}},"location":42}],"parameters":["y"]},{"head":"function_definition","name":"makeStep","body":[{"statement":{"head":"if","test":{"head":"stringCompare","leftValue":{"head":"getStringVariable","name":"dir"},"rightValue":{"head":"constant_string","value":"forward"},"comparator":"=="},"body":[{"statement":{"head":"fly"},"location":49}],"orelse":{"statement":{"head":"else","body":[{"statement":{"head":"if","test":{"head":"stringCompare","leftValue":{"head":"getStringVariable","name":"dir"},"rightValue":{"head":"constant_string","value":"right"},"comparator":"=="},"body":[{"statement":{"head":"right"},"location":52}],"orelse":{"statement":{"head":"else","body":[{"statement":{"head":"left"},"location":54}]},"location":53}},"location":51}]},"location":50}},"location":48}],"parameters":["dir"]},{"head":"function_definition","name":"goForIt","body":[{"statement":{"head":"while","test":{"head":"tile","position":{"head":"position_value_relative","x":{"head":"constant_number","value":0},"y":{"head":"constant_number","value":0}},"comparator":"notContains","value":"D"},"body":[{"statement":{"head":"function_call_void","name":"makeStep","parameters":[{"value":{"head":"getStringVariable","name":"dir"}}]},"location":58}]},"location":57},{"statement":{"head":"pick_up_diamond"},"location":59}],"parameters":["dir"]},{"head":"function_definition","name":"turnAround","body":[{"statement":{"head":"turn-right"},"location":62},{"statement":{"head":"turn-right"},"location":63}],"parameters":[]},{"head":"function_definition","name":"goBack","body":[{"statement":{"head":"function_call_void","name":"turnAround","parameters":[]},"location":66},{"statement":{"head":"repeat","count":7,"body":[{"statement":{"head":"function_call_void","name":"makeStep","parameters":[{"value":{"head":"getStringVariable","name":"dir"}}]},"location":68}]},"location":67}],"parameters":["dir"]}]');
