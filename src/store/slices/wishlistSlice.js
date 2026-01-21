import { createSlice } from '@reduxjs/toolkit';
import { findItemIndex } from 'store/utils';

const loadWishlistFromStorage = () => {
  try {
    const serializedWishlist = localStorage.getItem("wishlistItems");
    if (serializedWishlist === null) return [];
    return JSON.parse(serializedWishlist);
  } catch (e) {
    console.warn("Could not load wishlist from local storage", e);
    return [];
  }
};

const initialState = {
  items: loadWishlistFromStorage(),
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist(state, action) {
      const itemIndex = findItemIndex(state.items, action.payload.id);
      if (itemIndex < 0) {
        state.items.push(action.payload);
        localStorage.setItem("wishlistItems", JSON.stringify(state.items));
      }
    },
    removeFromWishlist(state, action) {
      state.items.splice(action.payload.id, 1);
      localStorage.setItem("wishlistItems", JSON.stringify(state.items));
    },
    toggleWishlist(state, action){
      const itemIndex = findItemIndex(state.items, action.payload.id);
      if (itemIndex < 0) {
        state.items.push(action.payload);
      }else{
      state.items.splice(itemIndex, 1);
      }
      localStorage.setItem("wishlistItems", JSON.stringify(state.items));
    },
    clearWishlist(state) {
      state.items = [];
      localStorage.setItem("wishlistItems", JSON.stringify(state.items));
    }
  },
});

export const { addToWishlist, removeFromWishlist, clearWishlist, toggleWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;