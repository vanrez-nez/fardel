import { getType } from './get-type'

/**
 * Tests if any given value is of type WeakMap
 * @param value Target value to test
 */
export function isWeakMap(value: unknown): boolean {
  return getType(value) === 'weakmap';
}
