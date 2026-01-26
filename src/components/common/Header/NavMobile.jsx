import { Squash as Hamburger } from "hamburger-react";
import { useDispatch, useSelector } from "react-redux";
import { FiLogOut, FiLogIn } from "react-icons/fi";

import { navLinks } from "./navLinks";
import { NavLink } from "react-router";
import Badge from "./Badge";
import { selectCartTotals } from "store/cartSelector";
import { useClickAway } from "hooks/useClickAway";
import Button from "components/ui/Button";
import { logout } from "store/slices/authSlice";

function NavMobile() {
  const dispatch = useDispatch();
  // Getting some data from store like carttotalquantity, wishlistItem, authentication state
  const { cartTotalQuantity } = useSelector(selectCartTotals);
  const { items: wishlistItem } = useSelector((state) => state.wishlist);
  const { isAuthenticated } = useSelector((state) => state.auth);

  // use clickaway hook to handle manubar
  const { ref, setActive, active } = useClickAway();

  return (
    <div className="lg:hidden">
      <div
        className="relative z-40 lg:hidden"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <Hamburger
          toggled={active}
          toggle={() => setActive(!active)}
          color={"#0C2C55"}
          size={20}
          rounded
          label="Display menu items"
        />
      </div>

      {active && (
        <>
          <div className="fixed inset-0 bg-black/5 backdrop-blur-xs z-30" />
          <ul
            className="fixed right-0 top-0 pt-20 flex flex-col bg-surface min-h-screen w-70 gap-3 z-30"
            ref={ref}
          >
            {navLinks.map(({ label, href, icon, hasBadge }) => {
              const Icon = icon;
              return (
                <li
                  key={href}
                  className="border border-subtle mx-3 rounded-lg px-2 py-2.5"
                >
                  <NavLink
                    to={href}
                    className="relative flex items-center gap-4 whitespace-nowrap "
                  >
                    <Icon /> {label}
                    {hasBadge && label === "Cart" && cartTotalQuantity > 0 && (
                      <Badge className="left-1.5 -top-2">
                        {cartTotalQuantity}
                      </Badge>
                    )}
                    {hasBadge &&
                      label === "Wishlist" &&
                      wishlistItem.length > 0 && (
                        <Badge className="left-1.5 -top-2">
                          {wishlistItem.length}
                        </Badge>
                      )}
                  </NavLink>
                </li>
              );
            })}
            {/* If authenticated then Login otherwise Logout */}
            {!isAuthenticated && (
              <li className="border border-subtle mx-3 rounded-lg px-2 py-2.5">
                <NavLink
                  to={"/login"}
                  className="relative flex items-center gap-4 whitespace-nowrap "
                >
                  <FiLogIn />
                  Login
                </NavLink>
              </li>
            )}
            {isAuthenticated && (
              <li className="border border-subtle mx-3 rounded-lg px-2 py-2.5">
                <Button
                  variant="transparent"
                  leftIcon={<FiLogOut/>}
                  className="p-0 text-black font-normal"
                  btnCN={"gap-4 text-base"}
                  onClick={()=>dispatch(logout())}
                >
                  Logout
                </Button>
              </li>
            )}
          </ul>
        </>
      )}
    </div>
  );
}

export default NavMobile;
