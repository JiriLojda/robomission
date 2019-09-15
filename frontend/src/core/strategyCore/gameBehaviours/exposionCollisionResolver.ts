import {CollisionResolver} from "./IGameBehaviours";
import {destroyShip} from "../utils/worldModelUtils";

export const explosionCollisionResolver: CollisionResolver = params =>
    destroyShip(params.world, params.movingShipId);
