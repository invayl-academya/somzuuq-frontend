import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUpDownIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import FilterProducts from "./FilterProducts";
import { sortOptions } from "@/common";
import { useDispatch, useSelector } from "react-redux";
import { fetchFilteredProducts } from "@/redux/productSlice";
import ProductCard from "./components/ProductCard";
import { useSearchParams } from "react-router-dom";

const ShopProducts = () => {
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState(null);
  const { listProducts } = useSelector((state) => state.products);
  const [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useDispatch();

  const createSearchParamsHelper = (filterParams) => {
    // http://localhost:5173/shop/products?category=men%2women
    const queryParams = [];

    for (const [key, value] of Object.entries(filterParams)) {
      if (Array.isArray(value) && value.length > 0) {
        queryParams.push(`${key}=${encodeURIComponent(value.join(","))}`);
      }
    }
    return queryParams.join("&");
  };

  useEffect(() => {
    const queryString = createSearchParamsHelper(filters);
    setSearchParams(queryString);
  }, [filters]);

  const handleFilter = (key, option) => {
    const updatedFilters = { ...filters };
    const current = updatedFilters[key];

    if (!Array.isArray(current)) {
      updatedFilters[key] = [option];
      // category: ["men", "women"];
    } else {
      const index = current.indexOf(option);
      if (index === -1) {
        updatedFilters[key].push(option);
      } else {
        updatedFilters[key].splice(index, 1);
      }
    }

    setFilters(updatedFilters);
    // console.log(updatedFilters);
    sessionStorage.setItem("filters", JSON.stringify(updatedFilters));

    // console.log(key, option);
  };

  // Load sort & filters on first mount
  useEffect(() => {
    setSort("price-asc");

    const saved = sessionStorage.getItem("filters");

    if (saved) {
      const parsed = JSON.parse(saved);

      const normalized = Object.entries(parsed).reduce((acc, [key, val]) => {
        acc[key] = Array.isArray(val) ? val : [val];
        return acc;
      }, {});
      setFilters(normalized);
    } else {
      // category=men,women
      const queryFilters = {};
      searchParams.forEach((value, key) => {
        queryFilters[key] = decodeURIComponent(value).split(",");
      });

      setFilters(queryFilters);
      sessionStorage.setItem("filters", JSON.stringify(queryFilters));
    }
  }, []);

  useEffect(() => {
    if (sort !== null) {
      const nonEmptyFilters = Object.fromEntries(
        Object.entries(filters).filter(
          ([_, value]) => Array.isArray(value) && value.length > 0
        )
      );
      dispatch(
        fetchFilteredProducts({
          filteredParams: nonEmptyFilters,
          sortParams: sort,
        })
      );
    }
  }, [dispatch, filters, sort]);
  return (
    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 px-4 py-6">
      <FilterProducts filters={filters} handleFilter={handleFilter} />
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-4 border-b-2 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-800"> List Products</h2>
          <div className="flex  items-center gap-3">
            <span className="text-sm text-gray-400"> 2 items</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <ArrowUpDownIcon className="w-4 h-4" />
                  <span>Features</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuGroup value={sort} onValueChange={setSort}>
                  {sortOptions?.map((sortItem) => (
                    <DropdownMenuRadioItem
                      value={sortItem.id}
                      key={sortItem.id}
                    >
                      {sortItem.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-3">
          {listProducts && listProducts.length > 0 ? (
            listProducts.map((product) => (
              <ProductCard product={product} key={product._id} />
            ))
          ) : (
            <p className="text-2xl  text-center  py-4">No Products</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopProducts;
