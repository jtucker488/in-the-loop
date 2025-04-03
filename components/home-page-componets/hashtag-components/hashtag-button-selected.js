import React from "react";
import { useDispatch } from "react-redux";
import { removeHashtag } from "../../redux/slices/searchResultsSlice";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";
function HashtagButtonSelected({ name }) {
  const dispatch = useDispatch();
  const availableHashtags = useSelector(
    (state) => state.searchResults.available_hashtags
  );
  console.log("name", name);
  const color = availableHashtags[name];
  const handleRemoveClick = (name) => {
    dispatch(removeHashtag({ field: "selectedHashtags", value: name }));
  };

  return (
    <div className="relative inline-block">
      {/* Close Icon Button */}
      <button
        onClick={() => handleRemoveClick(name)}
        className=" absolute bg-white w-5 h-5 flex items-center justify-center rounded-full z-10 "
      >
        <CloseIcon style={{ fontSize: 16, color: "black" }} />
      </button>
      {/* Hashtag Button */}
      <button
        style={{
          backgroundColor: color.unhovered,
        }}
        className="px-3 py-2 m-1.5 text-sm rounded-full text-neutral-200  text-white cursor-pointer"
      >
        {name}
      </button>
    </div>
  );
}

export default HashtagButtonSelected;
