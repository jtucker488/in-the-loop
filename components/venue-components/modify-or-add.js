"use client";

import CreateVenueButton from "./create-venue-button";
import PickVenueToModify from "./pick-venue-to-modify";

export default function ModifyOrAdd({ setPage }) {
  return (
    <div className="flex flex-col items-center text-white rounded p-4 space-y-4">
      <div className="w-full">
        <CreateVenueButton setPage={setPage} />
      </div>
      <div className="flex items-center my-4 w-full">
        <hr className="flex-grow border-t border-neutral-300" />
        <span className="mx-4 text-neutral-300">or</span>
        <hr className="flex-grow border-t border-neutral-300" />
      </div>
      <div className="w-full">
        <PickVenueToModify setPage={setPage} />
      </div>
    </div>
  );
}
