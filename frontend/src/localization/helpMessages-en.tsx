import {Map} from "immutable";
import {HelpTranslationKey} from "./helpTranslationKey";
import React from "react";
import Image from "../components/Image.jsx";

const firstChallengeTitle = 'Destroy your opponent';
const firstChallengeMessage = 'Now lets try to defeat an opponent that will fight back a bit. ' +
    'Watch out for there are special asteroids here. These green asteroids ' +
    'can be pushed. Meaning upon hitting them you ship will not crush, but push the asteroid. ' +
    'There is only one condition. There has to be a free space behind the asteroid to push it to. ' +
    'Otherwise it cannot be pushed and nothing will happen.';

const firstChallengeMessage2 = <span>
    Did you know hitting the green asteroid will not destroy your ship, but push the asteroid? See<br/>
    <Image imageId="help/firstChallenge/pushAsteroid.gif" style={{}} height={246} />
</span>;

const firstIfsTitle = 'Collect the diamonds';
const firstIfsMessage = 'Now we will try ifs. "if" block will execute its body only if the condition given to it evaluates to true. ' +
'Otherwise the whole is just skipped. The "if-else" block has additional part. This second part (else part) ' +
'will be executed if the condition in the "if" is evaluated to false. ' +
'Now in this mission you will have to collect all the diamonds. Your opponent here will do nothing. ' +
'You will need to use condition, from the "conditions" category. Particularly there is a contains/not contains ' +
'condition. You can choose for what object do you want to check on the position ' +
'Another parameter is position. You will find position block in the "values" category. ' +
'The "position" block will determine one specific position regardless the current position of your ship. ' +
'While the "position relative" block determines which position relatively to the current position ' +
'of your ship to pick. So if you want to put there position that will always be one tile above your ship, ' +
'you might want to put there "position relative" with x=0 (meaning the same column) and y=-1 (meaning one ' +
'line above). It should probably be also noted, that the upper left corner of the map has coordinates of ' +
'(x=0, y=0) and y grows going down on the map, while x grows going to the right of the map. ' +
'You are restricted to the maximum of 7 blocks so you better use a cycle. Also shooting is ineffective.';

const firstIfsMessage2 = <span>
    Tip: Some blocks require other blocks to be put into them. Try hovering with one block over the other to
    see whether the block fits there. For example following blocks require condition blocks (that returns
    boolean) <br />
    <Image imageId="help/firstIfs/en_BlocksWithConditions" style={{}} height={371} /> <br/>
    Many conditions also require another blocks (usually some values or constants) to be put in. See<br/>
    <Image imageId="help/firstIfs/en_conditions" style={{}} height={595} /> <br/>
    Bellow you can see an example of a program. The program tells the ship to look one tile above it's
    current position (relative position with x=0 and y=-1) and if there is a diamond fly ahead and pick
    up the diamond. Otherwise go right and take a shot.
    <Image imageId="help/firstIfs/en_ifElseExample" style={{}} height={403} />
</span>;

const firstRepeatTitle = 'Collect the diamonds';
const firstRepeatMessage = 'In this level, we will explore repeat cycle. Repeat does what the name suggests. ' +
    'It repeats the commands in its body given number of times. It is supposed to help you ' +
    'not to repeat yourself. So here you have to collect all the diamonds. while using only 3 blocks.';

const firstRepeatMessage2 = <span>
    Did you know, there can be multiple commands inside a block body? See<br/>
    <Image imageId="help/firstRepeat/en_insideRepeat" style={{}} height={323} />
</span>;

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
'In this level there are standard rules. You can destroy other ships and the small meteoroids with your gun. ' +
'Only the first object is destroyed. To destroy more objects in a row, you have to shoot ' +
'multiple times. The big asteroids cannot be destroyed. If you hit other objects or ' +
'fly out of the map, your ship will be destroyed. ' +
'These are the standard rules. Those can change in other levels. But lets get to your mission. ' +
'You can fly forward using the "fly" command in the commands section. "Right" and "Left" will fly ' +
'diagonally forward to the left or right respectively while maintaining same direction of the ship. ' +
'You can shoot using the "shoot" command.';

