import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import SliderButton from './SliderButton'

describe('SliderButton', () => {
  it('should call onClick when user clicks the button', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()

    render(
      <SliderButton direction="next" onClick={handleClick} />
    )

    const button = screen.getByRole('button')

    await user.click(button)

    expect(handleClick).toHaveBeenCalledOnce()
  })
})
