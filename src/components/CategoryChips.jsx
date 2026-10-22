import { categories } from "../data/videos";

export default function CategoryChips({ active, onChange }) {
  return (
    <div className="flex gap-3 overflow-x-auto no-scrollbar py-3">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`shrink-0 px-3.5 h-9 rounded-lg text-sm font-medium transition-colors ${
            active === cat
              ? "bg-neutral-900 text-white"
              : "bg-neutral-100 text-neutral-800 hover:bg-neutral-200"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
