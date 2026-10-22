import VideoCard from "./VideoCard";

export default function VideoGrid({ videos }) {
  if (videos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <span className="text-5xl mb-4">🔍</span>
        <p className="text-lg font-medium text-neutral-800">No videos found</p>
        <p className="text-sm text-neutral-500 mt-1">
          Try a different search or category.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-x-4 gap-y-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  );
}
