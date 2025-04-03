import { useSelector, useDispatch } from "react-redux";
import { modify_event } from "../redux/slices/eventSlice";
import { modify_modifyEvent } from "../redux/slices/modifyEventSlice";
import { Field, Label, Input } from "@headlessui/react";

export default function ImageUrlInput({ modifyOrCreate }) {
  const dispatch = useDispatch();

  // Properly fetching the image_url state
  const image_url = useSelector((state) =>
    modifyOrCreate === "Create"
      ? state.event.image_url // Correct field name
      : state.modifyEvent.image_url
  );

  const handleChange = (e) => {
    const newValue = e.target.value;
    // Dispatching actions based on mode
    if (modifyOrCreate === "Create") {
      dispatch(modify_event({ field: "image_url", value: newValue }));
    } else {
      dispatch(modify_modifyEvent({ field: "image_url", value: newValue }));
    }
  };

  return (
    <div className="relative mt-2 w-full">
      <Field className="flex flex-col items-start">
        <Label htmlFor="image" className="text-white text-sm font-medium mb-2">
          Image URL
        </Label>
        <Input
          id="image"
          name="image"
          value={image_url || ""}
          onChange={handleChange}
          className="bg-neutral-700 w-full h-10 rounded-xl text-white px-4
                     focus:ring-2 focus:ring-brand-blue focus:outline-none hover:bg-neutral-600"
        />
      </Field>
    </div>
  );
}
