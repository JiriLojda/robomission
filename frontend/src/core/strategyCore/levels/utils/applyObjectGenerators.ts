import {addObjectOnPosition, World} from "../../models/world";
import {WorldObjectGenerator} from "../../battleRunner/IGameLevel";
import {List} from "immutable";

export const applyObjectGenerators = (world: World, generators: List<WorldObjectGenerator>): World =>
    generators
        .reduce(applyGenerator, world);

const applyGenerator = (world: World, generator: WorldObjectGenerator): World =>
    generator(world)
        .reduce(
            (currentWorld, {position, worldObject}) =>
                addObjectOnPosition(currentWorld, position.x, position.y, worldObject),
            world
        );
