import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./components/redux/slices/loginSlice";
import eventSlice from "./components/redux/slices/eventSlice";
import modifyEventSlice from "./components/redux/slices/modifyEventSlice";
import searchResults from "./components/redux/slices/searchResultsSlice";
import createVenueSlice from "./components/redux/slices/createVenueSlice";
import modifyVenueSlice from "./components/redux/slices/modifyVenueSlice";

export default configureStore({
  reducer: {
    login: loginSlice,
    event: eventSlice,
    modifyEvent: modifyEventSlice,
    searchResults: searchResults,
    createVenue: createVenueSlice,
    modifyVenue: modifyVenueSlice,
  },
});