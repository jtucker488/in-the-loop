"use client";

import { useState, useRef, useEffect } from "react";
import Modal from "../general/modal";
import HashtagPageForm from "./hashtag-form-components/hashtag-page-form";
import { Button } from "@headlessui/react";

export default function HashtagInput({ modifyEventOrEvent }) {
  const [modalVisible, setModalVisible] = useState(false); // Modal visibility state
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 }); // Modal position state
  const buttonRef = useRef(null); // Reference to the button

  // Calculate Modal Position
  const calculatePosition = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      console.log("here44", buttonRef.current.offsetTop, buttonRef.current.offsetHeight, buttonRef.current.offsetLeft);
      // Calculate position relative to parent container (not viewport)
      const position = {
        top: buttonRef.current.offsetTop + buttonRef.current.offsetHeight - 20, // 8px below the button
        left: buttonRef.current.offsetLeft , // Align left with the button
      };
      console.log("position2", position);

      setModalPosition(position); // Update position state
    }
  };

  console.log("position3", modalPosition);


  // Open Modal and calculate position
  const openModal = () => {
    calculatePosition(); // Update position
    setModalVisible(true); // Show modal
  };

  useEffect(() => {
    // Recalculate position on window resize
    const handleResize = () => {
      if (modalVisible) {
        calculatePosition(); // Keep modal aligned during resize
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [modalVisible]);

  return (
    <div className="relative">
      {/* Button to Open Modal */}
      <Button
        ref={buttonRef}
        onClick={openModal}
        className="bg-brand-blue hover:bg-sky-blue text-white font-medium px-4 py-2 rounded-md"
      >
        Add Hashtags
      </Button>

      {/* Modal Component */}
      {modalVisible && (
        <Modal
          onClose={() => setModalVisible(false)}
          positionStyle={modalPosition} // Pass position to modal
        >
          <div className="p-4">
            {/* Form Content */}
            <HashtagPageForm modifyEventOrEvent={modifyEventOrEvent} />
          </div>
        </Modal>
      )}
    </div>
  );
}