/** @format */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router";

import { navLinks } from "./navLinks";
import { cn } from "utils/cn";
import Badge from "./Badge";
import {selectCartTotals} from "store/cartSelector"
import { FiLogIn, FiLogOut } from "react-icons/fi";
import Button from "components/ui/Button";
import { logout } from "store/slices/authSlice";


function NavDesktop() {
  const dispatch = useDispatch();
  
  // Getting some data from store like carttotalquantity, wishlistItem, authentication state
  const { cartTotalQuantity } = useSelector(selectCartTotals);
  const { items: wishlistItem } = useSelector((state) => state.wishlist);
  const {isAuthenticated} = useSelector((state)=>state.auth);

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
      {/* If authenticated then Login otherwise Logout */}
      {!isAuthenticated && <li className="group relative">
              <NavLink
                to={"/login"}
                className={cn(
                  "relative text-main hover:opacity-80 transition flex gap-2 items-center hover:bg-black/5 px-2 py-2 rounded-lg",
                )}
              >
               <FiLogIn /> Login
              </NavLink>
              {pathname === "/login" && (
                <span className="absolute -bottom-0.5 bg-main w-full h-px rounded-2xl font-medium" />
              )}
            </li>}
      {isAuthenticated && <li className="group relative">
              <Button
                leftIcon={<FiLogOut />}
                variant="transparent"
                className={cn(
                  "relative text-main hover:opacity-80 transition flex gap-2 items-center hover:bg-black/5 px-2 py-2 rounded-lg hover:no-underline font-normal",
                )}
                onClick={()=>dispatch(logout())}
              >
                Logout
              </Button>
              {pathname === "login" && (
                <span className="absolute -bottom-0.5 bg-main w-full h-px rounded-2xl font-medium" />
              )}
            </li>}
    </ul>
  );
}

export default NavDesktop;
