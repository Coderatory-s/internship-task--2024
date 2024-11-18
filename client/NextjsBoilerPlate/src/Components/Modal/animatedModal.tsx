import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const AnimatedModal: React.FC<AnimatedModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
      >
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-600">
          &times;
        </button>
        {children}
      </motion.div>
    </div>
  );
};

export default AnimatedModal;