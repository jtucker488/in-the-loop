import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import { format_date } from "../../format/format-input";
import axios from "axios";
const config = require("../../../config.json");
const today_date = dayjs();

const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const options = [
  { id: 1, name: "Does not repeat" },
  { id: 2, name: "Daily" },
  { id: 3, name: "Every weekday" },
  { id: 4, name: `Weekly on ${daysOfWeek[today_date.day()]}` },
  { id: 5, name: "Custom..." },
];

export const modifyEventSlice = createSlice({
  name: "modify_event_info",
  initialState: {
    name: "",
    start_date: format_date(today_date),
    start_time: null,
    end_date: format_date(today_date),
    end_time: null,
    id: null,
    rrule: "",
    instance_id: null,
    organizer_id: null,
    // repeat: options[0],
    description: "",
    // location: null,
    image: "",
    // repeat_frequency: 1,
    // repeat_length_of_time: freq_options[1],
    // days_to_repeat: [0, 2, 3],
    hashtags: [],
    image_url: null,
    video_url: "",
    html_link: "",
    // ends_on: "never",
    max_hashtags: false,
    category: "",
    subcategory: "",
    // ends_on_date: null,
    // ends_after_occurances: null,
    venue_id: null,
    address: "",
    city: "",
    state: "",
    zip: "",
  },
  reducers: {
    modify_modifyEvent: (state, action) => {
      const { field, value } = action.payload;
      state[field] = value;
    },
    // reset_radio: (state) => {
    //   state.ends_on_date = null;
    //   state.ends_after_occurances = null;
    // },
    modifyAddHashtag: (state, action) => {
      const { field, value } = action.payload;
      state[field] = [...state[field], value];
    },
    modifyRemoveHashtag: (state, action) => {
      const { field, value } = action.payload;
      let index = state[field].indexOf(value);

      if (index > -1) {
        state[field].splice(index, 1); // Removes the specified hashtag
      }
    },
    modifyClearHashtags: (state) => {
      state.hashtags = []; // Clears all hashtags from the state
    },
  },
});

export function modifyEvent() {
  return async function fetchEventsThunk(dispatch, getState) {
    const state = getState();

    // Generate a unique

    const requestData = {
      category: state.modifyEvent.category,
      subcategory: state.modifyEvent.subcategory,
      id: state.modifyEvent.id,
      name: state.modifyEvent.name,
      start_date: state.modifyEvent.start_date,
      start_time: state.modifyEvent.start_time,
      end_date: state.modifyEvent.end_date,
      end_time: state.modifyEvent.end_time,
      description: state.modifyEvent.description,
      html_link: state.modifyEvent.html_link,
      hashtags: state.modifyEvent.hashtags,
      thumbnail_address: state.modifyEvent.image_url
      // tags: state.modifyEvent.description
    };
    try {
      const res = await axios.put(
        `${config.api.eventUrl}/events/editEvent`, // Your API endpoint
        requestData, // Request body
        {
          headers: {
            "Content-Type": "application/json", // Set content type header
          },
        }
      );
      console.log("Event added successfully:", res.data);
    } catch (err) {
      console.log(`An error has occurred: ${err}`);
    }
  };
}

// Action creators are generated for each case reducer function
export const {
  modify_modifyEvent,
  reset_radio,
  modifyAddHashtag,
  modifyRemoveHashtag,
  modifyClearHashtags,
} = modifyEventSlice.actions;

export default modifyEventSlice.reducer;
