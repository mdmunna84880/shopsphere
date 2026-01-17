import clsx from "clsx"
import { twMerge } from "tailwind-merge"

export const cn = (...input)=>{
    // twMerge to merge tailwind classes without conflict and clsx for conditional classes.
    return twMerge(clsx(input));
}