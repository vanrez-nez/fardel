import { isObjectType } from './shared'

/**
 * Tests if any given value is of type Number
 * @param value Target value to test
 */
export function isNumber(value: unknown): boolean {
  return typeof value === 'number' || isObjectType(value, '[object Number]');
}
