import {Team} from "../IGameLevel";
import {World} from "../../models/world";
import {getShip} from "../../utils/worldModelUtils";
import {WorldObjectType} from "../../enums/worldObjectType";
import {List} from "immutable";
import {arePositionsEqual, Position} from "../../models/position";
import {Ship} from "../../models/ship";

export const countTeamsDiamonds = (team: Team, world: World): number =>
    team.members
        .map(id => getShip(world, id))
        .filter(ship => !!ship)
        .flatMap(ship => ship!.carriedObjects.filter(o => o === WorldObjectType.Diamond))
        .count();

export const findTeamsReachedTheDestination = (world: World, positions: List<Position>, teams: List<Team>): List<Team> =>
    teams
        .filter(team => team.members
            .map(id => getShip(world, id))
            .filter(ship => !!ship)
            .every(ship => !!ship && didShipReachDestination(ship, positions))
        );

export const didShipReachDestination = (ship: Ship, positions: List<Position>): boolean =>
    positions.some(position => arePositionsEqual(ship.position, position));
