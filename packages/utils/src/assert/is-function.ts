/* eslint-disable @typescript-eslint/ban-types */
import { getType } from './get-type'

/**
 * Tests if any given value is of type Function
 * @param value Target value to test
 */
export function isFunction(value: unknown): value is Function {
  return getType(value) === 'function';
}
