"use client";

import { Search } from "lucide-react";
import Link from "next/link";
import { on } from "node:events";
import { useState } from "react";
import { MdMyLocation } from "react-icons/md";

const SearchBar = () => {
  const [search, setSearch] = useState("");

  const onChangeHandler = (event: string) => {
    setSearch(event);
  };

  const onSubmitHandler = () => {
    console.log(search);
  };

  return (
    <nav className="flex justify-center items-center space-x-3 mb-4 bg-w">
      <Link href="/" className="text-2xl text-gray-600">
        <MdMyLocation className="inline-block text-purple-600" />
      </Link>
      <input
        className="rounded-lg p-2 w-full md:w-1/3 border bg-transparent border-purple-600"
        type="search"
        placeholder="Search..."
        value={search}
        onChange={(e) => onChangeHandler(e.target.value)}
      />
      <button type="submit" className="" onClick={onSubmitHandler}>
        <Search className="inline-block text-purple-600" />
      </button>
    </nav>
  );
};

export default SearchBar;
