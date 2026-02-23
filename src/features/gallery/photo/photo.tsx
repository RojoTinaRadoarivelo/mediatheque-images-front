import { useEffect, useState } from "react";
import "./photo.scss";
import { ENV } from "../../../environment/env.local";
import { useAuth } from "../../auth/context/auth.context";
import ConfirmModal from "./delete-photo/delete-photo";
import {
  useDeletePhoto,
  useDownloadPhoto,
} from "../../../shared/services/gallery.queries";
import Modal from "../../../shared/components/modals/modal";
import UpdatePhotoForm from "./edit-photo/edit-photo";

type PhotoProps = {
  id: string;
  src: string;
  alt?: string;
  title?: string;
  description?: string;
  tags?: {
    name: string;
  }[];
};

const Photo = ({ id, src, alt, title, description, tags = [] }: PhotoProps) => {
  const [loaded, setLoaded] = useState(false);
  const [show, setShow] = useState(false);
  const [hover, setHover] = useState(false);
  const uploadPath = ENV.API_URL + "/";
  const { isAuthenticated } = useAuth();
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const {
    mutate: deletePhoto,
    isPending: isCreatingPhoto,
    isError: isdeletePhotoError,
    error: deletePhotoError,
  } = useDeletePhoto();

  const downloadMutation = useDownloadPhoto();

  // Petits délais pour simuler un affichage progressif
  useEffect(() => {
    const timer = setTimeout(() => setShow(true), Math.random() * 300); // 0 à 300ms
    return () => clearTimeout(timer);
  }, []);

  const handleDelete = (id: string) => {
    deletePhoto(id, {
      onSuccess: () => {},
    });
  };

  const handleDownload = async (id: string) => {
    downloadMutation.mutate(id);
  };

  return (
    <div
      className="photo-wrapper"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* Placeholder visible tant que l'image n'est pas chargée */}
      {!loaded && <div className="placeholder"></div>}

      {/* L'image devient visible dès qu'elle est chargée */}
      {show && (
        <img
          src={uploadPath + src}
          alt={alt ?? ""}
          loading="lazy"
          className={`photo ${loaded ? "visible" : ""}`}
          onLoad={() => setLoaded(true)}
        />
      )}
      {/* Overlay hover */}
      <div className={`photo-overlay ${hover ? "visible" : ""}`}>
        <div className="overlay-top">
          <strong>{alt?.toUpperCase()}</strong>
          <span>{title}</span>
        </div>
        <div className="overlay-bottom">
          <p>{description}</p>
          <div className="tags">
            {tags.map((tag) => (
              <span key={tag.name} className="tag">
                #{tag.name}
              </span>
            ))}
          </div>
          <div className="actions">
            {isAuthenticated ? (
              <>
                <button
                  className="edit-btn"
                  onClick={() => setUpdateModalOpen(true)}
                >
                  Modifier
                </button>

                <button
                  className="delete-btn"
                  onClick={() => setDeleteModalOpen(true)}
                >
                  Supprimer
                </button>
                {/* delete photo move to gallery - update modal also*/}
                <ConfirmModal
                  isOpen={isDeleteModalOpen}
                  onClose={() => setDeleteModalOpen(false)}
                  onConfirm={() => handleDelete(id)}
                  title="Supprimer la photo"
                  message="Êtes-vous sûr de vouloir supprimer cette photo ?"
                />
                <Modal
                  isOpen={isUpdateModalOpen}
                  onClose={() => setUpdateModalOpen(false)}
                  width="w-1-2"
                >
                  <UpdatePhotoForm
                    photo={{
                      id,
                      src,
                      title,
                      description,
                      tags,
                      name: alt,
                    }}
                    onClose={() => setUpdateModalOpen(false)}
                  />
                </Modal>
              </>
            ) : (
              <>
                {/* <button className="edit-btn">Like</button> */}
                <button className="edit-btn" onClick={() => handleDownload(id)}>
                  Telecharger
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Photo;
