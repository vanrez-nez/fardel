import { getType } from './get-type'

/**
 * Tests if any given value is of type RegExp
 * @param value Target value to test
 */
export function isRegExp(value: unknown): boolean {
  return getType(value) === 'regexp';
}
