import "./Header.scss";
import { useLayout } from "../../../layouts/context/layout.context";
import User from "../../../features/auth/user/user";
import { useEffect, useState } from "react";
import { ModalMapping, type ModalKey } from "../../utils/modals.type";
import Modal from "../modals/modal";
import { useLocation, useNavigate } from "react-router-dom";

function header() {
  const { layout, setLayout } = useLayout();
  const [isFixed, setIsFixed] = useState(false);
  const [activeModal, setActiveModal] = useState<ModalKey | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const ModalContent = activeModal ? ModalMapping[activeModal] : null;

  useEffect(() => {
    const handleScroll = () => {
      setIsFixed(window.scrollY > 25);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const showLayoutSelect = location.pathname === "/home";

  return (
    <div
      className={`
        w-full flex justify-between items-center px-2 py-1 bg-white z-50
        transition-transform duration-300
        ${isFixed ? "fixed top-0 left-0 drop-shadow-xl" : "relative"}
      `}
    >
      <div className="w-32 flex items-center" onClick={() => navigate("/")}>
        <img src="/vite.svg" alt="LOGO" className="h-6" />
        <p>LOGO</p>
      </div>
      <div className="w-2/4 flex items-center space-x-3">
        <input
          type="text"
          placeholder="Rechercher"
          className="w-3/4 border-2 border-gray-200 p-2 rounded-md"
        />
        <button className="bg-black">S</button>
      </div>
      <div className="flex items-center space-x-2">
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
        <div className="w-10 h-10 rounded-full cursor-pointer flex items-center justify-center border  hover:bg-gray-100">
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
