import { useEffect } from "react";
import { type ModalProps } from "../../utils/modals.type";
import { createPortal } from "react-dom";

function Modal({ isOpen, onClose, children, width, height }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      {/* backdrop */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* content */}
      <div
        // className="relative bg-white rounded-xl shadow-xl w-full max-w-md p-6 z-10"
        className={`relative bg-white rounded-xl shadow-xl z-10 ${width ?? "w-full max-w-md"} ${height ?? "auto"}`}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-black"
        >
          ✕
        </button>

        {children}
      </div>
    </div>,
    document.body,
  );
}

export default Modal;
