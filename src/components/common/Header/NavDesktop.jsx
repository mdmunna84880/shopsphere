/** @format */
import React from "react";
import { useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router";

import { navLinks } from "./navLinks";
import { cn } from "utils/cn";
import Badge from "./Badge";
import {selectCartTotals} from "store/cartSelector"


function NavDesktop() {
  const { cartTotalQuantity } = useSelector(selectCartTotals);
  const { items: wishlistItem } = useSelector((state) => state.wishlist);
  // Current url
  const { pathname } = useLocation();

  return (
    <ul className="hidden lg:flex lg:items-center gap-4 text-sm py-2">
      {navLinks.map(({ label, href, hasBadge, icon }) => {
        const Icon = icon;
         return <li key={label} className="group relative">
              <NavLink
                to={href}
                className={cn(
                  "relative text-main hover:opacity-80 transition flex gap-2 items-center hover:bg-black/5 px-2 py-2 rounded-lg",
                )}
              >
                {<Icon />} {label}{" "}
                {hasBadge && label === "Wishlist" && wishlistItem.length > 0 && <Badge>{wishlistItem.length}</Badge>}
                {hasBadge && label === "Cart" && cartTotalQuantity > 0 && <Badge>{cartTotalQuantity}</Badge>}
              </NavLink>
              {pathname === href && (
                <span className="absolute -bottom-0.5 bg-main w-full h-px rounded-2xl font-medium" />
              )}
            </li>
        }
      )}
    </ul>
  );
}

export default NavDesktop;
