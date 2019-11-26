/* RoboCode PEG Grammar
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

Functions
  = start:Start EOL EmptyLine* tail:FunctionChained*
  	{ return [start, ...tail]; }

FunctionChained
  = fnc:Function EOL EmptyLine*
    { return fnc; }

Function
  = location:SOL "def" __ name:Identifier "(" parameters:FunctionDefParameters ")" ":" body:Body
  	{ return { head: "function_definition", name: name, body, parameters } }

FunctionDefParameters
  = _ head:Identifier? _ tail:FunctionDefParameterChained* {
      var result = head ? [head] : [];
      for (var i = 0; i < tail.length; i++) {
        result.push(tail[i]);
      }
      return result;
    }

FunctionDefParameterChained
  = "," _ name:Identifier _
    { return name }

Start
  = SOL "def Start():" body:Body
    { return { head: "start", body: body } }

EmptyProgram
  = EOL { return [] }


/* ----- Statements ----- */

Sequence
  = EmptySequence
  / NonEmptySequence

NonEmptySequence
  = main:StatementBlock* fncReturn:FunctionReturnBlock?
    { return [...main, ...(fncReturn ? [fncReturn] : [])]; }

EmptySequence
  = SOL "pass" EOL
    { return [] }

StatementBlock
  = lineNumber:SOL s:Statement EOL
    { return { statement: s, location: lineNumber } }

FunctionReturnBlock
  = lineNumber:SOL s:FunctionReturn EOL
    { return { statement: s, location: lineNumber } }

FunctionReturn
  = FunctionReturnNumber
  / FunctionReturnString
  / FunctionReturnBoolean

FunctionReturnNumber
  = "return number " value:Number
    { return { head: "function_return", value }; }

FunctionReturnString
  = "return string " value:String
    { return { head: "function_return", value }; }

FunctionReturnBoolean
  = "return boolean " value:Test
    { return { head: "function_return", value }; }


Statement
  = CompoundStatement
  / ActionStatement
  / SetStringVariableStatement
  / SetNumericVariableStatement
  / FunctionCallVoid


ActionStatement
  = action:ActionStatementType
    {
      if (action == "collect-diamond")
        action = 'pick_up_diamond';
      if (action == 'do nothing')
        action = 'noop';
      return { head: action };
    }

ActionStatementType
  = "fly"/"shoot"/"left"/"right"/"collect-diamond"/"turn-right"/"turn-left"/"do nothing"

SetStringVariableStatement
  = name:Identifier __ "=" __ value:String
    { return { head: 'setVariable', name: name, value: value } }

SetNumericVariableStatement
  = name:Identifier __ "=" __ value:Number
    { return { head: 'setVariableNumeric', name: name, value: value } }

FunctionCallVoid
  = name:Identifier "("parameters:FunctionCallArgs")"
    { return { head: "function_call_void", name, parameters }; }


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
  = TileAccessibleTest
  / ConstantBoolean
  / NumericCompare
  / StringCompare
  / TileContains
  / LogicalNot
  / LogicalBinaryOp
  / FunctionCallBoolean

LogicalNot
  = "not" __ value:Test
    { return { head: 'logic_not', value: value } }

LogicalBinaryOp
  = "(" _ left:Test __ op:BinLogicOp __ right:Test _ ")"
    { return { head: 'logic_binary', comparator: op, leftValue: left, rightValue: right } }

TileAccessibleTest
  = "is" __ position:Tile __ "accessible"
    { return { head: 'tile_accessible', position: position } }

NumericCompare
  = left:Number __ op:RelOp __ right:Number
    { return { head: 'numericCompare', leftValue: left, rightValue: right, comparator: op } }

StringCompare
  = left:String __ op:StringRelOp __ right:String
    { return { head: 'stringCompare', leftValue: left, rightValue: right, comparator: op } }

ConstantBoolean
  = value:("true" / "false")
    { return { head: 'constant_boolean', value: value } }

