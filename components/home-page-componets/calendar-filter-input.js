import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { modify } from "../redux/slices/searchResultsSlice";
import { format_date } from "../format/format-input";
import dayjs from "dayjs";
import { Field, Label, Input } from "@headlessui/react";
export default function CalendarInputFilter({ name, inputLabel }) {
  const dispatch = useDispatch();
  let calendar_date = useSelector((state) => state.searchResults[name]);


  const handleChange = (event) => {
    const newValue = event.target.value;

    // const formattedDate = format_date(newValue); // Format the date as needed
    // console.log("formattedDate",formattedDate);
    dispatch(modify({ field: name, value: newValue }));
  };

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
          value={dayjs(calendar_date).format("YYYY-MM-DD")}
          onChange={handleChange}
        />
        {/* <div className="absolute right-2 top-1 h-8 w-8 rounded-full flex items-center justify-center pointer-events-none">
        <CalendarIcon className="h-5 w-5 text-white" />
      </div> */}
      </div>
    </Field>
  );
}