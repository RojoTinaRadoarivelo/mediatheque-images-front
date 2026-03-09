import "./user.scss";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useAuth } from "../context/auth.context";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ENV } from "../../../environment/env.local";

type UserProps = {
  openModal: (key: "sign-in" | "sign-up") => void;
};

function User({ openModal }: UserProps) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();
  const menuRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation("common");
  const [preview, setPreview] = useState<string | null>(null);

  // Pre-fill image preview
  useEffect(() => {
    if (user?.avatar) {
      setPreview(ENV.API_URL + "/" + user?.avatar);
    }
  }, [user?.avatar]);

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

  // const preview = user?.avatar ? ENV.API_URL + "/" + user.avatar : null;

  const navigateToGalery = () => {
    setIsOpen(false);
    navigate("/galleries");
  };

  const signOut = () => {
    setPreview(null);
    logout();
    navigate("/home");
  };

  return (
    <div className="relative" ref={menuRef}>
      {/* Avatar */}
      <div
        className="w-10 h-10 rounded-full cursor-pointer inline-flex items-center justify-center hover:bg-slate-200 border border-slate-300 bg-slate-700 text-white"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {isAuthenticated ? (
          preview ? (
            <img src={preview} alt="User" className="h-8 w-8 rounded-full" />
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
        <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-xl shadow-lg z-50 overflow-hidden">
          {!isAuthenticated ? (
            <>
              <button
                className="dropdown-item"
                onClick={() => {
                  openModal("sign-up");
                  setIsOpen(false);
                }}
              >
                {t("auth.signup")}
              </button>
              <button
                className="dropdown-item"
                onClick={() => {
                  openModal("sign-in");
                  setIsOpen(false);
                }}
              >
                {t("auth.signin")}
              </button>
            </>
          ) : (
            <>
              <button
                className="dropdown-item"
                onClick={() => navigate("/settings")}
              >
                {t("settings")}
              </button>
              <button
                className="dropdown-item"
                onClick={() => navigate("/profile")}
              >
                {t("profile")}
              </button>
              <button
                className="dropdown-item"
                onClick={() => navigateToGalery()}
              >
                {t("gallery")}
              </button>
              <button
                className="dropdown-item"
                onClick={() => navigate("/faq")}
              >
                FAQ
              </button>
              <button
                className="dropdown-item text-red-500"
                onClick={() => signOut()}
              >
                {t("auth.signout")}
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default User;
