import { useSelector, useDispatch } from "react-redux";
import { modify_event } from "../redux/slices/eventSlice";
import { modify_modifyEvent } from "../redux/slices/modifyEventSlice";
// import { Textarea } from "../catalyst/textarea";
import { Textarea } from "@headlessui/react";

export default function DescriptionInput({ name , modifyEventOrEvent}) {
  const dispatch = useDispatch();
  let description;
  if (modifyEventOrEvent === "event") {
    description = useSelector((state) => state.event.description);
  }
  else{
    description = useSelector((state) => state.modifyEvent.description);

  }

  const handleChange = (e) => {
    const newValue = e.target.value;
    if (modifyEventOrEvent === "event") {
      dispatch(modify_event({ field: name, value: newValue }));
    }
    else{
      dispatch(modify_modifyEvent({ field: name, value: newValue }));

    }
  };

  return (
    <>
      <Textarea
        id="description"
        name={name}
        onChange={handleChange}
        value={description || ""}
        placeholder="Write a description..."
        className="font-normal border-none bg-neutral-700 w-full h-20 rounded-xl text-input-text-color px-4 py-2
                     focus:ring-2 focus:ring-brand-blue focus:outline-none hover:bg-neutral-600"
        // className="bg-black block w-full pl-4 pt-2 rounded-lg text-input-text-color placeholder:text-neutral-300 placeholder:font-normal sm:text-sm sm:leading-6 focus:outline-none focus:ring-2 focus:ring-white focus:border-white h-[162px] resize-none"
        // style={{ border: ".5px solid white" }}
      />
    </>
  );
}
