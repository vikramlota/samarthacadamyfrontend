import { useState, useEffect, useCallback } from 'react';
import { adminApi } from '@/admin/lib/api';

export function useApiData(endpoint, { fallback = null, enabled = true, transform } = {}) {
  const [state, setState] = useState({ data: fallback, isLoading: enabled, error: null });

  const fetchData = useCallback(async () => {
    if (!enabled || !endpoint) return;
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      const response = await adminApi.get(endpoint);
      const data = transform ? transform(response) : response;
      setState({ data, isLoading: false, error: null });
    } catch (error) {
      setState({ data: fallback, isLoading: false, error: error.message });
    }
  }, [endpoint, enabled]); // eslint-disable-line

  useEffect(() => { fetchData(); }, [fetchData]);

  return { ...state, refetch: fetchData };
}
