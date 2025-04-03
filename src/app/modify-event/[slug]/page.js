"use client";
import { useRouter } from "next/navigation";
import ModifyOrCreateEventForm from "../../../../components/modify-or-create-event-form-components/modify-or-create-event-form";
import { ChevronDoubleLeftIcon } from "@heroicons/react/20/solid"; // Import icon
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { modify_modifyEvent, modifyAddHashtag } from "../../../../components/redux/slices/modifyEventSlice";
import { useDispatch } from "react-redux";
import { modifyClearHashtags } from "../../../../components/redux/slices/modifyEventSlice";
export default function CreateEventPage() {
  const router = useRouter();
  const pathname = usePathname();
  const instance_id = pathname.split("/")[2]; // Split by "/" and get the third part (index 2)
  const [event, setEvent] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (instance_id) {
      // Ensure the router is ready before accessing query
      axios
        .get(`http://localhost:5002/getEvents?instance_id=${instance_id}`)
        .then((response) => {
          console.log("Event data:", response.data[0]);
          setEvent(response.data[0]);
        })
        .catch((error) => {
          console.error("Error fetching event data:", error);
        });
    }
  }, [, instance_id]);

  useEffect(() => {
    if (!event) {
      return;
    }
    dispatch(modify_modifyEvent({ field: "id", value: event.event_id }));
    dispatch(modify_modifyEvent({ field: "instance_id", value: event.instance_id }));
    dispatch(modify_modifyEvent({ field: "name", value: event.event_name }));
    dispatch(
      modify_modifyEvent({
        field: "image",
        value: event.event_thumbnail_address,
      })
    );
    dispatch(
      modify_modifyEvent({ field: "start_date", value: event.event_start_date })
    );
    dispatch(
      modify_modifyEvent({ field: "rrule", value: event.rrule })
    );
    dispatch(
      modify_modifyEvent({ field: "start_time", value: event.event_start_time })
    );
    dispatch(
      modify_modifyEvent({ field: "end_date", value: event.event_end_date })
    );
    dispatch(
      modify_modifyEvent({ field: "end_time", value: event.event_end_time })
    );
    dispatch(
      modify_modifyEvent({
        field: "description",
        value: event.event_description,
      })
    );
    dispatch(
      modify_modifyEvent({ field: "html_link", value: event.event_html_link })
    );
    dispatch(
      modify_modifyEvent({ field: "category", value: event.category_name })
    );
    dispatch(
      modify_modifyEvent({
        field: "subcategory",
        value: event.subcategory_name,
      })
    );
    dispatch(modifyClearHashtags());
    if (event.tags) {
      for (const hashtag of event.tags) {
        dispatch(modifyAddHashtag({ field: "hashtags", value: hashtag }));
      }
    }
  }, [event]);

  const handleBackClick = () => {
    router.push("/organizer-events");
  };

  return (
    <div className="w-full h-full">
      {/* Back to Dashboard */}
      <div className="p-4 ml-4">
        <button
          onClick={handleBackClick}
          className="flex items-center text-sm text-neutral-200 hover:text-neutral-400 hover:underline "
        >
          <ChevronDoubleLeftIcon className="h-5 w-5 mr-2" />
          Back to Dashboard
        </button>
      </div>

      {/* Form Component */}
      <ModifyOrCreateEventForm modifyEventOrEvent={"modifyEvent"} />
    </div>
  );
}
