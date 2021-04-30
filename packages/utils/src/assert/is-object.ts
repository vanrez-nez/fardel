/**
 * Tests if any given value is of type Object
 * @param value Target value to test
 */
export function isObject(value: unknown): boolean {
  const t = typeof value;
  return !!value && (t == 'object' || t == 'function');
}
