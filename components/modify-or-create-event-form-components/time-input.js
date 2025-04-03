import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { modify_event } from "../redux/slices/eventSlice";
import { modify_modifyEvent } from "../redux/slices/modifyEventSlice";
import { AiOutlineClockCircle } from "react-icons/ai"; // Clock icon
// import { Input } from "../catalyst/input";
import { Field, Label, Input } from "@headlessui/react";

// Ensure time is formatted as HH:mm
const formatToHHMM = (time) => {
  if (!time) return ""; // Handle null or undefined
  const [hours, minutes] = time.split(":").map((part) => part.padStart(2, "0")); // Pad hours and minutes
  return `${hours}:${minutes}`;
};

export default function TimeInput({ name, modifyEventOrEvent, inputLabel }) {
  const dispatch = useDispatch();

  // Get the time value from Redux based on `modifyOrCreate`
  let time;
  if (modifyEventOrEvent === "event") {
    time = useSelector((state) => state.event[name]);
  } else {
    time = useSelector((state) => state.modifyEvent[name]);
  }

  // Format time to HH:mm for input
  const formattedTime = formatToHHMM(time);

  // Handle the change event
  const handleChange = (event) => {
    const newTime = event.target.value || ""; // Ensure an empty string if cleared
    if (modifyEventOrEvent === "event") {
      dispatch(modify_event({ field: name, value: newTime }));
    } else {
      dispatch(modify_modifyEvent({ field: name, value: newTime }));
    }
  };

  return (
    // <div className="relative w-full">
    <Field className="flex flex-col items-start">
      <Label className="text-white text-sm font-medium mb-2"htmlFor="name">
        {inputLabel}
      </Label>
      <div className="relative w-full">
        <Input
          className="font-normal border-none bg-neutral-700 w-full h-10 rounded-xl text-input-text-color px-4
                     focus:ring-2 focus:ring-brand-blue focus:outline-none hover:bg-neutral-600"
          type="time"
          name={name}
          value={formattedTime} // Ensure HH:mm format
          onChange={handleChange}
        />
        <div className="absolute right-2 top-1 h-8 w-8 rounded-full flex items-center justify-center pointer-events-none">
          <AiOutlineClockCircle
            className="h-5 w-5 text-white"
            size={16} // Smaller size to fit well
          />
        </div>
      </div>
    </Field>
  );
}
