/** @format */

import { FiSearch } from "react-icons/fi";

import logo from "assets/brand/logo.png";
import NavDesktop from "./NavDesktop";
import Container from "components/ui/Container";
import NavMobile from "./NavMobile";
import SearchInput from "./SearchInput";
import { cn } from "utils/cn";
import { useClickAway } from "hooks/useClickAway";

function Header() {
  const { active, setActive, ref } = useClickAway();
  const toggleSearch = () => {
    setActive(!active);
  };

  return (
    <header className="bg-surface h-16 sm:h-20 w-full fixed shadow-md shadow-black/10">
      <Container className="flex items-center justify-between py-2 sm:py-2.5 lg:py-3 h-full">
        <div className={cn("shrink-0", active ? "hidden md:block" : "block")}>
          {" "}
          <img src={logo} alt="brand-logo" className="h-8 sm:12" />
        </div>
        <div className="flex-1 flex h-full justify-center items-center px-4">
          {active && <SearchInput inputRef={ref} />}
        </div>
        <div
          className={cn(
            "flex items-center gap-4",
            active ? "hidden md:flex" : "flex"
          )}
        >
          {!active && (
            <button
              onClick={toggleSearch}
              className="flex items-center gap-2 text-main hover:opacity-80 transition hover:bg-black/5 px-2 py-2 rounded-lg cursor-pointer"
            >
              <FiSearch /> <span>Search</span>
            </button>
          )}
          <NavDesktop />
          <NavMobile />
        </div>
      </Container>
    </header>
  );
}

export default Header;
