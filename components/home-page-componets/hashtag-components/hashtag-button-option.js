import React from "react";
import { useDispatch } from "react-redux";
import { addHashtag } from "../../redux/slices/searchResultsSlice";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function HashtagButtonOption({ name, color }) {
  const dispatch = useDispatch();
  const [hovered, setHovered] = useState(false);


  const handleSuggestionClick = (name) => {
    dispatch(addHashtag({ field: "selectedHashtags", value: name }));
  };
  return (
    <button
      onClick={() => handleSuggestionClick(name)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: hovered
          ? color.hovered
          : color.unhovered,
      }}
      className={` px-3 py-2 m-1.5 text-sm rounded-full text-neutral-900  text-black cursor-pointer`}
    >
      {name}
    </button>
  );
}
