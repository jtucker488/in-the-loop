import React, { useState } from "react";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
dayjs.extend(isoWeek);

const MapEventCard
 = ({ event_name , organizer_name, event_start_date, event_end_date, event_start_time, event_end_time, event_thumbnail_address, event_description }) => {
  const [isHovered, setIsHovered] = useState(false);

  const formatEventDateTime = () => {
    const now = dayjs();
    const startDate = dayjs(event_start_date);
    const endDate = dayjs(event_end_date);
    const startTime = event_start_time;
    const endTime = event_end_time;

    const isSameDay = startDate.isSame(endDate, "day");

    const formatDate = (date) => {
      if (date.isSame(now, "week")) {
        return date.format("dddd");
      } else if (date.isSame(now, "year")) {
        return date.format("MMM D");
      } else {
        return date.format("MMM D, YYYY");
      }
    };

    const formatTime = (time) => {
      if (!time) return "";
      let [hours, minutes] = time.split(":");
      hours = parseInt(hours, 10);
      const period = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12;
      return `${hours}:${minutes} ${period}`;
    };

    const formatDateTime = (date, time) => {
      const dateStr = formatDate(date);
      const timeStr = formatTime(time);
      return timeStr ? `${dateStr} @ ${timeStr}` : dateStr;
    };

    if (isSameDay) {
      const dateStr = formatDate(startDate);
      const startTimeStr = formatTime(startTime);
      const endTimeStr = formatTime(endTime);
      if (startTimeStr === "" && endTimeStr === "") {
        return `${dateStr}`;
      }
      if (startTimeStr === "") {
        return `${dateStr} - ${endTimeStr}`;
      }
      if (endTimeStr === "") {
        return `${dateStr} - ${startTimeStr}`;
      }
      return `${dateStr} ${startTimeStr} - ${endTimeStr}`;
    } else {
      const startStr = formatDateTime(startDate, startTime);
      const endStr = formatDateTime(endDate, endTime);
      return `${startStr} - ${endStr}`;
    }
  };

  const dateTimeStr = formatEventDateTime();


  return (
    <a
    //   href={event_html_link}
      target="_blank"
      rel="noopener noreferrer"
      className="block rounded-lg"
    >
      <div
        // className={`relative w-[400px] h-[400px] rounded-lg overflow-hidden shadow-md bg-white cursor-pointer transform transition-all duration-300 ${
        className={`relative w-[250px] h-[300px] rounded-lg overflow-hidden shadow-md bg-white cursor-pointer transform transition-all duration-300 ${
          isHovered ? "scale-[1.02] translate-y-[-2px]" : ""
          // className={`relative w-[400px] h-[400px] rounded-lg overflow-hidden shadow-md bg-white cursor-pointer transform transition-all duration-300"
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
              event_thumbnail_address ||
              "https://via.placeholder.com/400x300"
            }
            alt={event_name}
            className="object-cover w-full h-full"
          />
        </div>

        {/* Description */}
        <div
          className={`absolute inset-0 flex justify-start items-start py-2 px-4  text-neutral-800 transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}
        >
          <p
            className="text-sm text-start overflow-hidden break-words line-clamp-12"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: "12" /* Limits to 4 lines */,
              WebkitBoxOrient: "vertical",
              textOverflow: "ellipsis",
            }}
          >
            {event_description || "No description available."}
          </p>
        </div>
        {/* Title and Date */}
        <div className="absolute bottom-0 w-full bg-white bg-opacity-90 px-4 py-3">
          <h3 className="text-lg font-semibold text-neutral-800 line-clamp-1 mb-1">
            {event_name}
          </h3>
          <p className="text-sm text-neutral-500">{dateTimeStr}</p>
          {organizer_name && (
            <p className="text-sm text-neutral-500">
              Hosted by: {organizer_name}
            </p>
          )}
        </div>
      </div>
    </a>
  );
};

export default MapEventCard;
