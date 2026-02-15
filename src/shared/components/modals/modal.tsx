import { useEffect } from "react";
import { type ModalProps } from "../../utils/modals.type";

function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* backdrop */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* content */}
      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-md p-6 z-10">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-black"
        >
          ✕
        </button>

        {children}
      </div>
    </div>
  );
}

export default Modal;
