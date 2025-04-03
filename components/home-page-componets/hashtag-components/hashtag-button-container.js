import HashtagButton from "./hashtag-button-option"; // Adjust the import path as necessary

function HashtagButtonContainer({ suggestions }) {
  return (
    <div className="max-h-[300px] overflow-y-auto space-y-1 scrollbar-thin scrollbar-thumb-black scrollbar-track-transparent">
      {suggestions.map(({ name, color }) => (
        <HashtagButton name={name} color={color} key={name} />
      ))}
    </div>
  );
}

export default HashtagButtonContainer;
