import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeHashtag } from "../../redux/slices/eventSlice";
import { modifyRemoveHashtag } from "../../redux/slices/modifyEventSlice";
import CloseIcon from "@mui/icons-material/Close";

function HashtagButtonSelectedForm({ name, modifyEventOrEvent }) {
  const dispatch = useDispatch();

  // Retrieve available_hashtags from Redux state
  const availableHashtags = useSelector(
    (state) => state.searchResults.available_hashtags
  );

  // Look up the color for the given hashtag
  const color = availableHashtags[name];

  const handleCloseClick = (event) => {
    event.preventDefault(); // Prevent form submission
    if (modifyEventOrEvent === "event") {
      dispatch(removeHashtag({ field: "hashtags", value: name }));
    } else {
      dispatch(modifyRemoveHashtag({ field: "hashtags", value: name }));
    }
  };

  return (
    <div className="relative h-[39px]">
      <button
        onClick={(event) => event.preventDefault()}

        style={{
          backgroundColor: color.unhovered,
        }}
        className={` py-1 px-2 text-sm rounded-full text-neutral-200 cursor-pointer`}
      >
        {name}
      </button>
      <button
        onClick={handleCloseClick}
        className="w-[16px] -top-1 -right-2 z-50 h-[16px] absolute rounded-full bg-neutral-200"
      >
        <CloseIcon
          style={{ marginBottom: "10px", fontSize: 16, color: "black" }}
        />
      </button>
    </div>
  );
}

export default HashtagButtonSelectedForm;
