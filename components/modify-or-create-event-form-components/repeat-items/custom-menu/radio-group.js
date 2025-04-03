import React from "react";
import CalendarInput from "../../calendar-input";
import NumberMenu from "./number-menu";
import { useDispatch, useSelector } from "react-redux";
import { modify_event, reset_radio } from "../../../redux/slices/eventSlice";

const occurances = ["never", "on", "after"];

export default function RadioGroup() {
  const dispatch = useDispatch();
  const currentRadio = useSelector((state) => state.event.ends_on);

  const handleRadioChange = (event) => {
    let newValue = event.target.value;
    dispatch(reset_radio());
    if (newValue === "after") {
      dispatch(modify_event({ field: "ends_after_occurances", value: 10 }));
    }
    dispatch(modify_event({ field: "ends_on", value: newValue }));
  };

  return (
    <fieldset>
      <div className="mt-2 space-y-6">
        {occurances.map((occurance) => (
          <div key={occurance} className="flex items-center">
            <input
              checked={currentRadio === occurance}
              id={occurance}
              value={occurance}
              onChange={handleRadioChange}
              name="notification-method"
              type="radio"
              className="no-focus-outline h-4 w-4 border-gray-300 text-neutral-600 focus:outline-none focus:ring-0"
            />
            <label
              htmlFor={occurance}
              className={`ml-3 ${
                occurance === "on" ? "mr-1" : ""
              } block text-sm font-medium leading-6 text-input-text-color`}
            >
              {occurance}
            </label>
            {occurance === "on" && (
              <CalendarInput
                name="ends_on_date"
                disabled={currentRadio !== "on"}
              />
            )}
            {occurance === "after" && (
              <>
                <NumberMenu
                  disabled={currentRadio !== "after"}
                  name="ends_after_occurances"
                />
                <p className="text-sm font-medium leading-6 text-input-text-color">
                  occurances
                </p>
              </>
            )}
          </div>
        ))}
      </div>
    </fieldset>
  );
}
