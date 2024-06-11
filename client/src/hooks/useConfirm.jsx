import React, { useState, useEffect, useCallback, useRef } from 'react';
import ReactDOM from 'react-dom';

const useConfirmationModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [onConfirm, setOnConfirm] = useState(null);
  const [message, setMessage] = useState('');

  const openModal = useCallback((confirmCallback, confirmMessage) => {
    setIsOpen(true);
    setOnConfirm(() => confirmCallback);
    setMessage(confirmMessage);
  }, []);

  const closeModal = () => {
    setIsOpen(false);
    setOnConfirm(null);
    setMessage('');
  };

  const confirmAction = () => {
    if (onConfirm) onConfirm();
    closeModal();
  };

  return {
    isOpen,
    openModal,
    closeModal,
    confirmAction,
    message,
  };
};

const ConfirmationModal = ({
  isOpen,
  message,
  onCancel,
  onConfirm,
}) => {
  const modalRef = useRef();

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onCancel();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div ref={modalRef} className="bg-white p-6 rounded-lg shadow-lg">
        <p className="mb-4">{message}</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
          >
            Отмена
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded"
          >
            Подтвердить
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

const useConfirm = () => {
  const {
    isOpen,
    openModal,
    closeModal,
    confirmAction,
    message,
  } = useConfirmationModal();

  const ConfirmationModalComponent = () => (
    <ConfirmationModal
      isOpen={isOpen}
      message={message}
      onCancel={closeModal}
      onConfirm={confirmAction}
    />
  );

  return [openModal, ConfirmationModalComponent];
};

export default useConfirm;
