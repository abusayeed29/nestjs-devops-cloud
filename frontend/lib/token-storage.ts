/**
 * Token Storage - DEPRECATED
 *
 * This file is kept for backward compatibility but is NO LONGER USED.
 *
 * SECURITY MIGRATION:
 * Token storage has been moved from localStorage to Redux (in-memory only).
 * This protects against XSS attacks that target localStorage.
 *
 * NEW APPROACH:
 * - Tokens are stored in Redux state (RAM only)
 * - Tokens are NOT persisted to any storage
 * - User must login again on page reload
 * - XSS attacks cannot steal tokens from localStorage
 *
 * See:
 * - store/slices/authSlice.ts - Redux auth state management
 * - hooks/useAuth.ts - Auth operations with Redux integration
 * - services/api/axios.config.ts - Token injection from Redux
 *
 * @deprecated Use Redux auth state instead (store/slices/authSlice.ts)
 */

class TokenStorage {
  private accessToken: string | null = null;
  private refreshToken: string | null = null;

  /**
   * @deprecated Tokens are now managed by Redux
   */
  init() {
    console.warn(
      "[TokenStorage] DEPRECATED: Token storage has moved to Redux. This class is no longer used."
    );
  }

  /**
   * @deprecated Use dispatch(setAuth({ accessToken, refreshToken, user })) instead
   */
  setTokens(accessToken: string, refreshToken: string) {
    console.warn("[TokenStorage] DEPRECATED: Use Redux setAuth action instead");
  }

  /**
   * @deprecated Use useSelector((state) => state.auth.accessToken) instead
   */
  getAccessToken(): string | null {
    console.warn(
      "[TokenStorage] DEPRECATED: Access token from Redux state instead"
    );
    return null;
  }

  /**
   * @deprecated Use useSelector((state) => state.auth.refreshToken) instead
   */
  getRefreshToken(): string | null {
    console.warn(
      "[TokenStorage] DEPRECATED: Access refresh token from Redux state instead"
    );
    return null;
  }

  /**
   * @deprecated Use dispatch(clearAuth()) instead
   */
  clearTokens() {
    console.warn(
      "[TokenStorage] DEPRECATED: Use Redux clearAuth action instead"
    );
  }

  /**
   * @deprecated Use useSelector((state) => state.auth.isAuthenticated) instead
   */
  isAuthenticated(): boolean {
    console.warn(
      "[TokenStorage] DEPRECATED: Check isAuthenticated from Redux state instead"
    );
    return false;
  }
}

// Export singleton instance for backward compatibility
export const tokenStorage = new TokenStorage();
