import {Map} from "immutable";
import {HelpTranslationKey} from "./helpTranslationKey";

const firstChallengeTitle = 'Destroy your opponent';
const firstChallengeMessage = 'Now lets try to defeat an opponent that will fight back a bit. ' +
    'Watch out for there are special rules here. The asteroids cannot be destroyed, but ' +
    'they can be pushed. Meaning upon hitting them you ship will not crush, but push the asteroid. ' +
    'There is only one condition. There has to be a free space behind the asteroid to push it to. ' +
    'Otherwise it cannot be pushed and nothing will happen.';

const firstIfsTitle = 'Collect the diamonds';
const firstifsMessage = 'Now we will try ifs. "if" block will execute its body only if the condition given to it evaluates to true. ' +
'Otherwise the whole is just skipped. The "if-else" block has additional part. This second part (else part) ' +
'will be executed if the condition in the "if" is evaluated to false. ' +
'Now in this mission you will have to collect all the diamonds. Your opponent here will do nothing. ' +
'You are restricted to the maximum of 7 blocks so you better use a cycle. Also shooting is ineffective.';

const firstRepeatTitle = 'Collect the diamonds';
const firstRepeatMessage = 'In this level, we will explore repeat cycle. Repeat does what the name suggests. ' +
    'It repeats the commands in its body given number of times. It is supposed to help you ' +
    'not to repeat yourself. So here you have to collect all the diamonds. while using only 3 blocks. ' +
    'You will need to use condition, from the "conditions" category. Particularly there is a contains/not contains ' +
    'condition. You can choose for what object do you want to check on the position ' +
    'Another parameter is position. You will find position block in the "values" category. ' +
    'The "position" block will determine one specific position regardless the current position of your ship. ' +
    'While the "position relative" block determines which position relatively to the current position ' +
    'of your ship to pick. So if you want to put there position that will always be one tile above your ship, ' +
    'you might want to put there "position relative" with x=0 (meaning the same column) and y=-1 (meaning one ' +
    'line above). It should probably be also noted, that the upper left corner of the map has coordinates of ' +
    '(x=0, y=0) and y grows going down on the map, while x grows going to the right of the map. ';

const firstWhileTitle = 'Collect the diamonds';
const firstWhileMessage = 'Now the "while" cycle. The "while" cycle is quite like the "if" statement. ' +
    'With the exception, that once the body of the cycle is executed, its condition is evaluated once more. ' +
    'If the evaluation results in "true" again, the body is evaluated again.' +
    'The while cycle will keep executing its body while the condition given to it is evaluated to true. ' +
    'While helps you repeat some code for amount of number you do not know upfront. For example: ' +
    'you might want to keep shooting while there is an Asteroid and then fly forward or ' +
    'keep flying while the enemy is not on the same line as your ship and then turn and shoot him. ' +
    'In this level we will keep it simple. Keep flying and picking up diamonds while the position ' +
    'in front of your ship is accessible by you ship. For that you will need to use the is-accessible-condition. ' +
    'And you cannot use repeat block, just so you try out the while ;-)';

const flyLeftShootTitle = 'Destroy your opponent';
const flyLeftShootMessage = 'Welcome to robomission. In this level you will try to make you ship move and shoot. ' +
'Your objective is to destroy the other ship. Your ship is red, while the opponent\'s is blue. ' +
'In this level there are standard rules. You can destroy other objects with you gun. ' +
'Only the first object is destroyed. To destroy more objects in a row, you have to shoot ' +
'multiple times. If you hit other objects or fly out of the map, you ship will be destroyed. ' +
'These are the standard rules. Those can change in other levels. But lets get to your mission. ' +
'You can fly forward using the "fly" command in the commands section. "Right" and "Left" will fly ' +
'diagonally forward to the left or right respectively while maintaining same direction of the ship. ' +
'You can shoot using the "shoot" command.';

const secondIfsTitle = 'Collect the diamonds';
const secondIfsMessage = 'This is similar to the previous level, except here some diamonds are missing. ' +
'Try to collect them all without hitting into anything. ' +
'Again you are limited to 7 blocks, so use them carefully.';

const secondWhileTitle = 'Get on the green tile';
const secondWhileMessage = 'Lets practice the while a bit more. Your goal now is to get to the green tile. ' +
'You opponent will try to shoot you down, but your gun is broken. Your only hope is ' +
'to avoid him. He will stay on the x=0 row and will randomly change columns and try to shoot there. ' +
'Use while to go forward until the tile on [0,0] contains a ship (your enemy). Then go to the right ' +
'to hide from him. Once the there is no ship on [0,0] go back as he is going to shoot in the other column ' +
'now. TIP: use "while" with constant "true" instead of condition to repeat something indefinitely. ' +
'TIP2: once your ship reach the green tile the game is stopped so you can do the algorithm above ' +
'indefinitely without worrying about you ship flying out from the map. ' +
'TIP3: you can use "pick up diamond" command to skip a turn. ' +
'TIP4: while you could fly forward in the second column, you would risk missing the green tile, ' +
'which is only in the first column. So a safer strategy is to move only in the first one and stay ' +
'and wait for the enemy to move in the second.';

