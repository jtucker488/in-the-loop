import HashtagButton from "./hashtag-button-option-form";

function HashtagButtonContainerForm({ modifyEventOrEvent, suggestions }) {
  return (
    <div className="flex flex-wrap gap-2">
      {suggestions.map(({ name, color }) => (
        <HashtagButton
          modifyEventOrEvent={modifyEventOrEvent}
          key={name}
          name={name}
          color={color}
        />
      ))}
    </div>
  );
}

export default HashtagButtonContainerForm;
