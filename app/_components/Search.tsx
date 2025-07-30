import { useEffect, useRef } from "react";

interface SearchProps {
  children: React.ReactNode;
  query: string;
  setQuery: (value: string | ((value: string) => string)) => void;
}

function Search({ children, query, setQuery }: SearchProps) {
  function querryToUperCase(query: string) {
    if (query.length < 2) {
      return query.toUpperCase();
    } else {
      return query.charAt(0).toUpperCase() + query.slice(1);
    }
  }
  const inputEl = useRef<HTMLInputElement>(null);
  useEffect(() => {
    function callback(e: KeyboardEvent) {
      if (e.code === "Enter") {
        inputEl.current?.focus();
      }
    }

    document.addEventListener("keydown", callback);

    return () => {
      document.removeEventListener("keydown", callback);
    };
  }, [inputEl]);

  return (
    <div className="flex  h-20 items-center justify-center bg-red-800 text-lg md:h-20 md:text-2xl">
      {children}
      <input
        className=" ml-5 h-12 w-72 rounded-lg border-2 bg-gray-200 text-3xl text-red-800 md:h-14 md:w-96"
        id="search"
        placeholder="Search car model.."
        type="text"
        value={query}
        onChange={(e) => setQuery(querryToUperCase(e.target.value))}
        ref={inputEl}
      />
    </div>
  );
}

export default Search;