const turnPickUpTitle = 'Collect all the diamonds';
const turnPickUpMessage = 'Now lets learn the rest of the commands you can give to your ship. ' +
'In this round you will have to collect more diamonds than your opponent. ' +
'Remember, you cannot win by shooting you opponent. You have to have more diamonds collected. ' +
'He is going to collect only the diamond he stands on, so you have to take the other two to win.' +
'To pick up a diamond use the "pick up diamond" command. You will also have to turn around. ' +
'To turn your ship use the "turn left" or "turn right" command.';

const basicRaceTitle = 'Race to for the win.';
const basicRaceMessage = 'In this level you have to be the fastest rocket and get to one of the colored tiles ' +
'on the other side of the map. Also hitting an object does not result in a crash. ' +
'Upon moving to an occupied tile one of two happens. 1) There is a free tile in the ' +
'direction the ship is moving, then both, hitting object and hit objects move in this direction ' +
'effectively pushing the hit object. 2) The tile in the direction the ship is moving is ' +
'either occupied or out of the map. Then nothing happens, the ship just can\'t move.';

const basicScanKillAllTitle = 'Simple shooting contest';
const basicScanKillAllMessage = 'This is very simple shooting contest. ' +
    'Your only goal here is to shoot the oponent\'s ship.';

const narrowAlleyPassTitle = 'Pass the guard';
const narrowAlleyPassMessage = 'This is a special round. Your goal is to get to one of the green tiles.' +
'The trick is that the opponent will try to stop you. On top of that you ship ' +
'cannot shoot while the opponent can. You just have to slip by unnoticed.';

const starCollectDiamondsBasicTitle = 'Just a test';
const starCollectDiamondsBasicMessage = 'This level is just testing game type. Should not be published unless remade.';

const starWithDiamondsTitle = 'Get the diamonds';
const starWithDiamondsMessage = 'Just get most of the diamonds you can. In this round none of the ships can shoot ' +
'and collisions are deadly so be careful. Use accessibility check before flying. ' +
'Hint: check whether the diamond you are flying for is still there.';

const emptyWorldDuelTitle = 'Simple duel level';
const emptyWorldDuelMessage = 'This is a simple duel level. Try to shoot your opponent on an empty map.' +
'Either of you can edit your code through the "edit first/second player code" buttons. ' +
'Once you are satisfied with you code submit it and run the battle.';

export type HelpEntry = { title: string, message: string};
export const allEnHelpMessages: Map<HelpTranslationKey, HelpEntry> = Map([
    [HelpTranslationKey.FirstChallenge, {title: firstChallengeTitle, message: firstChallengeMessage}],
    [HelpTranslationKey.FirstIfs, {title: firstIfsTitle, message: firstifsMessage}],
    [HelpTranslationKey.FirstRepeat, {title: firstRepeatTitle, message: firstRepeatMessage}],
    [HelpTranslationKey.FirstWhile, {title: firstWhileTitle, message: firstWhileMessage}],
    [HelpTranslationKey.FlyLeftShoot, {title: flyLeftShootTitle, message: flyLeftShootMessage}],
    [HelpTranslationKey.SecondIfs, {title: secondIfsTitle, message: secondIfsMessage}],
    [HelpTranslationKey.SecondWhile, {title: secondWhileTitle, message: secondWhileMessage}],
    [HelpTranslationKey.TurnPickUp, {title: turnPickUpTitle, message: turnPickUpMessage}],
    [HelpTranslationKey.BasicRace, {title: basicRaceTitle, message: basicRaceMessage}],
    [HelpTranslationKey.BasicScanKillAll, {title: basicScanKillAllTitle, message: basicScanKillAllMessage}],
    [HelpTranslationKey.NarrowAlleyPass, {title: narrowAlleyPassTitle, message: narrowAlleyPassMessage}],
    [HelpTranslationKey.StarCollectDiamondsBasic, {title: starCollectDiamondsBasicTitle, message: starCollectDiamondsBasicMessage}],
    [HelpTranslationKey.StarWithDiamonds, {title: starWithDiamondsTitle, message: starWithDiamondsMessage}],
    [HelpTranslationKey.EmptyWorldDuel, {title: emptyWorldDuelTitle, message: emptyWorldDuelMessage}],
]);
