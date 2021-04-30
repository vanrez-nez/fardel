import { getType } from './get-type'

/**
 * Tests if any given value is of type Date
 * @param value Target value to test
 */
export function isDate(value: unknown): boolean {
  return getType(value) === 'date';
}
