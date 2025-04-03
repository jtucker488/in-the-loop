import { useState } from "react";
import ModifyOrAdd from "./modify-or-add";
import CreateorModifyVenueForm from "./create-or-modify-venue-form";
export default function ModifyVenueDirectory({ closeModal }) {
  const [page, setPage] = useState("modifyOrAdd");

  return (
    <div className="bg-neutral-800 rounded mx-auto p-4 flex flex-col gap-4 z-[2000]" >
        {page === "modifyOrAdd" && <ModifyOrAdd setPage={setPage}/>}
        {page === "addVenue" && <CreateorModifyVenueForm slice = {"createVenue"} closeModal={closeModal}/>}
        {page === "modify-page" && <CreateorModifyVenueForm slice = {"modifyVenue"}closeModal={closeModal}/>}
    </div>
  );
}
