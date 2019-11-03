import {ShipId} from "../models/ship";
import {ShotResolver} from "./IGameBehaviours";
import {makeShipShoot} from "../utils/worldModelUtils";

export const createSelectiveShotResolver = (shootingShipIds: ShipId[]): ShotResolver => params =>
    shootingShipIds.includes(params.shootingShip) ?
        makeShipShoot(params.world, params.shootingShip) :
        params.world;
