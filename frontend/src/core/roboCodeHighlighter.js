/* Custom syntax highlighter for RoboCode setting for brace
 * (which is used by react-ace editor).
 * Expects global ace variable to be present.
 * Based on Python syntax highlighter from brace, just with minor modifications.

 * Usage:
 *   ```
 *   import AceEditor from 'react-ace';
 *   import '../core/roboCodeHighlighter';
 *   ...
 *   <AceEditor mode="robocode" />
 *   ```
 */

/* global ace:false */
/* eslint-disable */

"use strict";

export class RoboCodeHighlightRules extends window.ace.acequire(
    "ace/mode/text_highlight_rules"
).TextHighlightRules{

    keywords = (
        "and|as|assert|break|class|continue|def|del|elif|else|except|exec|" +
        "finally|for|from|global|if|import|in|is|lambda|not|or|pass|print|" +
        "raise|return|try|while|with|yield|repeat"
    );

    builtinConstants = (
        "True|False|None|NotImplemented|Ellipsis|__debug__"
    );

    builtinFunctions = (
        "abs|divmod|input|open|staticmethod|all|enumerate|int|ord|str|any|" +
        "eval|isinstance|pow|sum|basestring|execfile|issubclass|print|super|" +
        "binfile|iter|property|tuple|bool|filter|len|range|type|bytearray|" +
        "float|list|raw_input|unichr|callable|format|locals|reduce|unicode|" +
        "chr|frozenset|long|reload|vars|classmethod|getattr|map|repr|xrange|" +
        "cmp|globals|max|reversed|zip|compile|hasattr|memoryview|round|" +
        "__import__|complex|hash|min|set|apply|delattr|help|next|setattr|" +
        "buffer|dict|hex|object|slice|coerce|dir|id|oct|sorted|intern|" +
        "fly|left|right|shoot|color|position"
    );
    keywordMapper = this.createKeywordMapper({
        "invalid.deprecated": "debugger",
        "support.function": this.builtinFunctions,
        "constant.language": this.builtinConstants,
        "keyword": this.keywords
    }, "identifier");

    strPre = "(?:r|u|ur|R|U|UR|Ur|uR)?";

    decimalInteger = "(?:(?:[1-9]\\d*)|(?:0))";
    octInteger = "(?:0[oO]?[0-7]+)";
    hexInteger = "(?:0[xX][\\dA-Fa-f]+)";
    binInteger = "(?:0[bB][01]+)";
    integer = "(?:" + this.decimalInteger + "|" + this.octInteger + "|" + this.hexInteger + "|" + this.binInteger + ")";

    exponent = "(?:[eE][+-]?\\d+)";
    fraction = "(?:\\.\\d+)";
    intPart = "(?:\\d+)";
    pointFloat = "(?:(?:" + this.intPart + "?" + this.fraction + ")|(?:" + this.intPart + "\\.))";
    exponentFloat = "(?:(?:" + this.pointFloat + "|" +  this.intPart + ")" + this.exponent + ")";
    floatNumber = "(?:" + this.exponentFloat + "|" + this.pointFloat + ")";

    stringEscape =  "\\\\(x[0-9A-Fa-f]{2}|[0-7]{3}|[\\\\abfnrtv'\"]|U[0-9A-Fa-f]{8}|u[0-9A-Fa-f]{4})";

    constructor(props) {
        super(props);

        this.$rules = {
            "start": [{
                token: "comment",
                regex: "#.*$"
            }, {
                token: "string",           // multi line """ string start
                regex: this.strPre + '"{3}',
                next: "qqstring3"
            }, {
                token: "string",           // " string
                regex: this.strPre + '"(?=.)',
                next: "qqstring"
            }, {
                token: "string",           // multi line ''' string start
                regex: this.strPre + "'{3}",
                next: "qstring3"
            }, {
                token: "string",           // ' string
                regex: this.strPre + "'(?=.)",
                next: "qstring"
            }, {
                token: "constant.numeric", // imaginary
                regex: "(?:" + this.floatNumber + "|\\d+)[jJ]\\b"
            }, {
                token: "constant.numeric", // float
                regex: this.floatNumber
            }, {
                token: "constant.numeric", // long integer
                regex: this.integer + "[lL]\\b"
            }, {
                token: "constant.numeric", // integer
                regex: this.integer + "\\b"
            }, {
                token: this.keywordMapper,
                regex: "[a-zA-Z_$][a-zA-Z0-9_$]*\\b"
            }, {
                token: "keyword.operator",
                regex: "\\+|\\-|\\*|\\*\\*|\\/|\\/\\/|%|<<|>>|&|\\||\\^|~|<|>|<=|=>|==|!=|<>|="
            }, {
                token: "paren.lparen",
                regex: "[\\[\\(\\{]"
            }, {
                token: "paren.rparen",
                regex: "[\\]\\)\\}]"
            }, {
                token: "text",
                regex: "\\s+"
            }],
            "qqstring3": [{
                token: "constant.language.escape",
                regex: this.stringEscape
            }, {
                token: "string", // multi line """ string end
                regex: '"{3}',
                next: "start"
            }, {
                defaultToken: "string"
            }],
            "qstring3": [{
                token: "constant.language.escape",
                regex: this.stringEscape
            }, {
                token: "string",  // multi line ''' string end
                regex: "'{3}",
                next: "start"
            }, {
                defaultToken: "string"
            }],
            "qqstring": [{
                token: "constant.language.escape",
                regex: this.stringEscape
            }, {
                token: "string",
                regex: "\\\\$",
                next: "qqstring"
            }, {
                token: "string",
                regex: '"|$',
                next: "start"
            }, {
                defaultToken: "string"
            }],
            "qstring": [{
                token: "constant.language.escape",
                regex: this.stringEscape
            }, {
                token: "string",
                regex: "\\\\$",
                next: "qstring"
            }, {
                token: "string",
                regex: "'|$",
                next: "start"
            }, {
                defaultToken: "string"
            }]
        };
    }
}

