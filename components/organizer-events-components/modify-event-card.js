import React, { useState } from "react";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import { useEffect } from "react";
dayjs.extend(isoWeek);
dayjs.extend(isSameOrBefore);
import { auth } from "../../lib/firebase";

import HashtagInCard from "./hashtag-in-card";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useDispatch, useSelector } from "react-redux";
import { modify } from "../redux/slices/searchResultsSlice";
import { fetchSelectedEvents } from "../redux/slices/searchResultsSlice";
import { useRouter } from "next/navigation";

import ConfirmDeleteDialog from "./confirm-delete-dialog";
import axios from "axios";
const config = require("../../config.json");

const ModifyEventCard = ({ event, href }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [organizerId, setOrganizerId] = useState(null);

  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const toggleDropdown = (e) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  const handleEditClick = () => {
    router.push(`/modify-event/${event.instance_id}`);
  };

  const handleDeleteClick = () => {
    setShowDeleteDialog(true);
    setIsOpen(false);
  };
  const goToEvent = (id) => {
    window.open(`/events/${id}`, "_blank"); // Opens in a new tab
  };

  const fetchOrganizerId = async (authUserId) => {
    try {
      const response = await axios.get(
        // API LINK
        `http://localhost:5002/getOrganizer/${authUserId}`
      );
      const organizer_id_res = response.data[0].id; // Assuming the API returns an array of organizers
      if (organizer_id_res) {
        // Set organizer_id in Redux state

        setOrganizerId(organizer_id_res);
        return organizer_id_res;
      } else {
        console.error("No organizer found for the given auth_userid");
        return null;
      }
    } catch (error) {
      console.error("Error fetching organizer:", error);
      return null;
    }
  };

  useEffect(() => {
    fetchOrganizerId(auth.currentUser.uid);
  }, [auth, router]);

  const handleDeleteConfirm = async () => {
    const post_data = {
      delete_id: event.event_id,
    };

    try {
      // API LINK
      await axios.post(
        `${config.api.eventUrl}/events/deleteevent?event_id=${event.event_id}`
      );
      // await axios.post("http://localhost:5002/events/deleteevent", post_data, {
      //   headers: {
      //     "Content-Type": "application/json", // Set content type header
      //   },
      // });
      // await axios.get(`${config.api.eventUrl}/events/updateView`);
      await dispatch(modify({ field: "displayedEvents", value: [] }));
      await dispatch(
        fetchSelectedEvents({ organizer_id: organizerId, pagination: false })
      );
    } catch (err) {
      console.log(`An error has occurred: ${err}`);
    }
    setShowDeleteDialog(false);
  };

  const handleDeleteCancel = () => {
    setShowDeleteDialog(false);
  };

  // Requirement 1: Smarter date and time formatting
  const formatEventDateTime = (event) => {
    const now = dayjs();
    const startDate = dayjs(event.instance_date);
    const endDate = dayjs(event.instance_end_date);
    const startTime = event.instance_start_time;
    const endTime = event.instance_end_time;

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

  const dateTimeStr = formatEventDateTime(event);

  return (
    <div
      className={`relative w-[300px] h-[350px] rounded-lg overflow-hidden shadow-md bg-white cursor-pointer transform transition-all duration-300 ${
        isHovered ? "shadow-lg scale-[1.02] translate-y-[-2px]" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Requirement 2: Swap image with description on hover */}
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
          {event.event_description || "No description available."}
        </p>
      </div>

      {/* Requirement 4: Round overlay for MoreHorizIcon */}
      <div className="absolute top-2 right-2">
        <div className="bg-black bg-opacity-50 rounded-full p-1">
          <MoreHorizIcon
            className="text-white cursor-pointer"
            onClick={toggleDropdown}
          />
        </div>

        {isOpen && (
          <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-lg">
            <ul>
              <li
                className="px-4 py-2 text-sm text-neutral-700 hover:bg-gray-100 cursor-pointer"
                onClick={handleEditClick}
              >
                Edit
              </li>
              <li
                className="px-4 py-2 text-sm text-red-500 hover:bg-gray-100 cursor-pointer"
                onClick={handleDeleteClick}
              >
                Delete
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Title, Tags, and DateTime */}
      <div className="absolute bottom-0 w-full bg-white bg-opacity-90 px-4 py-3">
        <h3 className="text-lg font-semibold text-neutral-800 line-clamp-1 mb-1">
          {event.event_name}
        </h3>
        <div className="flex flex-wrap mb-1">
          {event.tags &&
            event.tags
              .slice(0, 3)
              .map((hashtag, index) => (
                <HashtagInCard key={index} hashtag={hashtag} />
              ))}
        </div>
        <p className="text-sm text-neutral-500">{dateTimeStr}</p>
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

      {showDeleteDialog && (
        <ConfirmDeleteDialog
          onClose={handleDeleteCancel}
          onDelete={handleDeleteConfirm}
        />
      )}
    </div>
  );
};

export default ModifyEventCard;
