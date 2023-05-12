/*
 * @Author: Beau pg.beau@outlook.com
 * @Date: 2023-05-04 13:49:03
 * @LastEditors: Beau pg.beau@outlook.com
 * @LastEditTime: 2023-05-05 18:24:13
 * @FilePath: \workspace\news-system\src\components\Layout\Layout.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import SideMenu from "./SideMenu";
import TopHeader from "./TopHeader";
import React from "react";
import { Layout as AntdLayout, theme } from "antd";

const { Content } = AntdLayout;

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <AntdLayout>
      <SideMenu></SideMenu>

      <AntdLayout>
        <TopHeader></TopHeader>

        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            overflow: "auto",
            background: colorBgContainer,
          }}
        >
          {children}
        </Content>
      </AntdLayout>
    </AntdLayout>
  );
};

export default Layout;
