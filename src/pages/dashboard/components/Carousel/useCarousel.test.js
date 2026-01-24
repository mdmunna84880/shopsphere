import { renderHook, act } from '@testing-library/react'
import { useCarousel } from './useCarousel'

describe('useCarousel', () => {

  it('should start from the first slide', () => {
    const { result } = renderHook(() => useCarousel(5))

    expect(result.current.currentIndex).toBe(0)
  })

  it('should move to the second slide when it paginate is called with 1', () => {
    const { result } = renderHook(() => useCarousel(5))

    act(() => {
      result.current.paginate(1)
    })

    expect(result.current.currentIndex).toBe(1)
  })

  it('should goes to last slide when user click on previous button', () => {
    const { result } = renderHook(() => useCarousel(3))

    act(() => {
      result.current.paginate(-1)
    })

    expect(result.current.currentIndex).toBe(2)
  })

  it('should not change slide while user pressed the slide', () => {
    vi.useFakeTimers()

    const { result } = renderHook(() => useCarousel(3, 5000))

    act(() => {
      result.current.setIsPaused(true)
    })

    act(() => {
      vi.advanceTimersByTime(2000)
    })

    expect(result.current.currentIndex).toBe(0)

    vi.useRealTimers()
  })
})
