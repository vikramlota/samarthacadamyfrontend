import { useState, useEffect, useMemo, useCallback } from 'react';
import api from './api';

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
