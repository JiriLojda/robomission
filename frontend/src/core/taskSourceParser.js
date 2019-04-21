import { parse } from './pegTaskSourceParser';
import {parseRoboCode} from './roboCodeParser';
import {parseSpaceWorld} from './spaceWorldDescription';
import {generateMiniRoboCode} from './miniRoboCodeGenerator';

/**
 * Parse task source text (markdown) and returned js object representing the
 * task
 */
export function parseTaskSourceText(sourceText) {
  const chunkedTaskSource = parse(sourceText);
  const { errors } = parseSpaceWorld(chunkedTaskSource.setting.fields);
  if (errors.length > 0) {
    throw errors[0];
  }

  return {
    id: chunkedTaskSource.taskId,
    setting: {
      ...chunkedTaskSource.setting,
      fields: chunkedTaskSource.setting.fields.trim(),  // Store unparsed fields text.
    },
    solution: generateMiniRoboCode(parseRoboCode(chunkedTaskSource.solution)),
  };
}
