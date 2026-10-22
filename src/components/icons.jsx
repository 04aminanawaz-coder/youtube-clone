// Minimal hand-drawn SVG icons matching YouTube's outline icon style (24px, 2px stroke).
// Base wrapper normalizes sizing.

const I = ({ children, size = 24, className = "" }) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {children}
  </svg>
);

export const MenuIcon = (p) => (
  <I {...p}>
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </I>
);

export const SearchIcon = (p) => (
  <I {...p}>
    <circle cx="10.5" cy="10.5" r="6.5" />
    <line x1="15.5" y1="15.5" x2="21" y2="21" />
  </I>
);

export const MicIcon = (p) => (
  <I {...p}>
    <rect x="9" y="2.5" width="6" height="11" rx="3" />
    <path d="M5.5 11a6.5 6.5 0 0 0 13 0" />
    <line x1="12" y1="17.5" x2="12" y2="21" />
  </I>
);

export const CreateIcon = (p) => (
  <I {...p}>
    <circle cx="12" cy="12" r="9.5" />
    <line x1="12" y1="8" x2="12" y2="16" />
    <line x1="8" y1="12" x2="16" y2="12" />
  </I>
);

export const BellIcon = (p) => (
  <I {...p}>
    <path d="M18 8.5a6 6 0 1 0-12 0c0 6.5-2.5 8-2.5 8h17s-2.5-1.5-2.5-8" />
    <path d="M10 20a2.2 2.2 0 0 0 4 0" />
  </I>
);

export const HomeIcon = (p) => (
  <I {...p}>
    <path d="M3.5 10.5 12 3.5l8.5 7" />
    <path d="M5.5 9.5V20h4.5v-5.5h4V20h4.5V9.5" />
  </I>
);

export const ShortsIcon = (p) => (
  <I {...p}>
    <path d="M14.5 3.2a4.2 4.2 0 0 1 1.9 7.8l-1.9 1.1a4.2 4.2 0 0 1-1.9 7.8 4.4 4.4 0 0 1-3.9-2.2 4.2 4.2 0 0 1 1.6-5.7l1.9-1.1a4.2 4.2 0 0 1-1.6-5.7A4.4 4.4 0 0 1 14.5 3.2Z" />
    <path d="m10.7 10.3 4.5-2.6v5.2l-4.5-2.6Z" fill="currentColor" />
  </I>
);

export const SubsIcon = (p) => (
  <I {...p}>
    <path d="M5 6h14M7.5 3h9" />
    <rect x="3" y="9" width="18" height="12" rx="2.5" />
    <path d="m10.5 12.5 4.5 2.5-4.5 2.5v-5Z" fill="currentColor" stroke="none" />
  </I>
);

export const YouIcon = (p) => (
  <I {...p}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4.5 20.5a7.5 7.5 0 0 1 15 0" />
  </I>
);

export const HistoryIcon = (p) => (
  <I {...p}>
    <path d="M3.5 12a8.5 8.5 0 1 0 2.5-6" />
    <path d="M3.5 3.5V7H7" />
    <path d="M12 7.5V12l3.5 2" />
  </I>
);

export const PlaylistIcon = (p) => (
  <I {...p}>
    <path d="M3 6h12M3 10h12M3 14h8" />
    <path d="m16 13 5 3-5 3v-6Z" fill="currentColor" stroke="none" />
  </I>
);

