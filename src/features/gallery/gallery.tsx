import { useEffect, useState } from "react";
import "./gallery.scss";
import Photo from "./photo/photo";
import { useGallery } from "../../shared/services/gallery.queries";
import type { GalleryType } from "./gallery.type";
import { MAX_LIST_LIMIT } from "../../shared/utils/queryClient";

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
  // const [images, setImages] = useState<string[]>(initialImages);
  const { data: listPhoto, error: photoError } = useGallery(1);
  const [images, setImages] = useState<GalleryType[]>([]);
  const [page, setPage] = useState(1);

  const handleLoadMore = () => {
    // On ajoute les nouvelles images
    setImages((prev) => [...prev, ...listPhoto?.Photos.data]);
  };

  useEffect(() => {
    if (listPhoto?.Photos.data && Array.isArray(listPhoto?.Photos.data)) {
      setImages(listPhoto?.Photos.data);
    }
  }, [listPhoto]);

  if (photoError) return <p>Erreur lors du chargement des photos</p>;

  return (
    <>
      <div className="masonry px-4">
        {images.map((item) => (
          <div key={item.photo!.id} className="masonry-item">
            <Photo
              src={item.photo?.path ?? ""}
              alt={item.photo?.name ?? ""}
              title={item.photo?.title ?? ""}
              description={item.photo?.description ?? ""}
              tags={item.tag ? [item.tag.name] : []}
            />
          </div>
        ))}
      </div>
      {images.length >= MAX_LIST_LIMIT && (
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
