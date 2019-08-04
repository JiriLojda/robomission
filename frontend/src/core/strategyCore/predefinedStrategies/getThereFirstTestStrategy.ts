import {IRoboAst} from "../models/programTypes";

export const getThereFirstTestStrategy: IRoboAst = JSON.parse('{"head":"start","body":[{"statement":{"head":"setVariable","name":"y","value":"4"},"location":{"blockId":"oZT^8jp.OH!eakD!#5~A"}},{"statement":{"head":"while","test":{"head":"numericCompare","leftValue":{"head":"getNumericVariable","name":"y"},"rightValue":{"head":"constant_number","value":"2"},"comparator":"!="},"body":[{"statement":{"head":"if","test":{"head":"logic_binary","leftValue":{"head":"tile","value":"S","position":{"head":"position_value_relative","x":{"head":"constant_number","value":"0"},"y":{"head":"constant_number","value":"-1"}},"comparator":"contains"},"rightValue":{"head":"logic_binary","leftValue":{"head":"tile","value":"S","position":{"head":"position_value_relative","x":{"head":"constant_number","value":"0"},"y":{"head":"constant_number","value":"-2"}},"comparator":"contains"},"rightValue":{"head":"tile","value":"S","position":{"head":"position_value_relative","x":{"head":"constant_number","value":"0"},"y":{"head":"constant_number","value":"-3"}},"comparator":"contains"},"comparator":"or"},"comparator":"or"},"body":[{"statement":{"head":"shoot"},"location":{"blockId":"j3$85%Ky:3qO+Z0}:{:5"}}]},"location":{"blockId":")xYlvuFYzK1f^~K)*q?*"}},{"statement":{"head":"fly"},"location":{"blockId":"%o,nkMYN#UW#;xS+S(jI"}},{"statement":{"head":"setVariableNumeric","name":"y","value":{"head":"number_binary","leftValue":{"head":"getNumericVariable","name":"y"},"rightValue":{"head":"constant_number","value":"1"},"operator":"-"}},"location":{"blockId":"O_fj7byvl8wNvgi2.H02"}}]},"location":{"blockId":":wJBHc-nK66iLBxs)9I*"}},{"statement":{"head":"turn-right"},"location":{"blockId":"Suc.oJ3+#ZIYVb%j.E[B"}},{"statement":{"head":"while","test":{"head":"constant_boolean","value":"true"},"body":[{"statement":{"head":"if","test":{"head":"logic_binary","leftValue":{"head":"tile","value":"S","position":{"head":"position_value_relative","x":{"head":"constant_number","value":"1"},"y":{"head":"constant_number","value":"0"}},"comparator":"contains"},"rightValue":{"head":"logic_binary","leftValue":{"head":"tile","value":"S","position":{"head":"position_value_relative","x":{"head":"constant_number","value":"2"},"y":{"head":"constant_number","value":"0"}},"comparator":"contains"},"rightValue":{"head":"tile","value":"S","position":{"head":"position_value_relative","x":{"head":"constant_number","value":"3"},"y":{"head":"constant_number","value":"0"}},"comparator":"contains"},"comparator":"or"},"comparator":"or"},"body":[{"statement":{"head":"shoot"},"location":{"blockId":"2X:Iq6L[*6~zC4ZixBqf"}}]},"location":{"blockId":"wKd;2349Z*g0Zux#EYCE"}},{"statement":{"head":"fly"},"location":{"blockId":"l]GqW4l2p[^t%;q|L!G9"}}]},"location":{"blockId":"TH@Cn2k|+;f!!p!=$LS{"}}],"location":{"blockId":"*sU+D9QLnozujF[Xb$_l"}}');