import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { MemoryRouter } from 'react-router'

import { register, clearAuthError } from 'store/slices/authSlice'
import SignUp from './index'

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
  register: vi.fn((data) => {
    return () => {
      const promise = Promise.resolve({ payload: data })
      promise.unwrap = () => Promise.resolve(data)
      return promise
    }
  }),

  clearAuthError: vi.fn(() => ({ type: 'auth/clearAuthError' })),
}))

vi.mock('utils/AuthValidation', () => ({
  isValidUsername: (v) => v && v.length >= 3,
  isValidPassword: (v) => v && v.length >= 6,
  isValidEmail: (v) => v && v.includes('@'),
}))

vi.mock('hooks/useIdGenerator', () => ({
  useIdGenerator: () => () => 123,
}))

const mockNavigate = vi.fn()

vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router')

  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

vi.stubGlobal('confirm', vi.fn(() => true))

const createStore = (authState) =>
  configureStore({
    reducer: {
      auth: () => authState,
    },
  })

const renderSignUp = (authState) => {
  const store = createStore(authState)

  return render(
    <Provider store={store}>
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>
    </Provider>
  )
}

beforeEach(() => {
  vi.clearAllMocks()
})

describe('SignUp core functionality tests', () => {
  it('should allow user to type signup details', async () => {
    const user = userEvent.setup()

    renderSignUp({
      isAuthenticated: false,
      status: 'idle',
      error: null,
    })

    await user.type(screen.getByLabelText('username'), 'mdmunna')
    await user.type(
      screen.getByLabelText('email'),
      'mdmunna19434@gmail.com'
    )
    await user.type(screen.getByLabelText('password'), 'secret12')
    await user.type(screen.getByLabelText('confirmPass'), 'secret12')

    expect(screen.getByLabelText('username').value).toBe('mdmunna')
    expect(screen.getByLabelText('email').value).toBe(
      'mdmunna19434@gmail.com'
    )
  })

  it('should call register when form is submitted', async () => {
    const user = userEvent.setup()

    renderSignUp({
      isAuthenticated: false,
      status: 'idle',
      error: null,
    })

    await user.type(screen.getByLabelText('username'), 'mdmunna')
    await user.type(
      screen.getByLabelText('email'),
      'mdmunna19434@gmail.com'
    )
    await user.type(screen.getByLabelText('password'), 'secret12')
    await user.type(screen.getByLabelText('confirmPass'), 'secret12')

    await user.click(
      screen.getByRole('button', { name: /sign up/i })
    )

    await waitFor(() => {
      expect(clearAuthError).toHaveBeenCalled()

      expect(register).toHaveBeenCalledWith({
        id: 123,
        username: 'mdmunna',
        email: 'mdmunna19434@gmail.com',
        password: 'secret12',
      })
    })
  })

  it('should redirect when user is already logged in', async () => {
    renderSignUp({
      isAuthenticated: true,
      status: 'succeeded',
      error: null,
    })

    await waitFor(() => {
      expect(confirm).toHaveBeenCalled()
      expect(mockNavigate).toHaveBeenCalledWith('/')
    })
  })
})
