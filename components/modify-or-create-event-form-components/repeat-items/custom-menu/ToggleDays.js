import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { modify_event } from "../../../redux/slices/eventSlice";

const DAYS = [
  { key: "sunday", label: "S" },
  { key: "monday", label: "M" },
  { key: "tuesday", label: "T" },
  { key: "wednesday", label: "W" },
  { key: "thursday", label: "T" },
  { key: "friday", label: "F" },
  { key: "saturday", label: "S" },
];

export default function ToggleDays() {
  const dispatch = useDispatch();
  const day_values = useSelector((state) => state.event.days_to_repeat);

  const handleChange = (dayKey) => {
    let newValue = [...day_values];
    if (newValue.includes(dayKey)) {
      newValue = newValue.filter((value) => value !== dayKey); // Correct filter logic
    } else {
      newValue.push(dayKey); // Add the selected day
    }
    dispatch(modify_event({ field: "days_to_repeat", value: newValue })); // Update Redux state
  };

  return (
    <div className="flex justify-start items-center">
      {DAYS.map((day) => (
        <button
          key={day.key}
          type="button"
          aria-label={day.key}
          onClick={() => handleChange(day.key)} // Pass the key instead of the object
          className={`flex justify-center items-center w-8 h-8 m-1 rounded-full border-[1px] border-input-text-color ${
            day_values.includes(day.key) // Check if the key is in day_values
              ? "bg-input-text-color text-black"
              : "text-input-text-color hover:bg-neutral-500 hover:text-black"
          } text-xs font-medium`}
        >
          {day.label}
        </button>
      ))}
    </div>
  );
}