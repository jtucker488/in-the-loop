"use client";
import { useSelector, useDispatch } from "react-redux";
import { modify_event } from "../../../redux/slices/eventSlice";
import { Field, Label, Input } from "@headlessui/react";

export default function NumberMenu({ disabled, name }) {
  const dispatch = useDispatch();

  // Dynamically access the current value from the event slice based on the `name` prop
  const current_number = useSelector(
    (state) => state.event[name] // Access `repeat_frequency` or `ends_after_occurances`
  );

  const handleChange = (e) => {
    const newValue = e.target.value;
    if (!disabled) {
      dispatch(modify_event({ field: name, value: newValue })); // Use `name` dynamically
    }
  };

  const handleIncrement = () => {
    dispatch(
      modify_event({
        field: name, // Use `name` dynamically
        value: Number(current_number) + 1,
      })
    );
  };

  const handleDecrement = () => {
    if (current_number > 1) {
      dispatch(
        modify_event({
          field: name, // Use `name` dynamically
          value: Number(current_number) - 1,
        })
      );
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <div className="relative flex items-center">
        <button
          type="button"
          onClick={handleDecrement}
          className="w-6 h-full text-input-text-color hover:text-neutral-400 focus:outline-none"
          disabled={disabled}
        >
          &ndash;
        </button>
        <Input
          type="number"
          className="text-center bg-neutral-700 w-[50px] h-10 rounded-xl text-input-text-color px-2 focus:ring-2 focus:ring-brand-blue focus:outline-none hover:bg-neutral-600"
          value={current_number || ""}
          name={name}
          onChange={handleChange}
          min="1"
        />
        <button
          type="button"
          onClick={handleIncrement}
          className="w-6 h-full text-input-text-color hover:text-neutral-400 focus:outline-none"
        >
          +
        </button>
      </div>
      <style jsx>{`
        .custom-number-input::-webkit-outer-spin-button,
        .custom-number-input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        .custom-number-input {
          -moz-appearance: textfield;
        }
      `}</style>
    </div>
  );
}
