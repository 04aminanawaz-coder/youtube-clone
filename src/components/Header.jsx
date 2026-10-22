import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MenuIcon, SearchIcon, MicIcon, CreateIcon, BellIcon, YouTubeLogo, DotsIcon,
} from "./icons";

const iconBtn =
  "w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#f2f2f2] transition-colors";

function useOutsideClose(onClose) {
  const ref = useRef(null);
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose]);
  return ref;
}

function Dropdown({ open, onClose, children, className = "" }) {
  const ref = useOutsideClose(onClose);
  if (!open) return null;
  return (
    <div
      ref={ref}
      className={`absolute top-[calc(100%+8px)] right-0 bg-white rounded-xl shadow-[0_4px_32px_rgba(0,0,0,0.2)] border border-[#e5e5e5] py-2 z-50 min-w-[260px] ${className}`}
    >
      {children}
    </div>
  );
}

const menuItem =
  "flex items-center gap-3 px-4 py-2.5 text-sm text-[#0f0f0f] hover:bg-[#f2f2f2] cursor-pointer whitespace-nowrap";

function MenuItem({ icon, label, onClick }) {
  return (
    <button className={menuItem} onClick={onClick}>
      {icon}
      {label}
    </button>
  );
}

export default function Header({ query, onQueryChange, onToggleSidebar }) {
  const [menu, setMenu] = useState(null); // "create" | "bell" | "account" | null
  const [mobileSearch, setMobileSearch] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    inputRef.current?.blur();
    setMobileSearch(false);
    navigate("/");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 h-14 bg-white flex items-center justify-between px-4">
      {/* Left: menu + logo (hidden while mobile search is active) */}
      <div className={`flex items-center gap-1 shrink-0 ${mobileSearch ? "hidden sm:flex" : "flex"}`}>
        <button className={iconBtn} aria-label="Guide" onClick={onToggleSidebar}>
          <MenuIcon />
        </button>
        <a href="/" className="flex items-center px-2" aria-label="YouTube Home">
          <YouTubeLogo />
        </a>
      </div>

      {/* Center: search — bar on sm+, expandable overlay on phones */}
      <div
        className={`flex-1 flex justify-center px-4 max-w-[730px] mx-auto ${
          mobileSearch ? "flex" : "hidden sm:flex"
        }`}
      >
        {mobileSearch && (
          <button
            type="button"
            aria-label="Close search"
            onClick={() => {
              setMobileSearch(false);
              onQueryChange("");
            }}
            className={`${iconBtn} sm:hidden shrink-0`}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="20" y1="12" x2="4.5" y2="12" />
              <path d="m11 5-7 7 7 7" />
            </svg>
          </button>
        )}
        <form onSubmit={submit} className="flex w-full max-w-[540px] items-center gap-3">
          <div className="flex flex-1 h-10">
            <div className="flex-1 flex items-center border border-[#ccc] border-r-0 rounded-l-full pl-4 pr-2 focus-within:border-[#1c62b9]">
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => onQueryChange(e.target.value)}
                placeholder="Search"
                aria-label="Search"
                className="w-full bg-transparent outline-none text-base text-[#0f0f0f] placeholder-[#888]"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => onQueryChange("")}
                  aria-label="Clear search query"
                  className="w-9 h-9 rounded-full flex items-center justify-center text-[#606060]"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <line x1="5" y1="5" x2="19" y2="19" />
                    <line x1="19" y1="5" x2="5" y2="19" />
                  </svg>
                </button>
              )}
            </div>
            <button
              type="submit"
              aria-label="Search"
              className="w-16 bg-[#f8f8f8] border border-[#ccc] rounded-r-full flex items-center justify-center hover:bg-[#f0f0f0]"
            >
              <SearchIcon size={22} className="text-[#606060]" />
            </button>
          </div>
          <button
            type="button"
            aria-label="Search with your voice"
            className={`${iconBtn} bg-[#f8f8f8] hover:bg-[#f0f0f0] shrink-0`}
          >
            <MicIcon />
          </button>
        </form>
      </div>

      {/* Right: create / bell / avatar */}
      <div className={`flex items-center gap-1 shrink-0 relative ${mobileSearch ? "hidden sm:flex" : "flex"}`}>
        {/* Phone-width search opener */}
        <button
          className={`${iconBtn} sm:hidden`}
          aria-label="Search"
          onClick={() => setMobileSearch(true)}
        >
          <SearchIcon />
        </button>
        <div className="relative">
          <button
            className={iconBtn}
            aria-label="Create"
            onClick={() => setMenu(menu === "create" ? null : "create")}
          >
            <CreateIcon />
          </button>
          <Dropdown open={menu === "create"} onClose={() => setMenu(null)}>
            <MenuItem icon={<CreateIcon size={20} />} label="Upload video" onClick={() => setMenu(null)} />
            <MenuItem icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9.5" /><line x1="12" y1="8" x2="12" y2="16" /><line x1="8" y1="12" x2="16" y2="12" /></svg>} label="Go live" onClick={() => setMenu(null)} />
            <MenuItem icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M4 4h16v12H8l-4 4V4Z" /></svg>} label="Create post" onClick={() => setMenu(null)} />
          </Dropdown>
        </div>

        <div className="relative">
          <button
            className={iconBtn}
            aria-label="Notifications"
            onClick={() => setMenu(menu === "bell" ? null : "bell")}
          >
            <span className="relative">
              <BellIcon />
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#cc0000] text-white text-[10px] font-medium flex items-center justify-center">
                9+
              </span>
            </span>
          </button>
          <Dropdown open={menu === "bell"} onClose={() => setMenu(null)} className="min-w-[320px] max-h-[400px] overflow-y-auto yt-scroll">
            <p className="px-4 py-2 text-base font-medium border-b border-[#e5e5e5] mb-1">Notifications</p>
            {[
              ["Rick Astley", "uploaded: Never Gonna Give You Up", "16 years ago"],
              ["Rockstar Games", "uploaded: Grand Theft Auto VI Trailer 1", "1 year ago"],
              ["Ed Sheeran", "uploaded: Shape of You", "9 years ago"],
            ].map(([who, what, when], i) => (
              <button key={i} className="flex gap-3 px-4 py-3 hover:bg-[#f2f2f2] text-left w-full" onClick={() => setMenu(null)}>
                <span className="w-9 h-9 rounded-full bg-[#606060] text-white flex items-center justify-center text-sm shrink-0">
                  {who[0]}
                </span>
                <span className="text-sm">
                  <span className="font-medium">{who}</span> {what}
                  <span className="block text-[#606060] text-xs mt-0.5">{when}</span>
                </span>
              </button>
            ))}
          </Dropdown>
        </div>

        <div className="relative">
          <button
            className="ml-1 w-8 h-8 rounded-full bg-gradient-to-br from-[#065fd4] to-[#0f9d58] text-white text-sm font-medium flex items-center justify-center"
            aria-label="Account"
            onClick={() => setMenu(menu === "account" ? null : "account")}
          >
            A
          </button>
          <Dropdown open={menu === "account"} onClose={() => setMenu(null)}>
            <div className="flex gap-3 px-4 py-3 border-b border-[#e5e5e5] mb-1">
              <span className="w-10 h-10 rounded-full bg-gradient-to-br from-[#065fd4] to-[#0f9d58] text-white flex items-center justify-center font-medium shrink-0">A</span>
              <div>
                <p className="text-base font-medium leading-tight">Amna Nawaz</p>
                <p className="text-sm text-[#606060]">@amnanawaz</p>
                <p className="text-sm text-[#065fd4] mt-1 cursor-pointer hover:underline">View your channel</p>
              </div>
            </div>
            <MenuItem icon={<DotsIcon size={20} />} label="YouTube Studio" onClick={() => setMenu(null)} />
            <MenuItem icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><path d="m16 17 5-5-5-5" /><line x1="21" y1="12" x2="9" y2="12" /></svg>} label="Sign out" onClick={() => setMenu(null)} />
          </Dropdown>
        </div>
      </div>
    </header>
  );
}
