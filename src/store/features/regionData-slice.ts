import { createSlice } from "@reduxjs/toolkit";

const regionsDataSlice = createSlice({
  name: "regionsData",
  initialState: [],
  reducers: {
    setRegionData(state, action) {
      return action.payload;
    },
  },
});

export const { setRegionData } = regionsDataSlice.actions;
export default regionsDataSlice.reducer;
