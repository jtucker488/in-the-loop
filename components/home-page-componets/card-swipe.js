import React from "react";
import EventCard from "./event-card";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



const CardSwipe = ({events}) => {
  return (
    <>
      <div className="rounded-large flex overflow-x-scroll no-scrollbarp-y-4" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
        {events?.map((event, index) => (
          <div className="p-2 rounded-large" key={index}>
            <EventCard event={event} />
          </div>
        ))}
      </div>
    </>
  );
};

export default CardSwipe;
