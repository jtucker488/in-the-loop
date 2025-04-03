import { useState } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useDispatch } from "react-redux";
import { modify_createVenue } from "../redux/slices/createVenueSlice";
import { modify_modifyVenue } from "../redux/slices/modifyVenueSlice";
import { useSelector } from "react-redux";

const states = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
];
const stateAbbreviationMap = {
  AL: "Alabama",
  AK: "Alaska",
  AZ: "Arizona",
  AR: "Arkansas",
  CA: "California",
  CO: "Colorado",
  CT: "Connecticut",
  DE: "Delaware",
  FL: "Florida",
  GA: "Georgia",
  HI: "Hawaii",
  ID: "Idaho",
  IL: "Illinois",
  IN: "Indiana",
  IA: "Iowa",
  KS: "Kansas",
  KY: "Kentucky",
  LA: "Louisiana",
  ME: "Maine",
  MD: "Maryland",
  MA: "Massachusetts",
  MI: "Michigan",
  MN: "Minnesota",
  MS: "Mississippi",
  MO: "Missouri",
  MT: "Montana",
  NE: "Nebraska",
  NV: "Nevada",
  NH: "New Hampshire",
  NJ: "New Jersey",
  NM: "New Mexico",
  NY: "New York",
  NC: "North Carolina",
  ND: "North Dakota",
  OH: "Ohio",
  OK: "Oklahoma",
  OR: "Oregon",
  PA: "Pennsylvania",
  RI: "Rhode Island",
  SC: "South Carolina",
  SD: "South Dakota",
  TN: "Tennessee",
  TX: "Texas",
  UT: "Utah",
  VT: "Vermont",
  VA: "Virginia",
  WA: "Washington",
  WV: "West Virginia",
  WI: "Wisconsin",
  WY: "Wyoming",
};
export default function StateDropdown({ sliceName }) {
  const dispatch = useDispatch();
  const stateSelector = (state) => state[sliceName]["state"];

  const state = useSelector(stateSelector);


  let actionCreator;
  switch (sliceName) {
    case "createVenue":
      actionCreator = modify_createVenue;
      break;
    case "modifyVenue":
      actionCreator = modify_modifyVenue;
      break;
  }

  const [selectedState, setSelectedState] = useState("");

  const handleStateSelect = (state) => {
    setSelectedState(state); // Update selected state
    dispatch(actionCreator({ field: "state", value: state })); // Update Redux store
  };

  return (
    <Menu
      as="div"
      className="w-[150px] relative inline-block text-left mt-[37px]"
    >
      <div>
        <MenuButton className="w-[150px] inline-flex justify-between items-center bg-brand-blue text-white font-medium px-4 py-2 rounded-md hover:bg-sky-blue transition">
          <span className="truncate text-left">{state ? (state.length === 2 ? stateAbbreviationMap[state] : state) : "State"}</span>
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
            onClick={() => handleStateSelect(state)}
            className="block px-4 py-2 text-sm text-gray-300 hover:bg-brand-blue hover:text-white cursor-pointer"
          >
            {state}
          </MenuItem>
        ))}
      </MenuItems>
    </Menu>
  );
}
