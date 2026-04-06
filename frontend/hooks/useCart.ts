"use client";

import { useSelector } from "react-redux";
import { type IRootState, useAppDispatch } from "@/store";

import {
  addToCart as addToCartAction,
  removeFromCart as removeFromCartAction,
  updateQuantity as updateQuantityAction,
  clearCart as clearCartAction,
  incrementQuantity as incrementQuantityAction,
  decrementQuantity as decrementQuantityAction,
} from "@/store/slices/cartSlice";

import type { Product } from "@/types/product.types";
import type { CartItem } from "@/types/cart.types";

// --- Safe token checker ---
const getToken = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("access_token");
};

// --- Fetcher ---
// const cartFetcher = async () => CartService.getCart();

export function useCart() {
  const dispatch = useAppDispatch();
  const reduxCart = useSelector((s: IRootState) => s.cart);

  const isLogged = Boolean(getToken());

  // 🔥 SWR only runs when logged in
  // const { data, error, isLoading, mutate } = useSWR<CartResponse>(
  //   isLogged ? "cart" : null,
  //   cartFetcher,
  //   {
  //     revalidateOnFocus: false,
  //     dedupingInterval: 30000,
  //   }
  // );

  // If logged in → use backend cart
  // If guest → use redux cart
  const items: CartItem[] = reduxCart.items;

  // const revalidate = async () => {
  //   if (!isLogged) return; // guest → skip revalidation
  //   await mutate().catch((err) => console.error(err));
  // };

  // --------------------------
  //        ACTIONS
  // --------------------------

  const addProductToCart = async (product: Product) => {
    dispatch(addToCartAction(product));

    // if (!isLogged) return; // guest mode

    // try {
    //   await CartService.addToCart({
    //     productId: product.id,
    //     quantity: product.quantity || 1,
    //   });
    // } finally {
    //   await revalidate();
    // }
  };

  const removeProductFromCart = async (productId: string) => {
    dispatch(removeFromCartAction(productId));

    // if (!isLogged) return;

    // try {
    //   await CartService.removeFromCart(productId);
    // } finally {
    //   await revalidate();
    // }
  };

  const updateProductQuantity = async (productId: string, quantity: number) => {
    dispatch(updateQuantityAction({ productId, quantity }));

    // if (!isLogged) return;

    // try {
    //   await CartService.updateCartItem(productId, quantity);
    // } finally {
    //   await revalidate();
    // }
  };

  const incrementProductQuantity = async (productId: string) => {
    dispatch(incrementQuantityAction(productId));

    // if (!isLogged) return;

    // const item = items.find((i) => i.product.id === productId);
    // if (!item) return;

    // try {
    //   await CartService.updateCartItem(productId, item.quantity + 1);
    // } finally {
    //   await revalidate();
    // }
  };

  const decrementProductQuantity = async (productId: string) => {
    dispatch(decrementQuantityAction(productId));

    // if (!isLogged) return;

    // const item = items.find((i) => i.product.id === productId);
    // if (!item) return;

    // const newQuantity = item.quantity - 1;

    // try {
    //   if (newQuantity <= 0) await CartService.removeFromCart(productId);
    //   else await CartService.updateCartItem(productId, newQuantity);
    // } finally {
    //   await revalidate();
    // }
  };

  const clearAllCart = async () => {
    dispatch(clearCartAction());

    // if (!isLogged) return;

    // try {
    //   await CartService.clearCart();
    // } finally {
    //   await revalidate();
    // }
  };

  return {
    items,
    totalItems: items.reduce((sum, i) => sum + i.quantity, 0),
    totalPrice: reduxCart.totalPrice,

    isLogged,
    // isLoading: isLogged ? isLoading : false,
    // isError: isLogged ? error : null,

    // mutate,
    addProductToCart,
    removeProductFromCart,
    updateProductQuantity,
    incrementProductQuantity,
    decrementProductQuantity,
    clearAllCart,
  };
}
