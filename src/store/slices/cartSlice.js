import { createSlice } from '@reduxjs/toolkit';

import { findItemIndex } from 'store/utils';

// Load all cart items from the localstorage
const loadCartFromStorage = () => {
  try {
    const serializedCart = localStorage.getItem("cartItems");
    if (serializedCart === null) return [];
    return JSON.parse(serializedCart);
  } catch (e) {
    console.warn("Could not load cart from local storage", e);
    return [];
  }
};

const initialState = {
  cartItems: loadCartFromStorage()
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const itemIndex = findItemIndex(state.cartItems, action.payload.id);
      if (itemIndex < 0) {
        const tempProduct = { ...action.payload, cartQuantity: 1 };
        state.cartItems.push(tempProduct);
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      }
    },
    increaseCart(state, action) {
      const itemIndex = findItemIndex(state.cartItems, action.payload.id);
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].cartQuantity += 1;
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      }
    },
    decreaseCart(state, action) {
      const itemIndex = findItemIndex(state.cartItems, action.payload.id);
      if (state.cartItems[itemIndex].cartQuantity > 1) {
        state.cartItems[itemIndex].cartQuantity -= 1;
      } else if (state.cartItems[itemIndex].cartQuantity === 1) {
        state.cartItems.splice(itemIndex, 1);
      }
      
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    updateCartQuantity(state, action) {
      const { quantity } = action.payload;
      const itemIndex = findItemIndex(state.cartItems, action.payload.id);

      if (itemIndex >= 0) {
        if (quantity > 0) {
          state.cartItems[itemIndex].cartQuantity = quantity;
        } else {
          state.cartItems.splice(itemIndex, 1);
        }
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      }
    },
    removeFromCart(state, action) {
      state.cartItems.splice(action.payload.id, 1);
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    clearCart(state) {
      state.cartItems = [];
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    }
  },
});

export const { 
  addToCart,
  increaseCart,
  decreaseCart,
  updateCartQuantity,
  removeFromCart,
  clearCart,
  getTotals
} = cartSlice.actions;

export default cartSlice.reducer;