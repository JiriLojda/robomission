export const emptyRuntimeContext = {
    position: [{index: 0, elseBranchEntered: false, repeatCount: undefined}],
    variables: [],
    systemVariables: [],
};

const scopeStatements = ['while', 'repeat', 'if', 'else'];

const getLast = (array) => {
    if (array.length === 0) {
        throw new Error('Cannot get the last element, given array is empty.');
    }

    return array[array.length - 1];
};

const getStatement = (roboAst, context) => {
    const position = context.position;
    let statement = roboAst;
    let index = 0;

    while (statement.head === 'start' || (scopeStatements.includes(statement.head) && index < position.length)) {
        statement = statement.body[position[index].index].statement;
        index++;
        if (statement.head === 'if' && position.length > index && position[index].elseBranchEntered) {
            statement = statement.orelse.statement;
        }
    }

    return statement;
};

const getPositionItem = (index, elseBranchEntered = false, repeatCount = undefined) => ({index, elseBranchEntered, repeatCount});

const incrementPositionItem = (item) => ({...item, index: item.index + 1});

const getStatementsForPosition = (roboAst, context) => {
    const result = [roboAst];
    let statement = roboAst;

    for (const positionItem of context.position) {
        if (statement.head === 'if' && positionItem.elseBranchEntered) {
            statement = statement.orelse.statement;
            result.pop();
            result.push(statement);
        }
        statement = statement.body[positionItem.index].statement;
        result.push(statement);
    }

    return result;
};

const equalComparator = '==';
const nonEqualComparator = '!=';
const biggerComparator = '>';
const biggerOrEqualComparator = '>=';
const smallerComparator = '<';
const smallerOrEqualComparator = '<=';

const getShipPosition = (state, shipIdentifier) => {
    for (const line of state) {
        for (const tile of line) {
            if (tile[1].indexOf(shipIdentifier) >= 0) {
                return [state.indexOf(line), line.indexOf(tile)];
            }
        }
    }
    return undefined;
};

const getComparedObject = (condition, state, shipPosition) => {
    if (condition.head === 'color') {
        const tile = state[shipPosition[0]][shipPosition[1]];
        return tile[0];
    }
    if (condition.head === 'position') {
        return shipPosition[1] + 1;
    }
};

const evaluateCondition = (condition, state, shipIdentifier) => {
    const shipPosition = getShipPosition(state, shipIdentifier);

    switch (condition.comparator) {
        case equalComparator:
            return condition.value === getComparedObject(condition, state, shipPosition);
        case nonEqualComparator:
            return condition.value !== getComparedObject(condition, state, shipPosition);
        case biggerComparator:
            return condition.value < getComparedObject(condition, state, shipPosition);
        case biggerOrEqualComparator:
            return condition.value <= getComparedObject(condition, state, shipPosition);
        case smallerComparator:
            return condition.value > getComparedObject(condition, state, shipPosition);
        case smallerOrEqualComparator:
            return condition.value >= getComparedObject(condition, state, shipPosition);
        default:
            throw new Error(`Unknown comparator: '${condition.comparator}'`);
    }
};

const doesBlockEnd = (statement, index) => statement.body.length <= index;

const isScopeStatement = (statement) => scopeStatements.indexOf(statement.head) > -1;

const shouldReevaluateScopeStatement = (statement) => ['while', 'repeat'].indexOf(statement.head) > -1;

const getNextPosition = (roboAst, state, shipIdentifier, context) => {
    const statements = getStatementsForPosition(roboAst, context);
    let currentStatementIndex = statements.length - 1;
    const result = context.position.slice(0);
    while (currentStatementIndex > 0) {
        if (isScopeStatement(statements[currentStatementIndex])) {
            const shouldEnterNextBlockVar = getSystemVariable(context, shouldEnterNextBlockVariableName);

            if (shouldEnterNextBlockVar === undefined) {
                throw new Error(`Variable '${shouldEnterNextBlockVariableName}' is not set when on block statement.`);
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

const getSystemVariable = (context, variableName) => {
    return context.systemVariables.find(variable => variable.name === variableName);
};

const setSystemVariable = (context, variableName, variableValue) => {
    const existing = getSystemVariable(context, variableName);
    if (!existing) {
        context.systemVariables.push({name: variableName, value: variableValue});
    } else {
        existing.value = variableValue;
    }
};

const deepCopy = (obj) => JSON.parse(JSON.stringify(obj));
const shouldEnterNextBlockVariableName = 'shouldEnterNextBlock';

const evaluateBlockCondition = (statement, context, state, shipIdentifier) => {
    switch (statement.head) {
        case 'if':
        case 'while':
            setSystemVariable(context, shouldEnterNextBlockVariableName, evaluateCondition(statement.test, state, shipIdentifier));
            return;
        case 'repeat':
            const position = getLast(context.position);
            if (statement.count <= 0 || position.repeatCount <= 0) {
                setSystemVariable(context, shouldEnterNextBlockVariableName, false);
                position.repeatCount = undefined;
                return;
            }
            position.repeatCount--;
            setSystemVariable(context, shouldEnterNextBlockVariableName, true);
            return;
    }
};

const setPositionAttributes = (statement, position) => {
    if (statement.head === 'repeat' && position.repeatCount === undefined) {
        position.repeatCount = statement.count;
    }
};

export const doNextStep = (roboAst, state, shipIdentifier, context = undefined) => {
    if (context.position.length === 0) {
        console.log('Empty runtime context, reset before another run.');
        return context;
    }
    context = deepCopy(context);
    const statement = getStatement(roboAst, context);
    console.log(statement);

    setPositionAttributes(statement, getLast(context.position));
    evaluateBlockCondition(statement, context, state, shipIdentifier);

    context.position = getNextPosition(roboAst, state, shipIdentifier, context);
    console.log('new position:');
    console.log(context.position);

    return context;
};
