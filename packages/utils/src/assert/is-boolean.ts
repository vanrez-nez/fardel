import { isObjectType } from './shared'

/**
 * Tests if any given value is of type boolean
 * @param value Target value to test
 */
export function isBoolean(value: unknown): boolean {
  return typeof value === 'boolean' || isObjectType(value, '[object Boolean]');
}
