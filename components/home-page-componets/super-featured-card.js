"use client";
import React from "react";
import { formatEventDateTime } from "../format/format-input";
import Link from "next/link";
const SuperFeaturedCard = ({ event, index }) => {
  const dateTimeStr = formatEventDateTime(event);

  return (
    <div className="relative flex w-full h-full">
      {/* Black Overlay Section */}
      <div className="w-[40%] sm:w-[20%]h-full bg-black text-white flex flex-col justify-center items-start px-8 py-8 z-10 text-left">
        <p className="text-4xl font-bold mb-4">{event.event_name}</p>
        <p className="text-lg mb-4">{dateTimeStr}</p>
        <p className="text-sm mb-4 line-clamp-4">{event.event_description}</p>
        <Link
          href={`/events/${event.instance_id}`}
          className="text-blue-400 hover:underline mt-2"
        >
          See more
        </Link>
      </div>
      {/* Image Section */}
      <div className="w-[80%] h-full relative">
        <img
          src={event.event_thumbnail_address}
          alt={`Slide ${index}`}
          className="w-full h-full object-cover"
        />
        {/* Shorter Gradient Overlay */}
        <div className="absolute inset-0 left-0 w-[35%] bg-gradient-to-r from-black via-black/70 via-black/40 to-transparent pointer-events-none"></div>
      </div>
    </div>
  );
};

export default SuperFeaturedCard;
