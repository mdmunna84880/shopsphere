import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { MemoryRouter } from 'react-router' 

import NavDesktop from './NavDesktop'


const store = configureStore({
  reducer: {
    wishlist: () => ({ 
      items: [1, 2] 
    }),
    cart: () => ({ 
      cartItems: [
        { cartQuantity: 1, price: 10 },
        { cartQuantity: 2, price: 20 }
      ],
      cartTotalQuantity: 3 
    }),
  },
})

describe('NavDesktop', () => {
  it('should render cart and wishlist badges with correct counts like 1, 2, 3, 0', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <NavDesktop />
        </MemoryRouter>
      </Provider>
    )

    const cartBadge = screen.getByText('3')
    const wishlistBadge = screen.getByText('2')

    expect(cartBadge).toBeInTheDocument()
    expect(wishlistBadge).toBeInTheDocument()
    expect(cartBadge).toBeVisible()
  })
})