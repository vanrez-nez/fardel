/**
 * Tests if any given value is of type array (exluding typed arrays)
 * @param value Target value to test
 */
export function isArray(value: unknown): value is [] {
  return Array.isArray(value);
}
