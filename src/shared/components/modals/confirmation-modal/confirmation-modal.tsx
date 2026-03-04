import Modal from "../modal";
import "./confirmation-modal.scss";

type ConfirmModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  warningText?: string;
  confirmText?: string;
  cancelText?: string;
};

const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirmation",
  message = "You are about to delete this image, are you sure ?",
  confirmText = "Yes",
  cancelText = "No",
  warningText,
}: ConfirmModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className=" py-2 px-4">
        <h2 className="text-lg font-semibold mb-2">{title}</h2>
        <p>{message}</p>
        <p className="">{warningText ?? ""}</p>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            {cancelText}
          </button>

          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
