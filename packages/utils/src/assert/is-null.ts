import { getType } from './get-type'

/**
 * Tests if any given value is of type null
 * @param value Target value to test
 */
export function isNull(value: unknown): value is null {
  return getType(value) === 'null';
}
