interface GalleryHeaderProps {
  categories: readonly string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function GalleryHeader({ categories, activeCategory, onCategoryChange }: GalleryHeaderProps) {
  return (
    <header className="v6-header">
      <p className="v6-header-label">V6 GALLERY</p>
      <h1 className="v6-header-title">Curated Collection</h1>
      <p className="v6-header-subtitle">A masonry grid of images - no space wasted, every piece fits.</p>

      <div className="v6-filter-row" role="toolbar" aria-label="Gallery categories">
        {categories.map((category) => {
          const isActive = activeCategory === category;

          return (
            <button
              key={category}
              type="button"
              className={`v6-filter-btn ${isActive ? "is-active" : ""}`}
              onClick={() => onCategoryChange(category)}
              aria-pressed={isActive}
            >
              {category}
            </button>
          );
        })}
      </div>
    </header>
  );
}

