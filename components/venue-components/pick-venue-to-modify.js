"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz"; // Ensure this import is correct
import { modify_modifyVenue } from "../redux/slices/modifyVenueSlice";
import axios from "axios";
const config = require("../../config.json");
export default function PickVenueToModify({ setPage }) {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedVenue, setSelectedVenue] = useState(null); // State for selected venue for the dropdown menu
  const [query, setQuery] = useState("");
  const venues = useSelector((state) => state.searchResults.venues);

  const filteredVenues =
    query === ""
      ? venues
      : venues.filter((venue) =>
          venue.name.toLowerCase().includes(query.toLowerCase())
        );

  const handleSelectChange = (venue) => {
    setSelectedVenue(venue); // Set the selected venue for which the menu is open
    setIsOpen((prev) => !prev); // Toggle the dropdown menu
  };

  const handleEditClick = ({ venue }) => {
    console.log("venue", venue);
    dispatch(modify_modifyVenue({ field: "name", value: venue.name }));
    dispatch(modify_modifyVenue({ field: "address", value: venue.address }));
    dispatch(modify_modifyVenue({ field: "city", value: venue.city }));
    dispatch(modify_modifyVenue({ field: "state", value: venue.state }));
    dispatch(modify_modifyVenue({ field: "zip", value: venue.postal_code }));
    dispatch(modify_modifyVenue({ field: "id", value: venue.id }));

    console.log("handleEditClick");
    setPage("modify-page");
  };

  const deleteVenue = async ({ venue }) => {
    console.log("venue2", venue);
    const post_data = {
      id: venue.id,
    };

    try {
      // API LINK
      const res = await axios.post(
        "http://localhost:5002/venues/deletevenue",
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

  const handleDeleteClick = ({ venue }) => {
    console.log(`Deleting venue: `, venue);
    deleteVenue({venue});
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="w-[300px]">
      <h2 className="text-white font-semibold mb-4 px-4">
        Pick a venue to modify or delete
      </h2>

      <div className="sticky top-0 bg-neutral-800 z-10 py-1 mb-2 rounded-lg">
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="bg-neutral-700 w-full h-10 rounded-xl text-input-text-color px-4
          focus:ring-2 focus:ring-brand-blue focus:outline-none hover:bg-neutral-600"
        />
      </div>

      <div className="h-64 overflow-y-auto scrollbar-map space-y-1 ">
        {filteredVenues && filteredVenues.length > 0 ? (
          filteredVenues.map((venue) => (
            <div
              key={venue.id}
              className="text-left relative cursor-pointer bg-neutral-700 w-full h-10 rounded-xl text-input-text-color px-4
                     focus:ring-2 focus:ring-brand-blue focus:outline-none hover:bg-neutral-600"

              // onClick={() => handleSelectChange(venue)}
            >
              <span className="block truncate pt-2">{venue.name}</span>
              <MoreHorizIcon
                style={{ color: "white" }} // Set dots color to white
                className="absolute top-2 right-2 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation(); // Prevents the main div's onClick from firing
                  setSelectedVenue(venue); // Set the selected venue for menu actions
                  setIsOpen((prev) => !prev); // Toggle menu visibility
                }}
              />
              {isOpen && selectedVenue?.id === venue.id && (
                <div
                  className="absolute right-0  w-32 bg-white border rounded shadow-lg z-50" // Increased z-index for the dropdown menu
                  style={{ top: "2rem" }} // Adjust position if needed
                >
                  <ul>
                    <li
                      className="px-4 py-2 text-sm text-neutral-700 hover:bg-gray-100 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditClick({ venue });
                      }}
                    >
                      Edit
                    </li>
                    <li
                      className="px-4 py-2 text-sm text-red-500 hover:bg-gray-100 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteClick({ venue });
                      }}
                    >
                      Delete
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-gray-400 px-4 py-2">No venues found.</div>
        )}
      </div>
    </div>
  );
}
