import { useState } from "react";
import "./gallery.scss";
import Photo from "./photo/photo";

const initialImages = [
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
  "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200&q=80",
];

const moreImages = [
  "https://images.unsplash.com/photo-1487412912498-0447578fcca8",
  "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
];

const Gallery = () => {
  const [images, setImages] = useState<string[]>(initialImages);
  const handleLoadMore = () => {
    // On ajoute les nouvelles images
    setImages((prev) => [...prev, ...moreImages]);
  };

  return (
    <>
      <div className="masonry px-4">
        {images.map((src, index) => (
          <div key={index} className="masonry-item">
            <Photo src={src} />
          </div>
        ))}
      </div>
      {images.length < initialImages.length + moreImages.length && (
        <div style={{ textAlign: "center", margin: "1rem 0" }}>
          <button className="load-more-btn" onClick={handleLoadMore}>
            Voir plus d'images
          </button>
        </div>
      )}
    </>
  );
};

export default Gallery;
