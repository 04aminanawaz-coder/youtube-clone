import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { formatViews } from "../data/videos";
import { DotsIcon, VerifiedIcon } from "./icons";

const menuItems = [
  "Save to Watch later",
  "Save to playlist",
  "Download",
  "Share",
  "Not interested",
  "Don't recommend channel",
  "Report",
];

export default function VideoCard({ video }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [srcIdx, setSrcIdx] = useState(0);
  const menuRef = useRef(null);

  // Thumbnail fallback chain: maxresdefault → hqdefault → plain gray box
  const srcs = [
    `https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`,
    `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`,
  ];

  useEffect(() => {
    if (!menuOpen) return;
    const close = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [menuOpen]);

  return (
    <div className="group yt-card">
      {/* Thumbnail */}
      <Link to={`/watch/${video.id}`} className="block">
        <div className="relative aspect-video rounded-xl bg-[#e5e5e5] overflow-hidden">
          {srcIdx < srcs.length ? (
            <img
              src={srcs[srcIdx]}
              alt={video.title}
              loading="lazy"
              onError={() => setSrcIdx((i) => i + 1)}
              className="w-full h-full object-cover"
            />
          ) : null}
          <span className="absolute bottom-1 right-1 px-1 py-0.5 rounded bg-black/80 text-white text-xs font-medium leading-none">
            {video.duration}
          </span>
        </div>
      </Link>

      {/* Meta */}
      <div className="flex gap-3 mt-3 relative">
        <span
          className="w-9 h-9 rounded-full text-white text-sm font-medium flex items-center justify-center shrink-0 select-none"
          style={{ background: video.avatarColor }}
        >
          {video.channel[0].toUpperCase()}
        </span>

        <div className="min-w-0 flex-1">
          <Link to={`/watch/${video.id}`}>
            <h3 className="text-sm font-medium text-[#0f0f0f] leading-5 line-clamp-2">
              {video.title}
            </h3>
          </Link>
          <p className="mt-1 text-sm text-[#606060] hover:text-[#0f0f0f] cursor-pointer flex items-center gap-1 w-fit">
            <span className="truncate">{video.channel}</span>
            {video.verified && <VerifiedIcon size={13} className="text-[#606060] shrink-0" />}
          </p>
          <p className="text-sm text-[#606060]">
            {formatViews(video.views)} · {video.age}
          </p>
        </div>

        {/* Three-dot menu */}
        <div className="relative shrink-0" ref={menuRef}>
          <button
            aria-label="More actions"
            onClick={() => setMenuOpen((o) => !o)}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#f2f2f2] opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity"
          >
            <DotsIcon size={20} />
          </button>
          {menuOpen && (
            <div className="absolute top-9 right-0 z-20 bg-white rounded-xl shadow-[0_4px_32px_rgba(0,0,0,0.2)] border border-[#e5e5e5] py-2 min-w-[230px]">
              {menuItems.map((label) => (
                <button
                  key={label}
                  onClick={() => setMenuOpen(false)}
                  className="w-full text-left px-4 py-2.5 text-sm text-[#0f0f0f] hover:bg-[#f2f2f2] whitespace-nowrap"
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
