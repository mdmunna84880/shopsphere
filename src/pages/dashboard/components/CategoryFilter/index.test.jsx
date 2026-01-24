import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import CategoryFilter from './index'


vi.mock('components/ui/Button', () => ({
  default: ({ children, onClick }) => (
    <button onClick={onClick}>{children}</button>
  ),
}))

vi.mock('components/ui/Container', () => ({
  default: ({ children }) => <div>{children}</div>,
}))

vi.mock('components/common/Error', () => ({
  default: () => <div>Error Component</div>,
}))

vi.mock('./Skeleton', () => ({
  default: () => <div>Skeleton Loader</div>,
}))

const baseProps = {
  currCategory: 'All',
  categories: ['electronics', 'fashion'],
  totalItems: 20,
  onSelect: vi.fn(),
  searchFor: '',
  error: false,
  loading: false,
}

beforeEach(() => {
  vi.clearAllMocks()
})

describe('CategoryFilter', () => {
  it('should show current category and total item count', () => {
    render(<CategoryFilter {...baseProps} />)

    expect(screen.getByText('All Products')).toBeInTheDocument()
    expect(screen.getByText(/items:\s*20/i)).toBeInTheDocument()
  })

  it('should call onSelect function when clicking a category button', async () => {
    const user = userEvent.setup();

    render(<CategoryFilter {...baseProps} />)

    const desktopButton = screen.getByRole('button', { name: /electronics/i })
    await user.click(desktopButton)

    expect(baseProps.onSelect).toHaveBeenCalledWith('electronics')
  })

  it('should call onSelect when category is changed from mobile select dropdown',async() => {
    const user = userEvent.setup();

    render(<CategoryFilter {...baseProps} />)

    await user.selectOptions(screen.getByRole('combobox'), 'fashion')

    expect(baseProps.onSelect).toHaveBeenCalledWith('fashion')
  })

  it('should update mobile dropdown value when currCategory changes', () => {

    const { rerender } = render(
      <CategoryFilter {...baseProps} currCategory="All" />
    )

    rerender(
      <CategoryFilter {...baseProps} currCategory="electronics" />
    )

    expect(screen.getByRole('combobox')).toHaveValue('electronics')
  })

  it('should show error Error Component', () => {
    render(<CategoryFilter {...baseProps} error={true} />)
    expect(screen.getByText('Error Component')).toBeInTheDocument()
  })

  it('should display skeleton loader when loading is true', () => {
    render(<CategoryFilter {...baseProps} loading={true} />)
    expect(screen.getByText('Skeleton Loader')).toBeInTheDocument()
  })
})