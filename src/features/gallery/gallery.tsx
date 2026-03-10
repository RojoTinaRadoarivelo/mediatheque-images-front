import { useEffect, useState } from "react";
import "./gallery.scss";
import Photo from "./photo/photo";
import { useGallery } from "../../shared/services/gallery.queries";
import type { GalleryType } from "./gallery.type";
import { MAX_LIST_LIMIT } from "../../shared/utils/queryClient";
import { useAuth } from "../auth/context/auth.context";
import { useLocation } from "react-router-dom";
import AddPhotoForm from "./photo/add-photo/add-photo";
import { useTranslation } from "react-i18next";

const Gallery = () => {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();
  const [images, setImages] = useState<GalleryType[]>([]);
  const [page, setPage] = useState(1);
  const { t } = useTranslation("common");
  const { t: tGallery } = useTranslation("gallery");

  const params = new URLSearchParams(location.search);

  const searchQuery = params.get("q") ?? "";
  const tagQuery = params.get("tags") ?? "";
  const withTags = tagQuery ? tagQuery.split(",") : undefined;

  // Détecte la route pour savoir si on affiche tout ou filtré
  const pathName = location.pathname;
  // CONTEXTE pour filtrage
  const showAll = pathName === "/home";
  const isMyGallery = pathName === "/galleries";

  // 👉 condition d'affichage et ou avec recherche
  let effectiveUserId: string | undefined;
  let effectiveAuth = false;

  if (showAll) {
    // /home → toutes les photos
    effectiveUserId = undefined;
    effectiveAuth = false;
  } else if (isMyGallery) {
    // /galleries → photos du user
    effectiveUserId = user?.id;
    effectiveAuth = true;
  }

  // On inclut la route dans la queryKey pour que React Query recharge automatiquement
  const { data: listPhoto, error: photoError } = useGallery(
    effectiveUserId,
    effectiveAuth,
    page,
    pathName,
    searchQuery,
    withTags,
  );

  const handleLoadMore = () => {
    // On ajoute les nouvelles images
    setImages((prev) => [...prev, ...listPhoto?.Photos.data]);
  };

  useEffect(() => {
    // Reset images et page dès que l'utilisateur, la recherche ou la route change
    setImages([]);
    setPage(1);

    // Dès que listPhoto arrive, on met à jour les images
    if (listPhoto?.Photos?.data && Array.isArray(listPhoto.Photos.data)) {
      setImages(listPhoto.Photos.data);
    }
  }, [listPhoto, user?.id, searchQuery, pathName]);

  if (photoError) return <p>{t("loadingImagesError")}</p>;

  return (
    <>
      {isAuthenticated && isMyGallery && (
        <div className="w-full min-h-52 flex space-x-2 px-4 py-2 mb-2">
          <AddPhotoForm />
        </div>
      )}
      <div className="masonry px-4">
        {images.map((item) => (
          <div key={item.photo!.id} className="masonry-item">
            <Photo
              id={item.photo!.id!}
              src={item.photo?.path ?? ""}
              alt={item.photo?.name ?? ""}
              title={item.photo?.title ?? ""}
              description={item.photo?.description ?? ""}
              tags={item.tag ? item.tag : []}
              isGallery={isMyGallery}
            />
          </div>
        ))}
      </div>
      {images.length >= MAX_LIST_LIMIT && (
        <div style={{ textAlign: "center", margin: "1rem 0" }}>
          <button className="load-more-btn" onClick={handleLoadMore}>
            {t("seemore")}...
          </button>
        </div>
      )}
      {images.length === 0 && (
        <div style={{ textAlign: "center", margin: "1rem 0" }}>
          <p>{tGallery("noImagesFound")}</p>
        </div>
      )}
    </>
  );
};

export default Gallery;
