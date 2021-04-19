/**
 * Tests if any given value is of type undefined
 * @param value Target value to test
 */
export function isUndefined(value: unknown): boolean {
  return typeof value === 'undefined';
}
