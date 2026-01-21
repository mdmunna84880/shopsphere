import { Link as RouterLink } from "react-router";
import { motion } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";

import { cn } from "utils/cn";

const MotionRouterLink = motion.create(RouterLink);
const MotionAnchor = motion.a;

const LINK_BASE = cn(
  "inline-flex items-center gap-1 font-medium no-underline cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded-sm",
);

const LINK_VARIANTS = {
  default: "text-primary hover:underline underline-offset-4",
  nav: "text-main hover:text-primary transition-colors",
  muted: "text-muted hover:text-main transition-colors",
};

const LINK_CTA_VARIANTS = {
  primary: "px-4 py-2 rounded-md bg-primary text-on-primary hover:opacity-90 shadow-sm",
  secondary: "px-4 py-2 rounded-md bg-secondary text-on-primary hover:opacity-90 shadow-sm",
  outline: "px-4 py-2 rounded-md border border-subtle text-main hover:bg-black/5",
};

export default function Link({ href = "#", variant = "default", external = false, disabled = false, children, className, target, ref, ...props }) {
  // Whether the link is internal or external
  const isInternal = /^\/|^#/.test(href);
  const isExternal = external || target === "_blank" || !isInternal;

  // Render Link from react-router if that is internal otherwise anchor tag
  const Component = isExternal ? MotionAnchor : MotionRouterLink;
  const linkProps = isExternal ? {
                                    href,
                                    target: target || (!isInternal ? "_blank" : undefined),
                                    rel:  target === "_blank" || !isInternal ? "noopener noreferrer" : undefined,
                                  }
                                  : 
                                  { 
                                    to: href 
                                  };

  if (disabled) {
    linkProps.onClick = (e) => e.preventDefault();
  }
  const isCTA = variant in LINK_CTA_VARIANTS;

  const resolvedClasses = cn(
    LINK_BASE,
    isCTA ? LINK_CTA_VARIANTS[variant] : LINK_VARIANTS[variant] || LINK_VARIANTS.default,
    disabled && "pointer-events-none opacity-60",
    className,
  );

  return (
    <Component
      ref={ref}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : undefined}
      className={resolvedClasses}
      {...linkProps}
      {...props}
    >
      <span>{children}</span>
      {!isCTA && isExternal && (
        <span aria-hidden className="ml-0.5 text-[0.7em] opacity-70">
          <FiArrowUpRight/>
        </span>
      )}
    </Component>
  );
};
