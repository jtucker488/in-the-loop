import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import FileUploadIcon from "@mui/icons-material/FileUpload";

const ExcelFileUpload = ({ setSelectedFile }) => {
  const onDrop = useCallback((acceptedFiles) => {
    console.log("File selected:", acceptedFiles[0]);
    setSelectedFile(acceptedFiles[0]); // Store the selected file in the parent state
  }, [setSelectedFile]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
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
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the .xlsx file here</p>
      ) : (
        <div className="flex flex-col gap-4 items-center">
          <p>Excel Upload</p>
          <FileUploadIcon style={{ fontSize: "50px" }} />
        </div>
      )}
    </div>
  );
};

export default ExcelFileUpload;
