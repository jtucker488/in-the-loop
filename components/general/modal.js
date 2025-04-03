import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
const Modal = ({ onClose, children, positionStyle }) => {

  console.log("position 4", positionStyle);
  const modalRef = useRef();
  const [modalDimensions, setModalDimensions] = useState({
    width: 0,
    height: 0,
  });
  useEffect(() => {
    if (modalRef.current) {
      const { offsetWidth, offsetHeight } = modalRef.current;
      setModalDimensions({ width: offsetWidth, height: offsetHeight });
    }
  }, [children]); // Recalculate size if children change

  // Close modal if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose(); // Close modal if clicked outside
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose(); // Close modal on Escape key
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  let defaultStyle = {
    top: `calc(50vh - ${modalDimensions.height / 2}px)`, // 50vh for viewport height
    left: `calc(50vw - ${modalDimensions.width / 2}px)`, // 50vw for viewport width
  };


  const appliedStyle = positionStyle
    ? { ...defaultStyle, ...positionStyle } // Merge custom positioning with default
    : defaultStyle;

  return (
    <AnimatePresence>
      <motion.div
        style={{
          position: "absolute", // Make modal relative to parent container
          zIndex: 1050, // Ensure it's above other elements
          ...appliedStyle, // Apply calculated position
        }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        ref={modalRef}
        // className="bg-neutral-800 rounded-lg shadow-lg p-4"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default Modal;
