import React from "react";

const DeleteOrModify = ({ onClose, onDelete }) => {
  return (
      <div className=" text-black  rounded p-4">
        <h2 className="text-base font-semibold mb-4 px-4">Are you sure you want to delete this event?</h2>
        <div className="flex gap-2">
          <button
            onClick={onClose}
            className="w-1/2 py-2 bg-gray-300 border hover:bg-gray-400 rounded-bl"
          >
            delete
          </button>
          <button
            onClick={onDelete}
            className="w-1/2 py-2 bg-gray-300 border rounded-br"
          >
            modify
          </button>
        </div>
      </div>
  );
};

export default DeleteOrModify;