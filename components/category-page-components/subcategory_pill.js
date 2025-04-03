import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { modify, fetchSelectedEvents } from "../redux/slices/searchResultsSlice";

function SubcategoryPill({ subcategory }) {
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);

  const selected_subcategory = useSelector(
    (state) => state.searchResults.subcategory
  );

  const handlePillClick = async (subcategory) => {
    await dispatch(modify({ field: "dataFullyLoaded", value: false }));
    await dispatch(modify({ field: "subcategory", value: subcategory }));
    await dispatch(modify({ field: "displayedEvents", value: [] }));
    await dispatch(fetchSelectedEvents({ pagination: false }));
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  // Inline styling logic
  const baseStyle = {
    padding: "0.5rem 1rem",
    margin: "0.375rem",
    borderRadius: "9999px",
    cursor: "pointer",
    fontSize: "0.875rem",
    whiteSpace: "nowrap",
    backgroundColor:
      selected_subcategory === subcategory
        ? "#e5e5e5" // Selected: Neutral-200
        : isHovered
        ? "#41474F" // Not selected but hovered
        : "#262626", // Not selected and not hovered
    color:
      selected_subcategory === subcategory
        ? "black" // Selected
        : "white", // Not selected
    transition: "background-color 0.3s ease, color 0.3s ease", // Smooth transition for hover
  };

  return (
    <button
      type="button"
      style={baseStyle}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => handlePillClick(subcategory)}
    >
      {subcategory}
    </button>
  );
}

export default SubcategoryPill;