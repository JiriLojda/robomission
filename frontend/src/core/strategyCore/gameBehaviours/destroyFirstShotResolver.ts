import {ShotResolver} from "./IGameBehaviours";
import {makeShipShoot} from "../utils/worldModelUtils";

export const destroyFirstShotResolver: ShotResolver = params =>
    makeShipShoot(params.world, params.shootingShip);
