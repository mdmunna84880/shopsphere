import React, { useState, useId } from "react";
import { LuEye, LuEyeOff } from "react-icons/lu";

import { cn } from "utils/cn";
import Button from "./Button";

const INPUT_VARIANTS = {
  primary: "bg-white border-subtle focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20",
  secondary: "bg-secondary border-subtle text-on-primary",
  ghost: "bg-transparent border-subtle focus-within:bg-black/5",
  success: "border-accent text-accent focus-within:ring-accent/20",
  error: "border-error text-error focus-within:ring-error/20",
  disabled: "bg-black/10 text-muted border-subtle cursor-not-allowed",
};

const INPUT_SIZES = {
  sm: "px-2 py-1 text-sm h-8",
  md: "px-3 py-2 text-base h-10",
  lg: "px-4 py-3 text-lg h-12",
};

const Input = ({
  label,
  error,
  variant = "primary",
  size = "md",
  leftSpanEl,
  rightSpanEl,
  type = "text",
  boxClassName = "",
  className,
  labelCN,
  mainBoxCN,
  id,
  ref,
  containerRef,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const generatedId = useId();
  const inputId = id || generatedId;

  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  const variantStyles = INPUT_VARIANTS[variant] || INPUT_VARIANTS.primary;
  const sizeStyles = INPUT_SIZES[size] || INPUT_SIZES.md;

  return (
    <div className={cn("flex flex-col gap-1.5 w-full", boxClassName)} ref={containerRef}>
      {/* Label */}
      {label && (
        <label htmlFor={inputId} className={cn("text-sm font-medium text-main", labelCN)}>
          {label}
        </label>
      )}

      <div
        className={cn(
          "relative flex items-center gap-2 transition-all border rounded-md group",
          variantStyles,
          sizeStyles,
          error && "border-error focus-within:ring-error/20",
          mainBoxCN
        )}
      >
        {/* Left Icon */}
        {leftSpanEl && (
          <span className="text-muted group-focus-within:text-primary transition-colors shrink-0">
            {leftSpanEl}
          </span>
        )}
        {/* Inpute field */}
        <input
          id={inputId}
          ref={ref}
          type={inputType}
          className={cn(
            "bg-transparent w-full h-full outline-none placeholder:text-muted disabled:cursor-not-allowed",
            className,
          )}
          disabled={variant === "disabled"}
          {...props}
        />
        <div className="flex items-center shrink-0">
          {isPassword ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowPassword(!showPassword)}
              className="h-7 w-7 p-0 text-muted hover:text-main border-none shadow-none"
              tabIndex={-1}
            >
              {showPassword ? <LuEyeOff size={16} /> : <LuEye size={16} />}
            </Button>
          ) : (
            rightSpanEl && <span className="text-muted">{rightSpanEl}</span>
          )}
        </div>
      </div>
      {error && (
        <p id={`${inputId}-error`} className="text-xs text-error font-medium">
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;
