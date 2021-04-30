import { getType } from './get-type'

/**
 * Tests if any given value is of type boolean
 * @param value Target value to test
 */
export function isBoolean(value: unknown): value is boolean {
  return getType(value) === 'boolean';
}
