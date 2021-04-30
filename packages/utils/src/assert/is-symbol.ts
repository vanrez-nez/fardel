import { getType } from './get-type'

/**
 * Tests if any given value is of type Symbol
 * @param value Target value to test
 */
export function isSymbol(value: unknown): value is symbol {
  return getType(value) === 'symbol';
}
