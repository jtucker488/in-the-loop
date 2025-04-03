import React from "react";

function PresentedDateRange({ start_date, end_date }) {
  console.log("start date:", start_date,"end date:", end_date);
  
  return (
    <div className="px-3 py-2 m-1.5 text-sm rounded-full text-neutral-900 bg-neutral-200 text-black">
      Start: {start_date}
      {end_date && (
        <span> End: {end_date}</span>
      )}
    </div>
  );
}

export default PresentedDateRange;