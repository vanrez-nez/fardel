import { isObjectType } from './shared'

/**
 * Tests if any given value is of type RegExp
 * @param value Target value to test
 */
export function isRegExp(value: unknown): boolean {
  return isObjectType(value, '[object RegExp]');
}
