"use client";

import React, { useState, useEffect, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useSelector, useDispatch } from "react-redux";
import dayjs from "dayjs";

import {
  clearFilters,
  fetchSelectedEvents,
  modify,
} from "../../../components/redux/slices/searchResultsSlice";
import GeneralEventCard from "../../../components/calendar-components/general-event-card";
import MapDateInput from "../../../components/map-components/map-date-input";
import MapEventCard from "../../../components/map-components/map-event-card";
import { useRouter } from "next/navigation";

// Default Icon
const DefaultIcon = L.icon({
  iconRetinaUrl: "/leaflet/images/marker-icon.png",
  iconUrl: "/leaflet/images/marker-icon.png",
  shadowUrl: "/leaflet/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Highlighted Icon
const HighlightedIcon = L.icon({
  iconRetinaUrl: "/leaflet/images/marker-icon-highlighted.png",
  iconUrl: "/leaflet/images/marker-icon-highlighted.png",
  shadowUrl: "/leaflet/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Controlled Map Component
const ControlledMap = ({ setMapBounds }) => {
  const map = useMap();

  useEffect(() => {
    setMapBounds(map.getBounds());

    const handleMove = () => {
      const bounds = map.getBounds();
      setMapBounds(bounds);
    };

    map.on("moveend", handleMove);
    map.on("zoomend", handleMove);

    return () => {
      map.off("moveend", handleMove);
      map.off("zoomend", handleMove);
    };
  }, [map, setMapBounds]);

  return null;
};

const MapComponent = () => {
  const calendar_date = dayjs(); // Replace with your specific date if needed
  const twoWeeksFromToday = dayjs(calendar_date)
    .add(2, "week")
    .format("YYYY-MM-DD");

  const [cardContainerWidth, setCardContainerWidth] = useState(0);

  // Redux Hooks
  const dispatch = useDispatch();

  const events = useSelector(
    (state) => state.searchResults.displayedEvents || [] // Fallback to empty array
  );
  const validEvents = events.filter(
    (event) => event.venue_lat !== null && event.venue_lng !== null
  );

  // Fetch events on render
  useEffect(() => {
    let isMounted = true; // Prevent infinite loop by tracking component state

    const fetchEvents = async () => {
      if (isMounted) {
        // Only fetch if the component is still mounted
        await dispatch(clearFilters());

        await dispatch(
          modify({
            field: "start_date_map",
            value: dayjs().format("YYYY-MM-DD"),
          })
        );
        // await dispatch(
        //   modify({ field: "end_date_map", value: twoWeeksFromToday })
        // );
        await dispatch(modify({ field: "displayedEvents", value: [] }));
        await dispatch(fetchSelectedEvents({ pagination: false }));
      }
    };

    fetchEvents();

    return () => {
      isMounted = false; // Cleanup to avoid updates if unmounted
    };
  }, []); // Empty dependency array ensures this runs only once

  const cardWidth = 290; // Width of each event card
  const pagePadding = 64; // Total padding on the page

  useEffect(() => {
    // Calculate container width on mount and on window resize
    const calculateContainerWidth = () => {
      const viewportWidth = window.innerWidth;
      console.log(viewportWidth, cardWidth, pagePadding);
      const cardsInRow = Math.floor(
        (viewportWidth * 0.65 - pagePadding) / cardWidth
      );
      setCardContainerWidth(cardsInRow * cardWidth);
    };

    // Initial calculation
    calculateContainerWidth();

    // Add resize listener
    window.addEventListener("resize", calculateContainerWidth);
    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", calculateContainerWidth);
    };
    // Invoke the async function inside the effect
  }, [dispatch]);
  // React States
  const [mapCenter, setMapCenter] = useState([33.5186, -86.8104]); // Birmingham, AL
  const [zoom, setZoom] = useState(11);
  const [mapBounds, setMapBounds] = useState(null);
  const [expandedEvent, setExpandedEvent] = useState(null);
  const [hoveredEventId, setHoveredEventId] = useState(null); // Track hovered event by ID

  const visibleEvents = useMemo(() => {
    if (validEvents.length === 0) {
      return [];
    }
    if (!mapBounds || typeof mapBounds.contains !== "function") {
      console.error("Invalid mapBounds:", mapBounds);
      return [];
    }

    const finalized_events = validEvents.filter((event) => {
      if (!event.venue_lat || !event.venue_lng) {
        console.warn("Event missing coordinates:", event);
        return false;
      }

      const latLng = { lat: event.venue_lat, lng: event.venue_lng };

      return mapBounds.contains(latLng);
    });

    return finalized_events;
  }, [mapBounds, validEvents]);
  const router = useRouter();

  const goToEvent = (id) => {
    window.open(`/events/${id}`, "_blank"); // Opens in a new tab
  };
  return (
    <div className="flex flex-col gap-4">
      <div className="ml-[2%] hidden md:flex flex-col md:flex-row gap-2 p-2 items-center w-fit rounded-xl bg-neutral-600 ">
        <div className="flex items-center gap-2">
          Start: <MapDateInput name="start_date_map" />
        </div>
        <div className="flex items-center gap-2">
          End: <MapDateInput name="end_date_map" />
        </div>
      </div>

      <div className="h-full" style={{ display: "flex" }}>
        {/* Map Container */}
        {/* Sidebar List */}
        <div
          className="hidden md:flex flex-col items-center"
          style={{
            width: "65%",
            height: "600px", // Fixed height
            paddingRight: "16px", // Optional padding to match pr-4
          }}
        >
          <div
            style={{ overflowY: "auto", width: `${cardContainerWidth}px` }}
            className="inline-block h-[600px] flex flex-wrap justify-start scrollbar-map bg-neutral-800 rounded"
          >
            {visibleEvents.map((event, index) => (
              <div
                className="p-4"
                key={`${event.event_id}-${event.instance_date}`}
              >
                <MapEventCard
                  event_name={event.event_name}
                  event_start_date={event.instance_date}
                  event_description={event.description}
                  organizer_name={event.organizer_name}
                  event_thumbnail_address={event.event_thumbnail_address}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="pr-4 md:w-[35%] w-[100%]">
          {" "}
          {/* Add pr-4 here */}
          <MapContainer
            center={mapCenter}
            zoom={zoom}
            style={{ height: "600px", width: "100%" }} // Adjusted width to 100% for proper padding effect
          >
            <ControlledMap setMapBounds={setMapBounds} />
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution=""
            />
            {validEvents.map((event) => (
              <Marker
                key={`${event.event_id}-${event.instance_date}`} // Unique key
                position={[event.venue_lat, event.venue_lng]}
                icon={
                  hoveredEventId === `${event.event_id}-${event.instance_date}`
                    ? HighlightedIcon
                    : DefaultIcon
                } // Highlight specific marker
              >
                <Popup>
                  <div style={{ textAlign: "left", fontFamily: "Arial" }}>
                    <h4 style={{ margin: "0 0 10px 0", fontSize: "16px" }}>
                      {event.event_name}
                    </h4>
                    <div style={{ fontSize: "12px", marginBottom: "5px" }}>
                      <span style={{ fontWeight: "bold", display: "block" }}>
                        Date
                      </span>
                      {event.instance_date}
                    </div>
                    <div style={{ fontSize: "12px" }}>
                      <span style={{ fontWeight: "bold", display: "block" }}>
                        Organizer
                      </span>
                      {event.organizer_name}
                    </div>
                    <div style={{ marginTop: "10px" }}>
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          goToEvent(event.instance_id);
                        }}
                        style={{
                          color: "#007bff",
                          textDecoration: "underline",
                          cursor: "pointer",
                        }}
                      >
                        Go to Event
                      </a>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default MapComponent;
