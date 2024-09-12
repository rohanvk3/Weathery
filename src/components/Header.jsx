import { useState, useEffect, useRef } from "react";
import { IoIosSearch } from "react-icons/io";

function Header({
  query,
  setQuery,
  cities,
  onhandleSearch,
  isCityLoading,
  isLoading,
}) {
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const listRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setHighlightedIndex((prevIndex) =>
          prevIndex < cities.length - 1 ? prevIndex + 1 : prevIndex
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setHighlightedIndex((prevIndex) =>
          prevIndex > 0 ? prevIndex - 1 : prevIndex
        );
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (highlightedIndex >= 0 && highlightedIndex < cities.length) {
          onhandleSearch(e, cities[highlightedIndex]);
          setIsDropdownOpen(false);
        }
      }
    }

    function handleClickOutside(e) {
      if (
        listRef.current &&
        !listRef.current.contains(e.target) &&
        !inputRef.current.contains(e.target)
      ) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [highlightedIndex, cities, onhandleSearch]);

  useEffect(() => {
    if (query) {
      setIsDropdownOpen(true);
    } else {
      setIsDropdownOpen(false);
    }
  }, [query]);

  return (
    <div className="flex justify-between items-center p-6 text-text-primary">
      <div className="flex items-center space-x-3">
        <img src="/logo.png" alt="logo" className="w-8 h-8" />
        <h1 className="text-xl">Weathery</h1>
      </div>

      <div className="relative w-1/3 md:2/3">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search City..."
          className="rounded-full py-2 px-4 pl-10 bg-primary-bg w-full focus:outline-none focus:ring-2 focus:ring-text-secondary"
        />
        {isLoading && (
          <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
            <div className="w-4 h-4 border-2 border-t-transparent border-text-secondary rounded-full animate-spin"></div>
          </div>
        )}

        {isDropdownOpen && query.length > 0 && (
          <ul
            ref={listRef}
            className="absolute mt-2 left-0 w-full flex flex-col justify-center items-start space-y-1 p-3 bg-primary-bg rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto"
            tabIndex={0}
          >
            {!isCityLoading ? (
              cities.length > 0 ? (
                cities.map((city, index) => (
                  <li
                    key={city.lat + city.lon}
                    className={`px-4 py-2 cursor-pointer w-full hover:bg-card-bg transition ${
                      highlightedIndex === index ? "bg-card-bg" : ""
                    }`}
                    onClick={(e) => {
                      onhandleSearch(e, city);
                      setIsDropdownOpen(false);
                    }}
                    onMouseEnter={() => setHighlightedIndex(index)}
                    onKeyDown={(e) => e.preventDefault()}
                    role="option"
                    aria-selected={highlightedIndex === index}
                  >
                    {city.name}, {city.state}
                  </li>
                ))
              ) : (
                <li className="px-4 py-2 w-full">No such city found.</li>
              )
            ) : (
              <p>Loading...</p>
            )}
          </ul>
        )}

        <IoIosSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 w-5 h-5 text-text-secondary" />
      </div>
    </div>
  );
}

export default Header;
