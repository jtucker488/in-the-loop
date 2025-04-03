import HashtagButtonSelected from "./hashtag-button-selected";
import { useSelector } from "react-redux";

function SelectedHashtagButtonContainer() {
  const selectedHashtags = useSelector(
    (state) => state.searchResults.selectedHashtags
  );

  return (
    <div className="mb-2">
      {selectedHashtags && (
        <div className="flex overflow-x-auto scroll-container whitespace-nowrap space-x-2 p-0 max-w-full scrollbar-thin scrollbar-thumb-black scrollbar-track-transparent scrollbar-h-[2px]">
          {selectedHashtags.map((name) => (
            <HashtagButtonSelected key={name} name={name} />
          ))}
        </div>
      )}
    </div>
  );
}

export default SelectedHashtagButtonContainer;