export class FoldMode extends window.ace.acequire("ace/mode/folding/fold_mode").FoldMode {
    constructor(markers) {
        super();
        this.foldingStartMarker = new RegExp("([\\[{])(?:\\s*)$|(" + markers + ")(?:\\s*)(?:#.*)?$");

        this.getFoldWidgetRange = function(session, foldStyle, row) {
            var line = session.getLine(row);
            var match = line.match(this.foldingStartMarker);
            if (match) {
                if (match[1])
                    return this.openingBracketBlock(session, match[1], row, match.index);
                if (match[2])
                    return this.indentationBlock(session, row, match.index + match[2].length);
                return this.indentationBlock(session, row);
            }
        }
    }
}

export default class Mode extends window.ace.acequire("ace/mode/text").Mode{
    constructor() {
        super();
        this.HighlightRules = RoboCodeHighlightRules;
        // this.foldingRules = new window.ace.acequire("ace/mode/folding/pythonic").FoldMode("\\:");
        this.$behaviour = this.$defaultBehaviour;

        this.lineCommentStart = "#";

        this.getNextLineIndent = function (state, line, tab) {
            var indent = this.$getIndent(line);

            var tokenizedLine = this.getTokenizer().getLineTokens(line, state);
            var tokens = tokenizedLine.tokens;

            if (tokens.length && tokens[tokens.length - 1].type == "comment") {
                return indent;
            }

            if (state == "start") {
                var match = line.match(/^.*[\{\(\[:]\s*$/);
                if (match) {
                    indent += tab;
                }
            }

            return indent;
        };

        var outdents = {
            "pass": 1,
            "return": 1,
            "raise": 1,
            "break": 1,
            "continue": 1
        };

        this.checkOutdent = function (state, line, input) {
            if (input !== "\r\n" && input !== "\r" && input !== "\n")
                return false;

            var tokens = this.getTokenizer().getLineTokens(line.trim(), state).tokens;

            if (!tokens)
                return false;
            do {
                var last = tokens.pop();
            } while (last && (last.type == "comment" || (last.type == "text" && last.value.match(/^\s+$/))));

            if (!last)
                return false;

            return (last.type == "keyword" && outdents[last.value]);
        };

        this.autoOutdent = function (state, doc, row) {

            row += 1;
            var indent = this.$getIndent(doc.getLine(row));
            var tab = doc.getTabString();
            if (indent.slice(-tab.length) == tab)
                doc.remove(new window.ace.acequire("../range").Range(row, indent.length - tab.length, row, indent.length));
        };

        this.$id = "ace/mode/robocode";
    }
}
