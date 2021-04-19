import { isObjectType } from './shared'

/**
 * Tests if any given value is of type Set
 * @param value Target value to test
 */
export function isSet(value: unknown): boolean {
  return isObjectType(value, '[object Set]');
}
