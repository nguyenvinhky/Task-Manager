// Message.js
import React from 'react';

const Message = ({ text, type, onClose }) => {
    const getTypeClass = () => {
        switch (type) {
            case 'success':
                return 'bg-green-500 text-white';
            case 'error':
                return 'bg-red-500 text-white';
            case 'warning':
                return 'bg-orange-400 text-white';
            default:
                return 'bg-blue-500 text-white';
        }
    };

    return (
        <div className={`fixed top-4 left-1/2 transform -translate-x-1/2 ${getTypeClass()} p-2 rounded`}>
            <p>{text}</p>
        </div>
    );
};

export default Message;
