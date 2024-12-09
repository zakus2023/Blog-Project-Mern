import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import Search from "./Search";

function SideMenu() {
  const [searchParam, setSearchParam] = useSearchParams();

  const handleFilterChange = (e) => {
    // Fixing the logical error in the condition
    if (searchParam.get("sort") !== e.target.value) {
      setSearchParam({
        ...Object.fromEntries(searchParam.entries()),
        sort: e.target.value, // Update the sort parameter
      });
    }
  };

  const handleCategoryChange = (category) => {
    if (searchParam.get("cat") !== category) {
      setSearchParam({
        ...Object.fromEntries(searchParam.entries()),
        cat: category, // Update the sort parameter
      });
    }
  };

  return (
    <div className="px-4 h-max sticky top-8">
      <h1 className="mb-4 text-sm font-medium">Search</h1>
      <Search />
      <h1 className="mt-8 mb-4 text-sm font-medium">Filters</h1>
      <div className="flex flex-col gap-2 text-sm">
        <label htmlFor="" className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="sort"
            value="newest"
            className="appearance-none w-4 h-4 border-[1.5px] border-blue-800 cursor-pointer checked:bg-blue-800 bg-white"
            onChange={handleFilterChange}
            checked={searchParam.get("sort") === "newest"} // Bind checked state
          />
          Newest
        </label>
        <label htmlFor="" className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="sort"
            value="most-popular"
            className="appearance-none w-4 h-4 border-[1.5px] border-blue-800 cursor-pointer checked:bg-blue-800 bg-white"
            onChange={handleFilterChange}
            checked={searchParam.get("sort") === "most-popular"} // Bind checked state
          />
          Most Popular
        </label>
        <label htmlFor="" className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="sort"
            value="trending"
            className="appearance-none w-4 h-4 border-[1.5px] border-blue-800 cursor-pointer checked:bg-blue-800 bg-white"
            onChange={handleFilterChange}
            checked={searchParam.get("sort") === "trending"} // Bind checked state
          />
          Trending
        </label>
        <label htmlFor="" className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="sort"
            value="oldest"
            className="appearance-none w-4 h-4 border-[1.5px] border-blue-800 cursor-pointer checked:bg-blue-800 bg-white"
            onChange={handleFilterChange}
            checked={searchParam.get("sort") === "oldest"} // Bind checked state
          />
          Oldest
        </label>
      </div>
      <h1 className="mt-8 mb-4 text-sm font-medium">Categories</h1>
      <div className="flex flex-col gap-2 text-sm">
        <span
          className="underline cursor-pointer"
          onClick={() => handleCategoryChange("all")}
        >
          All
        </span>
        <span
          className="underline cursor-pointer"
          onClick={() => handleCategoryChange("databases")}
        >
          Databases
        </span>
        <span
          className="underline cursor-pointer"
          onClick={() => handleCategoryChange("aws")}
        >
          AWS
        </span>
        <span
          className="underline cursor-pointer"
          onClick={() => handleCategoryChange("devops")}
        >
          DevOps
        </span>
        <span
          className="underline cursor-pointer"
          onClick={() => handleCategoryChange("azure")}
        >
          Azure
        </span>
        <span
          className="underline cursor-pointer"
          onClick={() => handleCategoryChange("web-design")}
        >
          Web Development{" "}
        </span>
      </div>
    </div>
  );
}
export default SideMenu;
