import VideoCard from "./VideoCard";

export default function VideoGrid({ videos }) {
  if (videos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <p className="text-xl font-medium text-[#0f0f0f]">No results found</p>
        <p className="text-sm text-[#606060] mt-1">
          Try different keywords or remove search filters.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-x-4 gap-y-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 min-[1400px]:grid-cols-4">
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  );
}
