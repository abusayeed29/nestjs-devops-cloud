"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import type { IRootState } from "@/store";
import { useAppDispatch } from "@/store";
import { setAuth, clearAuth } from "@/store/slices/authSlice";

import { AuthService } from "@/services/api/auth.service";
import type { LoginCredentials, RegisterCredentials } from "@/types/auth.types";

/**
 * useAuth Hook
 *
 * Custom hook for authentication operations with Redux integration.
 *
 * Features:
 * - Secure in-memory token storage via Redux
 * - Guest cart merging on login
 * - Automatic logout with state cleanup
 * - Loading and error state management
 *
 * SECURITY: Tokens are stored in Redux with localStorage persistence.
 * This allows session persistence across page reloads while maintaining
 * automatic token refresh for expired tokens.
 */
export function useAuth() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const authState = useSelector((state: IRootState) => state.auth);
  // const guestCart = useSelector((state: IRootState) => state.cart.items);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // -----------------------
  // LOGIN + CART MERGE
  // -----------------------
  /**
   * Login user and merge guest cart
   *
   * @param credentials - User email and password
   * @returns Promise<boolean> - true if login successful, false otherwise
   *
   * Flow:
   * 1. Call AuthService.login to authenticate with backend
   * 2. Store tokens and user in Redux (in-memory only)
   * 3. If guest cart exists, merge it with backend cart
   * 4. Redirect to checkout if cart items exist, otherwise stay on page
   */
  const register = async (credentials: RegisterCredentials): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await AuthService.register(credentials);

      dispatch(
        setAuth({
          accessToken: response.accessToken,
          refreshToken: response.refreshToken,
          user: response.user,
        })
      );

      return true;
    } catch (err: unknown) {
      const axiosError = err as { response?: { data?: { message?: string | string[] } } };
      const raw = axiosError?.response?.data?.message;
      const message = Array.isArray(raw)
        ? raw.join(", ")
        : raw ?? "Registration failed. Please try again.";
      setError(message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await AuthService.login(credentials);

      // Tokens stay in RAM, not localStorage, protecting against XSS
      dispatch(
        setAuth({
          accessToken: response.accessToken,
          refreshToken: response.refreshToken,
          user: response.user,
        })
      );

      // Merge guest cart into backend if items exist
      // if (guestCart.length > 0) {
      //   await CartService.mergeCart(
      //     guestCart.map((item) => ({
      //       productId: item.product.id,
      //       quantity: item.quantity,
      //     }))
      //   );

      //   // Redirect to checkout after cart merge
      //   router.push("/checkout");
      // }

      return true;
    } catch (err) {
      const axiosError = err as { response?: { data?: { message?: string | string[] } } };
      const raw = axiosError?.response?.data?.message;
      const message = Array.isArray(raw)
        ? raw.join(", ")
        : raw ?? "Login failed. Please try again.";
      setError(message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Logout user and clear auth state
   *
   * Flow:
   * 1. Call AuthService.logout to invalidate backend session
   * 2. Clear Redux auth state (tokens and user)
   * 3. Redirect to home page
   */
  const logout = async () => {
    setIsLoading(true);

    try {
      await AuthService.logout();
      dispatch(clearAuth());
      router.push("/");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    user: authState.user,
    isAuthenticated: authState.isAuthenticated,
    isLoading,
    error,
    register,
    login,
    logout,
  };
}
