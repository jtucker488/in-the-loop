"use client";
import React, { useEffect, useState } from "react";
import EventCard from "../../../components/home-page-componets/event-card";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { fetchSelectedEvents } from "../../../components/redux/slices/searchResultsSlice";
import { useDispatch, useSelector } from "react-redux";
import { modify } from "../../../components/redux/slices/searchResultsSlice";
import { ClipLoader } from "react-spinners";
import dayjs from "dayjs";
import PresentedFilters from "../../../components/home-page-componets/presented-filters";
const SearchPage = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  // const SearchPageNavigatedFromHome = useSelector(
  //   (state) => state.searchResults.SearchPageNavigatedFromHome
  // );
  const events = useSelector((state) => state.searchResults.displayedEvents);
  const fullyLoaded = useSelector(
    (state) => state.searchResults.dataFullyLoaded
  );
  const current_page = useSelector((state) => state.searchResults.current_page);
  const presentedHashtags = useSelector(
    (state) => state.searchResults.presentedHashtags
  );
  const presentedStartDate = useSelector(
    (state) => state.searchResults.presentedStartDate
  );
  const presentedEndDate = useSelector(
    (state) => state.searchResults.presentedEndDate
  );

  const cardWidth = 332; // Width of each event card
  const pagePadding = 64; // Total padding on the page

  const [cardContainerWidth, setCardContainerWidth] = useState(0);

  useEffect(() => {
    console.log("Updated Events:", events); // Logs updated events
  }, [events]);

  const newSearchLoading = useSelector(
    (state) => state.searchResults.newSearchLoading
  );
  const start_date = useSelector((state) => state.searchResults.start_date);
  console.log("hello?");

  useEffect(() => {
    const uponRender = async () => {
      dispatch(modify({ field: "newSearchLoading", value: true }));
      await dispatch(modify({ field: "displayedEvents", value: [] }));
      if (!start_date) {
        await dispatch(
          modify({ field: "start_date", value: dayjs().format("YYYY-MM-DD") })
        );
      }
      await dispatch(fetchSelectedEvents());
      dispatch(modify({ field: "newSearchLoading", value: false }));
    };
    uponRender();

    // Calculate container width on mount and on window resize
    const calculateContainerWidth = () => {
      const viewportWidth = window.innerWidth;
      const cardsInRow = Math.floor((viewportWidth - pagePadding) / cardWidth);
      setCardContainerWidth(cardsInRow * cardWidth);
    };

    // Initial calculation
    calculateContainerWidth();

    // Add resize listener
    window.addEventListener("resize", calculateContainerWidth);
    // if (!SearchPageNavigatedFromHome) {
    //   uponRender();
    // }
    // dispatch(modify({ field: "SearchPageNavigatedFromHome", value: false }));

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", calculateContainerWidth);
    };
    // Invoke the async function inside the effect
  }, [dispatch]);

  const handleScroll = async () => {
    // Check if the user has scrolled near the bottom of the page
    if (
      window.innerHeight + window.pageYOffset >=
        document.documentElement.scrollHeight - 2 && // Adjust this value to control when to trigger
      !loading // Ensure no loading while fetching
    ) {
      setLoading(true);

      // Increment the page and fetch the next set of events
      await dispatch(
        modify({ field: "current_page", value: current_page + 1 })
      );
      await dispatch(fetchSelectedEvents());

      setLoading(false);
    }
  };

  useEffect(() => {
    if (fullyLoaded) {
      setLoading(false);
    }
  }, [fullyLoaded]);

  useEffect(() => {
    if (!fullyLoaded) {
      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [current_page, loading, fullyLoaded]); // Track `current_page` and `loading`

  return (
    <div className="flex flex-col items-center p-8 py-[150px]">
      <div className="bg-black w-[100%] my-4">
        <PresentedFilters
          hashtags={presentedHashtags}
          start_date={presentedStartDate}
          end_date={presentedEndDate}
        />
      </div>
      <div
        style={{ width: `${cardContainerWidth}px` }}
        className="inline-block flex flex-wrap justify-start"
      >
        {events.map((event, index) => (
          <div className="p-4" key={index}>
            <EventCard event={event} />
          </div>
        ))}
      </div>

      {/* Loader container */}
      <div className="flex justify-center items-center mt-4 mb-8">
        <ClipLoader
          loading={loading || newSearchLoading}
          size={30}
          color={"#ffffff"}
        />
      </div>
    </div>
  );
};

export default SearchPage;
