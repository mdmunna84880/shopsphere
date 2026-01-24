import React from "react";
import { useEffect, useRef } from "react";
import { motion, useAnimate } from "framer-motion";
import { cn } from "utils/cn";

export const PaginationDot = ({ isActive, isPaused, onClick }) => {
  // Animation hook from the motion
  const [scope, animate] = useAnimate();
  const animationRef = useRef(null);
  const isPausedRef = useRef(isPaused);

  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  useEffect(() => {
    if (!isActive) {
      if (animationRef.current) {
        animationRef.current.stop();
        animationRef.current = null;
      }
      animate(scope.current, { width: "0%" }, { duration: 0 });
      return;
    }
    const controls = animate(
      scope.current,
      { width: "100%" },
      { duration: 5, ease: "linear" },
    );

    animationRef.current = controls;
    if (isPausedRef.current) {
      controls.pause();
    }
    return () => {
      controls.stop();
    };
  }, [isActive, animate, scope]);
  useEffect(() => {
    if (animationRef.current) {
      if (isPaused) {
        animationRef.current.pause();
      } else {
        animationRef.current.play();
      }
    }
  }, [isPaused]);

  return (
    <button
      onClick={onClick}
      className={cn(
        "relative h-1 sm:h-1.5 rounded-full overflow-hidden transition-all duration-500 cursor-pointer shadow-sm",
        isActive ? "w-8 sm:w-12 bg-white/20" : "w-1.5 sm:w-2.5 bg-white/20",
      )}
    >
      <motion.div
        ref={scope}
        className="absolute top-0 left-0 h-full bg-on-primary"
        initial={{ width: "0%" }}
      />
    </button>
  );
};
