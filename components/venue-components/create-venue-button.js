import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import Modal from "../general/modal";
import CreateVenueMenu from "./create-or-modify-venue-form";
export default function CreateVenueButton({ setPage }) {
  const handleOnClick = () => {
    setPage("addVenue");
  };
  return (
    <div className="relative ">
      <button
        onClick={handleOnClick}
        type="button"
        color="green"
        className="w-full bg-brand-blue hover:bg-sky-blue text-white font-medium px-4 py-2 rounded-md flex items-center"
        outline = {true}
      >
        
        <AddIcon className="mr-[72px]" />
        Create Venue
      </button>
    </div>
  );
}

{/* <div className="mx-auto flex flex-col gap-4" style={{ width: "500px" }}>
  <h2 className="text-white font-semibold px-4">Create Venue</h2>
  <div
    onClick={handleOnClick}
    className="flex ml-4 justify-center items-center rounded-lg w-[150px] bg-white shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
    style={{
      height: "310px",
      minHeight: "310px",
      height: "310px !important",
    }} // Enforcing 312px height
  >
  </div>
</div>; */}
