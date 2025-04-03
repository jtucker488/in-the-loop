"use client";
import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../../components/general/modal";
import GeneralEventCard from "../../../components/calendar-components/general-event-card";
import {
  clearFilters,
  fetchSelectedEvents,
  modify,
} from "../../../components/redux/slices/searchResultsSlice";

export default function Calendar() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(clearFilters());
      await dispatch(modify({ field: "displayedEvents", value: [] }));
      await dispatch(fetchSelectedEvents({ pagination: false }));
    };
    fetchData();
  }, [dispatch]);

  const events = useSelector((state) => state.searchResults.displayedEvents);

  const calendarEvents = events.map((event) => ({
    title: event.event_name,
    date: event.instance_date,
    organizer_name: event.organizer_name,
    description: event.event_description,
    thumbnail: event.event_thumbnail_address,
    instance_id: event.instance_id,
  }));

  const [isMediumOrLarger, setIsMediumOrLarger] = useState(false);

  useEffect(() => {
    // Function to update screen size status
    const updateScreenSize = () => {
      setIsMediumOrLarger(window.innerWidth >= 768); // Medium screens start at 768px in Tailwind
    };

    // Set initial value
    updateScreenSize();

    // Add resize event listener
    window.addEventListener("resize", updateScreenSize);

    // Cleanup on unmount
    return () => window.removeEventListener("resize", updateScreenSize);
  }, []);

  const modalWidth = isMediumOrLarger ? 420 : 200; // Match md:w-[420px] and w-[300px]
  const modalHeight = isMediumOrLarger ? 300 : 100; // Match md:h-[300px] and h-[100px]


  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [modalPosition, setModalPosition] = useState({}); // Track modal position

  const handleEventClick = (info) => {
    const eventElement = info.el.getBoundingClientRect(); // Get event's position
  
    const isBottomHalf = eventElement.top > window.innerHeight / 2;

    const positionStyle = {
      top: `${
        isBottomHalf
          ? eventElement.bottom + window.scrollY - modalHeight
          : eventElement.top + window.scrollY
      }px`,
      left:
        eventElement.left + eventElement.width / 2 < window.innerWidth / 2
          ? `${eventElement.right + 20}px`
          : `${eventElement.left - modalWidth - 20}px`,
    };

    setSelectedEvent({
      name: info.event.title,
      date: info.event.start.toISOString().split("T")[0],
      description: info.event.extendedProps.description,
      thumbnail: info.event.extendedProps.thumbnail,
      instance_id: info.event.extendedProps.instance_id,
    });
    setModalPosition(positionStyle);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedEvent(null);
  };

  return (
    <div className="pt-[150px] px-[10%] mb-[10%]">
      <div className="bg-neutral-900 p-4 rounded">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin]}
          initialView="dayGridMonth"
          events={calendarEvents}
          eventClick={handleEventClick}
          headerToolbar={{
            start: "",
            center: "title",
            end: "prev,next",
          }}
          height="auto"
          dayHeaderClassNames="bg-neutral-900 text-white" // Custom Tailwind styles for headers
          dayCellClassNames="scrollbar-thin scrollbar-thumb-black scrollbar-track-transparent"
        />
      </div>
      {showModal && selectedEvent && (
        <Modal onClose={closeModal} positionStyle={modalPosition}>
          <GeneralEventCard
            event_name={selectedEvent.name}
            event_start_date={selectedEvent.date}
            event_description={selectedEvent.description}
            event_thumbnail_address={selectedEvent.thumbnail}
            organizer_name={selectedEvent.organizer_name}
            instance_id={selectedEvent.instance_id}
            onClose={closeModal}
          />
        </Modal>
      )}
    </div>
  );
}
