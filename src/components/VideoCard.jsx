import { formatViews } from "../data/videos";

export default function VideoCard({ video }) {
  return (
    <div className="group cursor-pointer">
      {/* Thumbnail */}
      <div
        className={`relative aspect-video rounded-xl overflow-hidden bg-gradient-to-br ${video.gradient}`}
      >
        <span className="absolute inset-0 flex items-center justify-center text-5xl select-none">
          {video.emoji}
        </span>

        {/* Play overlay on hover */}
        <span className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/30 transition-colors">
          <span className="flex items-center justify-center w-12 h-12 rounded-full bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity">
            <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 4l14 8-14 8V4z" />
            </svg>
          </span>
        </span>

        {/* Duration badge */}
        <span className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 rounded bg-black/80 text-white text-xs font-medium">
          {video.duration}
        </span>
      </div>

      {/* Meta */}
      <div className="flex gap-3 mt-3">
        <div
          className={`w-9 h-9 shrink-0 rounded-full bg-gradient-to-br ${video.gradient} flex items-center justify-center text-white text-sm font-semibold select-none`}
        >
          {video.channel[0]}
        </div>
        <div className="min-w-0">
          <h3 className="text-sm font-medium text-neutral-900 leading-snug line-clamp-2">
            {video.title}
          </h3>
          <p className="text-sm text-neutral-500 mt-1 hover:text-neutral-900 transition-colors">
            {video.channel}
          </p>
          <p className="text-sm text-neutral-500">
            {formatViews(video.views)} · {video.age}
          </p>
        </div>
      </div>
    </div>
  );
}
