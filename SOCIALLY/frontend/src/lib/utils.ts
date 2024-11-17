// lib/utils.ts

/**
 * A utility function to conditionally join classNames together.
 * @param classes - A list of class names or conditions.
 * @returns A string of joined class names.
 */
export function cn(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(" ");
}
