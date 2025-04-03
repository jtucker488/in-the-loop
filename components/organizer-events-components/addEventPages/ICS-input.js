import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile"; // New icon to show file upload

const ICSFileUpload = ({ setSelectedFile }) => {
  const [uploadedFile, setUploadedFile] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    console.log("File selected:", acceptedFiles[0]);
    setSelectedFile(acceptedFiles[0]); // Store the selected file in the parent state
    setUploadedFile(acceptedFiles[0]); // Store the uploaded file locally to display its name
  }, [setSelectedFile]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "text/calendar": [".ics"], // Accept only .ics files
    },
    noClick: false, // Allow clicking on the dropzone to open file picker
  });

  return (
    <div
      {...getRootProps()}
      className={`dropzone ${
        isDragActive ? "active" : ""
      } border-2 border-neutral-300 rounded-lg p-5 text-center cursor-pointer flex items-center justify-center h-[150px] w-[300px] m-auto`}
    >
      <input type="file" name="file" {...getInputProps()} />
      {uploadedFile ? (
        // Display the file name and a file icon after upload
        <div className="flex flex-col items-center gap-2">
          <InsertDriveFileIcon style={{ fontSize: "50px", color: "white" }} />
          <p className="text-sm text-white">{uploadedFile.name}</p> {/* File name displayed */}
        </div>
      ) : (
        <div className="flex flex-col gap-4 items-center">
          <p>ICS Upload</p>
          <FileUploadIcon style={{ fontSize: "50px" }} />
        </div>
      )}
    </div>
  );
};

export default ICSFileUpload;