import { apiClient } from "./axios.config";
import type { LoginCredentials, RegisterCredentials, AuthResponse, User } from "@/types/auth.types";

/**
 * Authentication Service
 *
 * Handles all authentication-related API calls.
 *
 * IMPORTANT: This service NO LONGER stores tokens in localStorage.
 * Tokens are returned to the caller (useAuth hook) which stores them
 * securely in Redux (in-memory only).
 *
 * This follows the secure authentication pattern:
 * - API Service: Makes HTTP calls, returns data
 * - Hook Layer: Dispatches to Redux for state management
 * - Redux Store: Holds tokens in RAM (not persisted)
 */
export const AuthService = {
  /**
   * Login user
   *
   * @param credentials - User email and password
   * @returns AuthResponse with tokens and user data
   *
   * SECURITY CHANGE: No longer stores tokens in localStorage.
   * Returns tokens to caller for Redux storage (in-memory only).
   */
  forgotPassword: async (email: string): Promise<{ message: string }> => {
    const response = await apiClient.post<{ message: string }>('/auth/forgot-password', { email });
    return response.data;
  },

  resetPassword: async (token: string, newPassword: string): Promise<{ message: string }> => {
    const response = await apiClient.post<{ message: string }>('/auth/reset-password', { token, newPassword });
    return response.data;
  },

  changePassword: async (currentPassword: string, newPassword: string): Promise<{ message: string }> => {
    const response = await apiClient.patch<{ message: string }>(
      "/users/me/password",
      { currentPassword, newPassword }
    );
    return response.data;
  },

  register: async (credentials: RegisterCredentials): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>(
      "/auth/register",
      credentials
    );
    return response.data;
  },

  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await apiClient.post<AuthResponse>(
      "/auth/login",
      credentials
    );

    // Tokens are stored in Redux (RAM) by the caller for better security

    return response.data;
  },

  /**
   * Logout user
   *
   * Calls backend logout endpoint to invalidate session.
   * Token cleanup is now handled by Redux (clearAuth action).
   */
  logout: async (): Promise<void> => {
    try {
      await apiClient.post("/auth/logout");
    } catch (error) {
      console.error("[AuthService] Logout error:", error);
    }
  },

  /**
   * Get current user from Redux
   *
   * @deprecated This method should not be used. Access user from Redux state instead.
   * Kept for backward compatibility but returns null.
   * Use: const user = useSelector((state) => state.auth.user)
   */
  getCurrentUser: (): User | null => {
    // User should be accessed from Redux state instead
    console.warn(
      "[AuthService] getCurrentUser is deprecated. Use Redux state: useSelector(state => state.auth.user)"
    );
    return null;
  },

  /**
   * Check if user is authenticated
   *
   * @deprecated This method should not be used. Check auth from Redux state instead.
   * Kept for backward compatibility but returns false.
   * Use: const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
   */
  isAuthenticated: (): boolean => {
    // Auth status should be checked from Redux state instead
    console.warn(
      "[AuthService] isAuthenticated is deprecated. Use Redux state: useSelector(state => state.auth.isAuthenticated)"
    );
    return false;
  },

  /**
   * Refresh access token
   *
   * @param refreshToken - Current refresh token from Redux state
   * @returns New access token or null if refresh fails
   *
   * Called by axios interceptor when access token expires.
   * Caller should dispatch setAccessToken to update Redux state.
   */
  refreshAccessToken: async (refreshToken: string): Promise<string | null> => {
    if (!refreshToken) return null;

    try {
      const response = await apiClient.post<{ accessToken: string }>(
        "/auth/refresh",
        { refreshToken }
      );

      const { accessToken } = response.data;

      // Caller (axios interceptor) will update Redux state
      return accessToken;
    } catch (error) {
      console.error("[AuthService] Token refresh failed:", error);
      return null;
    }
  },
};
