import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import dayjs from "dayjs";
import { format_date } from "../../format/format-input";
const today_date = dayjs();

const config = require("../../../config.json");
const initialState = {
  events: [], // This is where the list of events will be stored
  displayedEvents: [],
  selectedHashtags: [],
  presentedHashtags: [],
  presentedStartDate: null,
  presentedEndDate: null,
  searchBarInput: "",
  categorizedEvents: {},
  start_date: null,
  end_date: null,
  start_date_map: null,
  end_date_map: null,
  available_hashtags: {},
  FeaturedCateogirzedBySubcategoryEvents: {},
  SuperFeaturedEvents: [],
  current_page: 0,
  dataFullyLoaded: false,
  newSearchLoading: false,
  organizer_id: null,
  category: "",
  subcategory: "",
  categoriesMeta: {},
  // SearchPageNavigatedFromHome: false,
  venues: [],
};

const SearchResults = createSlice({
  name: "searchResults",
  initialState,
  reducers: {
    modify: (state, action) => {
      console.log("action.payload", action.payload);
      const { field, value } = action.payload;
      state[field] = value;
    },
    setHashtags: (state, action) => {
      let hashtags_with_colors = {};
      const colorMap = {
        "bg-blue-500": "#3b82f6",
        "bg-blue-600": "#2563eb",
        "bg-green-500": "#22c55e",
        "bg-green-600": "#16a34a",
        "bg-yellow-500": "#eab308",
        "bg-yellow-600": "#ca8a04",
        "bg-red-500": "#ef4444",
        "bg-red-600": "#dc2626",
        "bg-purple-500": "#a855f7",
        "bg-purple-600": "#9333ea",
        "bg-indigo-500": "#6366f1",
        "bg-indigo-600": "#4f46e5",
        "bg-pink-500": "#ec4899",
        "bg-pink-600": "#db2777",
        "bg-orange-500": "#f97316",
        "bg-orange-600": "#ea580c",
      };

      const colors = {
        0: {
          unhovered: colorMap["bg-blue-500"],
          hovered: colorMap["bg-blue-600"],
        },
        1: {
          unhovered: colorMap["bg-green-500"],
          hovered: colorMap["bg-green-600"],
        },
        2: {
          unhovered: colorMap["bg-yellow-500"],
          hovered: colorMap["bg-yellow-600"],
        },
        3: {
          unhovered: colorMap["bg-red-500"],
          hovered: colorMap["bg-red-600"],
        },
        4: {
          unhovered: colorMap["bg-purple-500"],
          hovered: colorMap["bg-purple-600"],
        },
        5: {
          unhovered: colorMap["bg-indigo-500"],
          hovered: colorMap["bg-indigo-600"],
        },
        6: {
          unhovered: colorMap["bg-pink-500"],
          hovered: colorMap["bg-pink-600"],
        },
        7: {
          unhovered: colorMap["bg-orange-500"],
          hovered: colorMap["bg-orange-600"],
        },
      };

      let index = 0;
      action.payload.forEach((hashtag) => {
        hashtags_with_colors[hashtag] = colors[index];
        index += 1;
        if (index === 8) {
          index = 0; // Reset index to 0 when it reaches 6
        }
      });

      state.available_hashtags = hashtags_with_colors;
    },
    setEvents: (state, action) => {
      if (action.payload.length === 0) {
        state.dataFullyLoaded = true;
      } else {
        state.displayedEvents = state.displayedEvents.concat(action.payload);
      }
    },
    setSuperFeatured: (state, action) => {
      state.SuperFeaturedEvents = action.payload;
    },
    modifySearchBarInput: (state, action) => {
      state.searchBarInput = action.payload;
    },
    addHashtag: (state, action) => {
      const { field, value } = action.payload;
      state[field] = [...state[field], value];
    },
    setCategoriesMeta: (state, action) => {
      const { value } = action.payload;
      state.categoriesMeta = value;
      // value.forEach((category) => {
      //   state.categoriesMeta[category.category_name] =
      //     category.subcategories.map(
      //       (subcategory) => subcategory.subcategory_name
      //     );
      // });
    },
    removeHashtag: (state, action) => {
      const { field, value } = action.payload;

      // Ensure the field exists and is an array
      if (state[field]) {
        let index = state[field].indexOf(value);
        if (index > -1) {
          state[field].splice(index, 1); // Removes the value from array
        }
      }
    },
    resetState: () => {
      return initialState;
    },
    clearFilters: (state, action) => {
      state.selectedHashtags = [];
      state.start_date = format_date(today_date);
      state.subcategory = "";
      state.category = "";
      state.end_date = null;
    },
    categorizeDataBySubcategory: (state, action) => {
      // Assuming action.payload is an array of events
      const events = action.payload;

      const newFeaturedSubcategoryEvents = {};

      // Iterate through each event and categorize them
      events.forEach((event) => {
        const subcategory = event.subcategory_name; // Handle empty categories
        if (subcategory) {
          if (!newFeaturedSubcategoryEvents[subcategory]) {
            newFeaturedSubcategoryEvents[subcategory] = [];
          }
          newFeaturedSubcategoryEvents[subcategory].push(event);
        }
      });

      // Set the categorized events in the state
      state.FeaturedCateogirzedBySubcategoryEvents =
        newFeaturedSubcategoryEvents;
    },
  },
});
export function fetchMeta() {
  return async function MetaThunk(dispatch, getState) {
    // API LINK
    const meta_res = await axios.get(`${config.api.eventUrl}/events/getMeta`);
    // const meta_res = await axios.get(
    //   // API LINK
    //   // `${config.api.eventUrl}/events/getEvents${query_params}`
    //   `http://localhost:5002/getMeta`
    // );
    console.log("meta_res", meta_res);
    dispatch(setHashtags(meta_res.data.hashtags));
    dispatch(
      setCategoriesMeta({
        field: "setCategoriesMeta",
        value: meta_res.data.categories,
      })
    );
  };
}

