import { useSelector, useDispatch } from "react-redux";
import { modify_event } from "../redux/slices/eventSlice";
import { modify_modifyEvent } from "../redux/slices/modifyEventSlice";
import { Field, Label, Input } from "@headlessui/react";

export default function NameInput({ modifyOrCreate }) {
  const dispatch = useDispatch();
  let name;
  if (modifyOrCreate === "Create") {
    name = useSelector((state) => state.event.name);
  } else {
    name = useSelector((state) => state.modifyEvent.name);
  }

  const handleChange = (e) => {
    const newValue = e.target.value;

    // Only dispatch if the new value is different from the current value in the Redux store
    if (newValue !== name) {
      if (modifyOrCreate === "Create") {
        dispatch(modify_event({ field: "name", value: newValue }));
      } else {
        dispatch(modify_modifyEvent({ field: "name", value: newValue }));
      }
    }
  };

  return (
    <div className="relative mt-2">
      <Field className="flex flex-col items-start">
        <Label className="text-white text-sm  font-medium mb-2"htmlFor="name">
          Event Name
        </Label>
        <Input
          className="bg-neutral-700 w-full h-10 rounded-xl text-input-text-color px-4
                     focus:ring-2 focus:ring-brand-blue focus:outline-none hover:bg-neutral-600"
          id="name"
          name="name"
          value={name || ""}
          onChange={handleChange}
        />
      </Field>
    </div>
  );
}