const flyLeftShootMessage2 = <span>
    Prepare commands for your ship. You can find all the commands you need for this level in the commands category.<br/>
    <Image imageId="help/flyLeftShoot/en_commandsCategory" style={{margin: '2%'}} height={144} />
    <Image imageId="help/flyLeftShoot/en_clicked" style={{margin: '2%'}} height={321} />
    <Image imageId="help/flyLeftShoot/en_firstBlockAdded" style={{margin: '2%'}} height={127} />
</span>;

const flyLeftShootMessage3 = <span>
    Did you know you can try you program using the "run battle" button?
    <Image imageId="help/flyLeftShoot/en_runBattle" style={{margin: '2%'}} height={127} />
</span>;

const secondIfsTitle = 'Collect the diamonds';
const secondIfsMessage = 'This is similar to the previous level, except here some diamonds are missing. ' +
'Try to collect them all without hitting into anything. ' +
'Again you are limited to 7 blocks, so use them carefully.';

const secondIfsMessage2 = <span>
    Tip: If you want to do something in both branches of an if-else block, you can put the part that is same
    after the if-else. For example the programs bellow do exactly the same. While the second one is one
    block shorter. <br/>
    <Image imageId="help/secondIfs/en_duplicatedIfElse" style={{}} height={412} />
    <Image imageId="help/secondIfs/en_normalizedIfElse" style={{}} height={361} />
</span>;

const secondIfsMessage3 = <span>
    If your ship can be in more than two different situations you want to address in you program.
    You can use multiple "ifs" in a row, but be careful as actions executed in the first "if" may
    affect the result of the condition in the second one.
    <Image imageId="help/secondIfs/en_switch" style={{}} height={526} />
</span>;

const secondWhileTitle = 'Get on the green tile';
const secondWhileMessage = 'Lets practice the while a bit more. Your goal now is to get to the green tile. ' +
'You opponent will try to shoot you down, but your gun is broken. Your only hope is ' +
'to avoid him. He will stay on the x=0 row and will randomly change columns and try to shoot there. ' +
'Use while to go forward until the tile on [0,0] contains a ship (your enemy). Then go to the right ' +
'to hide from him. Once the there is no ship on [0,0] go back as he is going to shoot in the other column ' +
'now. You can use "do nothing" command to wait (skip turn). ' +
'TIP: use "while" with constant "true" instead of condition to repeat something indefinitely. ' +
'TIP2: once your ship reach the green tile the game is stopped so you can do the algorithm above ' +
'indefinitely without worrying about you ship flying out from the map. ' +
'TIP3: while you could fly forward in the second column, you would risk missing the green tile, ' +
'which is only in the first column. So a safer strategy is to move only in the first one and stay ' +
'and wait for the enemy to move in the second.';

const turnPickUpTitle = 'Collect all the diamonds';
const turnPickUpMessage = 'Now lets learn the rest of the commands you can give to your ship. ' +
'In this round you will have to collect more diamonds than your opponent. ' +
'Remember, you cannot win by shooting you opponent. You have to have more diamonds collected. ' +
'He is going to collect only the diamond he stands on, so you have to take the other two to win.' +
'To pick up a diamond use the "pick up diamond" command. You will also have to turn around. ' +
'To turn your ship use the "turn left" or "turn right" command.';

const turnPickUpMessage2 = <span>
    Did you know, you can use the "turn" command to turn your ship and the "pick up diamond" command the pick up
    a diamond? <br/>
    <Image imageId={'help/turnPickup/en_turnPickup'} style={{}} height={603} />
</span>;

const basicRaceTitle = 'Race to for the win.';
const basicRaceMessage = 'In this level you have to be the fastest rocket and get to one of the colored tiles ' +
'on the other side of the map. Also hitting the green asteroids or other ship does not result in a crash. ' +
'Upon hitting one of there objects one of two happens. 1) There is a free tile in the ' +
'direction the ship is moving, then both, hitting object and hit objects move in this direction ' +
'effectively pushing the hit object. 2) The tile in the direction the ship is moving is ' +
'either occupied or out of the map. Then nothing happens, the ship just can\'t move.';

