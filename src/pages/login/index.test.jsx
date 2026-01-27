/** @format */
import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import Login from './index'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { MemoryRouter } from 'react-router'

import { login, clearAuthError } from 'store/slices/authSlice'


vi.mock('components/ui/Button', () => ({
  default: ({ children, disabled, onClick, type }) => (
    <button disabled={disabled} onClick={onClick} type={type}>
      {children}
    </button>
  ),
}))

vi.mock('components/ui/Input', () => ({
  default: ({ name, value, onChange }) => (
    <input
      name={name}
      value={value}
      onChange={onChange}
      aria-label={name}
    />
  ),
}))


vi.mock('components/ui/Link', () => ({
  default: ({ children, href }) => <a href={href}>{children}</a>,
}))


vi.mock('store/slices/authSlice', () => ({
  login: vi.fn(() => ({ type: 'auth/login' })),
  clearAuthError: vi.fn(() => ({ type: 'auth/clearAuthError' })),
}))

vi.mock('utils/AuthValidation', () => ({
  isValidUsername: (v) => v && v.length >= 3,
  isValidPassword: (v) => v && v.length >= 6,
}))


const mockNavigate = vi.fn()

vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router')

  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})


vi.stubGlobal('confirm', vi.fn())


const createStore = (authState) =>
  configureStore({
    reducer: {
      auth: () => authState,
    },
  })

const renderLogin = (authState) => {
  const store = createStore(authState)

  return render(
    <Provider store={store}>
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    </Provider>
  )
}

beforeEach(() => {
  vi.clearAllMocks()
})

describe('Login', () => {
  it('should allow user to type username and password', async () => {
    const user = userEvent.setup()

    renderLogin({
      isAuthenticated: false,
      status: 'idle',
      error: null,
    })

    const username = screen.getByLabelText('username')
    const password = screen.getByLabelText('password')

    await user.type(username, 'munna234')
    await user.type(password, 'mdmunna@345')

    expect(username.value).toBe('munna234')
    expect(password.value).toBe('mdmunna@345')
  })

  it('should call login when user clicks Sign In button', async () => {
    const user = userEvent.setup()

    renderLogin({
      isAuthenticated: false,
      status: 'idle',
      error: null,
    })

    await user.type(screen.getByLabelText('username'), 'munna234')
    await user.type(screen.getByLabelText('password'), 'mdmunna@345')

    await user.click(
      screen.getByRole('button', { name: /sign in/i })
    )

    await waitFor(() => {
      expect(clearAuthError).toHaveBeenCalled()

      expect(login).toHaveBeenCalledWith({
        username: 'munna234',
        password: 'mdmunna@345',
      })
    })
  })

  it('should auto fills demo user credentials', async () => {
    const user = userEvent.setup()

    renderLogin({
      isAuthenticated: false,
      status: 'idle',
      error: null,
    })

    await user.click(screen.getByText(/tap to auto-fill/i))

    expect(
      screen.getByLabelText('username').value
    ).toBe('mor_2314')

    expect(
      screen.getByLabelText('password').value
    ).toBe('83r5^_')
  })

  it('should disable login button when input is wrong', async () => {
    const user = userEvent.setup()

    renderLogin({
      isAuthenticated: false,
      status: 'idle',
      error: null,
    })

    await user.type(screen.getByLabelText('username'), 'u')
    await user.type(screen.getByLabelText('password'), '12')

    expect(
      screen.getByRole('button', { name: /sign in/i })
    ).toBeDisabled()
  })

  it('should redirects user after login success', async () => {
    renderLogin({
      isAuthenticated: true,
      status: 'succeeded',
      error: null,
    })

    await waitFor(() => {
      expect(confirm).toHaveBeenCalled()
      expect(mockNavigate).toHaveBeenCalledWith('/')
    })
  })

  it('should disable button when login is loading', () => {
    renderLogin({
      isAuthenticated: false,
      status: 'loading',
      error: null,
    })

    expect(
      screen.getByRole('button', { name: /sign in/i })
    ).toBeDisabled()
  })
})
