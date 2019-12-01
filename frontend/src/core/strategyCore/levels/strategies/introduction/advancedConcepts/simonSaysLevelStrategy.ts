import {IRoboAst} from "../../../../models/programTypes";
import {standardPlayerShipIds} from "../../../constants/standardShipIds";

/*
def Start():
    playerShipId = 'override'
    rsDone = 0
    lsDone = 0
    while true:
        move = makeMove()
        if move == 'right':
            rsDone = (rsDone + 1)
        else:
            lsDone = (lsDone + 1)
        checkPlayerCorrect(move, rsDone, lsDone, playerShipId)
        do nothing
        if rsDone == 2:
            rsDone = 0
        if lsDone == 2:
            lsDone = 0

def makeMove():
    rnd = 666
    if rnd <= 50:
        turn-right
        return string 'right'
    turn-left
    return string 'left'

def checkPlayerCorrect(move, rightsDone, leftsDone, playerShipId):
    if move == 'right':
        if direction of ship playerShipId != 'up':
            turn-left
            shoot
        else:
            if rightsDone == 2:
                checkTurnAround(playerShipId)
            else:
                turn-left
    else:
        if direction of ship playerShipId != 'down':
            turn-right
            shoot
        else:
            if leftsDone == 2:
                checkTurnBackAndForth(playerShipId)
            else:
                turn-right

def checkTurnBackAndForth(playerShipId):
    turn-right
    if direction of ship playerShipId != 'left':
        shoot
    do nothing
    if direction of ship playerShipId != 'down':
        shoot
    do nothing
    if direction of ship playerShipId != 'right':
        shoot

def checkTurnAround(playerShipId):
    turn-left
    if direction of ship playerShipId != 'left':
        shoot
    do nothing
    if direction of ship playerShipId != 'down':
        shoot
    do nothing
    if direction of ship playerShipId != 'right':
        shoot
* */
export const simonSaysLevelStrategy: IRoboAst = JSON.parse(`[{"head":"start","body":[{"statement":{"head":"setVariable","name":"playerShipId","value":{"head":"constant_string","value":"${standardPlayerShipIds.get(0)}"}},"location":2},{"statement":{"head":"setVariableNumeric","name":"rsDone","value":{"head":"constant_number","value":0}},"location":3},{"statement":{"head":"setVariableNumeric","name":"lsDone","value":{"head":"constant_number","value":0}},"location":4},{"statement":{"head":"while","test":{"head":"constant_boolean","value":"true"},"body":[{"statement":{"head":"setVariable","name":"move","value":{"head":"function_call_string","name":"makeMove","parameters":[]}},"location":6},{"statement":{"head":"if","test":{"head":"stringCompare","leftValue":{"head":"getStringVariable","name":"move"},"rightValue":{"head":"constant_string","value":"right"},"comparator":"=="},"body":[{"statement":{"head":"setVariableNumeric","name":"rsDone","value":{"head":"number_binary","operator":"+","leftValue":{"head":"getNumericVariable","name":"rsDone"},"rightValue":{"head":"constant_number","value":1}}},"location":8}],"orelse":{"statement":{"head":"else","body":[{"statement":{"head":"setVariableNumeric","name":"lsDone","value":{"head":"number_binary","operator":"+","leftValue":{"head":"getNumericVariable","name":"lsDone"},"rightValue":{"head":"constant_number","value":1}}},"location":10}]},"location":9}},"location":7},{"statement":{"head":"function_call_void","name":"checkPlayerCorrect","parameters":[{"value":{"head":"getStringVariable","name":"move"}},{"value":{"head":"getStringVariable","name":"rsDone"}},{"value":{"head":"getStringVariable","name":"lsDone"}},{"value":{"head":"getStringVariable","name":"playerShipId"}}]},"location":11},{"statement":{"head":"noop"},"location":12},{"statement":{"head":"if","test":{"head":"numericCompare","leftValue":{"head":"getNumericVariable","name":"rsDone"},"rightValue":{"head":"constant_number","value":2},"comparator":"=="},"body":[{"statement":{"head":"setVariableNumeric","name":"rsDone","value":{"head":"constant_number","value":0}},"location":14}],"orelse":null},"location":13},{"statement":{"head":"if","test":{"head":"numericCompare","leftValue":{"head":"getNumericVariable","name":"lsDone"},"rightValue":{"head":"constant_number","value":2},"comparator":"=="},"body":[{"statement":{"head":"setVariableNumeric","name":"lsDone","value":{"head":"constant_number","value":0}},"location":16}],"orelse":null},"location":15}]},"location":5}]},{"head":"function_definition","name":"makeMove","body":[{"statement":{"head":"setVariableNumeric","name":"rnd","value":{"head":"random_number"}},"location":19},{"statement":{"head":"if","test":{"head":"numericCompare","leftValue":{"head":"getNumericVariable","name":"rnd"},"rightValue":{"head":"constant_number","value":50},"comparator":"<="},"body":[{"statement":{"head":"turn-right"},"location":21},{"statement":{"head":"function_return","value":{"head":"constant_string","value":"right"}},"location":22}],"orelse":null},"location":20},{"statement":{"head":"turn-left"},"location":23},{"statement":{"head":"function_return","value":{"head":"constant_string","value":"left"}},"location":24}],"parameters":[]},{"head":"function_definition","name":"checkPlayerCorrect","body":[{"statement":{"head":"if","test":{"head":"stringCompare","leftValue":{"head":"getStringVariable","name":"move"},"rightValue":{"head":"constant_string","value":"right"},"comparator":"=="},"body":[{"statement":{"head":"if","test":{"head":"stringCompare","leftValue":{"head":"get_direction_of_ship","shipId":{"head":"getStringVariable","name":"playerShipId"}},"rightValue":{"head":"constant_string","value":"up"},"comparator":"!="},"body":[{"statement":{"head":"turn-left"},"location":29},{"statement":{"head":"shoot"},"location":30}],"orelse":{"statement":{"head":"else","body":[{"statement":{"head":"if","test":{"head":"numericCompare","leftValue":{"head":"getNumericVariable","name":"rightsDone"},"rightValue":{"head":"constant_number","value":2},"comparator":"=="},"body":[{"statement":{"head":"function_call_void","name":"checkTurnAround","parameters":[{"value":{"head":"getStringVariable","name":"playerShipId"}}]},"location":33}],"orelse":{"statement":{"head":"else","body":[{"statement":{"head":"turn-left"},"location":35}]},"location":34}},"location":32}]},"location":31}},"location":28}],"orelse":{"statement":{"head":"else","body":[{"statement":{"head":"if","test":{"head":"stringCompare","leftValue":{"head":"get_direction_of_ship","shipId":{"head":"getStringVariable","name":"playerShipId"}},"rightValue":{"head":"constant_string","value":"down"},"comparator":"!="},"body":[{"statement":{"head":"turn-right"},"location":38},{"statement":{"head":"shoot"},"location":39}],"orelse":{"statement":{"head":"else","body":[{"statement":{"head":"if","test":{"head":"numericCompare","leftValue":{"head":"getNumericVariable","name":"leftsDone"},"rightValue":{"head":"constant_number","value":2},"comparator":"=="},"body":[{"statement":{"head":"function_call_void","name":"checkTurnBackAndForth","parameters":[{"value":{"head":"getStringVariable","name":"playerShipId"}}]},"location":42}],"orelse":{"statement":{"head":"else","body":[{"statement":{"head":"turn-right"},"location":44}]},"location":43}},"location":41}]},"location":40}},"location":37}]},"location":36}},"location":27}],"parameters":["move","rightsDone","leftsDone","playerShipId"]},{"head":"function_definition","name":"checkTurnBackAndForth","body":[{"statement":{"head":"turn-right"},"location":47},{"statement":{"head":"if","test":{"head":"stringCompare","leftValue":{"head":"get_direction_of_ship","shipId":{"head":"getStringVariable","name":"playerShipId"}},"rightValue":{"head":"constant_string","value":"left"},"comparator":"!="},"body":[{"statement":{"head":"shoot"},"location":49}],"orelse":null},"location":48},{"statement":{"head":"noop"},"location":50},{"statement":{"head":"if","test":{"head":"stringCompare","leftValue":{"head":"get_direction_of_ship","shipId":{"head":"getStringVariable","name":"playerShipId"}},"rightValue":{"head":"constant_string","value":"down"},"comparator":"!="},"body":[{"statement":{"head":"shoot"},"location":52}],"orelse":null},"location":51},{"statement":{"head":"noop"},"location":53},{"statement":{"head":"if","test":{"head":"stringCompare","leftValue":{"head":"get_direction_of_ship","shipId":{"head":"getStringVariable","name":"playerShipId"}},"rightValue":{"head":"constant_string","value":"right"},"comparator":"!="},"body":[{"statement":{"head":"shoot"},"location":55}],"orelse":null},"location":54}],"parameters":["playerShipId"]},{"head":"function_definition","name":"checkTurnAround","body":[{"statement":{"head":"turn-left"},"location":58},{"statement":{"head":"if","test":{"head":"stringCompare","leftValue":{"head":"get_direction_of_ship","shipId":{"head":"getStringVariable","name":"playerShipId"}},"rightValue":{"head":"constant_string","value":"left"},"comparator":"!="},"body":[{"statement":{"head":"shoot"},"location":60}],"orelse":null},"location":59},{"statement":{"head":"noop"},"location":61},{"statement":{"head":"if","test":{"head":"stringCompare","leftValue":{"head":"get_direction_of_ship","shipId":{"head":"getStringVariable","name":"playerShipId"}},"rightValue":{"head":"constant_string","value":"down"},"comparator":"!="},"body":[{"statement":{"head":"shoot"},"location":63}],"orelse":null},"location":62},{"statement":{"head":"noop"},"location":64},{"statement":{"head":"if","test":{"head":"stringCompare","leftValue":{"head":"get_direction_of_ship","shipId":{"head":"getStringVariable","name":"playerShipId"}},"rightValue":{"head":"constant_string","value":"right"},"comparator":"!="},"body":[{"statement":{"head":"shoot"},"location":66}],"orelse":null},"location":65}],"parameters":["playerShipId"]}]`);
