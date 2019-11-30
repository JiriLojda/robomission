import {Position} from "../../models/position";
import {List} from "immutable";
import {range} from "../../../../utils/arrays";

type BetweenPositions = {
    readonly upperLeft: Position;
    readonly downRight: Position;
}

export const generateRectangularPositionGroup = (corners: BetweenPositions): List<Position> =>
    generateXRange(corners)
        .map(_ => generateYRange(corners))
        .flatMap((column, x) =>
            column.map(y => createPosition(x + corners.upperLeft.x, y + corners.upperLeft.y))
        );

const generateXRange = (corners: BetweenPositions) =>
    List(range(corners.downRight.x - corners.upperLeft.x + 1));

const generateYRange = (corners: BetweenPositions) =>
    List(range(corners.downRight.y - corners.upperLeft.y + 1));

const createPosition = (x: number, y: number) => new Position({x, y});
