import HashtagButtonSelected from "./hashtag-button-selected-form";
import { useSelector } from "react-redux";

function SelectedHashtagButtonContainerForm() {
  const selectedHashtags = useSelector((state) => state.event.hashtags);
  return (
    <div className="mb-2">
      {selectedHashtags && (
        <div className="flex overflow-x-auto custom-horizontal-scrollbar whitespace-nowrap space-x-2 p-0 max-w-full">
          {" "}
          {selectedHashtags.map((hashtag) => (
            <HashtagButtonSelected key={hashtag} hashtag={hashtag} />
          ))}
        </div>
      )}
    </div>
  );
}

export default SelectedHashtagButtonContainerForm;
