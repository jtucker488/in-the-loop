
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Modal from "../general/modal";
import AddEventModal from "./add-event-modal";
import { useDispatch } from "react-redux";
import { reset_form } from "../redux/slices/eventSlice";
import ICSInputPage from "./addEventPages/ics-input-page";
import ExcelInputPage from "./addEventPages/excel-input-page";

const AddEventCard = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState("first page");

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setPage("first page");
    setIsModalOpen(false);
    dispatch(reset_form());
  };

  return (
    <div
      className="flex flex-col items-center justify-center h-[350px] w-[300px] border-2 border-dashed border-neutral-300 bg-transparent rounded-lg cursor-pointer hover:border-neutral-400 transition-colors"
      onClick={openModal}
    >
      <AddIcon className="text-neutral-500 mb-2" style={{ fontSize: 48 }} />
      <span className="text-neutral-500 text-lg font-semibold">NEW EVENT</span>

      {/* Modal logic */}
      {isModalOpen && page === "first page" && (
        <Modal onClose={closeModal}>
          <AddEventModal setPage={setPage} />
        </Modal>
      )}
      {isModalOpen && page === "excel page" && (
        <Modal onClose={closeModal}>
          <ExcelInputPage closeModal={closeModal} />
        </Modal>
      )}
      {isModalOpen && page === "ICS page" && (
        <Modal onClose={closeModal}>
          <ICSInputPage closeModal={closeModal} />
        </Modal>
      )}
    </div>
  );
};

export default AddEventCard;
