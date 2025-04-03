import React from "react";
import { useSelector } from "react-redux";
function HashtagInCard({ hashtag }) {
  let hashtags_with_colors = useSelector(
    (state) => state.searchResults.available_hashtags
  );
  const color_scheme = {
    red: "rgb(255, 107, 107)", // #FF6B6B
    yellow: "rgb(255, 217, 61)", // #FFD93D
    green: "rgb(107, 203, 119)", // #6BCB77
    "sky-blue": "rgb(77, 150, 255)", // #4D96FF
    pink: "rgb(255, 110, 255)", // #FF6EFF
    "indigo-blue": "rgb(76, 76, 255)",
  };
  const color = hashtags_with_colors[hashtag];

  return (
    <button
      style={{
        backgroundColor: color.unhovered,
      }}
      className={` px-2 py-1 m-1.5 text-sm rounded-full text-neutral-900  text-black cursor-pointer`}
    >
      {hashtag}
    </button>
  );
}

export default HashtagInCard;
