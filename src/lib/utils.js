/**
 * cn() — conditional className utility.
 * Combines clsx (handles arrays, objects, conditionals) with
 * tailwind-merge (resolves conflicting Tailwind class pairs like p-4 + p-6).
 *
 * Install: npm install clsx tailwind-merge
 *
 * Usage:
 *   cn('base-class', isActive && 'active-class', { 'error-class': hasError })
 *   cn('px-4 py-2', props.className)  // className merge is safe
 */

import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
