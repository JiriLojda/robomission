import {StatementType} from "./enums/statementType";
import {Comparator} from "./enums/comparator";
import {ConditionType} from "./enums/conditionType";
import {TileColor} from "./enums/tileColor";
import {SystemVariableName} from "./enums/systemVariableName";
import {getShip, getShipPosition, moveShip} from "./utils/worldModelUtils";
import {MovingDirection} from "./enums/movingDirection";
import {updateShipInWorld, World} from "./models/world";
import {Position} from "./models/position";

const defaultMinorActionsCount = 100;

export const emptyRuntimeContext: IRuntimeContext = {
    position: [{index: 0, elseBranchEntered: false, repeatCount: undefined}],
    variables: [],
    systemVariables: [],
    wasActionExecuted: false,
    minorActionsLeft: defaultMinorActionsCount,
};

interface IPositionItem {
    index: number;
    elseBranchEntered: boolean;
    repeatCount?: number;
}

type Variable = {name: string; value: unknown};
type SystemVariable = {name: SystemVariableName, value: unknown};

interface IRuntimeContext {
    position: IPositionItem[]
    variables: Variable[];
    systemVariables: SystemVariable[];
    wasActionExecuted: boolean;
    minorActionsLeft: number;
}

interface ICondition {
    head: ConditionType;
    comparator: Comparator;
    value: TileColor | number;
}

interface IColorCondition extends ICondition {
    head: ConditionType.Color;
    comparator: Comparator.Equal | Comparator.NonEqual;
    value: TileColor;
}

interface IPositionCondition extends ICondition {
    head: ConditionType.Position;
    value: number;
}

type Condition = IColorCondition | IPositionCondition;

interface IBlock {
    location: {blockId: string};
    statement: IStatement;
}

interface IStatement {
    head: StatementType;
    body?: IBlock[];
    orElse?: IBlock;
    test?: Condition;
    count?: number;
}

interface IRoboAst extends IStatement{
    head: StatementType.Start;
    body: IBlock[];
}

const scopeStatements = [
    StatementType.While,
    StatementType.Repeat,
    StatementType.If,
    StatementType.Else,
];

const getLast = <T>(array: T[]): T => {
    if (array.length === 0) {
        throw new Error('Cannot get the last element, given array is empty.');
    }

    return array[array.length - 1];
};

const getStatement = (roboAst: any, context: IRuntimeContext) => {
    const position = context.position;
    let statement = roboAst;
    let index = 0;

    while (statement.head === StatementType.Start || (scopeStatements.includes(statement.head) && index < position.length)) {
        statement = statement.body[position[index].index].statement;
        index++;
        if (statement.head === StatementType.If && position.length > index && position[index].elseBranchEntered) {
            statement = statement.orelse.statement;
        }
    }

    return statement;
};

const getPositionItem = (index: number, elseBranchEntered = false, repeatCount = undefined) => ({index, elseBranchEntered, repeatCount});

const incrementPositionItem = (item: IPositionItem) => ({...item, index: item.index + 1});

const getStatementsForPosition = (roboAst: any, context: IRuntimeContext) => {
    const result = [roboAst];
    let statement = roboAst;

    for (const positionItem of context.position) {
        if (statement.head === StatementType.If && positionItem.elseBranchEntered) {
            statement = statement.orelse.statement;
            result.pop();
            result.push(statement);
        }
        statement = statement.body[positionItem.index].statement;
        result.push(statement);
    }

    return result;
};

const getComparedObject = (condition: Condition, world: World, shipPosition?: Position) => {
    if (!shipPosition) {
        throw new Error("getComparedObject: Cannot evaluate condition when no ship is present.")
    }

    switch (condition.head) {
        case ConditionType.Color:
            const tile = world.surface.get(shipPosition.y)!.get(shipPosition.x);
            return tile || TileColor.Black;
        case ConditionType.Position:
            return shipPosition.x + 1;
        default:
            throw new Error(`Unknown condition type: ${condition!.head}.`);
    }
};

const evaluateCondition = (condition: Condition, world: World, shipId: string) => {
    const shipPosition = getShipPosition(world, shipId);

    switch (condition.comparator) {
        case Comparator.Equal:
            return condition.value === getComparedObject(condition, world, shipPosition);
        case Comparator.NonEqual:
            return condition.value !== getComparedObject(condition, world, shipPosition);
        case Comparator.Bigger:
            return condition.value < getComparedObject(condition, world, shipPosition);
        case Comparator.BiggerOrEqual:
            return condition.value <= getComparedObject(condition, world, shipPosition);
        case Comparator.Smaller:
            return condition.value > getComparedObject(condition, world, shipPosition);
        case Comparator.SmallerOrEqual:
            return condition.value >= getComparedObject(condition, world, shipPosition);
        default:
            throw new Error(`Unknown comparator: '${condition!.comparator}'`);
    }
};

const doesBlockEnd = (statement: IStatement, index: number) => {
    if (!statement.body) {
        throw new Error('Only block statements can have scope that ends, block statements has to have body.');
    }
    return statement.body.length <= index;
};

const isScopeStatement = (statement: IStatement) => scopeStatements.indexOf(statement.head) > -1;

const shouldReevaluateScopeStatement = (statement: IStatement) => ['while', 'repeat'].indexOf(statement.head) > -1;

