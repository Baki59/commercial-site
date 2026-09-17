/** Joins class names, dropping falsy values. Used by every component. */
export function cn(...values: Array<string | false | null | undefined>): string {
  return values.filter(Boolean).join(' ');
}
