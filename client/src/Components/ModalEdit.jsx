// ModalEdit.js
import React, { useEffect, useState } from 'react';

const ModalEdit = ({ isOpen, onClose, onSave, initialTitle }) => {

    const [editedTitle, setEditedTitle] = useState(initialTitle);

    const handleSave = () => {
        onSave(editedTitle);
        onClose();
    };

    useEffect(() => {
        // Set the initial value when initialTitle changes
        setEditedTitle(initialTitle);
    }, [initialTitle]);

    return (
        <div className={`fixed inset-0 ${isOpen ? 'block' : 'hidden'} bg-black bg-opacity-50 flex items-center justify-center`}>
            <div className="bg-white p-8 max-w-md mx-auto rounded shadow-md">
                <p className="text-lg font-bold mb-4">Edit Todo</p>
                <input
                    type="text"
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                    className="border p-2 mb-4"
                />
                <div className="flex justify-end justify-center">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded w-20" onClick={handleSave}>
                        Save
                    </button>
                    <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded ml-2 w-20" onClick={onClose}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalEdit;
