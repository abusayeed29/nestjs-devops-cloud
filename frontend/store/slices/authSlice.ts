import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "@/types/auth.types";

/**
 * Auth State Interface
 *
 * Stores authentication state in Redux with localStorage persistence
 * - accessToken: JWT access token (persisted to localStorage)
 * - refreshToken: JWT refresh token (persisted to localStorage)
 * - user: Current authenticated user information
 * - isAuthenticated: Boolean flag indicating auth status
 *
 * SECURITY: Tokens are persisted to localStorage for session persistence
 * across page reloads. Automatic token refresh handles expired tokens.
 */
export interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;
  isAuthenticated: boolean;
}

/**
 * Initial auth state - loaded from localStorage if available
 * Falls back to logged out state if no persisted data
 */
const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  user: null,
  isAuthenticated: false,
};

/**
 * Auth Slice
 *
 * Manages authentication state in Redux with the following actions:
 * - setAuth: Store tokens and user data after successful login
 * - clearAuth: Clear all auth data on logout
 * - updateUser: Update user information without affecting tokens
 * - setAccessToken: Update only the access token (for token refresh)
 *
 * Following the same pattern as cartSlice.ts with clear action names,
 * typed payloads, and comprehensive documentation.
 */
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    /**
     * Set authentication state after successful login
     *
     * @param state - Current auth state
     * @param action - Payload containing accessToken, refreshToken, and user
     *
     * Stores all authentication data in Redux (persisted to localStorage).
     * Sets isAuthenticated to true to indicate user is logged in.
     */
    setAuth: (
      state,
      action: PayloadAction<{
        accessToken: string;
        refreshToken: string;
        user: User;
      }>
    ) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },

    /**
     * Clear authentication state on logout
     *
     * Resets all auth data to initial state (clears localStorage).
     * User will need to login again to access protected resources.
     */
    clearAuth: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.user = null;
      state.isAuthenticated = false;
    },

    /**
     * Update user information
     *
     * @param state - Current auth state
     * @param action - Payload containing updated user data
     *
     * Allows updating user profile without affecting authentication tokens.
     * Useful for profile updates, role changes, etc.
     */
    updateUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },

    /**
     * Update access token after refresh
     *
     * @param state - Current auth state
     * @param action - Payload containing new access token
     *
     * Updates only the access token, typically called after token refresh.
     * Preserves other auth state (user, refreshToken, isAuthenticated).
     */
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
  },
});

// Export action creators
export const { setAuth, clearAuth, updateUser, setAccessToken } =
  authSlice.actions;

// Export reducer as default
export default authSlice.reducer;
