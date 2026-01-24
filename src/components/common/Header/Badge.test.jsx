import React from 'react'
import { render, screen } from '@testing-library/react'
import Badge from './Badge'

describe('Badge', () => {
  it('should render the children correctly', () => {
    render(<Badge>5</Badge>)
    expect(screen.getByText('5')).toBeInTheDocument()
  })
})
