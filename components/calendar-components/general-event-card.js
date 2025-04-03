import React from "react";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import { useRouter } from "next/navigation";
dayjs.extend(isoWeek);

const GeneralEventCard = ({
  event_name,
  organizer_name,
  event_start_date,
  event_end_date,
  event_start_time,
  event_end_time,
  event_thumbnail_address,
  event_description,
  instance_id,
  event_link, // URL to navigate to the event
  onClose, // Pass the onClose function for the modal
}) => {
  const router = typeof window !== "undefined" ? useRouter() : null;

  const handleClick = () => {
    if (router) {
      router.push(`/events/${instance_id}`);
    }
  };

  const formatEventDateTime = () => {
    const now = dayjs();
    const startDate = dayjs(event_start_date);
    const endDate = dayjs(event_end_date);

    const formatDate = (date) =>
      date.isSame(now, "week")
        ? date.format("dddd")
        : date.isSame(now, "year")
        ? date.format("MMM D")
        : date.format("MMM D, YYYY");

    const formatTime = (time) => {
      if (!time) return "";
      const [hours, minutes] = time.split(":");
      const period = +hours >= 12 ? "PM" : "AM";
      const formattedHours = +hours % 12 || 12;
      return `${formattedHours}:${minutes} ${period}`;
    };

    const isSameDay = startDate.isSame(endDate, "day");
    if (isSameDay) {
      return `${formatDate(startDate)} ${
        event_start_time ? `@ ${formatTime(event_start_time)}` : ""
      } ${
        event_end_time
          ? `- ${formatTime(event_end_time)}`
          : event_start_time
          ? ""
          : ""
      }`;
    }

    return `${formatDate(startDate)} ${
      event_start_time ? `@ ${formatTime(event_start_time)}` : ""
    } - ${formatDate(endDate)} ${
      event_end_time ? `@ ${formatTime(event_end_time)}` : ""
    }`;
  };

  const dateTimeStr = formatEventDateTime();

  return (
    <div className="w-[420px] h-[300px] bg-white rounded-lg overflow-hidden shadow-lg relative">
      {/* Exit Button */}
      <button
        onClick={onClose}
        className="absolute top-1 left-2 text-neutral-800 text-2xl font-bold z-10"
      >
        &times;
      </button>

      {/* Image Section */}
      <div className="w-full h-1/2">
        <img
          src={event_thumbnail_address || "https://via.placeholder.com/420x125"}
          alt={event_name}
          className="object-cover w-full h-full"
        />
      </div>

      {/* Content Section */}
      <div className="p-4 flex flex-col justify-start h-1/2">
        <h3 className="text-lg font-bold text-neutral-900 truncate">
          {event_name}
        </h3>
        <p className="text-sm text-neutral-600">{dateTimeStr}</p>
        <p className="text-sm text-neutral-800 mt-2 line-clamp-2">
          {event_description || "No description available."}
        </p>

        {/* "Go to Event" Link */}
        <a
          onClick={handleClick} // Pass the function reference, not the invocation
          className="text-brand-blue underline mt-2 text-sm cursor-pointer"
        >
          Go to event
        </a>
      </div>
    </div>
  );
};

export default GeneralEventCard;
