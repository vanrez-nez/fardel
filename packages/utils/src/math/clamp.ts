/**
 * Limits a number into a given range
 * @param value The value to limit/clamp
 * @param min The minimum value
 * @param max The maximum value
 * @returns The clampled value
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.max(Math.min(max, value), min);
}
