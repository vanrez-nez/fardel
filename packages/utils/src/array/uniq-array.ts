/**
 * Removes duplicated values from an Array.
 * @param array Target array
 * @returns A new array with unique values
 */
export function uniqArray<T>(array: T[]): T[] {
  return Array.from(new Set(array));
}