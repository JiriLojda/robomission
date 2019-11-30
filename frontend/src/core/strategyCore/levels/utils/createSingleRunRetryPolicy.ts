import {RetryPolicy} from "../../battleRunner/IGameLevel";

export const createSingleRunRetryPolicy = (): RetryPolicy => ({
    maxRounds: 1,
    winsRequired: 1,
});
