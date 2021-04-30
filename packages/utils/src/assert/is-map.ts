import { getType } from './get-type'

/**
 * Tests if any given value is of type Map
 * @param value Target value to test
 */
export function isMap(value: unknown): boolean {
  return getType(value) === 'map';
}
