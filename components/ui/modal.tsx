interface ModalProps {
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function Modal({ title, children }: ModalProps) {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      aria-labelledby="modal-title"
      aria-modal="true"
      role="dialog"
    >
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-96 max-w-full space-y-4 shadow-lg relative z-50">
        <div className="flex justify-between items-center">
          <h2
            id="modal-title"
            className="text-xl font-semibold dark:text-white"
          >
            {title}
          </h2>
        </div>
        <div className="dark:text-gray-300">{children}</div>
      </div>
    </div>
  );
}
