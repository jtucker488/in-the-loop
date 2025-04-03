import { useSelector } from "react-redux";
import CalendarInputFilter from "./calendar-filter-input";
import { isEndDateBeforeStartDate } from "../format/format-input";


function CalendarPage() {
  let start_date = useSelector((state) => state.searchResults["start_date"]);
  let end_date = useSelector((state) => state.searchResults["end_date"]);

  return (
    <div className="ml-7 w-[250px] px-6 pt-2 absolute left-0 mt-4 bg-neutral-800 rounded-md z-50">
      <div className="flex mb-4 flex-col gap-y-6">
        {/* Start Date */}
        <div className="flex flex-col">
          
          <CalendarInputFilter inputLabel="Start:" name={"start_date"} />
        </div>

        {/* End Date */}
        <div className="flex flex-col">
          <CalendarInputFilter inputLabel="End:" name={"end_date"} />
        </div>
      </div>

      {/* Error Message */}
      {isEndDateBeforeStartDate(start_date, end_date) && (
        <p className="text-red-500 text-sm mb-4">
          * End date cannot be before start date.
        </p>
      )}
    </div>
  );
}

export default CalendarPage;