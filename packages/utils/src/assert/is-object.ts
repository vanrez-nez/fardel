/**
 * Tests if any given value is of type Object
 * @param value Target value to test
 */
export function isObject(value: unknown): boolean {
  const type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}
