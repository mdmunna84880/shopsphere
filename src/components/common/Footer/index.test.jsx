import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, afterEach } from 'vitest'
import userEvent from '@testing-library/user-event'

import Footer from './index'

vi.mock('components/ui/Container', () => ({
  default: ({ children, className }) => <div className={className}>{children}</div>,
}))

vi.mock('components/ui/Button', () => ({
  default: ({ children, ...props }) => (
    <button {...props}>{children}</button>
  ),
}))

vi.mock('assets/brand/logo.png', () => ({
  default: 'logo.png'
}))

vi.mock('./footerData', () => ({
  footerData: { 
    about: 'Test About', 
    navigation: [
      { 
        title: 'Links', 
        links: [{ label: 'Home', url: '/' }] 
      }
    ] 
  },
  contactDetails: [
    { label: 'Email', value: 'test@test.com', href: '#', icon: () => <svg data-testid="icon" /> }
  ],
}))

vi.mock('./paymentMethod', () => ({
  paymentMethods: [
    { name: 'Visa', icon: () => <svg data-testid="visa-icon" /> }
  ],
}))

vi.mock('./socialLinks', () => ({
  socialLinks: [
    { label: 'Twitter', href: '#', icon: () => <svg data-testid="social-icon" /> }
  ],
}))

describe('Footer', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should render the year and brand text successfully', () => {
    const year = new Date().getFullYear()
    render(<Footer />)
    
    expect(screen.getByText(new RegExp(`${year}`))).toBeInTheDocument()
    expect(screen.getByText(/ShopSphere/i)).toBeInTheDocument()
  })

  it('should update email input value on change', async () => {
    const user = userEvent.setup();

    render(<Footer />)
    const input = screen.getByPlaceholderText(/enter your email/i)
    
    await user.type(input, 'test@mail.com')
    expect(input.value).toBe('test@mail.com')
  })

  it('should prevents default form behavior on subscribe click', () => {
    render(<Footer />)
    
    const preventDefaultSpy = vi.spyOn(Event.prototype, 'preventDefault')
    
    const button = screen.getByRole('button', { name: /subscribe/i })
    fireEvent.click(button)

    expect(preventDefaultSpy).toHaveBeenCalled()
  })

  it('should renders footer data from mocks', () => {
    render(<Footer />)
    expect(screen.getByText('Test About')).toBeInTheDocument()
    expect(screen.getByText('Links')).toBeInTheDocument()
    expect(screen.getByText('Home')).toBeInTheDocument()
  })
})