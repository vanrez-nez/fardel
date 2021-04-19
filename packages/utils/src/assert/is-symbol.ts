/**
 * Tests if any given value is of type Symbol
 * @param value Target value to test
 */
export function isSymbol(value: unknown): boolean {
  return typeof value === 'symbol';
}
