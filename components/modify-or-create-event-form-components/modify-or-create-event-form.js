import { useSelector, useDispatch } from "react-redux";
import { CircularProgress } from "@mui/material";
import { modify } from "../redux/slices/searchResultsSlice";
import { fetchSelectedEvents } from "../redux/slices/searchResultsSlice";
import { isStartBeforeEndWithTime } from "../format/format-input";
import SubcateogryDropdown from "./subCategory-dropdown";
import CalendarInput from "./calendar-input";
import { modify_event, reset_form } from "../redux/slices/eventSlice";
import TimeInput from "./time-input";
import HashtagButtonSelectedForm from "./hashtag-form-components/hashtag-button-selected-form";
import HashtagInput from "./hashtag-input";
import DescriptionInput from "./description-input";
import { auth } from "../../lib/firebase";
import Modal from "../general/modal";
import VideocamIcon from "@mui/icons-material/Videocam";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DescriptionIcon from "@mui/icons-material/Description";
import ImageIcon from "@mui/icons-material/Image";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import axios from "axios";
import { useEffect, useState } from "react";
import { fetchMeta } from "../redux/slices/searchResultsSlice";
import { Button } from "../catalyst/button";
import { motion } from "framer-motion";
import RepeatSelectionMenu from "./repeat-items/repeat-selection-menu";
import GeneralInput from "../general/general-input";
import ModifyVenueInput from "../venue-components/modify-venue-input";
import generateRRule from "../general/rrule-generator";
import { useRouter } from "next/navigation";
import { ChevronDoubleLeftIcon } from "@heroicons/react/20/solid";
import ModifyAllOrJustThisInstancePage from "./modifyAllOrJustThisInstancePage";
import LocationPicker from "./location-picker";
import ChooseLocationButton from "./pick-location/choose-location-button";
import { modify_modifyEvent } from "../redux/slices/modifyEventSlice";
const config = require("../../config.json");

