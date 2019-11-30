import {List} from "immutable";
import {ShipId} from "../../models/ship";
import {translate} from "../../../../localization";

export const standardPlayerShipIds: List<ShipId> = List([
    translate('shipIds.playerShip1'),
    translate('shipIds.playerShip2'),
    translate('shipIds.playerShip3'),
]);

export const standardAiShipIds: List<ShipId> = List([
    translate('shipIds.aiShip1'),
    translate('shipIds.aiShip2'),
    translate('shipIds.aiShip3'),
]);

export const singlePlayerPlayerStartsShipIds: List<ShipId> = List([
    standardPlayerShipIds.first(),
    standardAiShipIds.first(),
]);

export const singlePlayerAiStartsShipIds: List<ShipId> = singlePlayerPlayerStartsShipIds.reverse();

export const twoPlayersShipIds: List<ShipId> = List([
    ...standardPlayerShipIds.take(2),
]);
