import {List} from "immutable";

export function flatten(arrayOfArrays: any[]): any[] {
  return [].concat.apply([], arrayOfArrays);
}

export const range = (size: number) => [...Array(size).keys()];

export const convertArraysToLists = <T extends unknown[], U>(array: T): U => {
  return List(array.map(e => Array.isArray(e) ? convertArraysToLists(e) : e)) as any;
};
