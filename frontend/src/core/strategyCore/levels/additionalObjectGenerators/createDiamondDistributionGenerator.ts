import {WorldObjectGenerator, WorldObjectPlacement} from "../../battleRunner/IGameLevel";
import {Position} from "../../models/position";
import {List} from "immutable";
import {isPositionInWorld, World} from "../../models/world";
import {invalidProgramError} from "../../utils/invalidProgramError";
import {WorldObjectType} from "../../enums/worldObjectType";
import {WorldObject} from "../../models/worldObject";

export type DiamondDistributionGeneratorParams = {
    readonly tileGroups: List<List<Position>>;
    readonly numberOfDiamondsPerGroup: number;
}

export const createDiamondDistributionGenerator = (params: DiamondDistributionGeneratorParams): WorldObjectGenerator =>
    world => {
        validateParams(params, world);

        return params.tileGroups
            .flatMap(group => generateDiamondsForGroup(group, params.numberOfDiamondsPerGroup))
    };

const generateDiamondsForGroup = (group: List<Position>, numberOfDiamonds: number): List<WorldObjectPlacement> =>
    group
        .sort(() => Math.random() * 2 - 1)
        .take(numberOfDiamonds)
        .map(position => ({position, worldObject: new WorldObject({type: WorldObjectType.Diamond})}));

const validateParams = (params: DiamondDistributionGeneratorParams, world: World) => {
    if (params.tileGroups.some(group => group.some(p => !isPositionInWorld(p, world)))) {
        throw invalidProgramError('Some positions from tileGroups are not in the world.', 'createDiamondDistributionGenerator');
    }
    if (params.numberOfDiamondsPerGroup < 0) {
        throw invalidProgramError('It does not make sense to have less than 0 diamonds generated.');
    }
};
