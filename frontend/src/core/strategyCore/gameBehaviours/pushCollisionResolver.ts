import {CollisionResolver} from "./IGameBehaviours";
import {getPositionToFlyOn} from "../utils/directionUtils";
import {getShip, getShipOnPosition, modifyShipInWorld, moveShip} from "../utils/worldModelUtils";
import {invalidProgramError} from "../utils/invalidProgramError";
import {
    getObjectsOnPosition,
    getObjectsOnPositionWithShips,
    isPositionInWorld,
    setObjectsOnPosition,
    updateShipInWorld
} from "../models/world";
import {shipBlockingObjects} from "../enums/worldObjectType";

export const pushCollisionResolver: CollisionResolver = params => {
    const ship = getShip(params.world, params.movingShipId);
    if (!ship)
        throw invalidProgramError('Resolver called with an invalid shipId.');
    const pushToPosition = getPositionToFlyOn(params.movingToTile, params.movingDirection, ship.direction);
    if (!isPositionInWorld(pushToPosition, params.world)) {
        return params.world;
    }

    const objectsOnPushToPosition = getObjectsOnPositionWithShips(params.world, pushToPosition.x, pushToPosition.y);
    const objectsOnPushToPositionWithoutShips = getObjectsOnPosition(params.world, pushToPosition.x, pushToPosition.y);
    const objectsOnGoToPosition = getObjectsOnPositionWithShips(params.world, params.movingToTile.x, params.movingToTile.y);
    const objectsOnGoToPositionWithoutShips = getObjectsOnPosition(params.world, params.movingToTile.x, params.movingToTile.y);

    if (objectsOnGoToPosition.every(o => !shipBlockingObjects.contains(o.type))) {
        return params.world;
    }
    if (objectsOnPushToPosition.some(o => shipBlockingObjects.contains(o.type))) {
        return params.world;
    }

    const duplicatedObjs = setObjectsOnPosition(
        params.world,
        pushToPosition.x,
        pushToPosition.y,
        objectsOnPushToPositionWithoutShips
            .concat(objectsOnGoToPositionWithoutShips.filter(o => shipBlockingObjects.contains(o.type))),
        );
    const shipOnGoToPosition = getShipOnPosition(duplicatedObjs, params.movingToTile);
    const withMovedShip = shipOnGoToPosition ?
        modifyShipInWorld(duplicatedObjs, shipOnGoToPosition.set('position', pushToPosition)) :
        duplicatedObjs;

    const movedObjs = setObjectsOnPosition(
        withMovedShip,
        params.movingToTile.x,
        params.movingToTile.y,
        objectsOnGoToPositionWithoutShips.filter(o => !shipBlockingObjects.contains(o.type)),
    );
    const movedShip = moveShip(movedObjs, ship, params.movingDirection);

    return updateShipInWorld(movedObjs, ship, movedShip);
};
