"use client";

import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { modify_event } from "../redux/slices/eventSlice";
import { modify_modifyEvent } from "../redux/slices/modifyEventSlice";

import axios from "axios";
import { modify } from "../redux/slices/searchResultsSlice";
import { Field, Label } from "../catalyst/fieldset";

const config = require("../../config.json");

export default function PickVenueInput({ modifyEventOrEvent }) {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState(""); // For autocomplete
  const [selected, setSelected] = useState(null); // Selected venue
  const [dropdownOpen, setDropdownOpen] = useState(false); // Dropdown visibility
  const dropdownRef = useRef(null); // Ref for dropdown
  const venues = useSelector((state) => state.searchResults.venues || []); // Ensure default empty array

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const res = await axios.get(`${config.api.eventUrl}/venues`);
        dispatch(modify({ field: "venues", value: res.data }));
      } catch (err) {
        console.error("An error occurred while fetching venues:", err);
      }
    };
    fetchVenues();
  }, [dispatch]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelectChange = (venue) => {
    setSelected(venue);
    setSearchQuery(venue.name); // Set search query to the selected venue
    setDropdownOpen(false); // Close dropdown

    if (modifyEventOrEvent === "event") {
      dispatch(modify_event({ field: "venue_id", value: venue.id }));
    } else {
      dispatch(modify_modifyEvent({ field: "venue_id", value: venue.id }));
    }
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
    setDropdownOpen(true); // Open dropdown as user types
  };

  // Filter venues based on the search query
  const filteredVenues = venues.filter((venue) =>
    venue.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div ref={dropdownRef} className="relative w-full max-w-lg">
      <Field className="flex flex-col items-start">
        <Label className="!text-white text-sm font-medium mb-2">
          Pick a Venue
        </Label>
        <input
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          onFocus={() => setDropdownOpen(true)} // Open dropdown when input is focused
          placeholder="Search for a venue..."
          className="font-normal border-none w-full bg-neutral-700 text-white px-4 py-2 rounded-lg focus:ring-2 focus:ring-brand-blue focus:outline-none"
        />
        {dropdownOpen && (
          <ul className="absolute w-full mt-1 bg-neutral-700 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
            {filteredVenues.length > 0 ? (
              filteredVenues.map((venue) => (
                <li
                  key={venue.id}
                  onClick={() => handleSelectChange(venue)}
                  className="cursor-pointer px-4 py-2 bg-neutral-700 text-left text-gray-300 hover:bg-brand-blue hover:text-white"
                >
                  {venue.name}
                </li>
              ))
            ) : (
              <li className="px-4 py-2 text-gray-300">No venues found</li>
            )}
          </ul>
        )}
      </Field>
    </div>
  );
}
