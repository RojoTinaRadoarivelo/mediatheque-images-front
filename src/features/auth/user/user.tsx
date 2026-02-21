import "./user.scss";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useAuth } from "../context/auth.context";
import { useNavigate } from "react-router-dom";

type UserProps = {
  openModal: (key: "sign-in" | "sign-up") => void;
};

function User({ openModal }: UserProps) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const { isAuthenticated, user, logout } = useAuth();
  const menuRef = useRef<HTMLDivElement>(null);

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

  const navigateToGalery = () => {
    setIsOpen(false);
    navigate("/galleries");
  };

  const signOut = () => {
    logout();
    navigate("/home");
  };

  return (
    <div className="relative" ref={menuRef}>
      {/* Avatar */}
      <div
        className="w-10 h-10 rounded-full cursor-pointer flex items-center justify-center hover:bg-gray-100 border border-b-cyan-600"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {isAuthenticated ? (
          user?.avatar ? (
            <img
              src={user.avatar}
              alt="User"
              className="h-8 w-8 rounded-full"
            />
          ) : (
            <span className="text-sm font-semibold">
              {user?.userName?.charAt(0).toUpperCase()}
            </span>
          )
        ) : (
          <img src="/vite.svg" alt="Guest" className="h-6" />
        )}
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
              <button className="dropdown-item">Settings</button>
              <button className="dropdown-item">Profile</button>
              <button
                className="dropdown-item"
                onClick={() => navigateToGalery()}
              >
                Galerie
              </button>
              <button
                className="dropdown-item text-red-500"
                onClick={() => signOut()}
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
