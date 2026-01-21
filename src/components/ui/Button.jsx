import { motion } from "framer-motion";

import { cn } from "utils/cn";

const BUTTON_VARIANTS = {
  primary: "bg-primary text-on-primary border border-primary hover:opacity-90",
  secondary: "bg-secondary text-on-primary border border-secondary hover:opacity-90",
  accent: "bg-accent text-main border border-accent hover:opacity-90",
  ghost: "bg-transparent text-primary border border-subtle hover:bg-black/5",
  outline: "bg-transparent text-main border border-subtle hover:bg-black/5",
  destructive: "bg-error text-on-primary border border-error hover:opacity-90",
  disabled: "bg-black/10 text-muted border border-subtle cursor-not-allowed shadow-none",
};

const BUTTON_SIZES = {
  sm: "px-3 py-1.5 text-xs rounded-sm",
  md: "px-4 py-2 text-sm rounded-md",
  lg: "px-6 py-3 text-base rounded-lg",
};

const PRESS_MOTION = {
  whileHover: {
    scale: 1.04
  },
  whileTap: {
    scale: 0.96,
  },
  transition: {
    type: "spring",
    stiffness: 500,
    damping: 25
  },
};


export default function Button({
  variant = "primary",
  size = "md",
  leftIcon,
  rightIcon,
  loading = false,
  disabled = false,
  fullWidth = false,
  children,
  className,
  type = "button",
  ref,
  ...props
}) {
  const isDisabled = disabled || loading || variant === "disabled";
  const baseClasses = cn(
    "relative inline-flex items-center justify-center gap-2 font-medium shadow-sm transition-all",
    fullWidth ? "w-full" : "",
  );

  return (
    <motion.button
      ref={ref}
      type={type}
      disabled={isDisabled}
      aria-disabled={isDisabled}
      aria-busy={loading}
      className={cn(
        baseClasses,
        BUTTON_VARIANTS[isDisabled ? "disabled" : variant],
        BUTTON_SIZES[size],
        className,
      )}
      {...(!isDisabled ? PRESS_MOTION : {})}
      {...props}
    >
      {loading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <div className="h-4 w-4 spinner" />
        </span>
      )}
      <span className={cn("flex items-center gap-2", loading && "opacity-0")}>
        {leftIcon && <span className="shrink-0">{leftIcon}</span>}
        <span className="whitespace-nowrap">{children}</span>
        {rightIcon && <span className="shrink-0">{rightIcon}</span>}
      </span>
    </motion.button>
  );
};
