import {Set} from "immutable";
import {ShipId} from "../models/ship";
import {ShotResolver} from "./IGameBehaviours";
import {makeShipShoot} from "../utils/worldModelUtils";
import {standardDestructibleObjects, WorldObjectType} from "../enums/worldObjectType";

export const createSelectiveShotResolver = (
    shootingShipIds: ReadonlyArray<ShipId>,
    destructibleObjects: Set<WorldObjectType> = standardDestructibleObjects,
): ShotResolver => params =>
    shootingShipIds.includes(params.shootingShip) ?
        makeShipShoot(params.world, params.shootingShip, destructibleObjects) :
        params.world;
