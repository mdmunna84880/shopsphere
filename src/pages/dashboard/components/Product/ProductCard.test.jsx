import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import ProductCard from './ProductCard'

vi.mock('components/ui/Button', () => ({
  default: ({ children, onClick, className, leftIcon }) => (
    <button onClick={onClick} className={className}>
      {leftIcon}
      {children}
    </button>
  ),
}))

vi.mock('components/ui/Link', () => ({
  default: ({ children, to, href }) => (
    <a href={to || href}>{children}</a>
  ),
}))

vi.mock('components/common/product/Rating', () => ({
  default: ({ rate, count }) => (
    <div>Rating: {rate} ({count})</div>
  ),
}))

vi.mock('utils/formatCurrency', () => ({
  formatCurrencyToUS: (value) => `$${value.toFixed(2)}`,
}))

const baseProps = {
  id: 1,
  title: 'Test Product',
  price: 100,
  category: 'electronics',
  image: 'test-image.jpg',
  rating: { rate: 4.5, count: 120 },
  isInCart: false,
  isInWishlist: false,
  wishlistOnClick: vi.fn(),
  addToCartOnClick: vi.fn(),
}

beforeEach(() => {
  vi.clearAllMocks()
})

describe('ProductCard', () => {
  it('should render the rpoduct component with text like category, title, rating, and price', () => {
    render(<ProductCard {...baseProps} />)

    expect(screen.getByText('electronics')).toBeInTheDocument()
    expect(screen.getByText('Test Product')).toBeInTheDocument()
    expect(screen.getByText('Rating: 4.5 (120)')).toBeInTheDocument()
    expect(screen.getByText('$100.00')).toBeInTheDocument()
  })

  it('should call wishlist handler when wishlist button is clicked', async () => {
    const user = userEvent.setup()

    render(<ProductCard {...baseProps} />)

    const buttons = screen.getAllByRole('button')
    await user.click(buttons[1])

    expect(baseProps.wishlistOnClick).toHaveBeenCalledWith(1)
  })

  it('should call handler of addToCart when Add to Cart button is clicked', async () => {
    const user = userEvent.setup()

    render(<ProductCard {...baseProps} />)

    await user.click(screen.getByRole('button', { name: /add to cart/i }))

    expect(baseProps.addToCartOnClick).toHaveBeenCalledWith(1)
  })

  it('should display Go to Cart text inside link if product is already in cart', () => {
    render(<ProductCard {...baseProps} isInCart={true} />)

    expect(screen.getByRole('link', { name: /go to cart/i })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: /add to cart/i })).not.toBeInTheDocument()
  })
})