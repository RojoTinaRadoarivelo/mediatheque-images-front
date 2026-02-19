import { useEffect, useState } from "react";
import "./photo.scss";

type PhotoProps = {
  src: string;
  alt?: string;
};

const Photo = ({ src, alt }: PhotoProps) => {
  const [loaded, setLoaded] = useState(false);
  const [show, setShow] = useState(false);

  // Petits délais pour simuler un affichage progressif
  useEffect(() => {
    const timer = setTimeout(() => setShow(true), Math.random() * 300); // 0 à 300ms
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="photo-wrapper">
      {/* Placeholder visible tant que l'image n'est pas chargée */}
      {!loaded && <div className="placeholder"></div>}

      {/* L'image devient visible dès qu'elle est chargée */}
      {show && (
        <img
          src={src}
          alt={alt ?? ""}
          loading="lazy"
          className={`photo ${loaded ? "visible" : ""}`}
          onLoad={() => setLoaded(true)}
        />
      )}
    </div>
  );
};

export default Photo;
