import {updateShipInWorld, World} from "../models/world";
import {Ship} from "../models/ship";
import {MovingDirection} from "../enums/movingDirection";
import {IGameBehaviours} from "../gameBehaviours/IGameBehaviours";
import {getCannotMoveReason, moveShip} from "../utils/worldModelUtils";
import {getPositionToFlyOn} from "../utils/directionUtils";
import {invalidProgramError} from "../utils/invalidProgramError";

export const handleMoveStatement = (
    world: World,
    ship: Ship,
    direction: MovingDirection,
    behaviour: IGameBehaviours
): World => {
    const cannotMoveReason = getCannotMoveReason(world, ship, direction);

    switch (cannotMoveReason) {
        case "AnotherShip":
        case "Object":
            return behaviour.shipCollisionResolver({
                movingShipId: ship.id,
                world,
                movingToTile: getPositionToFlyOn(ship.position, direction, ship.direction),
                movingDirection: direction,
            });
        case "EndOfMap":
            return behaviour.mapBorderCollisionResolver({
                movingShipId: ship.id,
                world,
                movingToTile: getPositionToFlyOn(ship.position, direction, ship.direction),
                movingDirection: direction
            });
        case "None":
            return updateShipInWorld(world, ship, moveShip(world, ship, direction));
        default:
            throw invalidProgramError(`Unknown cannotMoveReason ${cannotMoveReason}.`);
    }
};
