import { Link, useLocation } from "react-router-dom";
import {
  HomeIcon, ShortsIcon, SubsIcon, YouIcon, HistoryIcon, PlaylistIcon,
  WatchLaterIcon, LikedIcon, TrendingIcon, MusicIcon, GamingIcon, NewsIcon,
  SettingsIcon, FlagIcon, HelpIcon, FeedbackIcon,
} from "./icons";

const primary = [
  { key: "/", label: "Home", icon: HomeIcon },
  { key: "shorts", label: "Shorts", icon: ShortsIcon },
  { key: "subs", label: "Subscriptions", icon: SubsIcon },
];

const you = [
  { key: "you", label: "You", icon: YouIcon },
  { key: "history", label: "History", icon: HistoryIcon },
  { key: "playlists", label: "Playlists", icon: PlaylistIcon },
  { key: "watch-later", label: "Watch later", icon: WatchLaterIcon },
  { key: "liked", label: "Liked videos", icon: LikedIcon },
];

const explore = [
  { key: "trending", label: "Trending", icon: TrendingIcon },
  { key: "music", label: "Music", icon: MusicIcon },
  { key: "gaming", label: "Gaming", icon: GamingIcon },
  { key: "news", label: "News", icon: NewsIcon },
];

const footerLinks = [
  { key: "settings", label: "Settings", icon: SettingsIcon },
  { key: "report", label: "Report history", icon: FlagIcon },
  { key: "help", label: "Help", icon: HelpIcon },
  { key: "feedback", label: "Send feedback", icon: FeedbackIcon },
];

function Row({ item, active, onNavigate, mini = false }) {
  const Icon = item.icon;
  if (mini) {
    return (
      <Link
        to="/"
        onClick={onNavigate}
        title={item.label}
        className="flex flex-col items-center justify-center gap-1 w-16 h-[74px] rounded-[10px] hover:bg-[#f2f2f2] transition-colors"
      >
        <Icon size={24} />
        <span className="text-[10px] text-[#0f0f0f] leading-none">{item.label}</span>
      </Link>
    );
  }
  return (
    <Link
      to="/"
      onClick={onNavigate}
      className={`flex items-center gap-6 h-10 px-3 rounded-[10px] text-sm hover:bg-[#f2f2f2] transition-colors ${
        active ? "bg-[#f2f2f2] font-medium" : ""
      }`}
    >
      <Icon size={24} />
      <span className="truncate">{item.label}</span>
    </Link>
  );
}

function Section({ title, items, active, onNavigate, mini }) {
  return (
    <div className="py-3 mx-3 border-b border-[#e5e5e5] last:border-0">
      {title && !mini && (
        <p className="px-3 pb-1 pt-1 text-base font-medium text-[#0f0f0f]">
          {title} <span className="text-[#606060] float-right">&#8250;</span>
        </p>
      )}
      {items.map((it) => (
        <Row key={it.key} item={it} active={active === it.key} onNavigate={onNavigate} mini={mini} />
      ))}
    </div>
  );
}

export default function Sidebar({ expanded, onNavigate, onBackdrop }) {
  const { pathname } = useLocation();
  const active = pathname === "/" ? "/" : "";

  // On desktop (lg+) the guide is a permanent rail; `expanded` toggles
  // between the 240px guide and the 72px mini rail. On smaller screens it
  // behaves as an overlay drawer opened by the header menu button.
  return (
    <>
      {expanded && (
        <div
          className="fixed inset-0 top-14 bg-black/50 z-20 lg:hidden"
          onClick={onBackdrop}
          aria-hidden="true"
        />
      )}
      <aside
      className={`
        fixed top-14 bottom-0 left-0 z-30 bg-white overflow-y-auto yt-scroll
        ${expanded ? "w-60 translate-x-0" : "-translate-x-full w-[72px]"}
        lg:translate-x-0
      `}
    >
      {/* Desktop: full guide OR mini rail depending on `expanded` */}
      <div className={expanded ? "block" : "hidden lg:block"}>
        {expanded ? (
          <>
            <Section items={primary} active={active} onNavigate={onNavigate} />
            <Section title="You" items={you} active={active} onNavigate={onNavigate} />
            <Section title="Explore" items={explore} active={active} onNavigate={onNavigate} />
            <div className="py-3 mx-3 border-b border-[#e5e5e5]">
              {footerLinks.map((it) => (
                <Row key={it.key} item={it} onNavigate={onNavigate} />
              ))}
            </div>
            <p className="px-6 py-4 text-xs text-[#606060] leading-5">
              About Press Copyright Contact us Creators Advertise Developers
            </p>
            <p className="px-6 pb-4 text-xs text-[#909090] leading-5">
              Terms Privacy Policy &amp; Safety How YouTube works Test new features
            </p>
            <p className="px-6 pb-6 text-xs text-[#909090]">
              © 2026 Google LLC
            </p>
          </>
        ) : (
          <div className="py-1 flex flex-col items-center">
            <Row item={primary[0]} active={active} onNavigate={onNavigate} mini />
            <Row item={primary[1]} onNavigate={onNavigate} mini />
            <Row item={primary[2]} onNavigate={onNavigate} mini />
            <Row item={you[0]} onNavigate={onNavigate} mini />
            <Row item={explore[0]} onNavigate={onNavigate} mini />
          </div>
        )}
      </div>
    </aside>
    </>
  );
}
