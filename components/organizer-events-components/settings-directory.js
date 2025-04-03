import SettingsButtons from "./settings-buttons";
import ChangePasswordPage from "./change-passowrd-page";
import { useState } from "react";
export default function SettingsDirectory({ closeModal }) {
  const [page, setPage] = useState("buttons");

  return (
    <div className="bg-neutral-800 rounded mx-auto p-4 flex flex-col gap-4 z-[2000]" >
        {page === "buttons" && <SettingsButtons setPage={setPage}/>}
        {page === "changePasswordPage" && <ChangePasswordPage  csetPage={setPage}/>}
    </div>
  );
}
