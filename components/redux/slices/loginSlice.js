import { createSlice } from '@reduxjs/toolkit';

export const loginSlice = createSlice({
  name: 'login_info',
  initialState: {
    // signup_method: '',
    // name: '',
    email: '',
    password: '',
    // photo: '',
  },
  reducers: {
    modify: (state, action) => {
      // Assuming action.payload contains the field to be updated and its value
      const { field, value } = action.payload;
      state[field] = value;
    },
  },
});

// Action creators are generated for each case reducer function
export const { modify } = loginSlice.actions;

export default loginSlice.reducer;