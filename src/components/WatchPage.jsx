import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import videos, { formatViews } from "../data/videos";
import { VerifiedIcon, LikeIcon, ShareIcon, DotsIcon, ArrowBackIcon } from "./icons";

// Parse "h:mm:ss" / "m:ss" durations into seconds
const toSeconds = (d) =>
  d.split(":").reduce((acc, part) => acc * 60 + Number(part), 0);

const fmt = (s) => {
  s = Math.max(0, Math.floor(s));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  return (h ? `${h}:${String(m).padStart(2, "0")}` : `${m}`) + `:${String(sec).padStart(2, "0")}`;
};

const SPEEDS = [0.5, 1, 1.5, 2];

function CtrlIcon({ children, size = 22, label, onClick }) {
  return (
    <button
      aria-label={label}
      title={label}
      onClick={onClick}
      className="text-white/95 hover:text-white p-1.5"
    >
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {children}
      </svg>
    </button>
  );
}

export default function WatchPage() {
  const { id } = useParams();
  const video = videos.find((v) => v.id === id);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [muted, setMuted] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [speedMenu, setSpeedMenu] = useState(false);
  const playerRef = useRef(null);
  const barRef = useRef(null);
  const speedRef = useRef(null);
  const total = video ? toSeconds(video.duration) : 0;

  // Mock playback: the progress bar advances while "playing" — this is a UI
  // prototype, no actual video is loaded or embedded.
  useEffect(() => {
    if (!playing) return;
    const t = setInterval(() => {
      setTime((s) => {
        const next = s + speed;
        return next >= total ? total : next;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [playing, speed, total]);

  // Close the speed menu on outside click
  useEffect(() => {
    if (!speedMenu) return;
    const close = (e) => {
      if (speedRef.current && !speedRef.current.contains(e.target)) setSpeedMenu(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [speedMenu]);

  if (!video) {
    return (
      <div className="p-10 text-center">
        <p className="text-xl font-medium">Video unavailable</p>
        <p className="text-sm text-[#606060] mt-1">
          This prototype only knows its mock feed.
        </p>
        <Link to="/" className="inline-block mt-4 text-sm text-[#065fd4] hover:underline">
          Back to home
        </Link>
      </div>
    );
  }

  const thumb = `https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`;
  const togglePlay = () => setPlaying((p) => !p);

  const seek = (e) => {
    if (!barRef.current) return;
    const rect = barRef.current.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
    setTime(Math.round(ratio * total));
  };

  const toggleFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      playerRef.current?.requestFullscreen?.();
    }
  };

  return (
    <div className="max-w-[1280px] mx-auto px-6 pt-4">
      <Link
        to="/"
        className="inline-flex items-center gap-2 mb-3 text-sm font-medium text-[#0f0f0f] hover:opacity-80"
      >
        <ArrowBackIcon size={22} /> Back
      </Link>

      {/* Mock player — pure UI, no video is embedded */}
      <div ref={playerRef} className="relative aspect-video rounded-xl overflow-hidden bg-black group">
        <img
          src={thumb}
          alt=""
          onError={(e) => {
            e.currentTarget.src = `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`;
          }}
          className={`w-full h-full object-cover ${playing ? "opacity-80" : "opacity-70"}`}
        />

        {/* Center play toggle */}
        <button
          aria-label={playing ? "Pause" : "Play"}
          onClick={togglePlay}
          className="absolute inset-0 flex items-center justify-center"
        >
          <span className="w-16 h-16 rounded-full bg-black/60 flex items-center justify-center">
            {playing ? (
              <svg width="28" height="28" viewBox="0 0 24 24" fill="#fff" aria-hidden="true">
                <rect x="6" y="4" width="4" height="16" rx="1" />
                <rect x="14" y="4" width="4" height="16" rx="1" />
              </svg>
            ) : (
              <svg width="28" height="28" viewBox="0 0 24 24" fill="#fff" aria-hidden="true">
                <path d="M7 4l13 8-13 8V4z" />
              </svg>
            )}
          </span>
        </button>

        {/* Control bar */}
        <div className="absolute bottom-0 left-0 right-0 px-3 pb-2 pt-6 bg-gradient-to-t from-black/80 to-transparent">
          <div
            ref={barRef}
            onClick={seek}
            className="h-1 bg-white/30 rounded-full cursor-pointer group-hover:h-1.5 transition-all"
          >
            <div
              className="h-full bg-[#ff0000] rounded-full pointer-events-none"
              style={{ width: `${(time / total) * 100}%` }}
            />
          </div>
          <div className="flex items-center gap-1 mt-1">
            <CtrlIcon label={playing ? "Pause (k)" : "Play (k)"} onClick={togglePlay}>
              {playing ? (
                <>
                  <rect x="6" y="4" width="4" height="16" rx="1" fill="currentColor" stroke="none" />
                  <rect x="14" y="4" width="4" height="16" rx="1" fill="currentColor" stroke="none" />
                </>
              ) : (
                <path d="M7 4l13 8-13 8V4z" fill="currentColor" stroke="none" />
              )}
            </CtrlIcon>
            <CtrlIcon label={muted ? "Unmute (m)" : "Mute (m)"} onClick={() => setMuted((m) => !m)}>
              <path d="M4 9v6h4l5 4V5L8 9H4z" fill="currentColor" stroke="none" />
              {muted ? (
                <>
                  <line x1="16" y1="9" x2="21" y2="15" />
                  <line x1="21" y1="9" x2="16" y2="15" />
                </>
              ) : (
                <path d="M16.5 8.5a5 5 0 0 1 0 7" />
              )}
            </CtrlIcon>
            <span className="text-xs text-white/95 px-2 tabular-nums select-none">
              {fmt(time)} / {fmt(total)}
            </span>
            <span className="flex-1" />

            {/* Playback speed menu */}
            <div className="relative" ref={speedRef}>
              <CtrlIcon label="Playback speed" onClick={() => setSpeedMenu((o) => !o)}>
                <circle cx="12" cy="12" r="3" />
                <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M19.1 4.9 17 7M7 17l-2.1 2.1" />
              </CtrlIcon>
              {speedMenu && (
                <div className="absolute bottom-12 right-0 bg-black/90 rounded-lg py-2 min-w-[140px]">
                  {SPEEDS.map((s) => (
                    <button
                      key={s}
                      onClick={() => {
                        setSpeed(s);
                        setSpeedMenu(false);
                      }}
                      className={`w-full text-left px-4 py-1.5 text-sm text-white hover:bg-white/10 ${
                        speed === s ? "font-medium" : ""
                      }`}
                    >
                      {speed === s ? "✓ " : ""}
                      {s === 1 ? "Normal" : `${s}x`}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <CtrlIcon label="Full screen (f)" onClick={toggleFullscreen}>
              <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />
            </CtrlIcon>
          </div>
        </div>
      </div>

      {/* Info */}
      <h1 className="mt-3 text-xl font-bold text-[#0f0f0f] leading-7">
        {video.title}
      </h1>

      <div className="flex items-center justify-between flex-wrap gap-3 mt-3 pb-4">
        <div className="flex items-center gap-3">
          <span
            className="w-10 h-10 rounded-full text-white font-medium flex items-center justify-center"
            style={{ background: video.avatarColor }}
          >
            {video.channel[0].toUpperCase()}
          </span>
          <div>
            <p className="text-base font-medium flex items-center gap-1">
              {video.channel}
              {video.verified && <VerifiedIcon size={14} className="text-[#606060]" />}
            </p>
            <p className="text-xs text-[#606060]">1.2M subscribers</p>
          </div>
          <button className="ml-4 h-9 px-4 rounded-full bg-[#0f0f0f] text-white text-sm font-medium hover:bg-[#272727]">
            Subscribe
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 h-9 px-4 rounded-full bg-[#f2f2f2] text-sm font-medium hover:bg-[#e5e5e5]">
            <LikeIcon size={20} /> 12K
          </button>
          <button className="flex items-center gap-2 h-9 px-4 rounded-full bg-[#f2f2f2] text-sm font-medium hover:bg-[#e5e5e5]">
            <ShareIcon size={20} /> Share
          </button>
          <button
            aria-label="More actions"
            className="w-9 h-9 rounded-full bg-[#f2f2f2] flex items-center justify-center hover:bg-[#e5e5e5]"
          >
            <DotsIcon size={20} />
          </button>
        </div>
      </div>

      {/* Description */}
      <div className="bg-[#f2f2f2] rounded-xl p-3 text-sm text-[#0f0f0f] leading-5 mb-8">
        <p className="font-medium">
          {formatViews(video.views)} · {video.age}
        </p>
        <p className="mt-2 text-[#606060]">
          Frontend UI prototype — the player above is a mock interface; no video
          is embedded or streamed. Built with React and Tailwind CSS.
        </p>
      </div>
    </div>
  );
}
