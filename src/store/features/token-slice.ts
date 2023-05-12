import { createSlice } from "@reduxjs/toolkit";

const tokenSlice = createSlice({
  name: "token",
  initialState: {},
  reducers: {
    setToken(state, action) {
      return (state = action.payload);
    },
  },
});

export const { setToken } = tokenSlice.actions;
export default tokenSlice.reducer;
