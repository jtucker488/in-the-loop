import { createSlice } from "@reduxjs/toolkit";


export const createVenueSlice = createSlice({
  name: "venue_info",
  initialState: {
    name: "",
    address: "",
    city: "",
    state: "",
    zip:"",
  },
  reducers: {
    modify_createVenue: (state, action) => {
      const { field, value } = action.payload;
      state[field] = value;
    },
 
    reset_form: (state) => {
      state.name=  "";
      state.address="";
      state.city="";
      state.state="";
      state.zip="";
    },

    
  },
});

export const { modify_createVenue, reset_form} =
createVenueSlice.actions;

export default createVenueSlice.reducer;
