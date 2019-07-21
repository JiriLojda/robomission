import memoizee from 'memoizee';

export const memoizeOne = <T extends Function>(func: T, normalizer?: ((...args: any[]) => unknown)): T =>
    memoizee(func, {max: 1, normalizer});
