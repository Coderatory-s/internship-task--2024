import React, { ReactNode, useEffect } from "react";
import { motion } from "framer-motion";

// Define the props type
interface AnimatedModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const AnimatedModal: React.FC<AnimatedModalProps> = ({ isOpen, onClose, children }) => {
  // Handle Escape key for closing the modal
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
    }

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  const backdropVariants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };

  const modalVariants = {
    hidden: { y: "-100vh", opacity: 0 },
    visible: { y: "0", opacity: 1, transition: { type: "spring", stiffness: 300 } },
    exit: { y: "100vh", opacity: 0 },
  };

  return (
    <>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={onClose} // Closes modal when backdrop is clicked
          aria-hidden="true" // For accessibility, this element is not interactive
        >
          <motion.div
            className="bg-white p-6 rounded-lg shadow-lg relative max-w-lg w-full"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside the modal
            role="dialog"
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
          >
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 focus:outline-none"
              onClick={onClose}
              aria-label="Close modal"
            >
              <span className="sr-only">Close</span>
              ✖️
            </button>
            <div id="modal-title" className="hidden">{children}</div> {/* For accessibility */}
            {children}
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default AnimatedModal;
