/* strategy RoboCode PEG Grammar
 * ====================
 * Assumes preprocessed program with marked line numbers and indentation to
 * avoid context-sensitiveness. For example:
 * ```
 * 1| fly()
 * 2| while color() == 'b':
 * >
 * 3| left()
 * 4| right()
 * <
 * 5| fly()
 * ```
 */

Start
  = body:(Sequence / EmptyProgram)
    { return { head: "start", body: body } }

EmptyProgram
  = EOL { return [] }


/* ----- Statements ----- */

Sequence
  = EmptySequence
  / StatementBlock+

EmptySequence
  = SOL "pass" EOL
    { return [] }

StatementBlock
  = lineNumber:SOL s:Statement EOL
    { return { statement: s, location: lineNumber } }


Statement
  = CompoundStatement
  / SimpleStatement
  / SetStringVariableStatement
  / SetNumericVariableStatement


SimpleStatement
  = action:FunctionCall
    { return { head: action } }


SetStringVariableStatement
  = name:Identifier __ "=" __ value:StringValue
    { return { head: 'setVariable', name: name, value: value } }

SetNumericVariableStatement
  = name:Identifier __ "=" __ value:Number
    { return { head: 'setVariableNumeric', name: name, value: value } }


CompoundStatement
  = IfStatement
  / WhileStatement
  / RepeatStatement


RepeatStatement
  = "repeat" __ n:Integer ":" b:Body
    { return { head: "repeat", count: n, body: b } }


WhileStatement
  = "while" __ t:Test ":" b:Body
    { return { head: "while", test: t, body: b } }


IfStatement
  = "if" __ t:Test ":" b:Body e:OrelseStatementBlock?
    { return { head: "if", test: t, body: b, orelse: e} }


OrelseStatementBlock
  = EOL lineNumber:SOL s:OrelseStatement
    { return { statement: s, location: lineNumber } }


OrelseStatement
  = ElseStatement


ElseStatement
  = "else:" b:Body
    { return { head: "else", body: b } }


Body
  = EOL INDENT s:Sequence DEDENT
    { return s }

/* ----- Conditions ----- */

Test
  = Condition
  / LogicalNot
  / LogicalBinaryOp
  / ConstantBoolean

Condition
  = TileAccessibleTest
  / NumericCompare
  / StringCompare
  / TileContains

LogicalNot
  = "not" __ value:Test
    { return { head: 'logic_not', value: value } }

LogicalBinaryOp
  = "(" _ left:Test __ op:BinLogicOp __ right:Test _ ")"
    { return { head: 'logic_binary', comparator: op, leftValue: left, rightValue: right } }

TileAccessibleTest
  = "isTileAccessible(" _ position:Tile _ ")"
    { return { head: 'tile_accessible', position: position } }

NumericCompare
  = left:Number __ op:RelOp __ right:Number
    { return { head: 'numericCompare', leftValue: left, rightValue: right, comparator: op } }

StringCompare
  = left:String __ op:StringRelOp __ right:String
    { return { head: 'stringCompare', leftValue: left, rightValue: right, comparator: op } }

TileContains
  = "Tile on" __ tile:Tile __ op:ContainsOp __ obj:MapObject
    { return { head: 'tile', position: tile, comparator: op, value: obj } }

Tile
  = TileAbsolute
  / TileRelative

TileAbsolute
  = "Tile[" _ x:Number _ "," _ y:Number _ "]"
    { return { head: 'position_value', x: x, y: y } }

TileRelative
  = "TileRelative[" _ x:Number _ "," _ y:Number _ "]"
    { return { head: 'position_value_relative', x: x, y: y } }

/* ----- Custom values ----- */

ConstantNumber
  = value:Integer
        { return { head: 'constant_number', value: value }; }

NumberBinary
  = "(" _ left:Number __ op:NumberOp __ right:Number _ ")"
    { return { head: 'number_binary', operator: op, leftValue: left, rightValue: right } }

GetNumberVariable
  = "getNumericVariable(" _ name:StringValue _ ")"
    { return { head: 'getNumericVariable', name: name } }

Number
  = ConstantNumber
  / NumberBinary
  / GetNumberVariable

ConstantBoolean
  = value:("true" / "false")
    { return { head: 'constant_boolean', value: value } }

Boolean
  = ConstantBoolean

ConstantString
  = value:StringValue
    { return { head: 'constant_string', value: value } }

GetStringVariable
  = "getStringVariable(" _ name:StringValue _ ")"
    { return { head: 'getStringVariable', name: name } }

String
  = ConstantString
  / GetStringVariable

MapObject
  = Ship / Diamond / Meteoroid / Asteroid / Wormhole / TheEndOfMap

Ship = "Ship" { return 'S' }
Diamond = "Diamond" { return 'D' }
Meteoroid = "Meteoroid" { return 'M' }
Asteroid = "Asteroid" { return 'A' }
Wormhole = "Wormhole" { return 'W' }
TheEndOfMap = "TheEndOfMap" { return 'TheEndOfMap' }

/* ----- Expressions ----- */

FunctionCall
  = functionName:Identifier "()"
    { return functionName; }

BinLogicOp
  = "and" / "or" / "equal" { return "eq" } / "non-equal" { return "nonEq" }

RelOp
  = "==" / ">=" / "<=" / "!=" / ">" / "<"

NumberOp
  = "+" / "-" / "*" / "/" / "^" / "sqrt"

ContainsOp
  = "contains" / "not contains" {return "notContains"}

StringRelOp
  = RelOp / ContainsOp

Value
  = Integer / StringValue

Integer
  = digits:[0-9]+
    { return parseInt(digits.join(""), 10); }

StringValue
  = "'" value:$([^']*) "'"
    { return value; }


// ----- Lexical Grammar -----

Identifier
  = $([a-zA-Z_][a-zA-Z0-9_\-]*)

_ "optional spaces"
  = [ \t]*

__ "mandatory spaces"
  = [ \t]+

INDENT
  = ">" EOL

DEDENT
  = "<"

SOL "start of line"
  = lineNumber:Integer "| "
    { return lineNumber }

EOL "end of line or file"
  = "\r\n"
  / "\n"
  / "\r"
  / !.
