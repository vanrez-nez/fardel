import { isObjectType } from './shared'

/**
 * Tests if any given value is of type string
 * @param value Target value to test
 */
export function isString(value: unknown): boolean {
  return typeof value === 'string' || isObjectType(value, '[object String]');
}
