import React from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { cn } from "utils/cn";

export default function SliderButton({ direction, onClick, className }) {
  const Icon = direction === "prev" ? FiChevronLeft : FiChevronRight;
  const positionClass =
    direction === "prev" ? "left-2 sm:left-4" : "right-2 sm:right-4";

  return (
    <button
      onClick={onClick}
      className={cn(
        "flex absolute top-1/2 -translate-y-1/2 z-30 p-1 sm:p-1.5 rounded-md bg-white/10 border border-white/10 text-white backdrop-blur-md transition-all duration-300 hover:bg-on-primary hover:text-primary hover:scale-110 active:scale-95 opacity-100 md:opacity-0 md:group-hover:opacity-100",
        positionClass,
        className
      )}
    >
      <Icon size={24} className="w-4 h-4 sm:w-5 sm:h-5" />
    </button>
  );
}
