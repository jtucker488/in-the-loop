"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { modify } from "../../redux/slices/searchResultsSlice";
import axios from "axios";
const config = require("../../../config.json");

export default function ChooseVenue({ currentVenueId, setCurrentVenueId }) {
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");

  const venues = useSelector((state) => state.searchResults.venues);

  const filteredVenues =
    query === ""
      ? venues
      : venues.filter((venue) =>
          venue.name.toLowerCase().includes(query.toLowerCase())
        );

  const handleSelectChange = (venue) => {
    setCurrentVenueId(venue.id); // Update state in PickLocationPage
  };

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

  return (
    <div className="w-[300px] h-[200px]">
      {/* Search Input */}
      <div className="sticky top-0 z-10 py-1 mb-2 rounded-lg">
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="bg-neutral-700 w-full h-10 rounded-xl text-input-text-color px-4
          focus:ring-2 focus:ring-brand-blue focus:outline-none hover:bg-neutral-600"
        />
      </div>

      {/* Venue List */}
      <div className="h-[150px] overflow-y-auto space-y-1 scrollbar-thin scrollbar-thumb-black scrollbar-track-transparent">
        {filteredVenues && filteredVenues.length > 0 ? (
          filteredVenues.map((venue) => (
            <div
              key={venue.id}
              className={`text-left relative cursor-pointer w-full h-10 rounded-xl text-input-text-color px-4
                         focus:ring-2 focus:ring-brand-blue focus:outline-none
                         ${
                           currentVenueId === venue.id
                             ? "bg-neutral-400" // Selected venue background color
                             : "bg-neutral-700 hover:bg-neutral-400"
                         }`}
              onClick={() => handleSelectChange(venue)}
            >
              <span className="block truncate pt-2">{venue.name}</span>
            </div>
          ))
        ) : (
          <div className="text-gray-400 px-4 py-2">No venues found.</div>
        )}
      </div>
    </div>
  );
}
