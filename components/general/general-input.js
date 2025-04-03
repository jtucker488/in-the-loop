import { useSelector, useDispatch } from "react-redux";
import { Field, Label, Input } from "@headlessui/react";
import { modify_createVenue } from "../redux/slices/createVenueSlice";
import { modify_modifyVenue } from "../redux/slices/modifyVenueSlice";
import { modify_event } from "../redux/slices/eventSlice";
import { modify_modifyEvent } from "../redux/slices/modifyEventSlice";
export default function GeneralInput({ sliceName, fieldName, label }) {
  const dispatch = useDispatch();

  const stateSelector = (state) => state[sliceName][fieldName];
  const fieldValue = useSelector(stateSelector);

  let actionCreator;

  switch (sliceName) {
    case "createVenue":
      actionCreator = modify_createVenue;
      break;
    case "modifyVenue":
      actionCreator = modify_modifyVenue;
      break;
    case "event":
      actionCreator = modify_event;
      break;
    case "modifyEvent":
      actionCreator = modify_modifyEvent;
      break;
    default:
      console.error(`Unknown slice: ${sliceName}`);
      return;
  }

  const handleChange = (e) => {
    const newValue = e.target.value;

    // Only dispatch if the new value is different from the current value in the Redux store
    if (newValue !== fieldValue) {
      dispatch(actionCreator({ field: fieldName, value: newValue }));
    }
  };

  return (
    <div className="relative mt-2 w-full">
      <Field className="flex flex-col items-start">
        <Label
          className="text-white text-sm font-medium mb-2"
          htmlFor={fieldName}
        >
          {label}
        </Label>
        <Input
          id={fieldName}
          name={fieldName}
          className="bg-neutral-700 font-normal w-full h-10 rounded-xl text-input-text-color px-4
                     focus:ring-2 focus:ring-brand-blue focus:outline-none hover:bg-neutral-600"
          value={fieldValue || ""}
          onChange={handleChange}
        />
      </Field>
    </div>
  );
}
