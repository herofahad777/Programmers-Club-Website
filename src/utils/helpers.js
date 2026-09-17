/**
 * Utility helper functions for Programmers Club website.
 */

/**
 * Combine multiple class names conditionally.
 * Clean, zero-dependency alternative to clsx/tailwind-merge for simple components.
 */
export function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

/**
 * Format date string into readable English format.
 * Example: '2026-10-15' -> 'October 15, 2026'
 */
export function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}
