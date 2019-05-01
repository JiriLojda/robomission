import {MovingDirection} from "../enums/movingDirection";
import {IPosition, IShip, IWorldModel} from "../models/worldModel";

export const getShip = (world: IWorldModel, shipId: string): IShip | undefined =>
    world.ships.find(ship => ship.id === shipId);

export const getShipPosition = (world: IWorldModel, shipId: string): IPosition | undefined => {
    const ship = getShip(world, shipId);

    if (!ship) {
        return undefined;
    }

    return {...ship.position};
};

export const moveShip = (world: IWorldModel, shipId: string, direction: MovingDirection): boolean => {
    const ship = getShip(world, shipId);

    if (!ship) {
        return false;
    }
    if (!canMove(world, ship.position, direction)) {
        return false;
    }

    if (direction === MovingDirection.Right) {
        ship.position.x++;
    }
    if (direction === MovingDirection.Left) {
        ship.position.x--;
    }
    ship.position.y--;

    return true;
};

const canMove = (world: IWorldModel, position: IPosition, direction: MovingDirection): boolean => {
    if (direction === MovingDirection.Left && position.x === 0) {
        return false;
    }
    if (direction === MovingDirection.Right && position.x >= world.size.x - 1) {
        return false;
    }

    return position.y > 0;
};
