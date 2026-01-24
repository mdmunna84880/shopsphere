import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { PaginationDot } from './PaginationDot'

describe('PaginationDot', () => {
  it('should calls onClick function when user clicks  on the dot', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn()

    render(
      <PaginationDot
        isActive={false}
        isPaused={false}
        onClick={handleClick}
      />
    )

    const button = screen.getByRole('button')
    
    await user.click(button)

    expect(handleClick).toHaveBeenCalledOnce()
  })
})
