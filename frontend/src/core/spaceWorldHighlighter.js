/* Custom syntax highlighter for SpaceWorld setting for brace
 * (which is used by react-ace editor).
 * Expects global ace variable to be present.

 * Usage:
 *   ```
 *   import AceEditor from 'react-ace';
 *   import '../core/spaceWorldHighlighter';
 *   ...
 *   <AceEditor mode="spaceworld" />
 *   ```
 */

/* global ace:false */
/* eslint-disable no-param-reassign */

    const colorTokens = {
      black: 'text',
      gray: 'comment',  // comment also implies italics font-variant
      red: 'constant.character',
      green: 'keyword',
      blue: 'variable',
      cyan: 'string',
      magenta: 'constant.numeric',
      yellow: 'constant.language.boolean',
    };
    export class SpaceWorldHighlightRules extends window.ace.acequire('ace/mode/text_highlight_rules').TextHighlightRules {
        constructor() {
            super();
            this.$rules = {
                start: [
                    {
                        token: colorTokens.black,
                        regex: 'k',
                    }, {
                        token: colorTokens.red,
                        regex: 'r',
                    }, {
                        token: colorTokens.green,
                        regex: 'g',
                    }, {
                        token: colorTokens.blue,
                        regex: 'b',
                    }, {
                        token: colorTokens.cyan,
                        regex: 'c',
                    }, {
                        token: colorTokens.magenta,
                        regex: 'm',
                    }, {
                        token: colorTokens.yellow,
                        regex: 'y',
                    }, {
                        token: colorTokens.black,
                        regex: '(S|D|A|M|W|X|Y|Z)',
                    }, {}, {
                        token: colorTokens.black,
                        regex: '\\|',
                    }, {
                        token: colorTokens.black,
                        regex: '.',
                    },
                ],
            };
        }
    }

    export default class Mode extends window.ace.acequire('ace/mode/text').Mode{
        constructor() {
            super();
            this.HighlightRules = SpaceWorldHighlightRules;
            this.$behaviour = this.$defaultBehaviour;
            this.$id = 'ace/mode/spaceworld';
        }
    }
