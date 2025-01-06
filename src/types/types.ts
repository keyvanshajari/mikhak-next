export type ObjectNumberString = { [index: number]: string };
export type ObjectNumberUnknown = { [index: number]: unknown };
export type ObjectNumberAny = { [index: number]: any };
export type ObjectStringString = { [index: string]: string };
export type ObjectStringUnknown = { [index: string]: unknown };
export type ObjectStringAny = { [index: string]: any };
export type ObjectStringNumber = { [index: string]: number };
export type TypedObject<T> = {
  [index: string]: T;
};