export default function ModifyOrCreateEventForm({ modifyEventOrEvent }) {
  console.log("ModifyOrCreateEventForm");
  const router = useRouter();
  const dispatch = useDispatch();
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [modifyAllModalVisible, setModifyAllModalVisible] = useState(false);

  useEffect(() => {
    // This runs after the first render.
    if (modifyEventOrEvent === "event") {
      dispatch(reset_form);
    }

    dispatch(fetchMeta());
  }, [dispatch]);

  const CategoriesAndSubcategories = useSelector(
    (state) => state.searchResults.categoriesMeta
  );
  const handleOrganizerClick = () => {
    router.push("/organizer-events");
  };
  const venues = useSelector((state) => state.searchResults.venues);

  const submitted_data = useSelector((state) => state[modifyEventOrEvent]);
  // Extract fields from the current slice
  const {
    venue_id,
    address,
    city,
    state: stateVal,
    zip,
    rrule,
    id: instance_id, // Only applicable for `modifyEvent`
    subcategory: subcategoryName,
    hashtags: selectedHashtags,
    start_date,
    end_date,
    start_time,
    end_time,
  } = submitted_data;
  const organizer_id = useSelector(
    (state) => state[modifyEventOrEvent].organizer_id
  );
  console.log("organizer_id", organizer_id);
  const selectedVenue = venues?.find((venue) => venue.id === venue_id);
  console.log("auth", auth);

  const modifyEvent = async (event) => {
    try {
      event.preventDefault();
      await dispatch(modifyEvent());
      await axios.get(`${config.api.eventUrl}/events/updateView`);
      await dispatch(modify({ field: "displayedEvents", value: [] }));
      await dispatch(
        fetchSelectedEvents({ organizer_id: organizer_id, pagination: false })
      );
    } catch {}
  };
  let subcategoryId = null;

  if (CategoriesAndSubcategories && CategoriesAndSubcategories.length > 0) {
    const currentCategoryObject = CategoriesAndSubcategories.find(
      (category) => category.category_name === "Technology"
    );
    const subcategoryObject = currentCategoryObject.subcategories.find(
      (subcategory) => subcategory.subcategory_name === subcategoryName
    );

    if (subcategoryObject) {
      subcategoryId = subcategoryObject.subcategory_id;
    }
  }

  useEffect(() => {
    const fetchOrganizerId = async (authUserId) => {
      try {
        if (!authUserId) {
          throw new Error("No user is currently logged in.");
        }
        const response = await axios.get(
          // API LINK
          `${config.api.eventUrl}/events/getOrganizer/${authUserId}`
          // `http://localhost:5002/getOrganizer/${authUserId}`
        );
        console.log("response", authUserId, response);
        const organizer_id_res = response.data[0]?.id; // Assuming the API returns an array
        console.log("Organizer ID found:", organizer_id_res);
        if (organizer_id_res) {
          console.log("Organizer ID found:", organizer_id_res);
          if (modifyEventOrEvent === "event") {
            dispatch(
              modify_event({ field: "organizer_id", value: organizer_id_res })
            );
          } else {
            dispatch(
              modify_modifyEvent({
                field: "organizer_id",
                value: organizer_id_res,
              })
            );
          }
        } else {
          console.error("No organizer found for the given auth_userid.");
        }
      } catch (error) {
        console.error("Error fetching organizer:", error);
      }
    };

    // Add a listener to wait for Firebase Auth to initialize
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        fetchOrganizerId(user.uid);
      } else {
        console.error("No user session found. Redirecting to login.");
        router.push("/login"); // Redirect if not authenticated
      }
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, [auth, router, dispatch]);
  const handleSubmitDirectory = (event) => {
    event.preventDefault();

    if (modifyEventOrEvent === "modifyEvent" && rrule) {
      setModifyAllModalVisible(true);
    } else {
      handleSubmit();
    }
  };
  const handleSubmit = async (justThisInstance = true) => {
    event.preventDefault();

    setIsLoading(true);
    setIsError(false);
    setIsSuccess(false);

    const RRULE_string = generateRRule({
      repeat: submitted_data.repeat,
      repeat_frequency: submitted_data.repeat_frequency,
      repeat_length_of_time: submitted_data.repeat_length_of_time,
      days_to_repeat: submitted_data.days_to_repeat,
      ends_on: submitted_data.ends_on,
      ends_on_date: submitted_data.ends_on_date,
      ends_after_occurances: submitted_data.ends_after_occurances,
    });
    console.log("organizer_id", organizer_id);

    const requestData = {
      name: submitted_data.name,
      start_date: submitted_data.start_date,
      start_time: submitted_data.start_time,
      end_date: submitted_data.end_date,
      end_time: submitted_data.end_time,
      description: submitted_data.description,
      html_link: submitted_data.html_link,
      category_id: 8,
      subcategory_id: subcategoryId,
      organizer_id: organizer_id,
      hashtags: submitted_data.hashtags,
      thumbnail_address: submitted_data.image_url,
      recurrence: RRULE_string,
    };
    console.log("requestData", requestData);

    // Include `venue_id` if available; otherwise, include address details
    if (venue_id) {
      requestData["venue_id"] = venue_id;
    } else if (address && city && stateVal && zip) {
      requestData["address"] = address;
      requestData["city"] = city;
      requestData["state"] = stateVal;
      requestData["zip"] = zip;
    }

    if (modifyEventOrEvent === "modifyEvent") {
      requestData["delete_id"] = submitted_data["id"];
    }
    // API LINK

    // let url = "http://localhost:5002/events/createevent";
    let url = `${config.api.eventUrl}/events/createevent`;
    if (modifyEventOrEvent === "modifyEvent") {
      console.log("here33134");

      // API LINK
      url = justThisInstance
        ? `${config.api.eventUrl}/events/editEvent/${instance_id}`
        : `${config.api.eventUrl}/events/editEvent`;
      // url = justThisInstance
      //   ? `http://localhost:5002/events/editevent/${instance_id}`
      //   : `http://localhost:5002/events/editevent`;
    }

    try {
      // API CALL
      console.log("Sending requestData:", requestData);
      const response = await axios.post(url, requestData, {
        headers: { "Content-Type": "application/json" },
      });

      // Fetch updated event data
      await dispatch(modify({ field: "displayedEvents", value: [] }));
      await dispatch(
        fetchSelectedEvents({ organizer_id: organizer_id, pagination: false })
      );

      setIsSuccess(true); // Show success message
    } catch (err) {
      console.error("An error occurred:", err);
      setIsError(true); // Show error message
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="w-full h-full flex justify-center overflow-hidden">
      <form
        onSubmit={handleSubmitDirectory}
        className="bg-neutral-900 px-4 sm:px-16 py-8 w-[90%] overflow-hidden text-center  font-bold m-4 rounded"
      >
        <div className="flex flex-col sm:flex-row w-full">
          <div className="flex-1 flex flex-col gap-1">
            <div className="mb-4">
              <GeneralInput
                label="Event Name"
                sliceName={modifyEventOrEvent}
                fieldName="name"
              />
            </div>
            {/* <RepeatSelectionMenu/> */}
            <div className="mb-4">
              <GeneralInput
                label="Event Link"
                sliceName={modifyEventOrEvent}
                fieldName="html_link"
              />
            </div>
            <div className="mb-4">
              <div className="text-left"></div>
              <div className="flex space-x-2 mt-1 ">
                <SubcateogryDropdown modifyEventOrEvent={modifyEventOrEvent} />
              </div>
            </div>
            <div className="mb-4 flex flex-col sm:flex-row  justify-start items-start sm:space-x-4">
              {/* Start Date and Time */}
              <div className="flex-1 flex flex-col align-start space-y-2">
                <CalendarInput
                  inputLabel="Start Date"
                  modifyEventOrEvent={modifyEventOrEvent}
                  name="start_date"
                />
                <TimeInput
                  modifyEventOrEvent={modifyEventOrEvent}
                  inputLabel="Start Time"
                  name="start_time"
                />
              </div>

              {/* End Date and Time */}
              <div className="flex-1 flex flex-col space-y-2">
                <CalendarInput
                  inputLabel="End Date"
                  modifyEventOrEvent={modifyEventOrEvent}
                  name="end_date"
                />
                <TimeInput
                  modifyEventOrEvent={modifyEventOrEvent}
                  inputLabel="End Time"
                  name="end_time"
                />
              </div>
            </div>
            <RepeatSelectionMenu />

            {isStartBeforeEndWithTime(
              start_date,
              start_time,
              end_date,
              end_time
            ) === "incorrect dates" && (
              <div className="flex flex-start">
                <p className="text-red-500 text-sm mb-4">
                  * End date cannot be before start date.
                </p>
              </div>
            )}
            {isStartBeforeEndWithTime(
              start_date,
              start_time,
              end_date,
              end_time
            ) === "incorrect times" && (
              <div className="flex flex-start">
                <p className="text-red-500 text-sm mb-4">
                  * End time cannot be before start time.
                </p>
              </div>
            )}
          </div>
          <div className="mx-4 hidden sm:flex border-l-2 border-gray-300"></div>
          <div className="flex-1 flex flex-col gap-1">
            <div
              className={`w-full max-h-[45px] overflow-x-auto whitespace-nowrap ${
                selectedHashtags.length > 0 ? "h-16" : ""
              }`}
            >
              {" "}
              <div className="flex pt-2 flex-nowrap items-center space-x-2 max-w-[200px] !important">
                {selectedHashtags.map((item, index) => (
                  <div
                    key={index}
                    className="shrink-0  inline-block !important"
                    style={{ whiteSpace: "nowrap" }}
                  >
                    <HashtagButtonSelectedForm
                      modifyEventOrEvent={modifyEventOrEvent}
                      name={item}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="my-4 flex items-center space-x-2">
              <FilterAltIcon className="text-neutral-50" />
              <HashtagInput
                modifyEventOrEvent={modifyEventOrEvent}
                name="hashtag"
              />
            </div>

            <div className="mb-4 flex items-center space-x-2">
              <DescriptionIcon className="text-neutral-50" />
              <DescriptionInput
                modifyEventOrEvent={modifyEventOrEvent}
                name="description"
              />
            </div>

            <div className="mb-2 flex items-center space-x-2 w-full">
              <LocationOnIcon className="text-neutral-50 shrink-0" />
              <div className="flex-1 flex items-center justify-start">
                {selectedVenue ? (
                  <p className="text-brand-blue text-lg font-bold text-ellipsis">
                    {selectedVenue?.name || venue_id}
                  </p>
                ) : address && city && stateVal && zip ? (
                  <p className="text-brand-blue text-lg font-bold text-ellipsis">
                    {`${address}, ${city}, ${stateVal} ${zip}`.length > 50
                      ? `${`${address}, ${city}, ${stateVal} ${zip}`.slice(
                          0,
                          50
                        )}...`
                      : `${address}, ${city}, ${stateVal} ${zip}`}
                  </p>
                ) : (
                  <p className="text-gray-400 text-lg font-bold">
                    No address chosen
                  </p>
                )}
              </div>
            </div>
            <div className="mb-2 ml-8 flex items-center space-x-2">
              <ChooseLocationButton modifyEventOrEvent={modifyEventOrEvent} />
              <ModifyVenueInput />
            </div>
            <div className="flex items-center space-x-2">
              <ImageIcon className=" text-neutral-50 mt-7" />
              <GeneralInput
                label="Image Link"
                sliceName={modifyEventOrEvent}
                fieldName="image_url"
              />
            </div>
            <div className="flex items-center space-x-2">
              <VideocamIcon className=" text-neutral-50 mt-7" />
              <GeneralInput
                label="Video Link"
                sliceName={modifyEventOrEvent}
                fieldName="video_url"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-12">
          <Button
            type="submit"
            color="rose"
            className="  w-8/12 text-black py-2 px-4 rounded"
          >
            Confirm
          </Button>
        </div>
      </form>
      {modifyAllModalVisible && (
        <Modal onClose={() => setModifyAllModalVisible(false)}>
          <ModifyAllOrJustThisInstancePage handleSubmit={handleSubmit} />
        </Modal>
      )}
      {/* Modal */}
      {(isLoading || isSuccess || isError) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
        >
          <div className="bg-neutral-700 rounded-lg p-6 text-center">
            {isLoading && (
              <div className="flex flex-col items-center ">
                <CircularProgress />
                <p className="mt-4 text-white">Creating event...</p>
              </div>
            )}
            {isSuccess && (
              <div className="flex flex-col items-center gap-4">
                <h2 className="text-3xl font-bold text-white">
                  Event Created Successfully!
                </h2>
                <button
                  onClick={handleOrganizerClick}
                  className="flex item-start text-sm text-neutral-200 hover:text-white hover:underline "
                >
                  <ChevronDoubleLeftIcon className="h-5 w-5 mr-2" />
                  Back to Orgnaizer Page
                </button>
              </div>
            )}
            {isError && (
              <div className="flex flex-col items-center">
                <h2 className="text-xl font-bold text-red-600">
                  Failed to Create Event
                </h2>
                <p className="text-gray-600 mt-2">Please try again later.</p>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}
