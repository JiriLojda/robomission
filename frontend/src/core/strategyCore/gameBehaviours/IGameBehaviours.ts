import {World} from "../models/world";
import {ShipId} from "../models/ship";
import {Position} from "../models/position";
import {MovingDirection} from "../enums/movingDirection";

export interface IGameBehaviours {
    readonly shipCollisionResolver: CollisionResolver;
    readonly mapBorderCollisionResolver: CollisionResolver;
}

type CollisionParams = {
    readonly world: World;
    readonly movingShipId: ShipId;
    readonly movingToTile: Position;
    readonly movingDirection: MovingDirection;
};

export type CollisionResolver = (params: CollisionParams) => World;
