/*
 * @Author: Beau pg.beau@outlook.com
 * @Date: 2023-05-05 07:26:37
 * @LastEditors: Beau pg.beau@outlook.com
 * @LastEditTime: 2023-05-11 15:33:20
 * @FilePath: \workspace\news-system\src\components\ui\AntdDropdown.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import React, { useEffect, useState } from "react";
import type { MenuProps } from "antd";
import { Dropdown, Space } from "antd";
import Antd_Avatar from "./Antd_Avatar";
import router from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "@/store/features/token-slice";

const AntdDropdown = () => {
  const { roleName, username } = useSelector((state: any) => state.token);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token")!);
    dispatch(setToken(token));
  }, []);

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          {roleName}
        </a>
      ),
    },

    {
      key: "4",
      danger: true,
      label: "退出登录",
      onClick: () => {
        console.log("退出登录");
        localStorage.removeItem("token");
        router.push("/login");
      },
    },
  ];

  return (
    <Dropdown menu={{ items }}>
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          <span style={{ color: "black" }}>欢迎</span>
          {username}
          <span style={{ color: "black" }}>回来</span>
          <Antd_Avatar></Antd_Avatar>
        </Space>
      </a>
    </Dropdown>
  );
};

export default AntdDropdown;

export async function getServerSideProps() {
  // 在服务器端获取数据
  const data = "some data";
  return { props: { data } };
}
