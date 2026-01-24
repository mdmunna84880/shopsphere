import React from "react";
import { cn } from "utils/cn";

function Badge({children, className}) {
    return ( <span className={cn('absolute -top-0.5 left-3 px-1 text-xs border border-subtle text-main bg-accent/15 rounded-md', 
        className
    )}>{children}</span> );
}

export default Badge;