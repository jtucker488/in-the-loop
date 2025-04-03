"use client";
import ModifyOrCreateEventForm from "../../../components/modify-or-create-event-form-components/modify-or-create-event-form";
import { useRouter } from "next/navigation";
import { ChevronDoubleLeftIcon } from "@heroicons/react/20/solid"; // Import icon


export default function CreateEventPage() {
  const router = useRouter();

  const handleBackClick = () => {
    router.push("/organizer-events");
  };
  return (
    <div className="w-full h-full">
      {/* Back to Dashboard */}
      <div className="p-4 ml-4 pt-[150px]">
        <button
          onClick={handleBackClick}
          className="flex items-center text-sm text-neutral-200 hover:text-neutral-400 hover:underline "
        >
          <ChevronDoubleLeftIcon className="h-5 w-5 mr-2" />
          Back to Dashboard
        </button>
      </div>

      {/* Form Component */}
      <ModifyOrCreateEventForm modifyEventOrEvent={"event"} />
    </div>
  );
}
