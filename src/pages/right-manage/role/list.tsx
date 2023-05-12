/*
 * @Author: Beau pg.beau@outlook.com
 * @Date: 2023-05-05 05:33:14
 * @LastEditors: Beau pg.beau@outlook.com
 * @LastEditTime: 2023-05-11 22:17:46
 * @FilePath: \workspace\news-system\src\pages\right-manage\role\list.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */
import { setRolesData } from "@/store/features/rolesData-slice";
import { DeleteOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { Button, Modal, Table, Tree, TreeProps } from "antd";
import { DataNode } from "antd/es/tree";
import { produce } from "immer";
import React, { Key, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const RoleList = () => {
  const dispatch = useDispatch();
  const rolesData = useSelector((state: any) => state.rolesData);
  const childrenData = useSelector((state: any) => state.childrenData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [onCheckedKeysId, setCheckedKeysId] = useState<number[]>([]);
  const [onCheckedKeysRights, setOnCheckedKeysRights] = useState<string[]>([]);
  const [onCheckedKeysIndex, setOnCheckedKeysIndex] = useState<number[]>([]);

  const showModal = (item: any) => {
    setIsModalOpen(true);
    setCheckedKeysId(item.id);
    setOnCheckedKeysIndex(rolesData.findIndex((i: any) => i.id === item.id));
    setOnCheckedKeysRights(item.rights);
  };

  const handleOk = () => {
    setIsModalOpen(false);

    const newRolesData = produce(rolesData, (draftState: any) => {
      draftState = draftState.map((item: any) => {
        if (item.id === onCheckedKeysId) {
          item.rights = onCheckedKeysRights;
        }
      });
    });

    dispatch(setRolesData(newRolesData));

    const fetchRolesData = async () => {
      await fetch(
        `https://news-system-b1045-default-rtdb.asia-southeast1.firebasedatabase.app/roles/${onCheckedKeysIndex}.json`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ rights: onCheckedKeysRights }),
        }
      );
    };
    fetchRolesData();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onSelect: TreeProps["onSelect"] = (selectedKeys, info) => {
    console.log("selected", selectedKeys, info);
  };

  const onCheck: TreeProps["onCheck"] = (checkedKeys: any, info) => {
    console.log("onCheck", checkedKeys, info);
    setOnCheckedKeysRights(checkedKeys.checked);
  };

  const treeData: DataNode[] = childrenData;

  const columns = [
    { title: "ID", dataIndex: "id" },
    { title: "角色名称", dataIndex: "roleName" },
    {
      title: "操作",
      render: (item: any) => {
        return (
          <div>
            <Button
              type="primary"
              shape="circle"
              icon={<UnorderedListOutlined />}
              style={{ marginRight: "0.5rem" }}
              onClick={showModal.bind(null, item)}
            ></Button>

            <Button
              type="primary"
              shape="circle"
              icon={<DeleteOutlined />}
              danger
            ></Button>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://news-system-b1045-default-rtdb.asia-southeast1.firebasedatabase.app/roles.json"
      );
      const data = await response.json();
      dispatch(setRolesData(data));
    };
    fetchData();
  }, []);

  return (
    <div>
      <Table
        dataSource={rolesData}
        columns={columns}
        rowKey={(item) => item.id}
      ></Table>

      <Modal
        title="权限分配"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Tree
          checkable
          // defaultExpandedKeys={["0-0-0", "0-0-1"]}
          // defaultSelectedKeys={["0-0-0", "0-0-1"]}
          checkedKeys={onCheckedKeysRights} // 选中复选框的树节点
          onSelect={onSelect} // 点击树节点触发
          onCheck={onCheck} // 点击复选框触发
          treeData={treeData}
          checkStrictly={true} // 父子节点选中状态不再关联
        />
      </Modal>
    </div>
  );
};

export default RoleList;
