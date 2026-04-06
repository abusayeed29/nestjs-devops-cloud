import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CartState, CartItem } from "@/types/cart.types";
import type { Product } from "@/types/product.types";

const initialState: CartState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
};

// Calculate totals helper
const calculateTotals = (items: CartItem[]) => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  return { totalItems, totalPrice };
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Add product to cart
    addToCart: (state, action: PayloadAction<Product>) => {
      const existingItem = state.items.find(
        (item) => item.product.id === action.payload.id
      );

      if (existingItem) {
        // Increment quantity if product already exists
        existingItem.quantity += 1;
      } else {
        // Add new product to cart
        state.items.push({
          product: action.payload,
          quantity: 1,
          price: action.payload.price,
          id: crypto.randomUUID(), // or some unique ID
          cartId: "", // or null if not used yet
          productId: action.payload.id,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
      }

      // Recalculate totals
      const totals = calculateTotals(state.items);
      state.totalItems = totals.totalItems;
      state.totalPrice = totals.totalPrice;
    },

    // Remove product from cart
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        (item) => item.product.id !== action.payload
      );

      // Recalculate totals
      const totals = calculateTotals(state.items);
      state.totalItems = totals.totalItems;
      state.totalPrice = totals.totalPrice;
    },

    // Update quantity
    updateQuantity: (
      state,
      action: PayloadAction<{ productId: string; quantity: number }>
    ) => {
      const item = state.items.find(
        (item) => item.product.id === action.payload.productId
      );

      if (item) {
        if (action.payload.quantity <= 0) {
          // Remove item if quantity is 0 or less
          state.items = state.items.filter(
            (item) => item.product.id !== action.payload.productId
          );
        } else {
          // Update quantity
          item.quantity = action.payload.quantity;
        }

        // Recalculate totals
        const totals = calculateTotals(state.items);
        state.totalItems = totals.totalItems;
        state.totalPrice = totals.totalPrice;
      }
    },

    // Clear entire cart
    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.totalPrice = 0;
    },

    // Increment quantity
    incrementQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find(
        (item) => item.product.id === action.payload
      );

      if (item) {
        item.quantity += 1;

        // Recalculate totals
        const totals = calculateTotals(state.items);
        state.totalItems = totals.totalItems;
        state.totalPrice = totals.totalPrice;
      }
    },

    // Decrement quantity
    decrementQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find(
        (item) => item.product.id === action.payload
      );

      if (item) {
        if (item.quantity <= 1) {
          // Remove item if quantity would be 0
          state.items = state.items.filter(
            (item) => item.product.id !== action.payload
          );
        } else {
          item.quantity -= 1;
        }

        // Recalculate totals
        const totals = calculateTotals(state.items);
        state.totalItems = totals.totalItems;
        state.totalPrice = totals.totalPrice;
      }
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  incrementQuantity,
  decrementQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
