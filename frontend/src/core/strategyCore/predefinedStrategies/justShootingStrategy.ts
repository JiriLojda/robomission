import {IRoboAst} from "../models/programTypes";

export const justShootingStrategy: IRoboAst = JSON.parse('[{"head":"start","body":[{"statement":{"head":"while","test":{"head":"constant_boolean","value":"true"},"body":[{"statement":{"head":"shoot"},"location":3}]},"location":2}]}]');
