import { isString, isObject } from '../assert';

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
  return (curr as unknown) as R;
}
