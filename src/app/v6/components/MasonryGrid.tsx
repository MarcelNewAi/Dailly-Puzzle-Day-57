import GalleryImage from "./GalleryImage";

export interface GalleryImageData {
  id: number;
  src: string;
  width: number;
  height: number;
  title: string;
  category: string;
  photographer: string;
}

interface MasonryGridProps {
  images: GalleryImageData[];
  onImageClick: (index: number) => void;
  isFilteringOut: boolean;
}

export default function MasonryGrid({ images, onImageClick, isFilteringOut }: MasonryGridProps) {
  return (
    <section className="v6-grid-wrap" aria-label="Masonry image gallery">
      <div className={`v6-masonry ${isFilteringOut ? "v6-masonry-fade-out" : ""}`}>
        {images.map((image, index) => (
          <GalleryImage
            key={image.id}
            image={image}
            index={index}
            onClick={() => onImageClick(index)}
          />
        ))}
      </div>
    </section>
  );
}

