import React from 'react'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router'

import { CarouselContent } from './CarouselContent'

const mockSlide = {
  tag: 'Test Tag',
  title: 'Test Title',
  subtitle: 'Test Subtitle',
  cta: 'Click Me',
  link: '/test'
}

describe('CarouselContent', () => {
  it('should render slide all slide content correctly', () => {
    render(
      <BrowserRouter>
        <CarouselContent slide={mockSlide} index={0} onInteract={() => {}} />
      </BrowserRouter>
    )

    expect(screen.getByText('Test Tag')).toBeInTheDocument()
    expect(screen.getByText('Test Title')).toBeInTheDocument()
    expect(screen.getByText('Test Subtitle')).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: /click me/i })
    ).toHaveAttribute('href', '/test')
  })
})
