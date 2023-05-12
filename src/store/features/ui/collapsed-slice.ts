import { createSlice } from "@reduxjs/toolkit";

/*
 * @Author: Beau pg.beau@outlook.com
 * @Date: 2023-05-05 06:23:00
 * @LastEditors: Beau pg.beau@outlook.com
 * @LastEditTime: 2023-05-05 07:01:26
 * @FilePath: \workspace\news-system\src\store\features\ui\collapsed-slice.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
const collapsedSlice = createSlice({
  name: "collapsed",
  initialState: false,
  reducers: {
    setCollapsed(state) {
      return !state;
    },
  },
});

export const { setCollapsed } = collapsedSlice.actions;
export default collapsedSlice.reducer;
