import { Link, useParams } from "react-router-dom";
import videos, { formatViews } from "../data/videos";
import { VerifiedIcon, LikeIcon, ShareIcon, DotsIcon, ArrowBackIcon } from "./icons";

export default function WatchPage() {
  const { id } = useParams();
  const video = videos.find((v) => v.id === id);

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

  return (
    <div className="max-w-[1280px] mx-auto px-6 pt-4">
      <Link
        to="/"
        className="inline-flex items-center gap-2 mb-3 text-sm font-medium text-[#0f0f0f] hover:opacity-80"
      >
        <ArrowBackIcon size={22} /> Back
      </Link>

      {/* Player */}
      <div className="aspect-video rounded-xl overflow-hidden bg-black">
        <iframe
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${video.id}`}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
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
          This description is part of a frontend UI prototype built with React
          and Tailwind CSS. The player above embeds the real video.
        </p>
      </div>
    </div>
  );
}
