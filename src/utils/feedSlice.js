import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: null, // null
  reducers: {
    addFeed: (state, action) => action.payload,
    removeFeed: (state, action) =>
      state.filter((f) => f._id !== action.payload),
  },
});
export const { addFeed, removeFeed } = feedSlice.actions;
export default feedSlice.reducer;
