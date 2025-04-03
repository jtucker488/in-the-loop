import React from "react";
import { useSelector } from "react-redux";
function PresentedHashtag({ name }) {
  const hashtags_with_colors = useSelector(
    (state) => state.searchResults.available_hashtags
  );
  const color = hashtags_with_colors[name];
console.log('color', color);
console.log('hashtags_with_colors', hashtags_with_colors);
console.log('name', name);
  return (
    <div
      style={{ backgroundColor: color.unhovered }} // Use inline styles for the background color
      className={` px-3 py-2 m-1.5 text-sm rounded-full text-neutral-900  text-black`}
    >
      {name}
    </div>
  );
}

export default PresentedHashtag;
