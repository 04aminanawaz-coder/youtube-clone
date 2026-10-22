import { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import CategoryChips from "./components/CategoryChips";
import VideoGrid from "./components/VideoGrid";
import videos from "./data/videos";

export default function App() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("home");

  const filtered = videos.filter((v) => {
    const matchesCategory = category === "All" || v.category === category;
    const q = query.trim().toLowerCase();
    const matchesQuery =
      !q ||
      v.title.toLowerCase().includes(q) ||
      v.channel.toLowerCase().includes(q);
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <Header
        query={query}
        onQueryChange={setQuery}
        onToggleSidebar={() => setSidebarOpen((o) => !o)}
      />

      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        active={activeNav}
        onActiveChange={setActiveNav}
      />

      {/* Main content — offset for the desktop rail */}
      <main
        className={`pt-14 transition-[margin] duration-200 ease-out ${
          sidebarOpen ? "lg:ml-60" : "lg:ml-[72px]"
        }`}
      >
        {/* Sticky chips row under the header */}
        <div className="sticky top-14 z-30 bg-white/95 backdrop-blur px-4 sm:px-6">
          <CategoryChips active={category} onChange={setCategory} />
        </div>

        <div className="px-4 sm:px-6 pb-10">
          <VideoGrid videos={filtered} />
        </div>
      </main>
    </div>
  );
}
