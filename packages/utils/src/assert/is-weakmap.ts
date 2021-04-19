import { isObjectType } from './shared'

/**
 * Tests if any given value is of type WeakMap
 * @param value Target value to test
 */
export function isWeakMap(value: unknown): boolean {
  return isObjectType(value, '[object WeakMap]');
}
