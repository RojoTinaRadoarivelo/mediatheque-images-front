import "./Header.scss";
import { useLayout } from "../../../layouts/context/layout.context";
import User from "../../../features/auth/user/user";
import { useEffect, useState } from "react";
import { ModalMapping, type ModalKey } from "../../utils/modals.type";
import Modal from "../modals/modal";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18n from "../../../assets/i18n";

function header() {
  const { layout, setLayout } = useLayout();
  const [isFixed, setIsFixed] = useState(false);
  const [activeModal, setActiveModal] = useState<ModalKey | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const { t } = useTranslation();

  const ModalContent = activeModal ? ModalMapping[activeModal] : null;

  useEffect(() => {
    const handleScroll = () => {
      setIsFixed(window.scrollY > 25);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (search.trim()) {
        navigate({
          pathname: location.pathname,
          search: `?q=${encodeURIComponent(search)}`,
        });
      } else {
        navigate({
          pathname: location.pathname,
          search: "",
        });
      }
    }, 400); // debounce

    return () => clearTimeout(timeout);
  }, [search]);

  const searchGallery = () => {
    navigate({
      pathname: location.pathname === "/galleries" ? "/galleries" : "/home",
      search: search ? `?q=${encodeURIComponent(search)}` : "",
    });
  };
  const onEnterPressed = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      searchGallery();
    }
  };

  const showLayoutSelect = location.pathname === "/home";

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lng", lang);
  };

  return (
    <div
      className={`
        w-full flex justify-between items-center px-2 py-1 bg-white z-50
        transition-transform duration-300
        ${isFixed ? "fixed top-0 left-0 drop-shadow-xl" : "relative"}
      `}
    >
      <div
        className="w-32 flex items-center hover:cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img src="/vite.svg" alt="LOGO" className="h-6" />
        <p>LOGO</p>
      </div>
      <div className="w-2/4 flex items-center space-x-3">
        <input
          type="text"
          placeholder="Search"
          className="w-3/4 border-2 border-gray-200 p-2 rounded-md text-base"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => onEnterPressed(e)}
        />
        <button className="bg-black" onClick={() => searchGallery()}>
          <img src="/images/search.svg" alt="search" className="w-4 h-4" />
        </button>
      </div>
      <div className="flex items-center space-x-2">
        {/* 🌍 Language Select */}
        <select
          className="border-2 border-gray-200 p-2 rounded-md"
          value={i18n.language}
          onChange={(e) => changeLanguage(e.target.value)}
        >
          <option value="en">EN</option>
          <option value="fr">FR</option>
        </select>

        {showLayoutSelect && (
          <select
            name="layoutSelection"
            id="layoutSelection"
            className="border-2 border-gray-200 p-2 rounded-md"
            value={layout}
            onChange={(e) =>
              setLayout(e.target.value as "Vertical" | "Horizontal")
            }
          >
            <option value="Vertical">Vertical</option>
            <option value="Horizontal">Horizontal</option>
          </select>
        )}
        <div
          className="w-10 h-10 rounded-full cursor-pointer flex items-center justify-center border  hover:bg-gray-100"
          onClick={() => navigate("faq")}
        >
          ?
        </div>

        <div className="">
          <User openModal={setActiveModal}></User>
          <Modal isOpen={!!activeModal} onClose={() => setActiveModal(null)}>
            {ModalContent && (
              <ModalContent
                closeModal={() => setActiveModal(null)}
                switchModal={(key: ModalKey) => setActiveModal(key)}
              />
            )}
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default header;
