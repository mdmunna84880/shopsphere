/** @format */

import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useSearchParams } from "react-router";
import { cn } from "utils/cn";

function SearchInput({ inputRef, containerClass, inputClass, ...props }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const newQuery = searchParams.get("q");
  const [searchKey, setSearchKey] = useState(newQuery || "");
  const [lastQuery, setLastQuery] = useState(newQuery);

  // Change the searchKey based on the query if it is opened after back or some way
  if (newQuery !== lastQuery) {
    setLastQuery(newQuery);
    setSearchKey(newQuery);
  }
  // To update search field
  const handleKeyChange = (e) => {
    setSearchKey(e.target.value);
  };

  // Search by updating the query
  const handleSearch = (e) => {
    if (e.key === "Enter") {
      setSearchParams((prev) => {
        if (searchKey.trim()) {
          prev.set("q", searchKey);
        } else {
          prev.delete("q");
        }
        return prev;
      });
    }
  };
  return (
    <div
      className={cn(
        "max-w-2xl flex-1 flex items-center border border-subtle rounded-lg px-1 py-1 bg-page  focus-within:ring-1 focus-within:ring-accent/40 group",
        containerClass
      )}
    >
      <div className="p-0.5">
        <FiSearch className="text-sm text-muted" />
      </div>
      <input
        type="text"
        value={searchKey}
        onChange={handleKeyChange}
        onKeyDown={handleSearch}
        className={cn(
          "flex-1 outline-none text-main placeholder:text-muted transition-all",
          inputClass
        )}
        ref={inputRef}
        {...props}
      />
    </div>
  );
}

export default SearchInput;
