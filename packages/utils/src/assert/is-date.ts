import { isObjectType } from './shared'

/**
 * Tests if any given value is of type Date
 * @param value Target value to test
 */
export function isDate(value: unknown): boolean {
  return isObjectType(value, '[object Date]');
}
