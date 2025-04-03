import VenueState from "./venue-state";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Button } from "../catalyst/button";
import axios from "axios";
import { modify } from "../redux/slices/searchResultsSlice";
import { reset_form } from "../redux/slices/createVenueSlice";
import GeneralInput from "../general/general-input";
const config = require("../../config.json");

export default function CreateorModifyVenueForm({ closeModal, slice }) {
  const stateSelector = (state) => state[slice];
  const venue_info = useSelector(stateSelector);

  const dispatch = useDispatch();
  useEffect(() => {
    if (slice === "createVenue") {
      dispatch(reset_form());
    }
  }, []);

  const modifyVenue = async () => {
    console.log("modifyVenue");
    const post_data = {
      name: venue_info.name,
      address: venue_info.address,
      city: venue_info.city,
      state: venue_info.state,
      postal_code: venue_info.zip,
      id: venue_info.id,
    };
    console.log("post_data", post_data);

    try {
      // API LINK
      const res = await axios.post(
        "http://localhost:5002/venues/editvenue",
        // Not sure if this is the correct API endpoint
        // `${config.api.eventUrl}/venues/editvenue`, // Your API endpoint
        post_data, // Request body
        {
          headers: {
            "Content-Type": "application/json", // Set content type header
          },
        }
      );
      const fetchVenues = async () => {
        try {
          // API LINK
          // await axios.get(`http://localhost:5002/venues`);

          await axios.get(`${config.api.eventUrl}/venues`);
          dispatch(modify({ venues: res.data }));
        } catch (err) {
          console.log(`An error has occurred: ${err}`);
        }
      };
      fetchVenues();
      console.log("Event added successfully:", res.data);
    } catch (err) {
      console.log(`An error has occurred: ${err}`);
    }
  };

  const addVenue = async () => {
    const request_data = {
      name: venue_info.name,
      address: venue_info.address,
      city: venue_info.city,
      state: venue_info.state,
      postal_code: venue_info.zip,
    };
    console.log("request_data", request_data);

    try {
      // API LINK
      const res = await axios.post(
        // `${config.api.eventUrl}/venues`, // Your API endpoint
        "http://localhost:5002/venues/createVenue",

        request_data, // Request body
        {
          headers: {
            "Content-Type": "application/json", // Set content type header
          },
        }
      );
      const fetchVenues = async () => {
        try {
          // API LINK
          const res = await axios.get(`${config.api.eventUrl}/venues`);
          // await axios.get(`http://localhost:5002/venues`);

          dispatch(modify({ venues: res.data }));
        } catch (err) {
          console.log(`An error has occurred: ${err}`);
        }
      };
      fetchVenues();
      console.log("Event added successfully:", res.data);
    } catch (err) {
      console.log(`An error has occurred: ${err}`);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission
    if (slice === "modifyVenue") {
      modifyVenue();
    } else {
      addVenue();
    }
    closeModal();
  };

  return (
    <div className="mx-auto p-4 flex flex-col gap-4" style={{ width: "500px" }}>
      <p className="text-center text-xl font-bold mt-2 mb-2 text-input-text-color">
        Create Venue
      </p>
      <GeneralInput
        sliceName={slice === "createVenue" ? "createVenue" : "modifyVenue"}
        label={"Venue Name"}
        fieldName="name"
      />
      <GeneralInput
        sliceName={slice === "createVenue" ? "createVenue" : "modifyVenue"}
        label={"Address"}
        fieldName="address"
      />

      <div className="flex gap-2 items-center">
        <div className="w-[200px]">
          <GeneralInput
            sliceName={slice === "createVenue" ? "createVenue" : "modifyVenue"}
            label={"City"}
            fieldName="city"
          />
        </div>
        <VenueState sliceName = {slice} />
        <div className="w-[113px]">
          <GeneralInput
            sliceName={slice === "createVenue" ? "createVenue" : "modifyVenue"}
            label={"Zip"}
            fieldName="zip"
          />
        </div>
      </div>
      <Button
        type="button" // Change button type to "button"
        color="rose"
        className="  w-full text-black py-2 px-4 rounded"
        onClick={handleSubmit}
      >
        Confirm
      </Button>
    </div>
  );
}
