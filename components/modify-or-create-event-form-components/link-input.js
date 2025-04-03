import { useSelector, useDispatch } from "react-redux";
import { modify_event } from "../redux/slices/eventSlice";
import { modify_modifyEvent } from "../redux/slices/modifyEventSlice";
import { Field, Label, Input } from "@headlessui/react";


export default function LinkInput({ modifyOrCreate }) {
  const dispatch = useDispatch();
  let html_link;
  if (modifyOrCreate === "Create") {
    html_link = useSelector((state) => state.event.html_link);
  } else {
    html_link = useSelector((state) => state.modifyEvent.html_link);
  }
  const handleChange = (e) => {
    const newValue = e.target.value;

    // Only dispatch if the new value is different from the current value in the Redux store
    if (newValue !== html_link) {
      if (modifyOrCreate === "Create") {
        dispatch(modify_event({ field: "html_link", value: newValue }));
      } else {
        dispatch(modify_modifyEvent({ field: "html_link", value: newValue }));
      }
    }
  };

  return (
    <div className="relative mt-2">
      <Field className="flex flex-col items-start">
        <Label className="text-white text-sm font-medium mb-2"htmlFor="name">
          Event Link
        </Label>
        <Input
          id="html_link"
          name="html_link"
          className="bg-neutral-700 w-full h-10 rounded-xl text-input-text-color px-4
                     focus:ring-2 focus:ring-brand-blue focus:outline-none hover:bg-neutral-600"
          value={html_link || ""}
          onChange={handleChange}
          // className="bg-neutral-800"
        />
      </Field>
    </div>
  );
}
