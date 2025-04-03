import React from "react";
import { createPortal } from "react-dom";

const ConfirmDeleteDialog = ({ onClose, onDelete }) => {
  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center z-[1100] bg-black bg-opacity-50">
      <div className="bg-white text-black w-[300px] rounded-lg shadow-lg p-6">
        <h2 className="text-base font-semibold mb-4 text-center">
          Are you sure you want to delete this event?
        </h2>
        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={onDelete}
            className="px-4 py-2 bg-red-500 text-white hover:bg-red-600 rounded-md"
          >
            Delete
          </button>
        </div>
      </div>
    </div>,
    document.body // Renders the modal outside the ModifyEventCard
  );
};

export default ConfirmDeleteDialog;