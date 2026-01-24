/** @format */
import React from "react";
import Button from "components/ui/Button";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { useSearchParams } from "react-router";
import { cn } from "utils/cn";

function SearchInput({
  inputRef,
  containerRef,
  containerClass,
  inputClass,
  ...props
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const newQuery = searchParams.get("q");
  const [searchKey, setSearchKey] = useState(newQuery || "");
  const [lastQuery, setLastQuery] = useState(newQuery);

  // Change the searchKey based on the query if it is opened after back or some way
  if (newQuery !== lastQuery) {
    setLastQuery(newQuery);
    setSearchKey(newQuery || "");
  }

  // To update search field
  const handleKeyChange = (e) => {
    setSearchKey(e.target.value);
  };

  // Search by updating the query
  const handleSearch = (e) => {
    if (e.key === "Enter") {
      setSearchParams((prev) => {
        const params = new URLSearchParams(prev);
        if (searchKey.trim()) {
          params.set("q", searchKey);
        } else {
          params.delete("q");
        }
        return params;
      });
      inputRef.current.blur();
    }
  };

  // Clear search function
  const handleClearSearch = () => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.delete("q");
      return params;
    });
  };

  return (
    <div
      className={cn(
        "max-w-2xl flex-1 flex items-center border border-subtle rounded-lg px-1 py-1 bg-page  focus-within:ring-1 focus-within:ring-accent group",
        containerClass,
      )}
      ref={containerRef}
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
          inputClass,
        )}
        ref={inputRef}
        {...props}
      />
      <Button
        variant="outline"
        size={"sm"}
        disabled={!searchKey}
        onClick={handleClearSearch}
        className={"p-1"}
      >
        <IoMdClose className="h-5 w-5" />
      </Button>
    </div>
  );
}

export default SearchInput;
