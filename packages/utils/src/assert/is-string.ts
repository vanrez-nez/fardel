import { getType } from './get-type'

/**
 * Tests if any given value is of type string
 * @param value Target value to test
 */
export function isString(value: unknown): value is string {
  return getType(value) === 'string';
}
