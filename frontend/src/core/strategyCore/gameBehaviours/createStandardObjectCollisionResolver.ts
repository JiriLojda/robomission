import {CollisionResolver} from "./IGameBehaviours";
import {getObjectsOnPositionWithShips} from "../models/world";
import {shipRepresentingObjects, standardNonPushableObjects, standardPushableObjects} from "../enums/worldObjectType";
import {pushCollisionResolver} from "./pushCollisionResolver";
import {explosionCollisionResolver} from "./exposionCollisionResolver";

export const createStandardObjectCollisionResolver = (canPushShips: boolean = false): CollisionResolver => params => {
    const objectsOnGoToPosition = getObjectsOnPositionWithShips(params.world, params.movingToTile.x, params.movingToTile.y);

    const pushableObjects = canPushShips ?
        standardPushableObjects.concat(shipRepresentingObjects)
        : standardPushableObjects;
    const canPush = objectsOnGoToPosition
        .every(o => pushableObjects.contains(o.type) || !standardNonPushableObjects.contains(o.type));

    return canPush ? pushCollisionResolver(params) : explosionCollisionResolver(params);
};
