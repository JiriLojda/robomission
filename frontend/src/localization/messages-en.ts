/* eslint-disable quote-props */
import {allEnHelpMessages} from "./helpMessages-en";
import {HelpTranslationKey} from "./helpTranslationKey";

const messages: {[index: string]: string} = {
  'Close': 'Close',
  'I understand': 'I understand',
  'Intro': 'Intro',
  'Run': 'Run',
  'Speed': 'Speed',
  'Task': 'Task',
  'Tasks': 'Tasks Overview',
  'Task Editor': 'Task Editor',
  'Practice': 'Practice',
  'Previous': 'Previous',
  'Feedback': 'Feedback',
  'Help': 'Help',
  'ALG': 'Adaptive Learning group',
  'FI-MU': 'Faculty of Informatics MU',
  'For hackers': 'For hackers',
  'New instructions': 'New instructions',
  'All instructions': 'All instructions',
  'Mission completed': 'Mission completed.',
  'New mission': 'New mission',

  'easy-task-challenge': 'And now something easier. Will you solve it within 1 minute?',
  'excellent-task-solved': 'Excellent! Task solved.',

  'not tackled': 'not tackled',
  'recommended': 'recommended',
  'relative': 'relative',

  'intro.learn-programming': 'Learn programming!',
  'intro.explore-universe': 'Explore mysterious universe',
  'intro.collect-diamonds': 'and collect all diamonds',
  'intro.learn-program-spaceship': 'Learn to program a spaceship',
  'intro.using-computer-programs': 'using computer programs',
  'intro.game-driven-by-ai': 'The game is driven by artificial intelligence',
  'intro.adapting-to-your-skills': 'and adapts to your skills',
  'intro.developed-by-alg': 'The app is developed by Adaptive Learning group',
  'intro.at-fi-mu': 'at Faculty of Informatics, Masaryk University.',
  'intro.fly-into-space': 'Fly into the space!',

  'task.2diamonds-2meteorids': '2 Diamonds, 2 Meteoroids',
  'task.arrow': 'Arrow',
  'task.belgian-flag': 'Belgian Flag',
  'task.beware-of-asteroid': 'Beware of Asteroid',
  'task.big-left-turn': 'Big Left Turn',
  'task.big-right-turn': 'Big Right Turn',
  'task.big-slalom': 'Big Slalom',
  'task.blocked-wormhole': 'Blocked Wormhole',
  'task.bouncing-from-edge': 'Bouncing from Edge',
  'task.chessboard': 'Chessboard',
  'task.clean-your-path': 'Clean Your Path',
  'task.collect-diamonds': 'Collect Diamonds',
  'task.color-navigation': 'Color Navigation',
  'task.color-slalom': 'Color Slalom',
  'task.colorful-flowers': 'Colorful Flowers',
  'task.cross-2': 'Cross 2',
  'task.diagonal-diamonds': 'Diagonal Diamonds',
  'task.diagonal-lines': 'Diagonal Lines',
  'task.diamond-cross': 'Diamond Cross',
  'task.diamond-in-house': 'Diamond in House',
  'task.diamond-lines': 'Diamond Lines',
  'task.diamond-on-right': 'Diamond on Right',
  'task.diamond-path': 'Diamond Path',
  'task.diamond-ring': 'Diamond Ring',
  'task.diamonds-in-meteoroid-cloud': 'Diamonds in Meteoroid Cloud',
  'task.diamonds-on-yellow': 'Diamonds on Yellow',
  'task.diamonds-with-signals': 'Diamonds with Signals',
  'task.direct-flight-ahead': 'Direct Flight Ahead',
  'task.direction-change': 'Direction Change',
  'task.dont-forget-shot': 'Don\'t Forget to Shot',
  'task.double-bend': 'Double Bend',
  'task.double-track': 'Double Track',
  'task.edge-to-edge': 'Edge to Edge',
  'task.edge-wormholes': 'Edge Wormholes',
  'task.find-the-path': 'Find the Path',
  'task.five-diamonds': 'Five Diamonds',
  'task.follow-colors': 'Follow Colors',
  'task.four-vs': 'Four V\'s',
  'task.free-column': 'Free Column',
  'task.ladder': 'Ladder',
  'task.last-shot': 'Last Shot',
  'task.letter-d': 'Letter D',
  'task.letter-e': 'Letter E',
  'task.letter-h': 'Letter H',
  'task.maneuvers-on-left': 'Maneuvers on Left',
  'task.meteoroids-and-wormholes': 'Meteoroids and Wormholes',
  'task.meteoroids-on-left': 'Meteoroids on Left',
  'task.mirror': 'Mirror',
  'task.n': 'Letter N',
  'task.nameless-task': 'Nameless Task',
  'task.narrow-passage': 'Narrow Passage',
  'task.on-yellow-to-left': 'On Yellow to Left',
  'task.one-step-forward': 'One Step Forward',
  'task.plan-your-shooting': 'Plan Your Shooting',
  'task.plus': 'Plus',
  'task.rectangle': 'Rectangle',
  'task.red-shooting': 'Red Shooting',
  'task.shooting': 'Shooting',
  'task.shot': 'Shot',
  'task.six-diamonds': 'Six Diamonds',
  'task.slalom-position-testing': 'Positional Slalom',
  'task.stairs': 'Stairs',
  'task.steal-the-nose': 'Steal the Nose',
  'task.stop-on-red': 'Stop on Red',
  'task.stripes': 'Stripes',
  'task.surrounded-diamond': 'Surrounded Diamond',
  'task.three-steps-forward': 'Three Steps Forward',
  'task.triangle': 'Triangle',
  'task.triple-slalom': 'Triple Slalom',
  'task.triple-steps': 'Triple Steps',
  'task.tunnel': 'Tunnel',
  'task.turning-in-square': 'Turning in Square',
  'task.turning-left': 'Turning Left',
  'task.turning-left-and-right': 'Turning Left and Right',
  'task.turning-right': 'Turning right',
  'task.turning-right-and-left': 'Turning Right and Left',
  'task.two-bit-instructions': 'Two-Bit Instructions',
  'task.two-color-tracks': 'Two-Color Tracks',
  'task.two-diamonds': 'Two Diamonds',
  'task.two-steps-forward': 'Two Steps Forward',
  'task.wave': 'Wave',
  'task.wormhole-cloud': 'Wormhole Cloud',
  'task.wormhole-demo': 'Wormhole Demo',
  'task.yellow-hint': 'Yellow Hint',
  'task.yellow-is-not-red': 'Yellow Is Not Red',
  'task.yellow-squares': 'Yellow Squares',
  'task.zig-zag': 'Zig-Zag',
  'task.zig-zag-plus': 'Zig-Zag Plus',

  'blockly.start': 'start',
  'blockly.fly': 'fly',
  'blockly.turn': 'turn',
  'blockly.ahead': 'ahead',
  'blockly.left': 'left',
  'blockly.right': 'right',
  'blockly.shoot': 'shoot',
  'blockly.color': 'color',
  'blockly.position': 'position',
  'blockly.while': 'while',
  'blockly.repeat': 'repeat',
  'blockly.if': 'if',
  'blockly.else': 'else',
  'blockly.green': 'green',
  'blockly.blue': 'blue',
  'blockly.red': 'red',
  'blockly.yellow': 'yellow',
  'blockly.black': 'black',
  'blockly.tile': 'tile on',
  'blockly.contains': 'contains',
  'blockly.notContains': 'not contains',
  'blockly.pickUpDiamond': 'pick up diamond',
  'blockly.isAccessible': 'is accessible',
  'blockly.set': 'set',
  'blockly.to': 'to',
  'blockly.get': 'get',
  'blockly.string': 'string',
  'blockly.number': 'number',
  'blockly.boolean': 'boolean',
  'blockly.as': 'as a',
  'blockly.not': 'not',
  'blockly.function': 'function',
  'blockly.parameter': 'parameter',
  'blockly.parameters': 'parameters',
  'blockly.value': 'value',
  'blockly.next': 'next',
  'blockly.call': 'call',
  'blockly.void': 'without return value',
  'blockly.return': 'return',
  'blockly.getDirectionOfShip': 'get direction of ship',
  'blockly.of': 'of',
  'blockly.getCoordinate': 'get coordinate',
  'blockly.toShip': 'to ship',
  'blockly.getPositionOfShip': 'get position of ship',

  'blockly.categories.commands': 'commands',
  'blockly.categories.variables': 'variables',
  'blockly.categories.cycles': 'cycles',
  'blockly.categories.values': 'values',
  'blockly.categories.constants': 'constants',
  'blockly.categories.conditions': 'conditions',
  'blockly.categories.branching': 'branching',
  'blockly.categories.logic': 'logic',
  'blockly.categories.functions': 'functions',

  'object.ship': 'ship',
  'object.diamond': 'diamond',
  'object.meteoroid': 'meteoroid',
  'object.asteroid': 'asteroid',
  'object.wormhole': 'wormhole',
  'object.endOfMap': 'the end of map',

  'editor.runBattle': 'run battle',
  'editor.showMap': 'show map',
  'editor.showHelp': 'show help',
  'editor.submitCode': 'submit code',
  'editor.useCodeEditor': 'use code editor',
  'editor.backToEditor': 'back to the editor',

  'ps.story.commands': 'Spaceship Control',
  'ps.story.commands-2': 'Shooting and Wormholes',
  'ps.story.repeat': 'Repeat N-times',
  'ps.story.while': 'While-Do',
  'ps.story.loops': 'Looping Challenge',
  'ps.story.if': 'Color Decisions',
  'ps.story.comparing': 'Position Decisions',
  'ps.story.if-else': 'Complete Decisions',
  'ps.story.loops-if': 'Final Challenge',

  'ps.commands': 'Basic Commands',
  'ps.commands-2': 'Advanced Commands',
  'ps.repeat': 'Loop with Number of Iterations',
  'ps.while': 'Loop with Condition',
  'ps.loops': 'Practicing Loops',
  'ps.if': 'Conditional Statement',
  'ps.comparing': 'Comparing',
  'ps.if-else': 'If-Else',
  'ps.loops-if': 'Loops and Conditional Statements',

  'category.moves': 'Elementary Moves',
  'category.world': 'Mysterious Universe',
  'category.repeat': 'Repeat N-times',
  'category.while': 'While Loops',
  'category.loops': 'Tricky Loops',
  'category.if': 'Conditional Commands',
  'category.comparing': 'Comparing',
  'category.if-else': 'If-Else',
  'category.final-challenge': 'Final Challenge',

  'feedback.title': 'Feedback',
  'feedback.question': 'Have you found a bug in the app? Do you have an idea for improvement?',
  'feedback.email': 'E-mail',
  'feedback.submit': 'Submit',
  'feedback.thanks': 'Thank you for the feedback!',

  'fail-reason.crashed-last-row': 'The spaceship must stop in the final row.',
  'fail-reason.crashed-edge': 'The spaceship crashed on the edge of the spaceroad.',
  'fail-reason.crashed-meteoroid': 'The spaceship crashed into a meteoroid.',
  'fail-reason.crashed-asteoroid': 'The spaceship crashed into an asteroid.',
  'fail-reason.last-row-not-reached': 'The spaceship must reach the final row.',
  'fail-reason.missing-diamonds': 'The spaceship must collect all diamonds.',


  'instruction.env-recommended-task-button':
    'Blue buttons with a triangle show a recommended task.',
  'instruction.env-menu':
    'Open a menu by clicking this button.',
  'instruction.env-levelbar':
    'You earn credits for each solved  task. ' +
    'When you have enough credits, you progress to the next level.',
  'instruction.env-help':
    'You can display all hints by clicking this question mark. ' +
    'When a new, unread hints are prepared, then the question is orange.',
  'instruction.env-feedback':
    'If something doesn\'t work as expected, let us know.',
  'instruction.env-login':
    'To save your progress, you need to login. ' +
    'You can also use a Google or Facebook account if you have one.',

  'instruction.task-space-world':
    'Your task is to fly through the space track all the way to the blue line.',
  'instruction.task-toolbox':
    'This is a toolbox with commands for the spaceship. ' +
    'You can use these commands multiple times in your program.',
  'instruction.task-snapping':
    'There you create your program. ' +
    'The spaceship performs the sequence of commands snapped under the start block.',
  'instruction.task-controls':
    'Click this button to run your program. ' +
    'You can run your program as many times as you need, until it\'s correct.',

  'instruction.task-diamond':
    'The spaceship has to collect all diamonds.',
  'instruction.task-asteroid':
    'Asteorid. If the spaceship hits an asteroid, it creashes.',
  'instruction.task-meteoroid':
    'Metoroid. If the spaceship hits a meteoroid, it creashes.',
  'instruction.task-wormhole':
    'If the spaceshipt flies into a wormhole, it appears in the other wormole.',
  'instruction.task-length-limit':
    'This is a program length status. ' +
    'The spaceship has a limited memory, so the program cannot be too long.',
  'instruction.task-diamond-status':
    'This indicator shows how many diamonds the spaceship already collected.',
  'instruction.task-energy-status':
    'This is energy status. Ever shot takes 1 unit of energy.',
  'instruction.task-block-fly':
    'Command to fly 1 step ahead.',
  'instruction.task-block-shoot':
    'Spaceship shoots and then moves 1 step ahead. ' +
    'Small meteoroids in any distance from the spaceship can be destroyed.',
  'instruction.task-block-repeat':
    'Use this block to repeat a sequence of commands N-times.',
  'instruction.task-block-while':
    'Use this block to repeat a sequence of commands while given condition is true.',
  'instruction.task-block-color':
    'Testing color on the field where the spaceship is.',
  'instruction.task-block-position':
    'Test on the column where the spaceship is. ' +
    'Columns are numbered from left to right 1, 2, 3, etc.',
  'instruction.task-block-if':
    'Conditional command to only perform some commands if a given condition is true.',
  'instruction.task-block-if-else':
    'Complete conditional command to perform some commands if a given condition is true, ' +
    'and some other commands if the condition is false.',

  'instruction.editor-setting':
    'In this Editor, you can create your own tasks. ' +
    'If you create a cool task, send it to us.',
  'instruction.editor-space-world':
    'Each field on the grid has a color (k = black, r = red, g = green) ' +
    'and objects (A = asteroid, M = meteoroid, D = diaomond, W = wormhole).',

  'instruction.overview-levels':
    'Tasks are divided into levels by their difficulty. ' +
    'Solved levels are colored blue, unsolved grey.',
  'instruction.overview-difficulty':
    'The number of puzzle pieces represents the difficulty of the task within given level.',
  'instruction.overview-solved-task':
    'Solved tasks are colored blue.',
  'instruction.overview-recommended-task':
    'The recommended task is colored orange.',

  'user.email': 'Email',
  'user.login': 'Login',
  'user.via-facebook': 'Via Facebook',
  'user.via-google': 'Via Google',
  'user.logout': 'Logout',
  'user.delete-history': 'Delete History',
  'user.nickname': 'Nickname',
  'user.password': 'Password',
  'user.signup': 'Sign Up',
  'user.login-failed': 'Incorrect email or password.',
  'user.signup-success': 'You have signed up successfully!',

  'UserProgramError.ShipCannotMove':
    'Your ship cannot move this way.',
  'UserProgramError.VariableDoesNotExist':
    'You tried to get a variable that was not set before.',
  'UserProgramError.VariableIsNotNumerical':
    'You tried to get a non-numerical value as numerical.',
  'UserProgramError.ReferencedPositionIsNotOnMap':
    'You referenced a tile outside the map. Please check your program.',
  'UserProgramError.GotDifferentTypeThanExpected':
    'Some of your statement returned different type than was expected. Please contact the author as this is unexpected.',
  'UserProgramError.ProvidedShipIdDoesNotExist':
    'The shipId you provided to getShipPosition does not exist. Please revisit the statement.',
  'UserProgramError.ProvidedStringIsNotCoordinate':
    'The provided string does not specify any coordinate. You have to put "x" or "y" there.',

  'BattleResult.UserProgramError': 'caused an error:',
  'BattleResult.Win': 'You won!!! Yay',
  'BattleResult.Draw': 'Ups seems we have a draw between',
  'BattleResult.Loose': 'Damn son, you lost. Try it again.',

  'InvalidProgramReason.DefinedAdditionalProp':
    'defined additional property.',
  'InvalidProgramReason.InvalidStatement':
    'some statement is invalid.',
  'InvalidProgramReason.NoOrBadStartStatement':
    'start statement is missing or invalid.',
  'InvalidProgramReason.UnknownStatementType':
    'some statement has an unknown type.',
  'InvalidProgramReason.MissingTestCondition':
    'You have to set condition in each conditional block.',
  'InvalidProgramReason.MissingParameter':
    'One of your statements is missing a parameter.',
  'InvalidProgramReason.UndefinedRequiredProp':
    'One of the statements has some required props undefined.',
  'InvalidProgramReason.InvalidValueType':
    'One of your value statements has type not matching its usage.',
  'InvalidProgramReason.CodeNotParsed':
    'We failed to parse your code. Check the output, please.',
  'InvalidProgramReason.DuplicateFunctionName':
    'Function names has to be unique. Check your functions, please.',
  'InvalidProgramReason.DuplicateFunctionParameters':
    'Function parameter names has to be unique in the function.',
  'InvalidProgramReason.EmptyFunctionName':
    'Function name cannot be empty.',
  'InvalidProgramReason.EmptyParameterName':
    'Parameter name cannot be empty.',
  'InvalidProgramReason.FncCallWithInvalidNumberOfParameters':
    'Some of your function calls have incorrect number of arguments passed.',
  'InvalidProgramReason.UnknownFunctionCalled':
    'You tried to call an unknown function. Define the function first.',
  'InvalidProgramReason.FncShouldReturnAndNoEndingReturn':
    'Some of your functions should return a value and does not have return at the end.',
  'InvalidProgramReason.FncIsCalledWithDifferentReturnTypes':
    'Some of your functions are called with different return types expected each time.',
  'InvalidProgramReason.FncReturnsDifferentTypes':
    'Some of your functions return different types with each return statement.',
  'InvalidProgramReason.FncCallReturnTypeMismatch':
    'Some of your functions return different type the expected by it\'s calls.',
  'InvalidProgramReason.None':
    'No problem here.',

  'InvalidProgramReason.FunctionsCannotBeDefined':
    'usage of functions is prohibited.',
  'InvalidProgramReason.MaximumNumberOfBlocksReached':
    'there is a limit on number of blocks used and you crossed it.',
  'InvalidProgramReason.RestrictedBlockUsed':
    'you cannot use some blocks, yet you used them.',

  'InvalidProgramReason.BadParserMessage': 'Bad parser (contact the author)',
  'InvalidProgramReason.CustomLevelMessage': 'In this level',

  'level.category.introduction': 'Introduction',
  'level.category.distributed': 'Distributed programming introduction',
  'level.category.others': 'Others',
  'level.category.justOthers': 'Just Others',

  'battleType.shoot': 'shoot',
  'battleType.collect': 'collect',
  'battleType.race': 'race',

  'editor.standardWinModalMessageContinued': 'Congratulation, you won. It is time to celebrate with another level. ;)',
  'editor.standardWinModalMessageFinal': 'Great, you just won the final round. Take a look into the menu for another challenge.',

  'winModal.title': 'Congratulation, you won',
  'winModal.nextLevelLink': 'next level',
};

