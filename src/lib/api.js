const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api';

class ApiError extends Error {
  constructor(message, status, data) {
    super(message);
    this.status = status;
    this.data = data;
  }
}

async function request(path, options = {}) {
  const url = `${API_BASE}${path}`;
  const config = {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  };

  if (config.body && typeof config.body !== 'string') {
    config.body = JSON.stringify(config.body);
  }

  try {
    const response = await fetch(url, config);
    const data = await response.json().catch(() => null);

    if (!response.ok || data?.success === false) {
      throw new ApiError(
        data?.error || `Request failed: ${response.status}`,
        response.status,
        data,
      );
    }

    // Embed data into window.__INITIAL_API_DATA__ during react-snap pre-rendering
    if (typeof window !== 'undefined' && navigator.userAgent === 'ReactSnap') {
      window.__INITIAL_API_DATA__ = window.__INITIAL_API_DATA__ || {};
      if (data && data.data !== undefined) {
        window.__INITIAL_API_DATA__[path] = data.data;
      } else {
        window.__INITIAL_API_DATA__[path] = data;
      }
      let script = document.getElementById('initial-api-data-script');
      if (!script) {
        script = document.createElement('script');
        script.id = 'initial-api-data-script';
        document.head.appendChild(script);
      }
      script.textContent = `window.__INITIAL_API_DATA__ = ${JSON.stringify(window.__INITIAL_API_DATA__)};`;
    }

    return data;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(error.message || 'Network error', 0, null);
  }
}

export const api = {
  get:  (path, options)        => request(path, { method: 'GET', ...options }),
  post: (path, body, options)  => request(path, { method: 'POST', body, ...options }),
};

export { ApiError };
