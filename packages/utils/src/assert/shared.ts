export function isObjectType(object: unknown, type: string): boolean {
  return Object.prototype.toString.call(object) === type;
}
