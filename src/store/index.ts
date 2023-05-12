/*
 * @Author: Beau pg.beau@outlook.com
 * @Date: 2023-05-05 06:20:16
 * @LastEditors: Beau pg.beau@outlook.com
 * @LastEditTime: 2023-05-09 13:05:34
 * @FilePath: \workspace\news-system\src\store\index.ts
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */

import { configureStore } from "@reduxjs/toolkit";
import collapsedReducer from "./features/ui/collapsed-slice";
import childrenDataReducer from "./features/ui/childrenData-slice";
import rolesDataReducer from "./features/rolesData-slice";
import usersDataReducer from "./features/usersData-slice";
import regionsDataReducer from "./features/regionData-slice";
import tokenSliceReducer from "./features/token-slice";

const store = configureStore({
  reducer: {
    collapsed: collapsedReducer,
    childrenData: childrenDataReducer,
    rolesData: rolesDataReducer,
    usersData: usersDataReducer,
    regionsData: regionsDataReducer,
    token: tokenSliceReducer,
  },
});

export default store;
