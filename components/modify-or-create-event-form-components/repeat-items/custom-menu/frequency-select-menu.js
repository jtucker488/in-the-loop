"use client";

import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

import { useDispatch, useSelector } from "react-redux";
import { modify_event } from "../../../redux/slices/eventSlice";

const freq_options = ["Day", "Week", "Month", "Year"];

export default function FrequencySelectMenu() {
  const dispatch = useDispatch();
  let repeat_length_of_time = useSelector(
    (state) => state.event.repeat_length_of_time
  );

  const handleChange = (newValue) => {
    dispatch(modify_event({ field: "repeat_length_of_time", value: newValue }));
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton
          outline={true}
          className="inline-flex items-center bg-brand-blue text-white font-medium px-4 py-2 rounded-md hover:bg-sky-blue transition"
        >
          <span>{repeat_length_of_time || ""}</span>
          <ChevronDownIcon aria-hidden="true" className="h-5 w-5 ml-1" />
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute left-0 top-full z-10 mt-2 w-56 origin-top-left rounded-md bg-neutral-700 shadow-lg ring-1 ring-black/5 transition focus:outline-none max-h-48 overflow-y-auto"
      >
        {freq_options &&
          freq_options.map((option, index) => (
            <MenuItem
              as="div" // Render as div or button
              key={index}
              onClick={() => handleChange(option)}
              className="block px-4 py-2 text-sm text-gray-300 hover:bg-brand-blue hover:text-white cursor-pointer"
            >
              {option}
            </MenuItem>
          ))}
      </MenuItems>
    </Menu>
  );
}
