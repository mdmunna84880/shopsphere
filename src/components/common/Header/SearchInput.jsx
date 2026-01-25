import React from "react";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { useLocation, useNavigate, useSearchParams } from "react-router";

import Input from "components/ui/Input";
import Button from "components/ui/Button";

function SearchInput({
  inputRef,
  containerRef,
  ...props
}) {
  // React router navigation to handle navigation programmatically
  const navigate = useNavigate();
  // Search params to handle search
  const [searchParams, setSearchParams] = useSearchParams();
  // Current location
  const currPath = useLocation();

  const newQuery = searchParams.get("q");
  const [searchKey, setSearchKey] = useState(newQuery || "");
  const [lastQuery, setLastQuery] = useState(newQuery);

  // Change the searchKey based on the query if it is opened after back or some way
  if (newQuery !== lastQuery) {
    setLastQuery(newQuery);
    setSearchKey(newQuery || "");
  }

  // To update search field every time the user clicking
  const handleKeyChange = (e) => {
    setSearchKey(e.target.value);
  };

  // Search function
  const doSearch = (query)=>{
    const trimmedQuery = query.trim();

    if(trimmedQuery === lastQuery && currPath.pathname === "/") return;

    const params = new URLSearchParams(searchParams);
    if(searchKey.trim()) params.set("q", searchKey);
    else params.delete("q");
    
    navigate({
      pathname: "/",
      search: `?${params.toString()}`
    });
  }


  // Search by updating the query
  const handleUserSearch = (e) => {
    if(e.key === "Enter"){
      doSearch(searchKey);
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
    setSearchKey("");
  };

  // Searching auto when user leaving some text in the input field
  const handleAutoSearch = ()=>{
    setTimeout(()=>{
      doSearch(searchKey);
    },
    150
  )
  }

  // Clear button
  const rightEl = <Button
                            variant="destructive"
                            size={"sm"}
                            disabled={!searchKey}
                            onClick={handleClearSearch}
                            className={"p-1"}
                    >
                      <IoMdClose className="h-5 w-5" />
                    </Button>

  return (
    <Input
        type="text"
        value={searchKey}
        onChange={handleKeyChange}
        onKeyDown={handleUserSearch}
        onBlur={handleAutoSearch}
        leftSpanEl={<FiSearch className="text-sm text-muted" />}
        mainBoxCN={"focus-within:ring-2 focus-within:ring-primary/60"}
        rightSpanEl= {rightEl}
        containerRef={containerRef}
        ref={inputRef}
        {...props}
      />
  );
}

export default SearchInput;
