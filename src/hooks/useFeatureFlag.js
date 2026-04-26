import { useMemo } from 'react';

// Reads feature flags from env (VITE_FF_<NAME>=true) with localStorage override.
// e.g. localStorage.setItem('ff_blog', 'true') enables BlogPreview in dev.
export function useFeatureFlag(name) {
  return useMemo(() => {
    const key = `ff_${name.toLowerCase()}`;
    const local = typeof window !== 'undefined' ? localStorage.getItem(key) : null;
    if (local === 'true') return true;
    if (local === 'false') return false;
    return import.meta.env[`VITE_FF_${name.toUpperCase()}`] === 'true';
  }, [name]);
}
