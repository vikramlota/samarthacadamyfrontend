const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api';
const TOKEN_KEY = 'samarth_admin_token';

export class ApiError extends Error {
  constructor(message, status, data) {
    super(message);
    this.status = status;
    this.data = data;
  }
}

async function request(path, options = {}) {
  const url = `${API_BASE}${path}`;
  const token = localStorage.getItem(TOKEN_KEY);

  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const config = { ...options, headers };

  if (config.body && typeof config.body !== 'string' && !(config.body instanceof FormData)) {
    config.body = JSON.stringify(config.body);
  }

  if (config.body instanceof FormData) {
    delete config.headers['Content-Type'];
  }

  try {
    const response = await fetch(url, config);
    const data = await response.json().catch(() => null);

    if (response.status === 401) {
      localStorage.removeItem(TOKEN_KEY);
      if (!window.location.pathname.endsWith('/login')) {
        window.location.href = '/admin/login';
      }
      throw new ApiError('Session expired', 401, data);
    }

    if (!response.ok || data?.success === false) {
      throw new ApiError(
        data?.error || `Request failed: ${response.status}`,
        response.status,
        data
      );
    }

    return data;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(error.message || 'Network error', 0, null);
  }
}

export const adminApi = {
  get: (path, options) => request(path, { method: 'GET', ...options }),
  post: (path, body, options) => request(path, { method: 'POST', body, ...options }),
  put: (path, body, options) => request(path, { method: 'PUT', body, ...options }),
  patch: (path, body, options) => request(path, { method: 'PATCH', body, ...options }),
  delete: (path, options) => request(path, { method: 'DELETE', ...options }),
};

export { TOKEN_KEY };
