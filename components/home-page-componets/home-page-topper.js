"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import HashtagPage from "./hashtag-components/hashtag-page";
import CalendarPage from "./calendar-page";
import SearchBar from "./search-bar";
import { useDispatch, useSelector } from "react-redux";
import { format_date } from "../format/format-input";
import { fetchMeta, modify } from "../redux/slices/searchResultsSlice";
import { isEndDateBeforeStartDate } from "../format/format-input";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import { fetchSelectedEvents } from "../redux/slices/searchResultsSlice";
import Modal from "../general/modal";
export default function HomePageTopper() {
  const dispatch = useDispatch();
  const router = useRouter();
  const currentPath = usePathname();
  const today_date = format_date(dayjs());
  const [showHashtagModal, setShowHashtagModal] = useState(false);
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [modalPosition, setModalPosition] = useState({}); // Modal position state
  // Refs to capture icon positions
  const hashtagIconRef = useRef(null);
  const calendarIconRef = useRef(null);
  const modalRef = useRef();

  // Calculate position directly underneath the icon
  const getPosition = (ref, modalRef) => {
    console.log("modalRef", modalRef);
    if (ref.current && modalRef.current) {
      const rect = ref.current.getBoundingClientRect(); // Button position
      const modalRect = modalRef.current.getBoundingClientRect(); // Modal size

      return {
        top:
          rect.bottom +
          window.scrollY -
          modalRect.height / 2 +
          rect.height / 2 +
          20, // Center vertically + 20px lower
        left: rect.left + window.scrollX - modalRect.width / 2 + rect.width / 2, // Center horizontally
      };
    }
    console.log("return");
    return { top: 20, left: 0 }; // Default position to avoid undefined errors
  };
  useEffect(() => {
    if (showHashtagModal && modalRef.current) {
      const position = getPosition(hashtagIconRef, modalRef);
      setModalPosition(position);
    }
  }, [showHashtagModal]);
  const openHashtagModal = () => {
    const position = getPosition(hashtagIconRef, modalRef); // Pass modalRef
    console.log("position2", position);

    setModalPosition(position);
    setShowCalendarModal(false);
    setShowHashtagModal(true);
  };

  // Open Calendar Modal
  const openCalendarModal = () => {
    const position = getPosition(calendarIconRef, modalRef);
    position.left -= 32; // Adjust offset specifically for calendar modal
    setModalPosition(position);
    setShowHashtagModal(false);
    setShowCalendarModal(true);
  };

  const handleSubmission = async () => {
    // Inner async function for async tasks
    const processSubmission = async () => {
      try {
        // Navigate if path is "/"
        if (
          currentPath === "/" ||
          currentPath === "/calendar" ||
          currentPath === "/map"
        ) {
          // await dispatch(
          //   modify({ field: "SearchPageNavigatedFromHome", value: true })
          // );
          await dispatch(modify({ field: "start_date_map", value: null }));
          await dispatch(modify({ field: "end_date_map", value: null }));
          await router.push("/search"); // Await navigation
        }

        // Reset states
        setShowHashtagModal(false);
        setShowCalendarModal(false);
        await dispatch(modify({ field: "newSearchLoading", value: true }));

        // Dispatch modifications
        await dispatch(modify({ field: "current_page", value: 0 }));
        await dispatch(modify({ field: "dataFullyLoaded", value: false }));
        await dispatch(modify({ field: "displayedEvents", value: [] }));
        // Handle date validation
        const endDateBeforeStart = isEndDateBeforeStartDate(
          selected_start_date,
          selected_end_date
        );

        if (endDateBeforeStart) {
          await dispatch(modify({ field: "start_date", value: today_date }));
          await dispatch(modify({ field: "end_date", value: null }));
          await dispatch(
            modify({ field: "presentedStartDate", value: today_date })
          );
          await dispatch(modify({ field: "presentedEndDate", value: null }));
        }

        // Fetch events
        await dispatch(fetchSelectedEvents());
        dispatch(modify({ field: "newSearchLoading", value: false }));

        // Update presented dates
        if (!endDateBeforeStart) {
          await dispatch(
            modify({
              field: "presentedStartDate",
              value:
                selected_start_date === "NaN-NaN-NaN" || !selected_start_date
                  ? today_date
                  : selected_start_date,
            })
          );
          await dispatch(
            modify({
              field: "presentedEndDate",
              value:
                selected_end_date === "NaN-NaN-NaN" ? null : selected_end_date,
            })
          );
        }

        // Set hashtags
        await dispatch(
          modify({ field: "presentedHashtags", value: selected_hashtags })
        );
      } catch (error) {
        console.error("Submission failed:", error); // Error handling
      }
    };
    // Call the inner async function
    await processSubmission();
  };

  useEffect(() => {
    dispatch(fetchMeta());
  }, [dispatch]);

  useEffect(() => {
    setShowHashtagModal(false);
    setShowCalendarModal(false);
  }, [currentPath]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Enter") {
        handleSubmission();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleSubmission]);

  // const dropdownRef = useRef(null);

  let selected_start_date = useSelector(
    (state) => state.searchResults["start_date"]
  );
  let selected_end_date = useSelector(
    (state) => state.searchResults["end_date"]
  );
  let selected_hashtags = useSelector(
    (state) => state.searchResults["selectedHashtags"]
  );

  // const [presentedStartDate, setPresentedStartDate] = useState(today_date);
  // const [presentedEndDate, setPresentedEndDate] = useState(null);
  // const [presentedHashtags, setPresentedHashtags] = useState([]);

  return (
    <div className="home-page-topper relative mt-4 mx-4 bg-black bg-opacity-0 z-[100]">
      {/* Flex Container */}
      {/* <div className="flex items-center px-4 sm:px-8 pt-2 w-full"> */}
      {/* Conditional Layout */}
      {(currentPath.startsWith("/events") ||
        currentPath === "/" ||
        currentPath === "/search" ||
        currentPath === "/calendar" ||
        currentPath === "/map") && (
        <div className="flex flex-col">
          <div className="flex">
            {/* Left Section - Logo */}
            <div>
              <Image
                src="/intheloop_logo.png"
                alt="In The Loop Logo"
                width={100}
                height={100}
                onClick={() => router.push("/")} // Navigate without reloading
                className=" min-w-[75px] min-h-[75px] sm:w-[100px] sm:h-[100px] object-contain"
              />
            </div>
            <div className="ml-8 flex flex-col">
              {/* Center Section - Search Bar and Icons */}
              <div className="flex flex-row flex-wrap justify-start">
                <div className="sm:w-[250px] transition-all duration-300">
                  <SearchBar />
                </div>
                <div className="flex gap-2 ml-2">
                  <div className="relative flex items-center justify-center gap-4">
                    {" "}
                    <button
                      ref={hashtagIconRef}
                      onClick={openHashtagModal}
                      className="focus:outline-none text-neutral-200 z-[10]" // Ensure it’s layered below modal
                    >
                      <FilterAltIcon />
                    </button>
                    {showHashtagModal && (
                      <Modal
                        onClose={() => setShowHashtagModal(false)}
                        positionStyle={modalPosition} // Only pass coordinates
                      >
                        <HashtagPage />
                      </Modal>
                    )}
                  </div>

                  <div className="relative flex items-center justify-center gap-4">
                    <button
                      ref={calendarIconRef}
                      onClick={openCalendarModal}
                      className="focus:outline-none text-neutral-200 z-[10]" // Lower z-index for button
                    >
                      <CalendarTodayIcon />
                    </button>
                    {showCalendarModal && (
                      <Modal
                        onClose={() => setShowCalendarModal(false)}
                        positionStyle={modalPosition} // Only pass coordinates
                      >
                        {" "}
                        <CalendarPage />
                      </Modal>
                    )}
                  </div>

                  <button
                    onClick={() => handleSubmission()}
                    className="focus:outline-none mt-1 text-neutral-200"
                  >
                    <SearchIcon style={{ fontSize: "32px" }} />{" "}
                    {/* Custom size */}{" "}
                  </button>
                </div>
                <div className="flex gap-2">
                  <button
                    className=" hover:bg-white w-[122.5px]  px-3 py-2 my-1.5 text-sm rounded-xl text-neutral-800 bg-neutral-100 cursor-pointer z-[10]"
                    onClick={() => router.push("/map")} // Navigate to /search
                  >
                    {" "}
                    Map View
                  </button>
                  <button
                    className=" hover:bg-white w-[122.5px]  px-3 py-2 my-1.5 text-sm rounded-xl text-neutral-800 bg-neutral-100 cursor-pointer z-[10]"
                    onClick={() => router.push("/calendar")} // Navigate to /search
                  >
                    Calendar View
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {currentPath === "/organizer-events" && (
        <div className="flex items-center">
          <div className="w-[100px] sm:flex hidden flex-grow"> </div>
          <div className="flex items-start flex-col sm:flex-row gap-2">
            <div className="sm:w-[250px] flex  transition-all duration-300">
              <SearchBar />
            </div>
            {/* Search Bar and Icons */}
            <div className="flex flex-grow justify-center items-center gap-4 ">
              {/* Icons */}
              <div className="relative flex items-center justify-center gap-4">
                {" "}
                <button
                  ref={hashtagIconRef}
                  onClick={openHashtagModal}
                  className="focus:outline-none text-neutral-200 z-[10]" // Ensure it’s layered below modal
                >
                  <FilterAltIcon />
                </button>
                {showHashtagModal && (
                  <Modal
                    onClose={() => setShowHashtagModal(false)}
                    positionStyle={modalPosition} // Only pass coordinates
                  >
                    <HashtagPage />
                  </Modal>
                )}
              </div>

              <div className="relative flex items-center justify-center gap-4">
                <button
                  ref={calendarIconRef}
                  onClick={openCalendarModal}
                  className="focus:outline-none text-neutral-200 z-[10]" // Lower z-index for button
                >
                  <CalendarTodayIcon />
                </button>
                {showCalendarModal && (
                  <Modal
                    onClose={() => setShowCalendarModal(false)}
                    positionStyle={modalPosition} // Only pass coordinates
                  >
                    {" "}
                    <CalendarPage />
                  </Modal>
                )}
              </div>

              <button
                onClick={() => handleSubmission()}
                className="focus:outline-none text-neutral-200"
              >
                <SearchIcon style={{ fontSize: "32px" }} />{" "}
              </button>
            </div>
          </div>
          <div className="flex justify-end flex-grow">
            <a href="/">
              <Image
                src="/intheloop_logo.png"
                alt="In The Loop Logo"
                width={100}
                height={100}
              />
            </a>
          </div>
        </div>
      )}
      {currentPath === "/create-event" && (
        <div className="flex justify-start">
          <div className="flex flex-grow">
            <Image
              src="/intheloop_logo.png"
              alt="In The Loop Logo"
              width={100}
              height={100}
              onClick={() => router.push("/")} // Navigate without reloading
              className=" min-w-[75px] min-h-[75px] sm:w-[100px] sm:h-[100px] object-contain"
            />
          </div>
        </div>
      )}
    </div>
    // </div>
  );
}
