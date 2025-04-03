import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { modify_event } from "../redux/slices/eventSlice";
import { format_date } from "../format/format-input";
import dayjs from "dayjs";
import { modify_modifyEvent } from "../redux/slices/modifyEventSlice";
import { Field, Label, Input } from "@headlessui/react";
import { CalendarIcon } from "@heroicons/react/20/solid";

export default function CalendarInput({
  name,
  disabled,
  modifyEventOrEvent,
  inputLabel,
}) {
  const dispatch = useDispatch();
  let calendar_date;
  if (modifyEventOrEvent === "event") {
    calendar_date = useSelector((state) => state.event[name]);
  } else {
    calendar_date = useSelector((state) => state.modifyEvent[name]);
  }

  const handleChange = (e) => {
    let date = e.target.value;
    if (modifyEventOrEvent === "event") {
      dispatch(modify_event({ field: name, value: date }));
    } else {
      dispatch(modify_modifyEvent({ field: name, value: date }));
    }
  };
  // Make a variable called title


  return (
    <Field className="flex flex-col items-start">
      <Label className="text-white text-sm font-medium mb-2" htmlFor="name">
        {inputLabel}
      </Label>
      

      <div className="relative w-full">
        <Input
          type="date"
          className="font-normal border-none bg-neutral-700 w-full h-10 rounded-xl text-input-text-color px-4
                     focus:ring-2 focus:ring-brand-blue focus:outline-none hover:bg-neutral-600"
          name={name}
          value={
            calendar_date
              ? dayjs(calendar_date).format("YYYY-MM-DD")
              : dayjs().format("YYYY-MM-DD")
          }
          onChange={handleChange}
        />
        {/* <div className="absolute right-2 top-1 h-8 w-8 rounded-full flex items-center justify-center pointer-events-none">
          <CalendarIcon className="h-5 w-5 text-white" />
        </div> */}
      </div>
    </Field>
  );
}
