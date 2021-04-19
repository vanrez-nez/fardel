import { isObjectType } from './shared'

/**
 * Tests if any given value is of type Error
 * @param value Target value to test
 */
export function isError(value: unknown): boolean {
  return isObjectType(value, '[object Error]');
}
