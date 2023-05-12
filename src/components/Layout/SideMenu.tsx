/*
 * @Author: Beau pg.beau@outlook.com
 * @Date: 2023-05-04 13:48:03
 * @LastEditors: Beau pg.beau@outlook.com
 * @LastEditTime: 2023-05-11 14:27:53
 * @FilePath: \workspace\news-system\src\components\Layout\SideMenu.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import React, { useEffect } from "react";
import {
  CheckCircleOutlined,
  CheckOutlined,
  ClockCircleOutlined,
  ControlOutlined,
  DeliveredProcedureOutlined,
  EditOutlined,
  FileProtectOutlined,
  FolderViewOutlined,
  GlobalOutlined,
  HddOutlined,
  HomeOutlined,
  IdcardOutlined,
  InfoOutlined,
  InteractionOutlined,
  MailOutlined,
  OrderedListOutlined,
  PieChartOutlined,
  ProfileOutlined,
  RedoOutlined,
  TeamOutlined,
  TwitterOutlined,
  UserAddOutlined,
  UserDeleteOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";
import { Layout, Menu, MenuProps, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { setChildrenData } from "@/store/features/ui/childrenData-slice";

const { Sider } = Layout;
type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const SideMenu = () => {
  const { rights } = useSelector((state: any) => state.token);

  const collapsed = useSelector((state: any) => state.collapsed);
  const router = useRouter();
  const dispatch = useDispatch();
  const childrenData = useSelector((state: any) => state.childrenData);

  useEffect(() => {
    const fetchData = async () => {
      const respose = await fetch(
        "https://news-system-b1045-default-rtdb.asia-southeast1.firebasedatabase.app/children.json"
      );
      const data = await respose.json();

      dispatch(setChildrenData(data));
    };
    fetchData();
  }, []);

  if (childrenData.length === 0) {
    return <div>loading...</div>;
  }

  const iconList = {
    "/": <HomeOutlined />,
    "/user-manage": <TeamOutlined />,
    "/user-manage/add": <UserAddOutlined />,
    "/user-manage/delete": <UserDeleteOutlined />,
    "/user-manage/update": <UserSwitchOutlined />,
    "/user-manage/list": <TeamOutlined />,
    "/right-manage": <FileProtectOutlined />,
    "/right-manage/role/list": <IdcardOutlined />,
    "/right-manage/right/list": <ControlOutlined />,
    "/right-manage/role/update": <UserSwitchOutlined />,
    "/right-manage/role/delete": <UserDeleteOutlined />,
    "/right-manage/right/update": <InteractionOutlined />,
    "/right-manage/right/delete": <DeliveredProcedureOutlined />,
    "/news-manage": <PieChartOutlined />,
    "/news-manage/list": <ProfileOutlined />,
    "/news-manage/add": <EditOutlined />,
    "/news-manage/update/:id": <RedoOutlined />,
    "/news-manage/preview/:id": <FolderViewOutlined />,
    "/news-manage/draft": <MailOutlined />,
    "/news-manage/category": <HddOutlined />,
    "/audit-manage": <CheckCircleOutlined />,
    "/audit-manage/audit": <ClockCircleOutlined />,
    "/audit-manage/list": <OrderedListOutlined />,
    "/publish-manage": <GlobalOutlined />,
    "/publish-manage/unpublished": <ClockCircleOutlined />,
    "/publish-manage/published": <CheckOutlined />,
    "/publish-manage/sunset": <InfoOutlined />,
  };

  const items: MenuProps["items"] = childrenData.map(
    (item: any) =>
      item.pagepermission &&
      rights.includes(item.key) &&
      getItem(
        item.title,
        item.key,
        iconList[item.key as keyof typeof iconList],
        item.children &&
          item.children.map(
            (i: any) =>
              i.pagepermission &&
              rights.includes(i.key) &&
              getItem(i.title, i.key, iconList[i.key as keyof typeof iconList])
          )
      )
  );

  const onClick: MenuProps["onClick"] = (e) => {
    // console.log("click ", e);
    router.push(e.key);
  };

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          overflow: "auto",
          height: "100vh",
        }}
      >
        <div className="logo">
          <Space>
            <TwitterOutlined />
            {collapsed || <span>新闻管理系统</span>}
          </Space>
        </div>
        <Menu
          theme="dark"
          onClick={onClick}
          defaultSelectedKeys={[router.pathname]}
          defaultOpenKeys={[`/${router.pathname.split("/")[1]}`]}
          mode="inline"
          items={items}
        />
      </div>
    </Sider>
  );
};

export default SideMenu;
