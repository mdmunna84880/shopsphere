
import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router";

import {
  getCategories,
  getProducts,
  getProductsByCategory,
} from "store/slices/productSlice";
import CategoryFilter from "./components/CategoryFilter";
import Pagination from "./components/Pagination";
import Carousel from "./components/Carousel";
import ValuePropostion from "./components/ValueProposition";
import Product from "./components/Product";

const PAGE_THRESHOLD = 8;

function Dashboard() {
  const dispatch = useDispatch();
  const { items, error, status, categories } = useSelector(
    (state) => state.products,
  );

  // Initialising category to All
  const [activeCategory, setActiveCategory] = useState("All");

  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("q") || "";

  // Taking search for changing the page to 1
  const prevSearch = useRef(search);
  // Taking reference of div element just above the categoryElement
  const categoryTopElementRef = useRef(null);

  // Filtering the products based on the query
  const searchFilteredProducts = useMemo(() => {
    if (!search) return items;
    return items.filter(
      (item) =>
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.category.toLowerCase().includes(search.toLowerCase()),
    );
  }, [items, search]);

  const pageNo = Number(searchParams.get("page") || 1);

  // Total page no of the products
  const totalPages = Math.ceil(searchFilteredProducts.length / PAGE_THRESHOLD);

  // No of products that will be shown to the specif page no.
  const displayedProducts = useMemo(() => {
    return searchFilteredProducts.slice(
      Math.max((pageNo - 1) * PAGE_THRESHOLD, 0),
      Math.min(pageNo * PAGE_THRESHOLD, searchFilteredProducts.length),
    );
  }, [searchFilteredProducts, pageNo]);

  // Replacing the page no via page on specific page no.
  const handlePageOnClick = (page) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set("page", page);
      return params;
    });
  };

  // Reducing the page count by 1
  const handlePrevOnClick = () => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set("page", Number(prev.get("page") || 1) - 1);
      return params;
    });
  };

  // Incresing the page count by one
  const handleNextOnClick = () => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set("page", Number(prev.get("page") || 1) + 1);
      return params;
    });
  };

  // Handling category change to render
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setSearchParams((prev)=>{
      const params = new URLSearchParams(prev);
      params.delete("page");
      return params;
    })
  };

  // Dispatching all categories
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch, categories.length]);

  // Dispatching producs either via category or all products
  useEffect(() => {
    if (activeCategory === "All") {
      dispatch(getProducts());
    } else {
      dispatch(getProductsByCategory(activeCategory));
    }
  }, [activeCategory, dispatch]);

  // Setting page to 1 whenever the search is being searched.
  useEffect(() => {
    if (prevSearch.current !== search) {
      setSearchParams((prev) => {
        const params = new URLSearchParams(prev);
        params.delete("page");
        return params;
      });
      prevSearch.current = search;
    }
  }, [search, setSearchParams]);

  useEffect(() => {
    if (pageNo > 1) {
      categoryTopElementRef.current?.scrollIntoView({ behavior: "smooth" });
    }else{
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [pageNo]);

  return (
    <div>
      <Carousel />
      <ValuePropostion />
      <div ref={categoryTopElementRef} style={{scrollMarginTop: "40px"}}/>
      <CategoryFilter
        categories={categories}
        activeCategories={activeCategory}
        searchFor={search}
        status={status}
        error={error}
        totalItems={displayedProducts.length}
        onSelect={handleCategoryChange}
      />
      <Product products={displayedProducts} />
      {
        totalPages > 1 && <Pagination
        prevOnClick={handlePrevOnClick}
        nextOnClick={handleNextOnClick}
        noOfPages={totalPages}
        pageOnClick={handlePageOnClick}
      />
      }
    </div>
  );
}

export default Dashboard;
