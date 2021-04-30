
/**
 * Gets the data type from a given value.
 * @param value target value
 * @returns lowercase type string
 */
export function getType(value: unknown): string {
  const valueType = typeof value;
  if (valueType === 'object') {
    return Object.prototype.toString.call(value).slice(8, -1).toLowerCase()
  }
  return valueType;
}
