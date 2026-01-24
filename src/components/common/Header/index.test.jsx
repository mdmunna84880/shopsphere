import React from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import Header from './index'
import userEvent from '@testing-library/user-event'


vi.mock('./SearchInput', () => ({
  default: ({ inputRef, containerRef }) => (
    <div ref={containerRef}>
      <input aria-label="search-input" ref={inputRef} />
    </div>
  )
}))

vi.mock('./NavDesktop', () => ({ default: () => <div data-testid="nav-desktop" /> }))
vi.mock('./NavMobile', () => ({ default: () => <div data-testid="nav-mobile" /> }))
vi.mock('components/ui/Container', () => ({
  default: ({ children }) => <div>{children}</div>,
}))
vi.mock('components/ui/Link', () => ({
  default: ({ children }) => <a>{children}</a>,
}))

describe('Header', () => {
  it('should open search input when search button clicked', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    )

    expect(screen.queryByLabelText('search-input')).not.toBeInTheDocument()

    const searchBtn = screen.getByRole('button', { name: /search/i })
    await user.click(searchBtn)

    const input = screen.getByLabelText('search-input')

    expect(input).toBeInTheDocument()
    expect(input).toHaveFocus()
  })
})