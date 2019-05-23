import {World} from "../models/world";
import {Position} from "../models/position";

export const convertUserPositionToInternal = (x: number, y: number, world: World): Position => {
    if (x > world.size.x || x < 1 || y > world.size.y || y < 1) {
        throw new Error('User position is outside the world boundaries.');
    }

    const internalX = x - 1;
    const internalY = world.size.y - y;

    return new Position({x: internalX, y: internalY});
};
