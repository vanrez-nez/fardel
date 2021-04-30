/**
 * Tests if any given value is of type: "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined"
 * @param value Target value to test
 */
export function isPrimitive(value: unknown): value is string | number | bigint | boolean | symbol | undefined {
  const t = typeof value;
  return value === null || (t != 'object' && t != 'function');
}
