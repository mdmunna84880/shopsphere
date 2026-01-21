import { createSelector } from "@reduxjs/toolkit";

const cartItems = state => state.cart.cartItems;

export const selectCartTotals = createSelector([cartItems], (cartItems)=>{
    let quantity = 0;
    let total = 0;

    cartItems.forEach(item=> {
        quantity += item.cartQuantity;
        total += item.cartQuantity * item.price;
    });

    return {
        cartTotalQuantity: quantity,
        cartTotalAmount: total
    }
});