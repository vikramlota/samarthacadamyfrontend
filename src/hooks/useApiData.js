import { useState, useEffect, useCallback } from 'react';
import { api } from '@/lib/api';

/**
 * Universal hook for fetching data from API endpoints.
 *
 * @param {string} endpoint - API path, e.g. '/testimonials?limit=6'
 * @param {object} options
 * @param {any}      options.fallback  - Returned if API fails or is unavailable
 * @param {boolean}  options.enabled   - Set false to skip the fetch (default: true)
 * @param {function} options.transform - Map response.data before storing
 */
export function useApiData(endpoint, { fallback = null, enabled = true, transform } = {}) {
  const [state, setState] = useState({
    data: fallback,
    isLoading: enabled,
    error: null,
  });

  const fetchData = useCallback(async () => {
    if (!enabled) return;
    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const response = await api.get(endpoint);
      const data = transform ? transform(response.data) : response.data;
      setState({ data, isLoading: false, error: null });
    } catch (error) {
      setState({ data: fallback, isLoading: false, error: error.message });
    }
  }, [endpoint, enabled]);   // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => { fetchData(); }, [fetchData]);

  return { ...state, refetch: fetchData };
}
