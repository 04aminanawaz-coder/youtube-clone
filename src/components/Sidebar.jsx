const itemClass =
  "flex items-center gap-5 px-3 py-2.5 rounded-lg cursor-pointer transition-colors";

// Original minimal line icons for the nav items
const icons = {
  home: (
    <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round">
      <path d="M3 11l9-8 9 8" />
      <path d="M5 10v10h5v-6h4v6h5V10" />
    </svg>
  ),
  shorts: (
    <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round">
      <rect x="5" y="3" width="14" height="18" rx="4" />
      <path d="M10.5 9l5 3-5 3V9z" fill="currentColor" stroke="none" />
    </svg>
  ),
  subs: (
    <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round">
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M7 4h10" />
      <path d="M10 11.5l4.5 2.5-4.5 2.5v-5z" fill="currentColor" stroke="none" />
    </svg>
  ),
  library: (
    <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round">
      <path d="M4 5v15" />
      <path d="M9 5v15" />
      <path d="M14 6l5 14" />
    </svg>
  ),
  history: (
    <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
      <path d="M4 12a8 8 0 1 0 2.3-5.6" />
      <path d="M4 4v4h4" />
      <path d="M12 8v4l3 3" />
    </svg>
  ),
  liked: (
    <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round">
      <path d="M7 10v11H4a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1h3z" />
      <path d="M7 10l4-7a2.5 2.5 0 0 1 2.4 3.1L13 10h5a2 2 0 0 1 2 2.4l-1.2 6A2 2 0 0 1 16.8 21H7" />
    </svg>
  ),
};

const items = [
  { key: "home", label: "Home", icon: icons.home },
  { key: "shorts", label: "Shorts", icon: icons.shorts },
  { key: "subs", label: "Subscriptions", icon: icons.subs },
  { key: "library", label: "Library", icon: icons.library },
  { key: "history", label: "History", icon: icons.history },
  { key: "liked", label: "Liked videos", icon: icons.liked },
];

export default function Sidebar({ open, onClose, active, onActiveChange }) {
  // Mobile: overlay drawer. Desktop (lg+): always-visible rail.
  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`
          fixed top-14 bottom-0 left-0 z-40 w-60 bg-white overflow-y-auto
          transition-transform duration-200 ease-out
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:z-0
          ${open ? "lg:w-60" : "lg:w-[72px]"}
        `}
      >
        <nav className="p-3 space-y-1" onClick={(e) => e.stopPropagation()}>
          {items.map((item) => (
            <button
              key={item.key}
              onClick={() => {
                onActiveChange(item.key);
                if (window.innerWidth < 1024) onClose();
              }}
              title={item.label}
              className={`${itemClass} w-full ${
                active === item.key
                  ? "bg-neutral-100 font-medium"
                  : "hover:bg-neutral-100"
              } ${open ? "" : "lg:!flex lg:justify-center lg:px-0 lg:py-4"}`}
            >
              {item.icon}
              <span className={`text-sm ${open ? "lg:block" : "lg:hidden"}`}>
                {item.label}
              </span>
            </button>
          ))}
        </nav>
      </aside>
    </>
  );
}
