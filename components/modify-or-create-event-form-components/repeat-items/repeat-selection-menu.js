import { useState } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

import dayjs from "dayjs";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

import Modal from "../../general/modal";
import { useDispatch, useSelector } from "react-redux";
import { modify_event } from "../../redux/slices/eventSlice";

import CustomMenu from "./custom-menu/custom-menu";
const today_date = dayjs();

const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const options = [
  "Does not repeat",
  "Daily",
  "Every weekday",
  `Weekly on ${daysOfWeek[today_date.day()]}`,
  "Custom...",
];

export default function RepeatSelectionMenu() {
  const [modalIsVisible, setModalIsVisible] = useState(false);

  function hideModalHandler() {
    setModalIsVisible(false);
  }

  const dispatch = useDispatch();
  let repeat_value = useSelector((state) => state.event["repeat"]);

  const handleChange = (newValue) => {
    if (newValue === "Custom...") {
      setModalIsVisible(true);
    }
    dispatch(modify_event({ field: "repeat", value: newValue }));
  };

  return (
    <div className="flex w-[225px] flex-row justify-start">
      {modalIsVisible && (
        <Modal onClose={hideModalHandler}>
          <CustomMenu />
        </Modal>
      )}
      <Menu as="div" className="relative inline-block text-left w-[225px]">
        <div>
          <MenuButton
            outline={true}
            className="inline-flex items-center bg-brand-blue text-white font-medium px-4 py-2 rounded-md hover:bg-sky-blue transition"
          >
            <span>{repeat_value || ""}</span>
            <ChevronDownIcon aria-hidden="true" className="h-5 w-5 ml-1" />
          </MenuButton>
        </div>

        <MenuItems
          transition
          className="absolute bottom-full mb-2 w-56 rounded-md origin-bottom-left bg-neutral-700 shadow-lg ring-1 ring-black/5 transition focus:outline-none max-h-48 overflow-y-auto"
        >
          {options &&
            options.map((option, index) => (
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
    </div>
  );
}
