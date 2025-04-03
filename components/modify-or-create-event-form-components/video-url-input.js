import { useSelector, useDispatch } from "react-redux";
import { modify_event } from "../redux/slices/eventSlice";
import { modify_modifyEvent } from "../redux/slices/modifyEventSlice";
import { Field, Label, Input } from "@headlessui/react";

export default function VideoURLInput({ modifyOrCreate }) {
  const dispatch = useDispatch();
  let video_url;
  if (modifyOrCreate === "Create") {
    video_url = useSelector((state) => state.event.video_url);
  } else {
    video_url = useSelector((state) => state.modifyEvent.video_url);
  }
  const handleChange = (e) => {
    const newValue = e.target.value;
    if (modifyOrCreate === "Create") {
      dispatch(modify_event({ field: "video_url", value: newValue }));
    } else {
      dispatch(modify_modifyEvent({ field: "video_url", value: newValue }));
    }
  };

  return (
    <div className="relative mt-2 w-full">
      <Field className="flex flex-col items-start">
        <Label className="text-white text-sm font-medium mb-2"htmlFor="name">
          Image URL
        </Label>
        <Input
          id="image"
          name="image"
          value={video_url || ""}
          onChange={handleChange}
          className="bg-neutral-700 w-full h-10 rounded-xl text-input-text-color px-4
                     focus:ring-2 focus:ring-brand-blue focus:outline-none hover:bg-neutral-600"
        />
      </Field>
    </div>
  );
}