FunctionCallBoolean
  = name:Identifier "("parameters:FunctionCallArgs")"
    { return { head: "function_call_boolean", name, parameters }; }

TileContains
  = tile:Tile __ op:ContainsOp __ obj:MapObject
    { return { head: 'tile', position: tile, comparator: op, value: obj } }

Tile
  = TileAbsolute
  / TileRelative
  / TileOfShipGetter

TileAbsolute
  = "Tile[" _ x:Number _ "," _ y:Number _ "]"
    { return { head: 'position_value', x: x, y: y } }

TileRelative
  = "Tile[" _ "~" x:Number _ "," _ "~" y:Number _ "]"
    { return { head: 'position_value_relative', x: x, y: y } }

TileOfShipGetter
  = "Tile[" _ "position of ship" __ shipId:String _ "]"
    { return { head: 'get_ship_position', shipId }; }

MapObject
  = Ship / Diamond / Meteoroid / Asteroid / Wormhole / TheEndOfMap

Ship = "Ship" { return 'S' }
Diamond = "Diamond" { return 'D' }
Meteoroid = "Meteoroid" { return 'M' }
Asteroid = "Asteroid" { return 'A' }
Wormhole = "Wormhole" { return 'W' }
TheEndOfMap = "TheEndOfMap" { return 'TheEndOfMap' }

/* ----- Number ----- */

Number
  = ConstantNumber
  / GetCoordinateOfPosition
  / NumberBinary
  / FunctionCallNumber
  / GetNumberVariable

ConstantNumber
  = value:Integer
        { return { head: 'constant_number', value: value }; }

GetCoordinateOfPosition
  = position:Tile "." coordinate:CoordinateProperty
    { return { head: 'get_position_coordinate', position, coordinate }; }

CoordinateProperty
  = DirectCoordinateProperty
  / IndirectCoordinateProperty

DirectCoordinateProperty
  = value:("x" / "y")
    { return { head: 'constant_string', value }; }

IndirectCoordinateProperty
  = "(" _ result:String _ ")"
    { return result; }

NumberBinary
  = "(" _ left:Number __ op:NumberOp __ right:Number _ ")"
    { return { head: 'number_binary', operator: op, leftValue: left, rightValue: right } }

GetNumberVariable
  = name:Identifier
    { return { head: 'getNumericVariable', name: name } }

FunctionCallNumber
  = name:Identifier "("parameters:FunctionCallArgs")"
    { return { head: "function_call_number", name, parameters }; }

/* ----- String ----- */

String
  = ConstantString
  / GetShipId
  / GetShipDirection
  / FunctionCallString
  / GetStringVariable

ConstantString
  = value:StringValue
    { return { head: 'constant_string', value: value } }

GetShipDirection
  = "direction of ship" __ shipId:String
    { return { head: 'get_direction_of_ship', shipId }; }

FunctionCallString
  = name:Identifier "("parameters:FunctionCallArgs")"
    { return { head: "function_call_string", name, parameters }; }

GetStringVariable
  = name:Identifier
    { return { head: 'getStringVariable', name: name } }

GetShipId
  = "this ship id"
    { return { head: 'get_shipId' }; }

/* ----- Function call arguments ----- */

FunctionCallArgs
  = _ value:String? _ tail:FunctionCallArgChained*
    {
      const result = value ? [{ value }] : [];
      for (var i = 0; i < tail.length; i++) {
          result.push(tail[i]);
        }
        return result;
    }

FunctionCallArgChained
  = "," _ value:String _
    { return { value }; }

/* ----- Expressions ----- */

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
  = digits:('-'?[0-9]+)
    {
    	digits[1] = digits[1].join("");
    	return parseInt(digits.join(""), 10);
    }

StringValue
  = "'" value:$([^']*) "'"
    { return value; }


// ----- Lexical Grammar -----

EmptyLine
  = SOL EOL

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
