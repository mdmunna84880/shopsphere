
import { NavLink, useLocation } from "react-router";
import { navLinks } from "./navLinks";
import { cn } from "utils/cn";
import Badge from "./Badge";

function NavDesktop() {
  // Current url
  const {pathname} = useLocation();
  
  return (
    <ul className="hidden lg:flex lg:items-center gap-4 text-sm py-2">
      {navLinks.map(({ label, href, hasBadge, icon }) => {
        const Icon = icon;
        if (hasBadge) {
          return (
            <li key={label} className="group relative">
              <NavLink
                to={href}
                className={cn(
                    "relative text-main hover:opacity-80 transition flex gap-2 items-center hover:bg-black/5 px-2 py-2 rounded-lg"
                  )
                }
              >
                {<Icon />} {label} <Badge>0</Badge>
              </NavLink>
              {pathname === href && <span className="absolute -bottom-0.5 bg-main w-full h-px rounded-2xl font-medium"/>}
            </li>
          );
        } else {
          return (
            <li key={label} className="group relative">
              <NavLink
                to={href}
                className={
                  "text-main hover:opacity-80 transition flex gap-2 items-center hover:bg-black/5 px-2 py-2 rounded-lg"
                }
              >
                {<Icon />} {label}
              </NavLink>
              {pathname === href && <span className="absolute -bottom-0.5 bg-main w-full h-px rounded-2xl"/>}
            </li>
          );
        }
      })}
    </ul>
  );
}

export default NavDesktop;
