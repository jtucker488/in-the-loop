import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import { format_date } from "../../format/format-input";
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
  "Does not repeat",
  "Daily",
  "Every weekday",
  `Weekly on ${daysOfWeek[today_date.day()]}`,
  "Custom...",
];

const freq_options = ["Day", "Week", "Month", "Year"];

export const eventSlice = createSlice({
  name: "event_info",
  initialState: {
    name: "",
    start_date: format_date(today_date),
    start_time: null,
    end_date: format_date(today_date),
    end_time: null,
    html_link: "",
    venue_id: null,
    organizer_id: null,
    repeat: options[0],
    description: "",
    // location: null,
    image_url: "",
    video_url: "",
    // category: "",
    subcategory: "",
    repeat_frequency: 1,
    repeat_length_of_time: freq_options[1],
    days_to_repeat: ["monday", "wednesday", "friday"], // Default selected days
    hashtags: [],
    ends_on: "after",
    // max_hashtags:false,
    ends_on_date: null,
    ends_after_occurances: 10,
    venue_id: null,
    address: "",
    city: "",
    state: "",
    zip: "",
  },
  reducers: {
    // modify_event
    modify_event: (state, action) => {
      const { field, value } = action.payload;
      state[field] = value;
    },
    // reset_radio: (state) => {
    //   state.ends_on_date = null;
    //   state.ends_after_occurances = null;
    // },

    // "name": "test3",
    //       "start_date": null,
    //       "start_time": null,
    //       "end_date": null,
    //       "end_time": null,

    //       "description": ""

    reset_form: (state) => {
      state.name = "";
      state.start_date = format_date(today_date);
      state.start_time = null;
      state.end_date = format_date(today_date);
      state.end_time = null;
      // state.repeat= options[0];
      state.description = "";
      state.venue_id = null;
      // state.location= null;
      state.image = null;
      state.video_url = "";
      state.image_url = "";
      state.category = "";
      state.subcategory = "";
      // state.repeat_frequency= 1;
      // state.repeat_length_of_time= freq_options[1];
      // state.days_to_repeat= [0, 2, 3];
      state.hashtags = [];
      // state.ends_on= "never";
      // state.max_hashtags=false;
      state.html_link = "";
      // state.ends_on_date= null;
      // state.ends_after_occurances= null;
    },

    reset_radio: (state) => {
      state.ends_on_date = null;
      state.ends_after_occurances = null;
    },

    addHashtag: (state, action) => {
      // Assuming action.payload contains the field to be updated and its value
      const { field, value } = action.payload;
      state[field] = [...state[field], value];
    },
    removeHashtag: (state, action) => {
      // Assuming action.payload contains the field to be updated and its value
      const { field, value } = action.payload;
      let index = state[field].indexOf(value);

      if (index > -1) {
        state[field].splice(index, 1); // Removes "orange"
      }
    },
  },
});

// const sendEventData = (eventData) => {
//   return async (dispatch) => {
//     dispatch();
//     // Send data
//   };
// }
// Action creators are generated for each case reducer function
export const {
  modify_event,
  reset_radio,
  addHashtag,
  removeHashtag,
  reset_form,
} = eventSlice.actions;

export default eventSlice.reducer;
