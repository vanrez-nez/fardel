import { isObjectType } from './shared'

/**
 * Tests if any given value is of type Function
 * @param value Target value to test
 */
export function isFunction(value: unknown): boolean {
  return isObjectType(value, '[object Function]')
}
