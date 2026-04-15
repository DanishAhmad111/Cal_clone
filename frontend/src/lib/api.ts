import axios from 'axios';

// The base URL routes through the central config environment variables
const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const apiClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true // Support cookie passing if later added
});

// Implement generic request wrappers here to catch all HTTP deviations centrally
apiClient.interceptors.response.use(
  (response) => response.data, // Strip axios data payload structure globally
  (error) => {
    // Optionally trigger toast notification hooks via generic utility handlers
    return Promise.reject(error);
  }
);
