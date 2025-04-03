"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import { formatEventDateTime } from "../format/format-input";
dayjs.extend(isoWeek);

const EventCard = ({ event }) => {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter(); // Initialize router

  const dateTimeStr = formatEventDateTime(event);

  // Handle click to navigate to /events/event.instance_id
  const handleClick = () => {
    router.push(`/events/${event.instance_id}`); // Dynamic route
  };

  return (
    <div
      onClick={handleClick} // Attach the click handler
      className={`relative w-[300px] h-[350px] rounded-lg overflow-hidden shadow-md bg-white cursor-pointer transform transition-all duration-300 ${
        isHovered ? "scale-[1.02] translate-y-[-2px]" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image */}
      <div
        className={`absolute inset-0 transition-opacity duration-300 ${
          isHovered ? "opacity-0" : "opacity-100"
        }`}
      >
        <img
          src={
            event.event_thumbnail_address ||
            "https://via.placeholder.com/400x300"
          }
          alt={event.event_name}
          className="object-cover w-full h-full"
        />
      </div>

      {/* Description */}
      <div
        className={`absolute inset-0 flex justify-start items-start py-2 px-4 text-neutral-800 transition-opacity duration-300 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
        style={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}
      >
        <p
          className="text-sm text-start overflow-hidden break-words line-clamp-12"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: "12",
            WebkitBoxOrient: "vertical",
            textOverflow: "ellipsis",
          }}
        >
          {event.event_description || "No description available."}
        </p>
      </div>

      {/* Title and Date */}
      <div className="absolute bottom-0 w-full bg-white bg-opacity-90 px-4 py-3">
        <h3 className="text-lg font-semibold text-neutral-800 line-clamp-1 mb-1">
          {event.event_name}
        </h3>
        <p className="text-sm text-neutral-500">{dateTimeStr}</p>
        {event.organizer_name && (
          <p className="text-sm text-neutral-500">
            Hosted by: {event.organizer_name}
          </p>
        )}
      </div>
    </div>
  );
};

export default EventCard;