const basicScanKillAllTitle = 'Simple shooting contest';
const basicScanKillAllMessage = 'This is very simple shooting contest. ' +
    'Your only goal here is to shoot the opponent\'s ship.';

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

const distributedIntroTitle = 'Get them there';
const distributedIntroMessage = 'In the following set of levels we will try to create one program for multiple ships ' +
    'and try to accomplish a goal that will require them to cooperate. ' +
    'Now in this particular level you have to get both of the ships to their respective tiles. ' +
    'Red ship to the red tile and green ship to the green tile. The program you create will be executed on both ' +
    'ships simultaneously. So for example if you will have a program with just a shoot command, and run it. ' +
    'Both of you ships will shoot.';

const distributedIntro2Title = 'Get them there again';
const distributedIntro2Message = 'Again, you have to get both ships to their respective tiles. ' +
    'The only difference is that the ships have different paths from each other. ' +
    'That suggests, you will have to use some branching.';

const diamondsCountingTitle = 'Collect 3 diamonds and get back';
const diamondsCountingMessage = 'In this level series we will explore more advanced concepts. ' +
    'Lets start with variables. You can set variable using set variable block or assignment in code like this "x = 0". ' +
    'To read the saved variable use get variable block. You can read a variable either as a string or as a number. ' +
    'Using respective block. In the code you don\'t have to worry about that. Just write the variable name where ' +
    'you want to use it and the code will determine from the context how to read the variable. ' +
    'Your goal in this level is to collect at least 3 diamonds and get back to your starting point with them. ' +
    'The diamonds will randomly generate in front of you, so you will probably have to count the diamonds ' +
    'you have collected so far in some variable so you know whether you can return already. ' +
    'To successfully end this level you have to win 3 times in a row. The battle will run 3 times automatically. ' +
    'Whoever is faster ... wins.';

const labyrinthTitle = 'Go through the invisible labyrinth';
const labyrinthMessage = 'Now you have to get to the green tile. But it is not as easy as it looks. ' +
    'The two ships behind your will be watching you. If you find yourself on a tile you are not ' +
    'supposed to be or be too fast or too slow, they will shoot you. You cannot shoot back. ' +
    'You have to follow their orders. The instructions are following. Start by flying forward 7 tiles. ' +
    'Wait 2 turns for your guards to catch up. Turn left and follow the same path that is 1 step shorter ' +
    'again and again, until you are there.';

const labyrinth2Title = 'Go through a classic labyrinth';
const labyrinth2Message = 'This is a classic labyrinth. Your goal is to get your ship to the green tile. ' +
    'You are limited to 15 blocks. Use them carefully.';

const simonSaysTitle = 'Lets play Simon says';
const simonSaysMessage = 'You will have to follow instruction to get to the green tile. ' +
    'Otherwise you opponent will shoot you, while you cannot shoot, resistance is futile. ' +
    'Carefully watch the other ship. If it faces up, turn you ship up too. If it faces down, turn you ship ' +
    'down too. After you successfully repeat the turn you can move one tile forward. ' +
    'There is one catch though. Every two turn up you have to turn your ship around and every two turns down, ' +
    'you have to turn you ship back and forward again (but back in the other direction).';

const teamShootingTitle = 'Cooperate to kill the enemy';
const teamShootingMessage = 'Now lets try to make both of your ships cooperate together. ' +
    'Your goal is to kill the enemy ship. The problem is it is hiding itself. The enemy will keep shooting so ' +
    'you cannot go in front of him, but there is no other way. Try to figure out how the two of your ships ' +
    'can bring him down.';

const teamShootingMessage2 = 'Did you notice the small green meteorites near the enemy? ' +
    'They can be pushed. While they can be destroyed by a shot, the shot will not destroy anything behind it. ' +
    'Can you use it? ;-)';

const teamShootingMessage3 = 'You can distinguish your ships by their position. Try creating an if ' +
    'block with condition on y coordinate of ships current position (relative position with both x and y equal to 0). ' +
    'If the y coordinate is smaller then 2, the current ship has to be the left one. So anything you put inside ' +
    'the if\'s body will be executed only on the left ship. On top of that anything you put into the else body ' +
    'will be executed only on the other one. This way you can make the ships do different actions.';

