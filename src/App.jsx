import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import CategoryChips from "./components/CategoryChips";
import VideoGrid from "./components/VideoGrid";
import WatchPage from "./components/WatchPage";
import videos from "./data/videos";

export default function App() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  // Guide starts expanded only on desktop-width screens; on phones/tablets
  // it stays closed until the menu button opens it as a drawer.
  const [sidebarExpanded, setSidebarExpanded] = useState(
    () => typeof window !== "undefined" && window.innerWidth >= 1024
  );

  const filtered = videos.filter((v) => {
    const q = query.trim().toLowerCase();
    const matchesQuery =
      !q || v.title.toLowerCase().includes(q) || v.channel.toLowerCase().includes(q);
    const matchesCategory = category === "All" || v.categories.includes(category);
    return matchesQuery && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-white text-[#0f0f0f]">
      <Header
        query={query}
        onQueryChange={setQuery}
        onToggleSidebar={() => setSidebarExpanded((e) => !e)}
      />

      <Sidebar
        expanded={sidebarExpanded}
        onNavigate={() => {}}
        onBackdrop={() => setSidebarExpanded(false)}
      />

      <main
        className={`pt-14 transition-[margin] duration-150 ${
          sidebarExpanded ? "lg:ml-60" : "lg:ml-[72px]"
        }`}
      >
        <Routes>
          <Route
            path="/"
            element={
              <>
                <div className="sticky top-14 z-20 bg-white">
                  <CategoryChips active={category} onChange={setCategory} />
                </div>
                <div className="px-6 pb-10">
                  <VideoGrid videos={filtered} />
                </div>
              </>
            }
          />
          <Route path="/watch/:id" element={<WatchPage />} />
          <Route
            path="*"
            element={
              <div className="p-10 text-center text-sm text-[#606060]">
                Page not found in this prototype.{" "}
                <a href="/" className="text-[#065fd4] hover:underline">
                  Go home
                </a>
              </div>
            }
          />
        </Routes>
      </main>
    </div>
  );
}
