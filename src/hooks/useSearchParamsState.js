import { useSearchParams } from 'react-router-dom';
import { useCallback } from 'react';

/**
 * Syncs a single URL search param with component state.
 * Keeps filters/search/page in the URL so they are shareable
 * and browser back/forward works naturally.
 *
 * @param {string} key          - URL param key (e.g. 'search', 'category', 'page')
 * @param {string} defaultValue - Fallback when param is absent
 * @returns {[value, setValue]}
 */
export function useSearchParamsState(key, defaultValue = '') {
  const [searchParams, setSearchParams] = useSearchParams();

  const value = searchParams.get(key) ?? defaultValue;

  const setValue = useCallback(
    (newValue) => {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          if (!newValue || newValue === defaultValue) {
            next.delete(key);
          } else {
            next.set(key, String(newValue));
          }
          return next;
        },
        { replace: true },
      );
    },
    [key, defaultValue, setSearchParams],
  );

  return [value, setValue];
}
