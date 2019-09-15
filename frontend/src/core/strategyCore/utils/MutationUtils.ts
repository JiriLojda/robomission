type Mutator<T> = (input: T) => T;

export const applyMutations = <T>(model: T, mutations: Mutator<T>[]): T =>
    mutations
        .reduce((current, modify) => modify(current), model);
