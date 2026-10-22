import { useState } from "react";

const SearchIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <circle cx="11" cy="11" r="7" />
    <line x1="16.5" y1="16.5" x2="21" y2="21" />
  </svg>
);

export default function Header({ query, onQueryChange, onToggleSidebar }) {
  const [focused, setFocused] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 flex items-center gap-3 sm:gap-5 h-14 px-3 sm:px-4 bg-white border-b border-neutral-200">
      {/* Left: hamburger + logo */}
      <div className="flex items-center gap-2 sm:gap-4 shrink-0">
        <button
          onClick={onToggleSidebar}
          aria-label="Toggle menu"
          className="p-2 rounded-full hover:bg-neutral-100 transition-colors"
        >
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <line x1="4" y1="6" x2="20" y2="6" />
            <line x1="4" y1="12" x2="20" y2="12" />
            <line x1="4" y1="18" x2="20" y2="18" />
          </svg>
        </button>

        <a href="#" className="flex items-center gap-1.5">
          {/* Generic play-button logo (original, not the YouTube mark) */}
          <span className="flex items-center justify-center w-7 h-5 rounded-md bg-red-600">
            <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 4l14 8-14 8V4z" />
            </svg>
          </span>
          <span className="hidden sm:block text-lg font-bold tracking-tight text-neutral-900">
            VideoTube
          </span>
        </a>
      </div>

      {/* Center: search */}
      <div className="flex-1 flex justify-center max-w-2xl mx-auto">
        <div
          className={`flex w-full items-center h-10 rounded-full border px-4 transition-colors ${
            focused ? "border-blue-500 bg-white" : "border-neutral-300 bg-neutral-50"
          }`}
        >
          <SearchIcon />
          <input
            type="text"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="Search videos"
            aria-label="Search videos"
            className="w-full bg-transparent outline-none px-3 text-sm sm:text-base text-neutral-800 placeholder-neutral-400"
          />
          {query && (
            <button
              onClick={() => onQueryChange("")}
              aria-label="Clear search"
              className="text-neutral-400 hover:text-neutral-700 transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="6" y1="6" x2="18" y2="18" />
                <line x1="18" y1="6" x2="6" y2="18" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Right: avatar */}
      <div className="shrink-0">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-sky-500 flex items-center justify-center text-white text-sm font-semibold select-none">
          A
        </div>
      </div>
    </header>
  );
}
