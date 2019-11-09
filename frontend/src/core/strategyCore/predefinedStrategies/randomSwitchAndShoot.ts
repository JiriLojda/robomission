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
        if shouldShoot():
            shoot
        else:
            pick_up_diamond

def goRight():
    turn-right
    fly
    turn-left

def goLeft():
    turn-left
    fly
    turn-right

def shouldShoot():
    return boolean Tile[position of ship 'aiShip'].x == Tile[position of ship 'playerShip'].x
* */
export const randomSwitchAndShootStrategy: IRoboAst = JSON.parse('[{"head":"start","body":[{"statement":{"head":"setVariable","name":"x","value":{"head":"constant_string","value":"1"}},"location":2},{"statement":{"head":"while","test":{"head":"constant_boolean","value":"true"},"body":[{"statement":{"head":"if","test":{"head":"numericCompare","leftValue":{"head":"constant_number","value":5},"rightValue":{"head":"constant_number","value":50},"comparator":"<="},"body":[{"statement":{"head":"if","test":{"head":"stringCompare","leftValue":{"head":"getStringVariable","name":"x"},"rightValue":{"head":"constant_string","value":"1"},"comparator":"=="},"body":[{"statement":{"head":"function_call_void","name":"goRight","parameters":[]},"location":6},{"statement":{"head":"setVariable","name":"x","value":{"head":"constant_string","value":"0"}},"location":7}],"orelse":{"statement":{"head":"else","body":[{"statement":{"head":"function_call_void","name":"goLeft","parameters":[]},"location":9},{"statement":{"head":"setVariable","name":"x","value":{"head":"constant_string","value":"1"}},"location":10}]},"location":8}},"location":5}],"orelse":null},"location":4},{"statement":{"head":"if","test":{"head":"function_call_boolean","name":"shouldShoot","parameters":[]},"body":[{"statement":{"head":"shoot"},"location":12}],"orelse":{"statement":{"head":"else","body":[{"statement":{"head":"pick_up_diamond"},"location":14}]},"location":13}},"location":11}]},"location":3}]},{"head":"function_definition","name":"goRight","body":[{"statement":{"head":"turn-right"},"location":17},{"statement":{"head":"fly"},"location":18},{"statement":{"head":"turn-left"},"location":19}],"parameters":[]},{"head":"function_definition","name":"goLeft","body":[{"statement":{"head":"turn-left"},"location":22},{"statement":{"head":"fly"},"location":23},{"statement":{"head":"turn-right"},"location":24}],"parameters":[]},{"head":"function_definition","name":"shouldShoot","body":[{"statement":{"head":"function_return","value":{"head":"numericCompare","leftValue":{"head":"get_position_coordinate","position":{"head":"get_ship_position","shipId":{"head":"constant_string","value":"aiShip"}},"coordinate":{"head":"constant_string","value":"x"}},"rightValue":{"head":"get_position_coordinate","position":{"head":"get_ship_position","shipId":{"head":"constant_string","value":"playerShip"}},"coordinate":{"head":"constant_string","value":"x"}},"comparator":"=="}},"location":27}],"parameters":[]}]');
