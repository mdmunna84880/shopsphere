import { Squash as Hamburger } from "hamburger-react";
import { navLinks } from "./navLinks";
import { NavLink } from "react-router";
import Badge from "./Badge";
import { useClickAway } from "hooks/useClickAway";

function NavMobile() {
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
          <div className="fixed inset-0 bg-black/5 backdrop-blur-xs" />
          <ul
            className="fixed right-0 top-0 pt-20 flex flex-col bg-surface min-h-screen w-70 gap-3"
            ref={ref}
          >
            {navLinks.map(({ label, href, icon, hasBadge }) => {
              const Icon = icon;
              return (
                <li className="border border-subtle mx-3 rounded-lg px-2 py-2.5">
                  <NavLink
                    to={href}
                    className="relative flex items-center gap-4 whitespace-nowrap "
                  >
                    <Icon /> {label}
                    {hasBadge && <Badge className="left-1.5 -top-2">99</Badge>}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
}

export default NavMobile;
