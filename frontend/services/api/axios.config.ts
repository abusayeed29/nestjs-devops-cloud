import axios from "axios";
import { store } from "@/store";
import { setAccessToken, clearAuth } from "@/store/slices/authSlice";
import { AuthService } from "./auth.service";

/**
 * Axios Instance Configuration
 *
 * Creates configured axios instance with interceptors for:
 * - Adding auth tokens from Redux to requests
 * - Handling token refresh on 401 errors
 * - Automatic logout on auth failures
 *
 * SECURITY: Reads tokens from Redux state (in-memory) instead of localStorage
 */

// Create axios instance with base configuration
export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

/**
 * Request Interceptor
 *
 * Adds access token from Redux state to Authorization header.
 *
 * SECURITY CHANGE: Reads token from Redux (RAM) instead of localStorage.
 * Protects against XSS attacks targeting persistent storage.
 */
apiClient.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.auth.accessToken;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Response Interceptor
 *
 * Handles authentication errors and token refresh.
 *
 * Flow:
 * 1. If 401 error, attempt token refresh using refreshToken from Redux
 * 2. If refresh succeeds, update Redux with new token and retry request
 * 3. If refresh fails, clear auth state and redirect to login
 */
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // Get refresh token from Redux state
      const state = store.getState();
      const refreshToken = state.auth.refreshToken;

      if (refreshToken) {
        try {
          // Attempt to refresh access token
          const newAccessToken = await AuthService.refreshAccessToken(
            refreshToken
          );

          if (newAccessToken) {
            store.dispatch(setAccessToken(newAccessToken));

            // Retry original request with new token
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return apiClient(originalRequest);
          }
        } catch (refreshError) {
          console.error("[Axios] Token refresh failed:", refreshError);
        }
      }

      store.dispatch(clearAuth());
      if (typeof window !== "undefined") {
        window.location.href = "/auth/login";
      }
    }

    return Promise.reject(error);
  }
);
