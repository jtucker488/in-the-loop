import { useState } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

const states = [
  { name: "Alabama", abbreviation: "AL" },
  { name: "Alaska", abbreviation: "AK" },
  { name: "Arizona", abbreviation: "AZ" },
  { name: "Arkansas", abbreviation: "AR" },
  { name: "California", abbreviation: "CA" },
  { name: "Colorado", abbreviation: "CO" },
  { name: "Connecticut", abbreviation: "CT" },
  { name: "Delaware", abbreviation: "DE" },
  { name: "Florida", abbreviation: "FL" },
  { name: "Georgia", abbreviation: "GA" },
  { name: "Hawaii", abbreviation: "HI" },
  { name: "Idaho", abbreviation: "ID" },
  { name: "Illinois", abbreviation: "IL" },
  { name: "Indiana", abbreviation: "IN" },
  { name: "Iowa", abbreviation: "IA" },
  { name: "Kansas", abbreviation: "KS" },
  { name: "Kentucky", abbreviation: "KY" },
  { name: "Louisiana", abbreviation: "LA" },
  { name: "Maine", abbreviation: "ME" },
  { name: "Maryland", abbreviation: "MD" },
  { name: "Massachusetts", abbreviation: "MA" },
  { name: "Michigan", abbreviation: "MI" },
  { name: "Minnesota", abbreviation: "MN" },
  { name: "Mississippi", abbreviation: "MS" },
  { name: "Missouri", abbreviation: "MO" },
  { name: "Montana", abbreviation: "MT" },
  { name: "Nebraska", abbreviation: "NE" },
  { name: "Nevada", abbreviation: "NV" },
  { name: "New Hampshire", abbreviation: "NH" },
  { name: "New Jersey", abbreviation: "NJ" },
  { name: "New Mexico", abbreviation: "NM" },
  { name: "New York", abbreviation: "NY" },
  { name: "North Carolina", abbreviation: "NC" },
  { name: "North Dakota", abbreviation: "ND" },
  { name: "Ohio", abbreviation: "OH" },
  { name: "Oklahoma", abbreviation: "OK" },
  { name: "Oregon", abbreviation: "OR" },
  { name: "Pennsylvania", abbreviation: "PA" },
  { name: "Rhode Island", abbreviation: "RI" },
  { name: "South Carolina", abbreviation: "SC" },
  { name: "South Dakota", abbreviation: "SD" },
  { name: "Tennessee", abbreviation: "TN" },
  { name: "Texas", abbreviation: "TX" },
  { name: "Utah", abbreviation: "UT" },
  { name: "Vermont", abbreviation: "VT" },
  { name: "Virginia", abbreviation: "VA" },
  { name: "Washington", abbreviation: "WA" },
  { name: "West Virginia", abbreviation: "WV" },
  { name: "Wisconsin", abbreviation: "WI" },
  { name: "Wyoming", abbreviation: "WY" },
];

export default function ChooseAddressState({
  selectedState,
  setSelectedState,
}) {
  const handleStateSelect = (stateAbbreviation) => {
    setSelectedState(stateAbbreviation); // Update state in parent component
  };

  return (
    <div className="flex flex-col items-start space-x-2 mt-[10px]">
      <label className="text-white text-sm font-semibold mb-2 w-[50px]">
        State
      </label>

      <Menu as="div" className="relative inline-block text-left">
        <div>
          <MenuButton className="w-[150px] inline-flex justify-between items-center bg-brand-blue text-white font-medium px-4 py-2 rounded-md hover:bg-sky-blue transition">
            <span className="truncate text-left">
              {selectedState || "Select"}
            </span>
            <ChevronDownIcon aria-hidden="true" className="h-5 w-5" />
          </MenuButton>
        </div>

        <MenuItems
          transition
          className="absolute left-0 top-full z-10 mt-2 w-[150px] origin-top-left rounded-md bg-neutral-700 shadow-lg ring-1 ring-black/5 transition focus:outline-none max-h-48 overflow-y-auto"
        >
          {states.map((state, index) => (
            <MenuItem
              as="div"
              key={index}
              onClick={() => handleStateSelect(state.abbreviation)}
              className="block px-4 py-2 text-sm text-gray-300 hover:bg-brand-blue hover:text-white cursor-pointer"
            >
              {state.name}
            </MenuItem>
          ))}
        </MenuItems>
      </Menu>
    </div>
  );
}