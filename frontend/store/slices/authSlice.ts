import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "@/types/auth.types";

/**
 * Auth State Interface
 *
 * Stores authentication state in Redux (in-memory only)
 * - accessToken: JWT access token (not persisted, cleared on page reload)
 * - refreshToken: JWT refresh token (not persisted, cleared on page reload)
 * - user: Current authenticated user information
 * - isAuthenticated: Boolean flag indicating auth status
 *
 * SECURITY: Tokens are NOT persisted to localStorage or any storage.
 * They exist only in Redux state (RAM), making them immune to XSS attacks
 * that target localStorage. User must login again on page reload.
 */
export interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;
  isAuthenticated: boolean;
}

/**
 * Initial auth state - all values are null/false
 * User is logged out by default
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
     * Stores all authentication data in memory (Redux state only).
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
     * Resets all auth data to initial state (null/false).
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
