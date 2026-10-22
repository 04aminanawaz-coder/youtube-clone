import { categories } from "../data/videos";

export default function CategoryChips({ active, onChange }) {
  return (
    <div className="flex gap-3 overflow-x-auto no-scrollbar px-6 py-3 bg-white">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`shrink-0 h-8 px-3 rounded-lg text-sm font-medium transition-colors ${
            active === cat
              ? "bg-[#0f0f0f] text-white"
              : "bg-[#f2f2f2] text-[#0f0f0f] hover:bg-[#e5e5e5]"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
