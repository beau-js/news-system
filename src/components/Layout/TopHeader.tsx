/*
 * @Author: Beau pg.beau@outlook.com
 * @Date: 2023-05-04 13:48:18
 * @LastEditors: Beau pg.beau@outlook.com
 * @LastEditTime: 2023-05-05 07:45:55
 * @FilePath: \workspace\news-system\src\components\Layout\TopHeader.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import React from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Button, theme } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setCollapsed } from "@/store/features/ui/collapsed-slice";
import AntdDropdown from "../ui/AntdDropdown";

const { Header } = Layout;

const TopHeader = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const dispatch = useDispatch();
  const collapsed = useSelector((state: any) => state.collapsed);

  return (
    <Header style={{ padding: 0, background: colorBgContainer }}>
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => dispatch(setCollapsed())}
        style={{
          fontSize: "16px",
          width: 64,
          height: 64,
        }}
      />
      <AntdDropdown></AntdDropdown>
    </Header>
  );
};

export default TopHeader;
