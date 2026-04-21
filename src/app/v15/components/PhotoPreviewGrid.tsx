import type { CSSProperties } from "react";

interface UploadedPhoto {
  id: string;
  file: File;
  previewUrl: string;
  error?: string;
}

interface PhotoPreviewGridProps {
  photos: UploadedPhoto[];
  onRemove: (photoId: string) => void;
}

const byteFormatter = new Intl.NumberFormat();

export default function PhotoPreviewGrid({ photos, onRemove }: PhotoPreviewGridProps) {
  if (photos.length === 0) {
    return <p className="v15-empty-photos">No photos uploaded yet</p>;
  }

  return (
    <div className="v15-preview-grid" aria-live="polite">
      {photos.map((photo, index) => (
        <article
          key={photo.id}
          className="v15-photo-card"
          style={{ ["--v15-photo-index" as string]: String(index) } as CSSProperties}
        >
          <button
            type="button"
            className="v15-photo-remove"
            onClick={() => onRemove(photo.id)}
            aria-label={`Remove ${photo.file.name}`}
          >
            ×
          </button>

          <div className="v15-photo-thumb-wrap">
            <img src={photo.previewUrl} alt={photo.file.name} className="v15-photo-thumb" />
          </div>

          <div className="v15-photo-meta">
            <p className="v15-photo-name" title={photo.file.name}>
              {photo.file.name}
            </p>
            <p className="v15-photo-size">{byteFormatter.format(photo.file.size)} bytes</p>
          </div>
        </article>
      ))}
    </div>
  );
}

