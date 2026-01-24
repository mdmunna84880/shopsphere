import React from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import userEvent from '@testing-library/user-event'

import SearchInput from './SearchInput'

vi.mock('components/ui/Button', () => ({
  default: ({ children, onClick, disabled }) => (
    <button onClick={onClick} disabled={disabled} aria-label="clear">
      {children}
    </button>
  ),
}))

describe('SearchInput', () => {
  it('should update input field when the user is typing', async () => {
    const user = userEvent.setup()
    const inputRef = { current: null }

    render(
      <MemoryRouter>
        <SearchInput inputRef={inputRef} />
      </MemoryRouter>
    )

    const input = screen.getByRole('textbox')
    await user.type(input, 'phone')

    expect(input.value).toBe('phone')
  })

  it('should clear search when the X button is clicked', async () => {
    const user = userEvent.setup();
    const inputRef = { current: null }

    render(
      <MemoryRouter initialEntries={['/?q=test']}>
        <SearchInput inputRef={inputRef} />
      </MemoryRouter>
    )

    const clearButton = screen.getByRole('button') 
    await user.click(clearButton)
    
    expect(screen.getByRole('textbox').value).toBe('')
  })
})