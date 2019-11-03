import {World} from "../models/world";
import {ShipId} from "../models/ship";
import {Position} from "../models/position";
import {MovingDirection} from "../enums/movingDirection";

export interface IGameBehaviours {
    readonly shipCollisionResolver: CollisionResolver;
    readonly mapBorderCollisionResolver: CollisionResolver;
    readonly shotResolver: ShotResolver;
}

type ParamWithWorld = {
    readonly world: World;
}

type CollisionParams = ParamWithWorld & {
    readonly movingShipId: ShipId;
    readonly movingToTile: Position;
    readonly movingDirection: MovingDirection;
};

export type CollisionResolver = (params: CollisionParams) => World;

type ShotResolverParams = ParamWithWorld & {
    readonly shootingShip: ShipId;
}

export type ShotResolver = (params: ShotResolverParams) => World;
