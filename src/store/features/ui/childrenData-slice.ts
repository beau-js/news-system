/*
 * @Author: Beau pg.beau@outlook.com
 * @Date: 2023-05-05 11:11:21
 * @LastEditors: Beau pg.beau@outlook.com
 * @LastEditTime: 2023-05-08 17:42:11
 * @FilePath: \workspace\news-system\src\store\features\ui\childrenData-slice.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { createSlice } from "@reduxjs/toolkit";

const childrenDataSlice = createSlice({
  name: "sideMenu",
  initialState: [],
  reducers: {
    setChildrenData(state, action) {
      return (state = action.payload);
    },
  },
});

export const { setChildrenData } = childrenDataSlice.actions;
export default childrenDataSlice.reducer;
