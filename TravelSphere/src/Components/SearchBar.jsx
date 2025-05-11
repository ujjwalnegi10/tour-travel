import { useState, useRef } from "react";

export const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isFocused, setIsFocused] = useState(false);

  const items = [
    "india ",
    "tajmahal",
    "bhutan","temple",
    "ujjwal","sachin"
  ];

  const containerRef = useRef(null);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    const filtered = items.filter((item) =>
      item.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(filtered);
  };

  const handleFocus = () => {
    if (query === "") {
      setSuggestions(items);
    }
    setIsFocused(true);
  };

  const handleBlur = (e) => {
    // Only close if clicking outside the search container
    if (containerRef.current && !containerRef.current.contains(e.relatedTarget)) {
      setIsFocused(false);
    }
  };

  const handleSelect = (item) => {
    setQuery(item);
    setSuggestions([]);
    setIsFocused(false);
  };

  return (
    <div
      ref={containerRef}
      onBlur={handleBlur}
      tabIndex={-1}
      className="relative w-[700px] p-4"
    >
      <div className="flex items-center rounded overflow-hidden mb-3 shadow-xl/40  bg-white/70 rounded-md backdrop-blur-sm border-white/30">
        <input
          type="text"
          value={query}
          onChange={handleChange}
          onFocus={handleFocus}
          placeholder="Search..."
          className="w-full px-4 py-2 text-gray-800 focus:outline-none "
        />
        <button className="bg-blue-500 p-3">
          <svg
            className="h-5 w-5 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1116.65 6.65a7.5 7.5 0 010 10.6z"
            />
          </svg>
        </button>
      </div>

      {/* Suggestions dropdown */}
      {isFocused && suggestions.length > 0 && (
        <ul className="absolute z-10 w-[668px] bg-white/40 rounded-md backdrop-blur-md border-white/30 shadow-xl rounded-b max-h-[150px] overflow-y-auto scrollbar">
          {suggestions.map((item, index) => (
            <li
              key={index}
              onClick={() => handleSelect(item)}
              className="px-4 py-2 hover:bg-white hover:text-blue-500 cursor-pointer"
              tabIndex={0} // make it focusable
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
