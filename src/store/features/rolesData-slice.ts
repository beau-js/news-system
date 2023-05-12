import { createSlice } from "@reduxjs/toolkit";

const rolesDataSlice = createSlice({
  name: "rightData",
  initialState: [],
  reducers: {
    setRolesData(state, action) {
      return action.payload;
    },
  },
});

export const { setRolesData } = rolesDataSlice.actions;
export default rolesDataSlice.reducer;
