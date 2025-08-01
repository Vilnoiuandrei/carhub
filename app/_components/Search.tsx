"use client";

import { useEffect, useState, useRef } from "react";
import { FaSearch } from "react-icons/fa";

interface SearchProps {
  children: React.ReactNode;
  query: string;
  setQuery: (value: string | ((value: string) => string)) => void;
}

function Search({ children, query, setQuery }: SearchProps) {
  const [showSearch, setShowSearch] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus when overlay opens
  useEffect(() => {
    if (showSearch && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showSearch]);

  // Optional: focus input on Enter key
  useEffect(() => {
    function callback(e: KeyboardEvent) {
      if (e.code === "Enter") {
        inputRef.current?.focus();
      }
    }
    document.addEventListener("keydown", callback);
    return () => document.removeEventListener("keydown", callback);
  }, []);

  // Capitalize query for display
  function querryToUperCase(query: string) {
    if (query.length < 2) return query.toUpperCase();
    return query.charAt(0).toUpperCase() + query.slice(1);
  }

  return (
    <div className="relative w-full">
      <div className="flex h-12 items-center justify-between lg:justify-center bg-red-800 text-lg md:h-20 md:text-2xl px-3">
        {children}
        {/* Mobile 🔍 icon */}
        <button
          className="ml-5 h-8 w-8 rounded-lg   md:h-14 md:w-14 lg:hidden"
          onClick={() => setShowSearch(true)}
        >
          <FaSearch className="h-6 w-6 text-gray-200 md:h-10 md:w-10" />
        </button>

        {/* Desktop input (always visible) */}
        <input
          className="ml-5 hidden h-14 w-96 rounded-lg border-2 bg-gray-200 px-3 py-1 text-3xl text-red-800 lg:block"
          placeholder="Search car model..."
          type="text"
          value={query}
          onChange={(e) => setQuery(querryToUperCase(e.target.value))}
        />
      </div>

      {/* Mobile fullscreen search */}
      {showSearch && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-black p-4 flex items-center gap-2">
          <input
            ref={inputRef}
            className="flex-grow rounded bg-white px-4 py-2 text-black text-xl"
            type="text"
            placeholder="Search car model..."
            value={query}
            onChange={(e) => setQuery(querryToUperCase(e.target.value))}
          />
          <button
            className="text-white text-2xl"
            onClick={() => setShowSearch(false)}
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}

export default Search;
