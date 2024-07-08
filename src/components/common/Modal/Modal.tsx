// src/components/Modal.js

import { useState } from 'react';

const Modal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Button to open modal */}
      <button
        onClick={toggleModal}
        className="p-2 bg-blue-500 text-white"
      >
        Open Modal
      </button>

      {/* Modal overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          {/* Modal content */}
          <div
            className={`bg-white rounded-lg shadow-lg p-6 transform transition-transform duration-300 ease-in-out ${
              isOpen ? 'scale-100' : 'scale-95'
            }`}
          >
            <h2 className="text-xl font-semibold mb-4">Modal Title</h2>
            <p className="mb-4">This is the modal content.</p>
            <button
              onClick={toggleModal}
              className="p-2 bg-red-500 text-white rounded"
            >
              Close Modal
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
