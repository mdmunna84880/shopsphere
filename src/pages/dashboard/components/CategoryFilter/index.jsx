/** @format */

import { useState } from "react";

import Button from "components/ui/Button";
import Container from "components/ui/Container";

function CategoryFilter({
  activeCategories,
  categories,
  totalItems,
  onSelect,
  searchFor
}) {
  const [value, setValue] = useState("");

  const handleOnChangeSelect = (e) => {
    setValue(e.target.value);
    onSelect(e.target.value);
  };

  return (
    <section className="sticky top-20 bg-page py-3 shadow-sm z-20">
      <Container className="grid grid-cols-2 sm:grid-cols-12">
        <div className="col-span-1 sm:col-span-2">
          <h3 className="capitalize text-lg text-main font-medium whitespace-nowrap">
            {searchFor ? `${searchFor} in `: ""}{activeCategories === "All" ?  "All Products" : activeCategories}
          </h3>
          <p className="text-sm sm:text-base">Items: {totalItems}</p>
        </div>
        <div className=" col-span-0 md:col-span-10 hidden md:flex gap-4 justify-end items-center">
          <Button
            variant={activeCategories === "All" ? "secondary" : "outline"}
            onClick={() => onSelect("All")}
          >
            All
          </Button>
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategories === category ? "secondary" : "outline"}
              onClick={() => onSelect(category)}
              className={"capitalize"}
            >
              {category}
            </Button>
          ))}
        </div>
        <select
          value={value}
          onChange={(e) => handleOnChangeSelect(e)}
          className="capitalize py-1 px-1 border-2 rounded-md border-subtle max-w-60 md:hidden col-span-1 sm:col-span-10 justify-self-end text-main bg-surface self-center"
        >
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
