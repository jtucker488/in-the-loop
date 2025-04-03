import React from "react";
import { useDispatch } from "react-redux";
import { addHashtag } from "../../redux/slices/eventSlice";
import { modifyAddHashtag } from "../../redux/slices/modifyEventSlice";
import { useState } from "react";
function HashtagButtonOptionForm({ name, color, modifyEventOrEvent }) {
  const dispatch = useDispatch();
  const [hovered, setHovered] = useState(false);


  const handleSuggestionClick = () => {
    if (modifyEventOrEvent === "event") {
      dispatch(addHashtag({ field: "hashtags", value: name }));
    } else {
      dispatch(modifyAddHashtag({ field: "hashtags", value: name }));
    }
  };

  return (
    <button
      type="button"
      onClick={handleSuggestionClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: hovered
          ? color.hovered
          : color.unhovered,
      }}
      className={`px-3 py-2 text-sm rounded-full text-white  cursor-pointer`}
    >
      {name}
    </button>
  );
}

export default HashtagButtonOptionForm;