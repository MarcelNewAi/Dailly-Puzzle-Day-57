"use client";

import { forwardRef, useRef, useState } from "react";

interface PhotoUploadZoneProps {
  photoCount: number;
  minPhotos: number;
  error?: string;
  onFilesSelected: (files: File[]) => void;
}

const PhotoUploadZone = forwardRef<HTMLDivElement, PhotoUploadZoneProps>(function PhotoUploadZone(
  { photoCount, minPhotos, error, onFilesSelected },
  ref,
) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const showMinimumMet = photoCount >= minPhotos;

  return (
    <div className="v15-upload-wrap">
      <div
        ref={ref}
        id="v15-photos-field"
        className={`v15-drop-zone ${isDragOver ? "is-drag-over" : ""}`}
        tabIndex={0}
        role="button"
        aria-label="Upload project photos"
        onClick={() => inputRef.current?.click()}
        onKeyDown={(event) => {
          if (event.key !== "Enter" && event.key !== " ") {
            return;
          }
          event.preventDefault();
          inputRef.current?.click();
        }}
        onDragEnter={(event) => {
          event.preventDefault();
          setIsDragOver(true);
        }}
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={(event) => {
          event.preventDefault();
          if (event.currentTarget.contains(event.relatedTarget as Node)) {
            return;
          }
          setIsDragOver(false);
        }}
        onDrop={(event) => {
          event.preventDefault();
          setIsDragOver(false);
          onFilesSelected(Array.from(event.dataTransfer.files));
        }}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="v15-file-input"
          onChange={(event) => {
            onFilesSelected(Array.from(event.target.files ?? []));
            event.currentTarget.value = "";
          }}
        />

        <svg className="v15-drop-icon" viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M9 4h6l1.6 2.2H20a2 2 0 0 1 2 2V18a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8.2a2 2 0 0 1 2-2h3.4L9 4Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path d="M12 9v7M8.8 12.2 12 9l3.2 3.2" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>

        <p className="v15-drop-title">Drag photos here or click to browse</p>
        <p className="v15-drop-subtitle">JPG, PNG, WEBP • Max 10MB per file</p>
      </div>

      <p className={`v15-photo-counter ${showMinimumMet ? "is-valid" : "is-invalid"}`}>
        {photoCount} / {minPhotos} minimum photos uploaded
      </p>

      {error ? <p className="v15-field-error">{error}</p> : null}
    </div>
  );
});

export default PhotoUploadZone;

