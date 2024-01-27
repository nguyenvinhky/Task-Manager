// Modal.js
import React from 'react';

const Modal = ({ isOpen, onClose, onConfirm }) => {
    return (
        <div className={`fixed inset-0 ${isOpen ? 'block' : 'hidden'} bg-black bg-opacity-50 flex items-center justify-center`}>
            <div className="bg-white p-8 max-w-md mx-auto rounded shadow-md">
                <p className="text-lg font-bold mb-4">Are you sure you want to delete this todo?</p>
                <div className="flex justify-end">
                    <button className="bg-red-500 text-white px-4 py-2 rounded mr-2" onClick={onConfirm}>
                        Delete
                    </button>
                    <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded" onClick={onClose}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
