/*
 * @Author: Beau pg.beau@outlook.com
 * @Date: 2023-05-09 12:43:27
 * @LastEditors: Beau pg.beau@outlook.com
 * @LastEditTime: 2023-05-09 13:04:02
 * @FilePath: \workspace\news-system\src\store\features\usersData-slice.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { createSlice } from "@reduxjs/toolkit";

const usersDataSlice = createSlice({
  name: "usersData",
  initialState: [],
  reducers: {
    setUserData(state, action) {
      return action.payload;
    },
  },
});
export const { setUserData } = usersDataSlice.actions;
export default usersDataSlice.reducer;