export function fetchSelectedEvents({
  pagination = true,
  is_featured = false,
  is_super_featured = false,
} = {}) {
  return async function fetchEventsThunk(dispatch, getState) {
    const state = getState();
    let query_params = ""; // Start as an empty string

    // Helper function to append query parameters correctly
    const appendQueryParam = (key, value) => {
      if (query_params === "") {
        query_params = `?${key}=${value}`;
      } else {
        query_params += `&${key}=${value}`;
      }
    };

    const fieldsToCheck = [
      "start_date",
      "end_date",
      "start_date_map",
      "end_date_map",
    ];

    for (const field of fieldsToCheck) {
      if (
        state.searchResults[field] === "NaN-NaN-NaN" ||
        !state.searchResults[field]
      ) {
        await dispatch(modify({ field, value: null }));
      }
    }

    const startField =
      state.searchResults.start_date_map || state.searchResults.start_date;
    const endField =
      state.searchResults.end_date_map || state.searchResults.end_date;
    if (startField ) {
      appendQueryParam("date_period_start", startField);
    }

    if (endField) {
      appendQueryParam("date_period_end", endField);
    }

    // Append category if present
    if (getState().searchResults.category) {
      appendQueryParam(
        "category",
        encodeURIComponent(getState().searchResults.category)
      );
    }

    // Append subcategory if present and not "All"
    if (
      getState().searchResults.subcategory &&
      getState().searchResults.subcategory !== "All"
    ) {
      appendQueryParam(
        "subcategory",
        encodeURIComponent(getState().searchResults.subcategory)
      );
    }

    // Append hashtags if selected
    if (state.searchResults.selectedHashtags.length > 0) {
      appendQueryParam(
        "tags_list",
        state.searchResults.selectedHashtags.join(",")
      );
    }

    // Append search words if provided
    if (state.searchResults.searchBarInput.length > 0) {
      const words = state.searchResults.searchBarInput.split(" ");
      appendQueryParam("search_words", words.join(","));
    }

    // Append organizer_id if provided
    if (state.searchResults.organizer_id) {
      appendQueryParam("organizer_id", state.searchResults.organizer_id);
    }

    // Append pagination if enabled
    if (pagination) {
      appendQueryParam("page", state.searchResults.current_page);
    }

    // Append is_featured flag if true
    if (is_featured) {
      appendQueryParam("is_featured", "true");
    }

    if (is_super_featured) {
      appendQueryParam("is_super_featured", "true");
    }
    console.log("query_params", query_params);
    // Make the API call
    try {
      const events_res = await axios.get(
        // API LINK
        `${config.api.eventUrl}/events/getEvents${query_params}`
        // `http://localhost:5002/getEvents${query_params}`
      );
      // Dispatch the response data to Redux store
      if (is_featured) {
        dispatch(categorizeDataBySubcategory(events_res.data));
      }
      if (is_super_featured) {
        dispatch(setSuperFeatured(events_res.data));
      } else {
        dispatch(setEvents(events_res.data));
      }
    } catch (err) {
      console.log(`An error has occurred: ${err}`);
    }
  };
}

export const {
  setSuperFeatured,
  setCategoriesMeta,
  setEvents,
  setHashtags,
  addHashtag,
  removeHashtag,
  modifySearchBarInput,
  modify,
  categorizeDataBySubcategory,
  clearFilters,
  resetState,
} = SearchResults.actions;
export default SearchResults.reducer;
