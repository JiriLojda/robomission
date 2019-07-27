import {World} from "../models/world";
import {List} from "immutable";
import {delay, ICancelablePromise} from "../../../utils/cancelablePromise";

export const createDrawHistory = (drawCallback: (world: World) => void, stepDelay: number = 250) =>
    (history: List<World>): ICancelablePromise<List<World> | undefined> => {
        if (history.isEmpty())
            return delay(0).then(() => undefined);

        drawCallback(history.last());
        return delay(stepDelay)
            .then(() => history.pop());
    };
