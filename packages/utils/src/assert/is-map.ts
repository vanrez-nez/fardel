import { isObjectType } from './shared'

/**
 * Tests if any given value is of type Map
 * @param value Target value to test
 */
export function isMap(value: unknown): boolean {
  return  isObjectType(value, '[object Map]');
}
