import { useEffect, useMemo, useState } from "react";
import "./gallery.scss";
import Photo from "./photo/photo";
import { useGallery } from "../../shared/services/gallery.queries";
import type { GalleryType } from "./gallery.type";
import { MAX_LIST_LIMIT } from "../../shared/utils/queryClient";
import { useAuth } from "../auth/context/auth.context";
import { useLocation } from "react-router-dom";
import AddPhotoForm from "./photo/add-photo/add-photo";
import { useTranslation } from "react-i18next";
import type { TagMode } from "../tags/tags.type";

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
  const withTags = useMemo(() => (tagQuery ? tagQuery.split(",") : undefined), [tagQuery]);
  const mode: TagMode | undefined = useMemo(() => {
    return withTags?.length ? "exact" : searchQuery.trim() ? "search" : undefined;
  }, [withTags, searchQuery]);

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
  const { data: listPhoto, error: photoError, isFetching } = useGallery(
    effectiveUserId,
    effectiveAuth,
    page,
    MAX_LIST_LIMIT,
    pathName,
    searchQuery,
    withTags,
    mode,
  );

  const photosResult = listPhoto?.Photos;
  const totalPages = photosResult?.totalPages ?? 1;
  const hasMore =
    page < totalPages && (photosResult?.data?.length ?? 0) >= MAX_LIST_LIMIT;

  const handleLoadMore = () => {
    if (hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    // On ne traite les data que si elles existent et qu'on n'est pas en train de charger un changement de filtre (si page === 1)
    if (photosResult?.data && Array.isArray(photosResult.data)) {
      setImages((prev) => {
        if (page === 1) {
          return photosResult.data;
        }

        const existingIds = new Set(prev.map((img: GalleryType) => img.photo?.id));
        const newImages = photosResult.data.filter(
          (img: GalleryType) => !existingIds.has(img.photo?.id)
        );

        if (newImages.length === 0) return prev;
        return [...prev, ...newImages];
      });
    }
  }, [photosResult?.data, page]);

  // 👉 Réinitialise SEULEMENT la page au changement de filtres
  useEffect(() => {
    setPage(1);
  }, [searchQuery, tagQuery, pathName, user?.id]);

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
        {images.length > 0 && (
        <div style={{ textAlign: "center", margin: "1rem 0" }}>
          <button
            type="button"
            className="load-more-btn"
            disabled={!hasMore}
            onClick={handleLoadMore}
          >
            {t("seemore")}...
          </button>
        </div>
      )}
      
      {!isFetching && images.length === 0 && (
        <div style={{ textAlign: "center", margin: "1rem 0" }}>
          <p>{tGallery("noImagesFound")}</p>
        </div>
      )}
    </>
  );
};

export default Gallery;
