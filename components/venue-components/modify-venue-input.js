import { useState } from "react";
import Modal from "../general/modal";
import ModifyVenueDirectory from "../venue-components/modify-venue-directory";

export default function ModifyVenueInput() {
  const [modalVisible, setModalVisible] = useState(false);
  const positionStyle = {
    top:"-250px",
    left: "-200px"
  };
  return (
    <div className="relative " > {/* Force width to 500px */}
      <button
        onClick={() => setModalVisible(!modalVisible)}
        type="button"
        color="green"
        className=" bg-brand-blue hover:bg-sky-blue text-white font-medium px-4 py-2 rounded-md"
              >
        Modify/Create/Delete Venue
      </button>
      {modalVisible && (
        <Modal positionStyle = {positionStyle} onClose={() => setModalVisible(false)}>
          <ModifyVenueDirectory closeModal = {() => setModalVisible(false)}/>
        </Modal>
      )}
    </div>
  );
}