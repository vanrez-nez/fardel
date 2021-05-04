import { isString, isObject } from '../assert';

/**
 * Gets the value at @path of @object If the resolved value is undefined, the @defaultValue is returned in its place.
 * @param object The target to query
 * @param path The path of the property to get
 * @param defaultValue the value returned when prop doesn't exists
 */
export function get<T, R>(object: T, path: string, defaultValue?: R): R | undefined {
  if (!isObject(object)) return defaultValue;
  const parts = isString(path) ? path.split('.') : [];
  const len = parts.length;
  let curr = object as Record<string, unknown>;
  for (let i = 0; i < len; i++) {
    const key = parts[i] as string;
    if (isObject(curr) && key in curr) {
      curr = curr[key] as Record<string, unknown>;
    } else {
      return defaultValue;
    }
  }
  return curr as R;
}
