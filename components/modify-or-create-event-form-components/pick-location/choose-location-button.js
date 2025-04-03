import { useState } from "react";
import Modal from "../../general/modal";
import PickLocationPage from "./pick-location-page";

export default function ChooseLocationButton({modifyEventOrEvent}) {
  const [modalVisible, setModalVisible] = useState(false);

  const positionStyle = {
    top: "-150px",
    left: "-528px",
  };

  return (
    <div className="relative">
      {/* Dark overlay when modal is visible */}
      {modalVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
      )}

      <button
        onClick={() => setModalVisible(true)}
        type="button"
        className="bg-brand-blue hover:bg-sky-blue text-white font-medium px-4 py-2 rounded-md z-50 relative"
      >
        Choose Location
      </button>

      {modalVisible && (
        <Modal positionStyle={positionStyle} onClose={() => setModalVisible(false)}>
          <PickLocationPage modifyEventOrEvent={modifyEventOrEvent} setModalVisible={setModalVisible}/>
        </Modal>
      )}
    </div>
  );
}