import { createSlice } from "@reduxjs/toolkit";

export const hashtagSlice = createSlice({
  name: "hashtag",
  initialState: {
    selectedHashtags: [],
  },
  reducers: {
    addHashtag: (state, action) => {
      const { field, value } = action.payload;
      state[field] = [...state[field], value];
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
  },
});

// Action creators are generated for each case reducer function
export const { addHashtag, removeHashtag } = hashtagSlice.actions;

export default hashtagSlice.reducer;