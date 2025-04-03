import Link from "next/link";
import {Button} from "../catalyst/button";
export default function FirstPageLogin({ setPage }) {
  // const handleManualClick = () => {
  //   setPage("manual page");
  // };
  const handleExcelClick = () => {
    setPage("excel page");
  };
  const handleICSClick = () => {
    setPage("ICS page");
  };
  return (
    <>
      <div className="flex flex-col bg-neutral-800 gap-4 p-8 rounded">
          <Button
          href="/create-event"
          color="blue"
            // onClick={handleManualClick}
            // className="block w-[300px] rounded-md bg-neutral-900 px-4 py-3 text-sm font-semibold text-input-text-color border-2 border-input-text-color shadow-sm hover:bg-neutral-500"
          >
            <div className="flex gap-12 items-center">
              <p className="text-base">Add Event Manually</p>
            </div>
          </Button>

        {/* <button
          type="button"
          onClick={handleExcelClick}
          className="block w-[300px] rounded-md bg-neutral-900 px-4 py-3 text-sm font-semibold text-input-text-color border-2 border-input-text-color shadow-sm hover:bg-neutral-500"
        >
          <div className="flex gap-12 items-center">
            <p className="text-base">Add Event(s) using an Excel File</p>
          </div>
        </button> */}

        <Button
          type="button"
          color="rose"
          onClick={handleICSClick}
          // className="block w-[300px] rounded-md bg-neutral-900 px-4 py-3 text-sm font-semibold text-input-text-color border-2 border-input-text-color shadow-sm hover:bg-neutral-500"
        >
          <div className="flex gap-12 items-center">
            <p className="text-base">Add Event(s) using an ICS File</p>
          </div>
        </Button>
      </div>
    </>
  );
}
