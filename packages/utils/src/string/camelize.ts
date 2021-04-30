const camelizeRE = /-(\w)/

/**
 * Camelize a hypen-delimited string
 * @param str The text to camelize
 */
export function camelize(str: string): string {
  return str.replace(camelizeRE, (_, c: string) => c ? c.toUpperCase() : '')
}
