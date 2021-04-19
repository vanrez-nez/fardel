import { isObjectType } from './shared'

/**
 * Tests if any given value is of type Arguments
 * @param value Target value to test
 */
export function isArguments(value: unknown): boolean {
  return isObjectType(value, '[object Arguments]');
}
