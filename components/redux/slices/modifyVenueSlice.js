import { createSlice } from "@reduxjs/toolkit";


export const modifyVenueSlice = createSlice({
  name: "modifyVenue",
  initialState: {
    name: "",
    address: "",
    city: "",
    state: "",
    zip:"",
    id: null,
  },
  reducers: {
    modify_modifyVenue: (state, action) => {
      const { field, value } = action.payload;
      state[field] = value;
    },
    
  },
});

export const { modify_modifyVenue, reset_form} =
modifyVenueSlice.actions;

export default modifyVenueSlice.reducer;
