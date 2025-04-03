"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { usePathname } from "next/navigation";
import { formatEventDateTime } from "../../../../components/format/format-input";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DescriptionIcon from "@mui/icons-material/Description";
import PersonIcon from "@mui/icons-material/Person";
import { ClipLoader } from "react-spinners";
import config from "../../../../config";
const EventPage = () => {
  const pathname = usePathname();
  const instance_id = pathname.split("/")[2]; // Split by "/" and get the third part (index 2)
  const [event, setEvent] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  let dateTimeStr;

  if (event) {
    dateTimeStr = formatEventDateTime(event);
  }

  useEffect(() => {
    if (instance_id) {
      // API LINK
      axios
        .get(`${config.api.eventUrl}/events/getEvents?instance_id=${instance_id}`)
        // .get(`http://localhost:5002/getEvents?instance_id=${instance_id}`)
        .then((response) => {
          if (response.data && response.data.length > 0) {
            setEvent(response.data[0]);
          } else {
            setError(true); // No event found
          }
        })
        .catch((error) => {
          console.error("Error fetching event data:", error);
          setError(true); // API request failed
        })
        .finally(() => {
          setLoading(false); // Set loading to false when API call is complete
        });
    }
  }, [instance_id]);

  if (loading) {
    return (
      <div className="pt-[150px] flex justify-center items-center mt-4 mb-8">
        <ClipLoader loading={loading} size={30} color={"#ffffff"} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-[150px] text-center">
        <h1>Event not found</h1>
      </div>
    );
  }

  return (
    <div className="pt-[150px] mb-[100px]">
      <div className="w-1/2 mx-auto bg-neutral-900 shadow-lg rounded-lg p-6">
        {/* Image taking up 50% of the component */}
        <div className="relative w-full h-0 pb-[50%] mb-4">
          <img
            src={
              event.event_thumbnail_address ||
              "https://via.placeholder.com/400x300"
            }
            alt={event.event_name || "Event thumbnail"}
            className="absolute top-0 left-0 w-full h-full object-cover rounded-lg"
          />
        </div>
        <div className="flex flex-col gap-4">
          <h2
            className="text-5xl font-bold mb-2 text-brand-blue line-clamp-2 overflow-hidden text-ellipsis"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: "2",
              WebkitBoxOrient: "vertical",
            }}
          >
            {event.event_name}
          </h2>
          <div className="flex gap-4">
            <CalendarTodayIcon className="mt-[2px]" />
            <div className="flex flex-col">
              <h2 className="text-xl font-semibold text-white mb-2">
                Time and Date
              </h2>
              <p className="text-neutral-400 text-lg">{dateTimeStr}</p>
            </div>
          </div>
          <div className="flex gap-4">
            <LocationOnIcon className="mt-[2px]" />
            <div className="flex flex-col">
              <h2 className="text-xl font-semibold text-white mb-2">
                Location
              </h2>
              <p className="text-neutral-200 text-lg">{event.venue_name}</p>
              <p className="text-neutral-400 text-lg">
                {event.venue_address}, {event.venue_city}, {event.venue_state}
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <PersonIcon className="mt-[2px]" />
            <div className="flex flex-col">
              <h2 className="text-xl font-semibold text-white mb-2">
                Hosted By
              </h2>
              <p className="text-neutral-400 text-lg">{event.organizer_name}</p>
            </div>
          </div>
          <div className="flex gap-4">
            <DescriptionIcon className="mt-[2px]" />
            <div className="flex flex-col">
              <h2 className="text-xl font-semibold text-white mb-2">
                About This Event
              </h2>
              <p
                className="text-neutral-400 text-lg line-clamp-10 overflow-hidden text-ellipsis"
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: "10",
                  WebkitBoxOrient: "vertical",
                }}
              >
                {event.event_description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventPage;
