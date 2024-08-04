import React, { useCallback, useRef } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    },
    [onClose]
  );

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div ref={modalRef} className="bg-white rounded-lg shadow-xl w-full max-w-screen-lg max-h-[90vh] flex flex-col">
        <div className="overflow-y-auto flex-grow p-6">{children}</div>
        {/*<div className="p-4 border-t">*/}
        {/*<button*/}
        {/*  onClick={onClose}*/}
        {/*  className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-200"*/}
        {/*>*/}
        {/*  Close*/}
        {/*</button>*/}
        {/*</div>*/}
      </div>
    </div>
  );
};

export default Modal;
