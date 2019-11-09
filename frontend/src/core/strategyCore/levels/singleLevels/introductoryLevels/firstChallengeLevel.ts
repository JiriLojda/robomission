import {List, Map} from "immutable";
import {IGameBehaviours} from "../../../gameBehaviours/IGameBehaviours";
import {explosionCollisionResolver} from "../../../gameBehaviours/exposionCollisionResolver";
import {IGameLevel, LevelHelp, RoboAstValidator} from "../../../battleRunner/IGameLevel";
import {allStrategyCategories, categoryNames, filterCategories} from "../../../constants/strategyToolbox";
import {BattleType} from "../../../battleRunner/BattleType";
import {createEmptyAst} from "../../../../../utils/createEmptyAst";
import {noFunctionsValidator} from "../../additionalValidators/noFunctionsValidator";
import {createMaxNumberOfBlocksValidator} from "../../additionalValidators/createMaxNumberOfBlocksValidator";
import {firstChallengeWorld} from "../../worlds/intorductoryLevelsWorlds/firstChallengeWorld";
import {pushCollisionResolver} from "../../../gameBehaviours/pushCollisionResolver";
import {createSelectiveShotResolver} from "../../../gameBehaviours/createSelectiveShotResolver";
import {shipRepresentingObjects} from "../../../enums/worldObjectType";
import {justShootingStrategy} from "../../../predefinedStrategies/justShootingStrategy";

const shipIds = ['playerShip', 'aiShip'] as const;

const behaviours: IGameBehaviours = {
    mapBorderCollisionResolver: explosionCollisionResolver,
    shipCollisionResolver: pushCollisionResolver,
    shotResolver: createSelectiveShotResolver(shipIds, shipRepresentingObjects),
};

const help: LevelHelp = {
    title: 'Destroy your opponent',
    text: 'Now lets try to defeat an opponent that will fight back a bit. ' +
        'Watch out for there are special rules here. The asteroids cannot be destroyed, but ' +
        'they can be pushed. Meaning upon hitting them you ship will not crush, but push the asteroid. ' +
        'There is only one condition. There has to be a free space behind the asteroid to push it to. ' +
        'Otherwise it cannot be pushed and nothing will happen.'
};

const additionalValidators: List<RoboAstValidator> = List([
    noFunctionsValidator,
    createMaxNumberOfBlocksValidator(30),
]);

export const firstChallengeLevel: IGameLevel = {
    name: 'First Challenge',
    urlSlug: 'first-challenge',
    battleType: BattleType.KillAll,
    battleParams: {turnsRan: 0, maxTurns: 100},
    turnsOrder: List(shipIds),
    shipsAsts: Map([[shipIds[1], justShootingStrategy]]),
    world: firstChallengeWorld,
    gameBehaviours: behaviours,
    toolbox: filterCategories(allStrategyCategories, [categoryNames.commands]),
    help,
    additionalValidators,
};

