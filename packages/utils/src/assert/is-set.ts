import { getType } from './get-type'

/**
 * Tests if any given value is of type Set
 * @param value Target value to test
 */
export function isSet(value: unknown): boolean {
  return getType(value) === 'set';
}
