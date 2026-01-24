import React from "react";
import { FiSearch } from "react-icons/fi";

import logo from "assets/brand/logo.png";
import NavDesktop from "./NavDesktop";
import Container from "components/ui/Container";
import NavMobile from "./NavMobile";
import SearchInput from "./SearchInput";
import Link from "components/ui/Link";
import { cn } from "utils/cn";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router";

function Header() {
  // Tracking search open or closed
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  // Taking referece of the search field to close when there is no search key and outside of click
  const searchRef = useRef(null);
  // Making autofocus on opening search
  const inputRef = useRef(null);
  const [searchParams] = useSearchParams();
  const search = searchParams.get("q");

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleOutsideClick = useCallback(
    (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target))
        setIsSearchOpen(false);
    },
    [searchRef],
  );

  // Making focus when the search is opened
  useEffect(() => {
    if (isSearchOpen) inputRef.current.focus();
  }, [isSearchOpen, inputRef]);

  // Closing the search when there is no words and outside click of search field
  useEffect(() => {
    if (isSearchOpen && !search) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isSearchOpen, handleOutsideClick, search]);

  return (
    <header className="bg-surface h-16 sm:h-20 w-full fixed top-0 shadow-md shadow-black/10 z-50">
      <Container className="flex items-center justify-between py-2 sm:py-2.5 lg:py-3 h-full">
        <div
          className={cn("shrink-0", isSearchOpen ? "hidden md:block" : "block")}
        >
          <Link href="/" variant="nav">
            <img src={logo} alt="brand-logo" className="h-8 sm:12" />
          </Link>
        </div>
        <div className="flex-1 flex h-full justify-center items-center px-4">
          {isSearchOpen && (
            <SearchInput inputRef={inputRef} containerRef={searchRef} />
          )}
        </div>
        <div
          className={cn(
            "flex items-center gap-4",
            isSearchOpen ? "hidden md:flex" : "flex",
          )}
        >
          {!isSearchOpen && (
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
