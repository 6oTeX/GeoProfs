import { useEffect } from "react";

interface ModalProps {
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function Modal({ onClose, title, children }: ModalProps) {
  // Disable background scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = ""; // Restore scrolling when modal is closed
    };
  }, []);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      aria-labelledby="modal-title"
      aria-modal="true"
      role="dialog"
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-md shadow-lg relative z-50"
        style={{ maxHeight: "90vh" }} // Increase maxHeight to 95vh
      >
        {/* Modal Header */}
        <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
          <h2
            id="modal-title"
            className="text-lg font-semibold dark:text-white"
          >
            {title}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 dark:hover:text-gray-100 focus:outline-none"
            aria-label="Close Modal"
          >
            ✕
          </button>
        </div>

        {/* Scrollable Content */}
        <div
          className="p-4 overflow-y-auto"
          style={{ maxHeight: "calc(95vh - 64px)" }} // Adjust for header/footer
        >
          {children}
        </div>
      </div>
    </div>
  );
}
