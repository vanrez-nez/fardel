const hyphenateRE = /\B([A-Z])/g;

/**
 * Hypenate a camelCase string
 * @param str Text to hyphenate
 */
export function hyphenate(str: string): string {
  return str.replace(hyphenateRE, '-$1').toLowerCase();
}