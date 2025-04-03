"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { modify_event } from "../../redux/slices/eventSlice";
import { modify_modifyEvent } from "../../redux/slices/modifyEventSlice";
import ChooseVenue from "./choose-venue";
import InputAddress from "./input-address";

export default function PickLocationPage({ setModalVisible, modifyEventOrEvent }) {
  const dispatch = useDispatch();

  // Redux slice and action creator determination
  const reduxSlice = modifyEventOrEvent === "event" ? "event" : "modifyEvent";
  const modifyAction = modifyEventOrEvent === "event" ? modify_event : modify_modifyEvent;
  console.log("modifyEventOrEvent", modifyEventOrEvent)
  // Selectors based on the current slice
  const venue_id = useSelector((state) => state[reduxSlice].venue_id);
  const reduxAddress = useSelector((state) => state[reduxSlice].address);
  const reduxCity = useSelector((state) => state[reduxSlice].city);
  const reduxState = useSelector((state) => state[reduxSlice].state);
  const reduxZip = useSelector((state) => state[reduxSlice].zip);

  // Local state for input values
  const [selectedOption, setSelectedOption] = useState(null);
  const [currentVenueId, setCurrentVenueId] = useState(null);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [error, setError] = useState("");

  // Sync Redux values to local state on load and determine initial option
  useEffect(() => {
    if (venue_id) {
      setCurrentVenueId(venue_id);
      setSelectedOption("chooseVenue");
    } else if (reduxAddress) {
      setAddress(reduxAddress);
      setCity(reduxCity);
      setState(reduxState);
      setZip(reduxZip);
      setSelectedOption("inputAddress");
    }
  }, [venue_id, reduxAddress, reduxCity, reduxState, reduxZip]);

  // Handle option change
  const handleClick = (option) => {
    setSelectedOption(option);
    setError(""); // Clear any existing error message

    if (option === "chooseVenue") {
      // Reset address fields in both local and Redux state
      setAddress("");
      setCity("");
      setState("");
      setZip("");
      dispatch(modifyAction({ field: "address", value: "" }));
      dispatch(modifyAction({ field: "city", value: "" }));
      dispatch(modifyAction({ field: "state", value: "" }));
      dispatch(modifyAction({ field: "zip", value: "" }));
    } else if (option === "inputAddress") {
      // Reset venue selection in both local and Redux state
      setCurrentVenueId(null);
      dispatch(modifyAction({ field: "venue_id", value: null }));
    }
  };

  const isSelected = (option) => selectedOption === option;

  const handleConfirm = (event) => {
    event.preventDefault();

    if (selectedOption === "chooseVenue" && currentVenueId) {
      dispatch(modifyAction({ field: "venue_id", value: currentVenueId }));
      console.log("Venue ID submitted:", currentVenueId);
    } else if (selectedOption === "inputAddress") {
      if (!address) return setError("Address is missing");
      if (!city) return setError("City is missing");
      if (!state) return setError("State is missing");
      if (!zip) return setError("Zip code is missing");

      dispatch(modifyAction({ field: "address", value: address }));
      dispatch(modifyAction({ field: "city", value: city }));
      dispatch(modifyAction({ field: "state", value: state }));
      dispatch(modifyAction({ field: "zip", value: zip }));
      console.log("Address submitted:", { address, city, state, zip });
    }
    setModalVisible(false);
  };

  return (
    <div className="flex flex-col h-[390px] text-white bg-neutral-800 rounded p-4 gap-4">
      <div className="flex flex-row items-start">
        {/* Input Address Section */}
        <div
          onClick={() => handleClick("inputAddress")}
          className={`h-[280px] flex flex-col items-center w-full p-4 cursor-pointer rounded border-2 ${
            isSelected("inputAddress")
              ? "bg-neutral-600 border-neutral-500"
              : "border-neutral-500 hover:bg-neutral-500"
          }`}
        >
          <p className="text-center text-xl font-bold mb-4 text-input-text-color">
            Add Address Manually
          </p>
          <InputAddress
            address={address}
            setAddress={setAddress}
            city={city}
            setCity={setCity}
            state={state}
            setState={setState}
            zip={zip}
            setZip={setZip}
          />
        </div>

        {/* Divider with Vertical Line */}
        <div className="flex flex-col items-center mx-4">
          <div className="w-[1px] h-[120px] bg-neutral-300"></div>
          <span className="my-2 text-neutral-300">or</span>
          <div className="w-[1px] h-[120px] bg-neutral-300"></div>
        </div>

        {/* Choose Venue Section */}
        <div
          onClick={() => handleClick("chooseVenue")}
          className={`flex flex-col items-center w-full p-4 cursor-pointer rounded border-2 ${
            isSelected("chooseVenue")
              ? "bg-neutral-600 border-neutral-500"
              : "border-neutral-500 hover:bg-neutral-500"
          }`}
        >
          <p className="text-center text-xl font-bold mb-4 text-input-text-color">
            Pick a Venue
          </p>
          <ChooseVenue
            currentVenueId={currentVenueId}
            setCurrentVenueId={setCurrentVenueId}
          />
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="flex justify-start">
          <p className="text-red-500 text-base text-center">{error}</p>
        </div>
      )}

      <div className="flex justify-center">
        <button
          type="button"
          className="bg-brand-blue w-full text-black py-2 px-4 rounded"
          onClick={handleConfirm}
        >
          Confirm
        </button>
      </div>
    </div>
  );
}