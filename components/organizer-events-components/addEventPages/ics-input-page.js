import React, { useState } from "react";
import ICSFileUpload from "./ICS-input";
import axios from "axios";
const config = require("../../../config.json");

export default function ICSInputPage({ closeModal }) {
  const [selectedFile, setSelectedFile] = useState(null); // State to store selected file

  const addEvents = async (file) => {
    console.log("Adding event:", `${config.api.eventUrl}/events/uploadevents`);

    try {
      // Create a FormData object to hold the file data
      const formData = new FormData();
      formData.append("file", file); // Append the file from input

      // Send POST request with the FormData containing the file
      const res = await axios.post(
        `${config.api.eventUrl}/events/uploadevents`, // Your API endpoint
        formData, // FormData goes in the body of the request
        {
          headers: {
            "Content-Type": "multipart/form-data", // Ensure multipart/form-data is set
          },
        }
      );

      console.log("Event added successfully:", res);
    } catch (err) { 
      console.log(`An error has occurred: ${err}`);
    }
  };

  // Handle the form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    if (selectedFile) {
      addEvents(selectedFile); // Call addEvent and pass the selected file
    } else {
      console.log("No file selected");
    }

    closeModal();
  };

  return (
    <>
      <div className="flex flex-col bg-neutral-800 gap-4 p-8">
        <ICSFileUpload setSelectedFile={setSelectedFile} /> {/* Pass the setSelectedFile callback */}
        <button
          onClick={handleSubmit}
          className="bg-neutral-500 w-full text-input-text-color py-2 px-4 rounded"
        >
          Submit
        </button>
      </div>
    </>
  );
}