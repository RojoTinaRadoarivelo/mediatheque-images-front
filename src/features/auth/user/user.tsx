import "./user.scss";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { UserService } from "../services/user.service";

type UserProps = {
  openModal: (key: "sign-in" | "sign-up") => void;
};

function User({ openModal }: UserProps) {
  const [isOpen, setIsOpen] = useState(false);
  const isAuthenticated = false; // 🔥 plus tard: venant du contexte auth
  const menuRef = useRef<HTMLDivElement>(null);
  const userService = new UserService();

  // Fermer le menu quand on clique dehors
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", () => setIsOpen(false));
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const logOut = (): void => {
    userService.logOut();
  };
  const navigateToGalery = () => {};

  return (
    <div className="relative" ref={menuRef}>
      {/* Avatar */}
      <div
        className="w-10 h-10 rounded-full cursor-pointer flex items-center justify-center hover:bg-gray-100"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <img src="/vite.svg" alt="User" className="h-6" />
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          {!isAuthenticated ? (
            <>
              <button
                className="dropdown-item"
                onClick={() => {
                  openModal("sign-up");
                  setIsOpen(false);
                }}
              >
                S’inscrire
              </button>
              <button
                className="dropdown-item"
                onClick={() => {
                  openModal("sign-in");
                  setIsOpen(false);
                }}
              >
                Se connecter
              </button>
            </>
          ) : (
            <>
              <button
                className="dropdown-item"
                onClick={() => navigateToGalery()}
              >
                Galerie
              </button>
              <button
                className="dropdown-item text-red-500"
                onClick={() => logOut()}
              >
                Se déconnecter
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default User;
