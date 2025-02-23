"use client";

import { Search } from "lucide-react";
import Link from "next/link";

import { useState } from "react";
import { MdMyLocation } from "react-icons/md";
import { useRouter } from "next/navigation";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const onChangeHandler = (event: string) => {
    setSearch(event);
  };

  const onSubmitHandler = () => {
    if (!search) {
      alert("Please enter a valid country/city name");
      return;
    }
    // Navigate to the search page
    router.push(`/weather_search/${search}`);
  };

  const onKeyDownHandler = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onSubmitHandler();
    }
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
        onKeyDown={onKeyDownHandler} // Listen for the Enter key press
      />
      <button type="submit" className="" onClick={onSubmitHandler}>
        <Search className="inline-block text-purple-600" />
      </button>
    </nav>
  );
};

export default SearchBar;
