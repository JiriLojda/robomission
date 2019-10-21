import {parse, SyntaxError} from './strategyCodeParserCached';
import {getOriginalRoboCodeLocation, preprocessRoboCodeForParser} from "../../../roboCodeParser";
import {IRoboAst} from "../../models/programTypes";

type ParseResult = {
    readonly isSuccessful: true;
    readonly result: IRoboAst;
} | {
    readonly isSuccessful: false;
    readonly error: string;
}

export function parseStrategyRoboCode(code: string): ParseResult {
    const normalizedCode = preprocessRoboCodeForParser(code);
    try {
        const result = parse(normalizedCode) as any;

        return {
            isSuccessful: true,
            result,
        };
    } catch (error) {
        if (error instanceof SyntaxError) {
            const { message, location, expected, found } = error;
            const { line, column } = getOriginalRoboCodeLocation(location.start, normalizedCode);
            let problem = message;
            let position = `line ${line}, column ${column}`;
            if (expected.some((exp: any) => exp.text === '>' || exp.text === '<')
                || (found === '>' || found === '<')) {
                problem = 'Bad indentation';
                position = `line ${line}`;
            }
            const report = `Syntax Error: ${problem} (${position})`;
            return {
                isSuccessful: false,
                error: report,
            };
        } else {
            throw error;
        }
    }
}
