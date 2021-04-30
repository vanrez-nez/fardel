import { getType } from './get-type'

/**
 * Tests if any given value is of type undefined
 * @param value Target value to test
 */
export function isUndefined(value: unknown): value is undefined {
  return getType(value) === 'undefined';
}
