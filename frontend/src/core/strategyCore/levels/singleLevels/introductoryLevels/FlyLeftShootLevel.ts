import {List, Map} from "immutable";
import {IGameBehaviours} from "../../../gameBehaviours/IGameBehaviours";
import {explosionCollisionResolver} from "../../../gameBehaviours/exposionCollisionResolver";
import {destroyFirstShotResolver} from "../../../gameBehaviours/destroyFirstShotResolver";
import {IGameLevel, LevelHelp, RoboAstValidator} from "../../../battleRunner/IGameLevel";
import {addShipIdConstants, allStrategyCategories} from "../../../constants/strategyToolbox";
import {BattleType} from "../../../battleRunner/BattleType";
import {createEmptyAst} from "../../../../../utils/createEmptyAst";
import {smallGetOutWorld} from "../../worlds/intorductoryLevelsWorlds/smallGetOutWorld";
import {noFunctionsValidator} from "../../additionalValidators/noFunctionsValidator";
import {createMaxNumberOfBlocksValidator} from "../../additionalValidators/createMaxNumberOfBlocksValidator";

const behaviours: IGameBehaviours = {
    mapBorderCollisionResolver: explosionCollisionResolver,
    shipCollisionResolver: explosionCollisionResolver,
    shotResolver: destroyFirstShotResolver,
};

const shipIds = ['aiShip', 'playerShip'] as const;

const help: LevelHelp = {
    title: 'Destroy your opponent',
    text: 'Welcome to robomission. In this level you will try to make you ship move and shoot. ' +
        'Your objective is to destroy the other ship. Your ship is red, while the opponent\'s is blue. ' +
        'In this level there are standard rules. You can destroy other objects with you gun. ' +
        'Only the first object is destroyed. To destroy more objects in a row, you have to shoot ' +
        'multiple times. If you hit other objects or fly out of the map, you ship will be destroyed. ' +
        'These are the standard rules. Those can change in other levels. But lets get to your mission. ' +
        'You can fly forward using the "fly" command in the commands section. "Right" and "Left" will fly ' +
        'diagonally forward to the left or right respectively while maintaining same direction of the ship. ' +
        'You can shoot using the "shoot" command.'
};

const additionalValidators: List<RoboAstValidator> = List([
    noFunctionsValidator,
    createMaxNumberOfBlocksValidator(4),
]);

export const flyLeftShootLevel: IGameLevel = {
    name: 'First mission',
    urlSlug: 'first-mission',
    battleType: BattleType.KillAll,
    battleParams: {turnsRan: 0, maxTurns: 100},
    turnsOrder: List(shipIds),
    shipsAsts: Map([[shipIds[0], createEmptyAst()]]),
    world: smallGetOutWorld,
    gameBehaviours: behaviours,
    toolbox: addShipIdConstants(allStrategyCategories, shipIds),
    help,
    additionalValidators,
};

