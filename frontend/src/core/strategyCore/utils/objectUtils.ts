export const getDeepCopy = <T>(obj: T): T => JSON.parse(JSON.stringify(obj));
