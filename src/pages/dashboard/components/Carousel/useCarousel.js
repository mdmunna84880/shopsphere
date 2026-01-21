import { useState, useEffect, useCallback, useRef } from 'react';

export const useCarousel = (slideCount, fullDuration = 5000) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  const startTimeRef = useRef(null);
  const remainingTimeRef = useRef(fullDuration);
  const timerRef = useRef(null);

  const paginate = useCallback((newDirection) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => {
      let next = prev + newDirection;
      if (next < 0) next = slideCount - 1;
      if (next >= slideCount) next = 0;
      return next;
    });
    remainingTimeRef.current = fullDuration;
  }, [slideCount, fullDuration]);

  useEffect(() => {
    if (isPaused) {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (startTimeRef.current) {
        const elapsed = Date.now() - startTimeRef.current;
        remainingTimeRef.current = Math.max(0, remainingTimeRef.current - elapsed);
      }
      return;
    }
    startTimeRef.current = Date.now();
    timerRef.current = window.setTimeout(() => {
      paginate(1);
    }, remainingTimeRef.current);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isPaused, paginate, currentIndex]); 

  return {
    currentIndex,
    direction,
    isPaused,
    setIsPaused,
    paginate
  };
};