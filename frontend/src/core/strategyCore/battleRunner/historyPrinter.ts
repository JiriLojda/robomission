import {World} from "../models/world";
import {List} from "immutable";
import {delay} from "redux-saga";

export const createDrawHistory = (drawCallback: (world: World) => void, stepDelay: number = 250) =>
    (history: List<World>): Promise<List<World> | undefined> => {
        if (history.isEmpty())
            return Promise.resolve(undefined);

        drawCallback(history.last());
        return delay(stepDelay)
            .then(() => history.pop());
    };
