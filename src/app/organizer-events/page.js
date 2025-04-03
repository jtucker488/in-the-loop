"use client";
import React, { useEffect, useRef, useState } from "react";
import ModifyEventCard from "../../../components/organizer-events-components/modify-event-card";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AddEventCard from "../../../components/organizer-events-components/add-event-card";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { modify } from "../../../components/redux/slices/searchResultsSlice";
import { ClipLoader } from "react-spinners"; // Import ClipLoader
import { resetState } from "../../../components/redux/slices/searchResultsSlice";
import { auth } from "../../..//lib/firebase";
import SettingsIcon from "@mui/icons-material/Settings";
import axios from "axios";
import {
  fetchSelectedEvents,
  fetchMeta,
} from "../../../components/redux/slices/searchResultsSlice";
import PresentedFilters from "../../../components/home-page-componets/presented-filters";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth"; // Import Firebase Auth
import Modal from "../../../components/general/modal"; // Import the Modal component
import SettingsDirectory from "../../../components/organizer-events-components/settings-directory";

const OrganizerEvents = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const events = useSelector((state) => state.searchResults.displayedEvents);
  const [loading, setLoading] = useState(true); // Loading state
  const [cardContainerWidth, setCardContainerWidth] = useState(0);
  const [organizerInfo, setOrganizerInfo] = useState(null);

  const [showSettings, setShowSettings] = useState(false);

  const presentedHashtags = useSelector(
    (state) => state.searchResults.presentedHashtags
  );
  const presentedStartDate = useSelector(
    (state) => state.searchResults.presentedStartDate
  );
  const presentedEndDate = useSelector(
    (state) => state.searchResults.presentedEndDate
  );

  const settingsIconRef = useRef(null);
  const modalRef = useRef(null);

  useEffect(() => {
    const fetchOrganizerId = async (authUserId) => {
      try {
        const response = await axios.get(
          `http://localhost:5002/getOrganizer/${authUserId}`
        );
        setOrganizerInfo(response.data[0]);
        const organizer_id = response.data[0].id;
        if (organizer_id) {
          await dispatch(
            modify({ field: "organizer_id", value: organizer_id })
          );
        }
      } catch (error) {
        console.error("Error fetching organizer:", error);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await fetchOrganizerId(user.uid);
        setLoading(true);
        await dispatch(modify({ field: "displayedEvents", value: [] }));
        await dispatch(fetchSelectedEvents({ pagination: false }));
        await dispatch(fetchMeta());
        setLoading(false);
      } else {
        router.push("/login");
      }
    });

    return () => {
      unsubscribe();
    };
  }, [auth, dispatch, router]);

  const cardWidth = 332;
  const pagePadding = 64;

  useEffect(() => {
    const calculateContainerWidth = () => {
      const viewportWidth = window.innerWidth;
      const cardsInRow = Math.floor((viewportWidth - pagePadding) / cardWidth);
      setCardContainerWidth(cardsInRow * cardWidth);
    };

    calculateContainerWidth();
    window.addEventListener("resize", calculateContainerWidth);
    return () => {
      window.removeEventListener("resize", calculateContainerWidth);
    };
  }, []);

  const handleSignOut = async () => {
    await signOut(auth);
    router.push("/login");
  };

  return (
    <div className="px-10 py-10">
      {loading ? (
        <div className="flex justify-center items-center h-[80vh]">
          <ClipLoader size={50} color={"#ffffff"} loading={loading} />
        </div>
      ) : (
        <>
          <div className="flex flex-col items-start mt-[100px]">
            <PresentedFilters
              hashtags={presentedHashtags}
              start_date={presentedStartDate}
              end_date={presentedEndDate}
            />
            {organizerInfo && (
              <div className="flex items-center">
                <div className="relative ">
                  <button
                    ref={settingsIconRef}
                    onClick={() => setShowSettings((prev) => !prev)}
                    className="focus:outline-none"
                  >
                    <SettingsIcon className="text-[34px] mt-2" />
                  </button>
                  {showSettings && (
                    <Modal
                      ref={modalRef}
                      onClose={() => setShowSettings(false)}
                      positionStyle={{ top: 50, left: 0 }}
                    >
                      <SettingsDirectory handleSignOut={handleSignOut} />
                    </Modal>
                  )}
                </div>
                <h1 className="ml-8 text-5xl">
                  Welcome back, {organizerInfo.name}!
                </h1>
              </div>
            )}
          </div>
          <div className="flex justify-center">
            <div
              style={{ width: `${cardContainerWidth}px` }}
              className="flex min-w-[300px] flex-wrap justify-start w-full"
            >
              <div className="p-4">
                <AddEventCard />
              </div>
              {events.map((event, index) => (
                <div className="p-4" key={index}>
                  <ModifyEventCard event={event} />
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default OrganizerEvents;
