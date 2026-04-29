import { useState, useEffect, useMemo, useCallback } from 'react';
import api from './api';
import { MOCK, MOCK_MODE } from './mockData';

/**
 * Custom hook for fetching homepage data with caching
 * Returns aggregated data from /api/homepage endpoint
 * Includes loading and error states
 */
export const useHomepageData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHomepageData = async () => {
      try {
        setLoading(true);
        const response = await api.get('/homepage');
        setData(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching homepage data:', err);
        setError(err.message);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchHomepageData();
  }, []);

  return { data, loading, error };
};

/**
 * Custom hook for fetching a single resource with ID/slug
 * Includes caching and memoization
 */
export const useFetchBySlug = (apiEndpoint, slug, enabled = true) => {
  const [resource, setResource] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!enabled || !slug) {
      setLoading(false);
      return;
    }

    const fetchResource = async () => {
      try {
        setLoading(true);
        const response = await api.get(`${apiEndpoint}/${slug}`);
        setResource(response.data);
        setError(null);
      } catch (err) {
        console.error(`Error fetching ${apiEndpoint}/${slug}:`, err);
        setError(err.message);
        setResource(null);
      } finally {
        setLoading(false);
      }
    };

    fetchResource();
  }, [apiEndpoint, slug, enabled]);

  return { resource, loading, error };
};

/**
 * Custom hook for filtering and sorting data
 * Memoizes results to prevent unnecessary recalculations
 */
export const useFilteredData = (data, filterFn, sortFn) => {
  return useMemo(() => {
    if (!data) return [];
    let filtered = data;
    if (filterFn) filtered = data.filter(filterFn);
    if (sortFn) filtered = filtered.sort(sortFn);
    return filtered;
  }, [data, filterFn, sortFn]);
};

/**
 * Custom hook for pagination
 * Memoizes paginated results
 */
export const usePagination = (items, itemsPerPage = 10) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(items.length / itemsPerPage);

  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return items.slice(startIndex, endIndex);
  }, [items, currentPage, itemsPerPage]);

  const handlePageChange = useCallback((page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  }, [totalPages]);

  return {
    paginatedItems,
    currentPage,
    totalPages,
    handlePageChange
  };
};

/**
 * Custom hook for debounced search
 */
export const useDebouncedSearch = (searchFn, delay = 300) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm.trim()) {
        setSearching(true);
        searchFn(searchTerm).then(res => {
          setResults(res);
          setSearching(false);
        });
      } else {
        setResults([]);
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [searchTerm, searchFn, delay]);

  return { searchTerm, setSearchTerm, results, searching };
};

/**
 * Generic GET data hook with mock mode support.
 *
 * In development (or when VITE_MOCK_MODE=true), returns pre-defined mock data
 * from src/utils/mockData.js without hitting the backend.
 * Set VITE_MOCK_MODE=false in .env.local to switch to real API.
 *
 * @param {string} endpoint - e.g. '/stats', '/courses', '/testimonials?limit=6'
 * @param {object} params   - query params (merged with inline query string)
 */
export const useApiData = (endpoint, params = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const paramsKey = JSON.stringify(params);

  useEffect(() => {
    let cancelled = false;

    if (MOCK_MODE) {
      const base = endpoint.split('?')[0];
      const delay = 250 + Math.random() * 150;
      const t = setTimeout(() => {
        if (!cancelled) {
          setData(MOCK[base] ?? null);
          setLoading(false);
        }
      }, delay);
      return () => { cancelled = true; clearTimeout(t); };
    }

    setLoading(true);
    api.get(endpoint, { params: JSON.parse(paramsKey) })
      .then(r => { if (!cancelled) { setData(r.data); setLoading(false); } })
      .catch(e => { if (!cancelled) { setError(e.message); setLoading(false); } });

    return () => { cancelled = true; };
  }, [endpoint, paramsKey]);

  return { data, loading, error };
};

/**
 * Hook for POST /api/lead form submissions.
 * In mock mode, simulates a 800ms network delay then returns success.
 */
export const useLeadSubmit = () => {
  const [submitting, setSubmitting]   = useState(false);
  const [submitted,  setSubmitted]    = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const submit = async (formData) => {
    setSubmitting(true);
    setSubmitError(null);

    if (MOCK_MODE) {
      await new Promise(r => setTimeout(r, 800));
      setSubmitting(false);
      setSubmitted(true);
      return { success: true };
    }

    try {
      const r = await api.post('/lead', formData);
      setSubmitted(true);
      return r.data;
    } catch (e) {
      const msg = e.response?.data?.error || 'Something went wrong. Please try again.';
      setSubmitError(msg);
      return { success: false, error: msg };
    } finally {
      setSubmitting(false);
    }
  };

  const reset = () => { setSubmitted(false); setSubmitError(null); };

  return { submit, submitting, submitted, submitError, reset };
};
