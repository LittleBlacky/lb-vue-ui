/**
 * 类型检查工具函数
 */

export const isNumber = (val: unknown): val is number =>
  typeof val === "number";

export const isString = (val: unknown): val is string =>
  typeof val === "string";

export const isBoolean = (val: unknown): val is boolean =>
  typeof val === "boolean";

export const isObject = (val: unknown): val is Record<string, any> =>
  val !== null && typeof val === "object";

export const isArray = (val: unknown): val is Array<any> => Array.isArray(val);

export const isFunction = (val: unknown): val is Function =>
  typeof val === "function";

export const isUndefined = (val: unknown): val is undefined =>
  typeof val === "undefined";

export const isNull = (val: unknown): val is null => val === null;

export const isEmpty = (val: unknown): boolean => {
  if (isNull(val) || isUndefined(val)) return true;
  if (isString(val) || isArray(val)) return val.length === 0;
  if (isObject(val)) return Object.keys(val).length === 0;
  return false;
};
