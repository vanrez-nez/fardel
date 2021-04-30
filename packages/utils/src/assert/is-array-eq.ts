/**
 * Compares two arrays shallowly (first level elements only).
 * @param a Array to compare
 * @param b Array to compare
 */
export function isArrayEqual(a: unknown[], b: unknown[]): boolean {
  if (a === b) return true;
  if (!a || !b) return false;
  if (a.length !== b.length) return false;
  return a.every((value, index) => b[index] === value);
}