export const WatchLaterIcon = (p) => (
  <I {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7v5l3.5 2" />
  </I>
);

export const LikedIcon = (p) => (
  <I {...p}>
    <path d="M6.5 21V9.5l4.5-7a2.3 2.3 0 0 1 2.2 2.9L12 9.5h5.4a2 2 0 0 1 2 2.4l-1.3 6.6a2.3 2.3 0 0 1-2.2 2H6.5Z" />
    <path d="M6.5 9.5H4a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h2.5" />
  </I>
);

export const TrendingIcon = (p) => (
  <I {...p}>
    <path d="m3.5 16.5 5-5.5 4 3.5 5-6" />
    <path d="M13 8h4.5v4.5" />
  </I>
);

export const MusicIcon = (p) => (
  <I {...p}>
    <circle cx="7" cy="17.5" r="3" />
    <circle cx="17.5" cy="15" r="3" />
    <path d="M10 17.5V6l10.5-2.5V15" />
  </I>
);

export const GamingIcon = (p) => (
  <I {...p}>
    <path d="M7 8h10a5 5 0 0 1 4.6 7l-1 2.4a2.5 2.5 0 0 1-4.3.6L14.5 16h-5L7.7 18a2.5 2.5 0 0 1-4.3-.6l-1-2.4A5 5 0 0 1 7 8Z" />
    <line x1="8" y1="12" x2="8" y2="14" />
    <line x1="7" y1="13" x2="9" y2="13" />
    <circle cx="15.5" cy="11.5" r="0.5" fill="currentColor" />
    <circle cx="17.5" cy="13.5" r="0.5" fill="currentColor" />
  </I>
);

export const NewsIcon = (p) => (
  <I {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <line x1="7" y1="9" x2="12" y2="9" />
    <line x1="7" y1="12" x2="12" y2="12" />
    <line x1="7" y1="15" x2="10" y2="15" />
    <line x1="15" y1="9" x2="17" y2="9" />
    <line x1="15" y1="12" x2="17" y2="12" />
  </I>
);

export const SettingsIcon = (p) => (
  <I {...p}>
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.9 2.9l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.2a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.9-2.9l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.2a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.9-2.9l.1.1a1.7 1.7 0 0 0 1.9.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.2a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.9 2.9l-.1.1a1.7 1.7 0 0 0-.3 1.9V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.2a1.7 1.7 0 0 0-1.4 1Z" />
  </I>
);

export const FlagIcon = (p) => (
  <I {...p}>
    <line x1="5" y1="3" x2="5" y2="21" />
    <path d="M5 4h13l-2.5 4L18 12H5" />
  </I>
);

export const HelpIcon = (p) => (
  <I {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M9.5 9.5a2.5 2.5 0 1 1 3.4 2.3c-.6.3-.9.8-.9 1.4v.3" />
    <circle cx="12" cy="17" r="0.6" fill="currentColor" stroke="none" />
  </I>
);

export const FeedbackIcon = (p) => (
  <I {...p}>
    <path d="M3 11l18-7-7 18-2.5-7L3 11Z" />
  </I>
);

export const DotsIcon = (p) => (
  <I {...p}>
    <circle cx="12" cy="5" r="1.6" fill="currentColor" stroke="none" />
    <circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none" />
    <circle cx="12" cy="19" r="1.6" fill="currentColor" stroke="none" />
  </I>
);

export const VerifiedIcon = ({ size = 14, className = "" }) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-label="Verified"
  >
    <path d="M12 2 9.8 4.2 6.7 3.6 5.5 6.5 2.4 7.7l.6 3.1L1 13l2 2.4-.6 3.1 3.1 1.2 1.2 2.9 3.1-.6L12 24l2.2-2 3.1.6 1.2-2.9 3.1-1.2-.6-3.1 2-2.4-2-2.2.6-3.1-3.1-1.2-1.2-2.9-3.1.6L12 2Zm-1.6 14.6L6.9 13l1.7-1.8 1.8 1.8 5-5 1.8 1.8-6.8 6.8Z" />
  </svg>
);

export const ArrowBackIcon = (p) => (
  <I {...p}>
    <line x1="20" y1="12" x2="4.5" y2="12" />
    <path d="m11 5-7 7 7 7" />
  </I>
);

export const LikeIcon = (p) => (
  <I {...p}>
    <path d="M6.5 21V9.5l4.5-7a2.3 2.3 0 0 1 2.2 2.9L12 9.5h5.4a2 2 0 0 1 2 2.4l-1.3 6.6a2.3 2.3 0 0 1-2.2 2H6.5Z" />
    <path d="M6.5 9.5H4a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h2.5" />
  </I>
);

export const ShareIcon = (p) => (
  <I {...p}>
    <path d="M4 12v7a1.5 1.5 0 0 0 1.5 1.5h13A1.5 1.5 0 0 0 20 19v-7" />
    <path d="M12 15V3" />
    <path d="m7.5 7.5 4.5-4.5 4.5 4.5" />
  </I>
);

export const YouTubeLogo = ({ className = "" }) => (
  // Approximation of the YouTube logo drawn from shapes: red rounded play
  // button + wordmark in Roboto (prototype asset, not the official file).
  <span className={`flex items-center ${className}`}>
    <svg width="29" height="20" viewBox="0 0 28 20" aria-hidden="true">
      <rect width="28" height="20" rx="5" fill="#FF0000" />
      <path d="M11 5.5l7.5 4.5L11 14.5v-9z" fill="#fff" />
    </svg>
    <span
      className="ml-1.5 text-[21px] font-medium tracking-tight text-[#0f0f0f] leading-none"
      style={{ fontFamily: "'Roboto', Arial, sans-serif" }}
    >
      YouTube
    </span>
  </span>
);
