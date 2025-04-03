import React from "react";
import { Button } from "../catalyst/button";
const ModifyAllOrJustThisInstancePage = ({ handleSubmit }) => {
  return (
    <div className="flex flex-col bg-neutral-800 gap-4 p-8 rounded">
      <h2 className="text-lg text-white font-semibold mb-4 px-4">
        Edit Recurring Event
      </h2>
      <Button
        href="/create-event"
        color="blue"
        onClick={() => handleSubmit(true)} // Correctly wrap the call in an anonymous function
      >
        <div className="flex gap-12 items-center">
          <p className="text-base">Edit Just This Event</p>
        </div>
      </Button>

      <Button
        type="button"
        color="rose"
        onClick={() => handleSubmit(false)} // Correctly wrap the call in an anonymous function
      >
        <div className="flex gap-12 items-center">
          <p className="text-base">Edit All Events</p>
        </div>
      </Button>
    </div>
  );
};

export default ModifyAllOrJustThisInstancePage;