export type HelpEntry = { title: string, message: string | JSX.Element};
export const allEnHelpMessages: Map<HelpTranslationKey, HelpEntry> = Map([
    [HelpTranslationKey.FirstChallenge, {title: firstChallengeTitle, message: firstChallengeMessage}],
    [HelpTranslationKey.FirstChallenge2, {title: firstChallengeTitle, message: firstChallengeMessage2}],
    [HelpTranslationKey.FirstIfs, {title: firstIfsTitle, message: firstIfsMessage}],
    [HelpTranslationKey.FirstIfs2, {title: firstIfsTitle, message: firstIfsMessage2}],
    [HelpTranslationKey.FirstRepeat, {title: firstRepeatTitle, message: firstRepeatMessage}],
    [HelpTranslationKey.FirstRepeat2, {title: firstRepeatTitle, message: firstRepeatMessage2}],
    [HelpTranslationKey.FirstWhile, {title: firstWhileTitle, message: firstWhileMessage}],
    [HelpTranslationKey.FlyLeftShoot, {title: flyLeftShootTitle, message: flyLeftShootMessage}],
    [HelpTranslationKey.FlyLeftShoot2, {title: flyLeftShootTitle, message: flyLeftShootMessage2}],
    [HelpTranslationKey.FlyLeftShoot3, {title: flyLeftShootTitle, message: flyLeftShootMessage3}],
    [HelpTranslationKey.SecondIfs, {title: secondIfsTitle, message: secondIfsMessage}],
    [HelpTranslationKey.SecondIfs2, {title: secondIfsTitle, message: secondIfsMessage2}],
    [HelpTranslationKey.SecondIfs3, {title: secondIfsTitle, message: secondIfsMessage3}],
    [HelpTranslationKey.SecondWhile, {title: secondWhileTitle, message: secondWhileMessage}],
    [HelpTranslationKey.TurnPickUp, {title: turnPickUpTitle, message: turnPickUpMessage}],
    [HelpTranslationKey.TurnPickUp2, {title: turnPickUpTitle, message: turnPickUpMessage2}],
    [HelpTranslationKey.BasicRace, {title: basicRaceTitle, message: basicRaceMessage}],
    [HelpTranslationKey.BasicScanKillAll, {title: basicScanKillAllTitle, message: basicScanKillAllMessage}],
    [HelpTranslationKey.NarrowAlleyPass, {title: narrowAlleyPassTitle, message: narrowAlleyPassMessage}],
    [HelpTranslationKey.StarCollectDiamondsBasic, {title: starCollectDiamondsBasicTitle, message: starCollectDiamondsBasicMessage}],
    [HelpTranslationKey.StarWithDiamonds, {title: starWithDiamondsTitle, message: starWithDiamondsMessage}],
    [HelpTranslationKey.EmptyWorldDuel, {title: emptyWorldDuelTitle, message: emptyWorldDuelMessage}],
    [HelpTranslationKey.DistributedIntro, {title: distributedIntroTitle, message: distributedIntroMessage}],
    [HelpTranslationKey.DistributedIntroLevel2, {title: distributedIntro2Title, message: distributedIntro2Message}],
    [HelpTranslationKey.DiamondsCounting, {title: diamondsCountingTitle, message: diamondsCountingMessage}],
    [HelpTranslationKey.Labyrinth, {title: labyrinthTitle, message: labyrinthMessage}],
    [HelpTranslationKey.Labyrinth2Level, {title: labyrinth2Title, message: labyrinth2Message}],
    [HelpTranslationKey.SimonSays, {title: simonSaysTitle, message: simonSaysMessage}],
    [HelpTranslationKey.TeamShooting, {title: teamShootingTitle, message: teamShootingMessage}],
    [HelpTranslationKey.TeamShooting2, {title: teamShootingTitle, message: teamShootingMessage2}],
    [HelpTranslationKey.TeamShooting3, {title: teamShootingTitle, message: teamShootingMessage3}],
]);
