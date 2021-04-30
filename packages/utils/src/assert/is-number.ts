import { getType } from './get-type'

/**
 * Tests if any given value is of type Number
 * @param value Target value to test
 */
export function isNumber(value: unknown): value is number {
  return getType(value) === 'number';
}
