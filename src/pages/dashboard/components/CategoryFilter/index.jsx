import React from "react";
import { useEffect, useState } from "react";

import Button from "components/ui/Button";
import Container from "components/ui/Container";
import Skeleton from "./Skeleton";
import Error from "components/common/Error";

function CategoryFilter({
  currCategory,
  categories,
  totalItems,
  onSelect,
  searchFor,
  error,
  loading,
}) {
  const [value, setValue] = useState(currCategory);

  // Handling categories filter on mobile
  const handleOnChangeSelect = (e) => {
    setValue(e.target.value);
    onSelect(e.target.value);
  };

  // Changing the mobile category if prop is changed
  useEffect(()=>{
    setValue(currCategory);
  }, [currCategory])

  // Error occurs from api
  if (error) return <Error />;

  // If content is loading
  if (loading) return <Skeleton />;

  return (
    <section className="sticky top-20 bg-page py-3 shadow-sm z-20">
      <Container className="grid grid-cols-2 sm:grid-cols-12">
        {/* Selected Category and Items available within the selectec category */}
        <div className="col-span-1 sm:col-span-2">
          <h3 className="capitalize text-lg text-main font-medium whitespace-nowrap">
            {searchFor ? `${searchFor} in ` : ""}
            {currCategory === "All" ? "All Products" : currCategory}
          </h3>
          <p className="text-sm sm:text-base">Items: {totalItems}</p>
        </div>
        {/* Buttons for category change */}
        <div className=" col-span-0 md:col-span-10 hidden md:flex gap-4 justify-end items-center">
          <Button
            variant={currCategory === "All" ? "secondary" : "outline"}
            onClick={() => onSelect("All")}
          >
            All
          </Button>
          {categories.map((category) => (
            <Button
              key={category}
              variant={currCategory === category ? "secondary" : "outline"}
              onClick={() => onSelect(category)}
              className={"capitalize"}
            >
              {category}
            </Button>
          ))}
        </div>
        {/* Mobile Category filter */}
        <select
          value={value}
          onChange={handleOnChangeSelect}
          className="capitalize py-1 px-1 border-2 rounded-md border-subtle max-w-60 md:hidden col-span-1 sm:col-span-10 justify-self-end text-main bg-surface self-center"
        >
          {/* Options to select or change the category */}
          <option value="All">All</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </Container>
    </section>
  );
}

export default CategoryFilter;