const levelNames: [HelpTranslationKey, string][] = [
    [HelpTranslationKey.EmptyWorldDuel, 'Empty world duel'],
    [HelpTranslationKey.FirstChallenge, 'First Challenge'],
    [HelpTranslationKey.FirstIfs, 'Your first if'],
    [HelpTranslationKey.FirstRepeat, 'Your first repeat'],
    [HelpTranslationKey.FirstWhile, 'Your first while'],
    [HelpTranslationKey.FlyLeftShoot, 'First mission'],
    [HelpTranslationKey.SecondIfs, 'If 2'],
    [HelpTranslationKey.SecondWhile, 'Your second while'],
    [HelpTranslationKey.TurnPickUp, 'Turn around'],
    [HelpTranslationKey.BasicRace, 'Simple race'],
    [HelpTranslationKey.BasicScanKillAll, `Kill 'em all basic`],
    [HelpTranslationKey.NarrowAlleyPass, 'Narrow alley pass'],
    [HelpTranslationKey.StarCollectDiamondsBasic, `Star collect basic`],
    [HelpTranslationKey.StarWithDiamonds, 'Star with diamonds'],
    [HelpTranslationKey.DistributedIntro, 'Your first distributed program'],
];

const registerLevelNames = () => {
  for (const [key, name] of levelNames) {
    messages[`level.${key}.name`] = name;
  }
};

const registerHelpMessages = () => {
  for (const help of allEnHelpMessages) {
    messages[`help.${help[0]}.title`] = help[1].title;
    messages[`help.${help[0]}.message`] = help[1].message;
  }

  return messages;
};

registerLevelNames();
export default registerHelpMessages();