const getNextPosition = (roboAst: IRoboAst, context: IRuntimeContext) => {
    const statements = getStatementsForPosition(roboAst, context);
    let currentStatementIndex = statements.length - 1;
    const result = context.position.slice(0);
    while (currentStatementIndex > 0) {
        if (isScopeStatement(statements[currentStatementIndex])) {
            const shouldEnterNextBlockVar = getSystemVariable(context, SystemVariableName.ShouldEnterNextBlock);

            if (shouldEnterNextBlockVar === undefined) {
                throw new Error(`Variable '${SystemVariableName.ShouldEnterNextBlock}' is not set when on block statement.`);
            }

            if (shouldEnterNextBlockVar.value && getLast(statements).body.length > 0) {
                result.push(getPositionItem(0));
                return result;
            }

            if (!shouldEnterNextBlockVar.value && statements[currentStatementIndex].orelse && statements[currentStatementIndex].orelse.statement.body.length > 0) {
                result.push(getPositionItem(0, true));
                return result;
            }

            if (doesBlockEnd(statements[currentStatementIndex - 1], getLast(result).index + 1)) {
                result.pop();
                if (!shouldReevaluateScopeStatement(statements[currentStatementIndex - 1])) {
                    currentStatementIndex--;
                    continue;
                }
                return result;
            } else {
                result[result.length - 1] = incrementPositionItem(getLast(result));
                return result;
            }
        }
        if (!isScopeStatement(statements[currentStatementIndex])) {
            if (statements[currentStatementIndex - 1].body.length <= getLast(result).index + 1) {
                result.pop();
                if (!shouldReevaluateScopeStatement(statements[currentStatementIndex - 1])) {
                    currentStatementIndex--;
                    continue;
                }
                return result;
            } else {
                result[result.length - 1] = statements[currentStatementIndex - 1].body.length === getLast(result).index + 1 ?
                    getPositionItem(0) : incrementPositionItem(getLast(result));
                return result;
            }
        }
    }

    return [];
};

const getSystemVariable = (context: IRuntimeContext, variableName: string) => {
    return context.systemVariables.find(variable => variable.name === variableName);
};

const setSystemVariable = (context: IRuntimeContext, variableName: SystemVariableName, variableValue: unknown) => {
    const existing = getSystemVariable(context, variableName);
    if (!existing) {
        context.systemVariables.push({name: variableName, value: variableValue});
    } else {
        existing.value = variableValue;
    }
};

const deepCopy = (obj: unknown) => JSON.parse(JSON.stringify(obj));

const evaluateBlockCondition = (statement: IStatement, context: IRuntimeContext, world: World, shipId: string) => {
    switch (statement.head) {
        case StatementType.If:
        case StatementType.While:
            if (!statement.test) {
                throw new Error(`${statement.head} statement has to have condition.`);
            }
            setSystemVariable(context, SystemVariableName.ShouldEnterNextBlock, evaluateCondition(statement.test, world, shipId));
            return;
        case StatementType.Repeat:
            const position = getLast(context.position);
            if (!statement.count || !position.repeatCount || statement.count <= 0 || position.repeatCount <= 0) {
                setSystemVariable(context, SystemVariableName.ShouldEnterNextBlock, false);
                position.repeatCount = undefined;
                return;
            }
            position.repeatCount--;
            setSystemVariable(context, SystemVariableName.ShouldEnterNextBlock, true);
            return;
    }
};

const setPositionAttributes = (statement: IStatement, position: IPositionItem) => {
    if (statement.head === StatementType.Repeat && position.repeatCount === undefined) {
        position.repeatCount = statement.count;
    }
};

const evaluateActionStatement = (statement: IStatement, world: World, shipId: string): World => {
    const ship = getShip(world, shipId);

    if (!ship) {
        throw new Error(`Cannot find a ship with id '${shipId}'.`)
    }

    switch (statement.head) {
        case StatementType.Fly:
            return updateShipInWorld(world, ship, moveShip(world, ship, MovingDirection.Foward));
        case StatementType.Left:
            return updateShipInWorld(world, ship, moveShip(world, ship, MovingDirection.Left));
        case StatementType.Right:
            return updateShipInWorld(world, ship, moveShip(world, ship, MovingDirection.Right));
        default:
            return world;
    }
};

export const doNextStep = (roboAst: IRoboAst, world: World, shipId: string, context: IRuntimeContext): [IRuntimeContext, World] => {
    if (context.position.length === 0) {
        console.log('Empty runtime context, reset before another run.');
        return [context, world];
    }

    if (context.minorActionsLeft <= 0) {
        console.log('No actions left, let other players play too.');
        return [context, world];
    }
    context = deepCopy(context);

    context.minorActionsLeft--;
    const statement = getStatement(roboAst, context);
    console.log(statement);

    const newWorld = evaluateActionStatement(statement, world, shipId);
    context.wasActionExecuted = newWorld !== world;
    if (context.wasActionExecuted) {
         context.minorActionsLeft = defaultMinorActionsCount;
    }
    setPositionAttributes(statement, getLast(context.position));
    evaluateBlockCondition(statement, context, world, shipId);

    context.position = getNextPosition(roboAst, context);
    console.log('new context:');
    console.log(context);
    console.log("new world");
    console.log(newWorld);

    return [context, newWorld];
};
