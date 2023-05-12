/*
 * @Author: Beau pg.beau@outlook.com
 * @Date: 2023-05-05 05:21:11
 * @LastEditors: Beau pg.beau@outlook.com
 * @LastEditTime: 2023-05-11 22:24:32
 * @FilePath: \workspace\news-system\src\pages\user-manage\list.tsx
 * @Description:
 *
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved.
 */

import { setUserData } from "@/store/features/usersData-slice";
import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { Button, Form, Popconfirm, Switch, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CollectionCreateForm from "@/components/ui/CollectionCreateForm";
import { produce } from "immer";

const UserList = () => {
  interface DataType {
    default: boolean;
    id: number;
    password: string;
    region: string;
    roleId: number;
    roleState: boolean;
    username: string;
  }
  const dispatch = useDispatch();
  const usersData: any = useSelector((state: any) => state.usersData);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<any>({});
  const [form] = Form.useForm();
  const regionsData: any = useSelector((state: any) => state.regionsData);
  const {
    roleId: localStorageRoleId,
    id: localStorageId,
    region,
  } = useSelector((state: any) => state.token);

  let userId = 0;
  const onClickEditHandler = (item: any) => {
    setFormData({ title: "更新用户", okText: "更新", type: updateUser });
    setOpen(true);
    form.setFieldsValue(item);

    userId = item.id;
    console.log("item", item);
  };

  const updateUser = async (values: any) => {
    console.log("Received values of form: ", values);

    const updateUserIndex = usersData.findIndex((i: any) => {
      return i.id === userId;
    });

    const response = await fetch(
      `https://news-system-b1045-default-rtdb.asia-southeast1.firebasedatabase.app/users/${updateUserIndex}.json`,
      {
        method: "PATCH",
        body: JSON.stringify(values),
      }
    );
    if (response.ok) {
    }
    setOpen(false);
  };

  const roleStateHandler = (item: any) => {
    console.log(item);
    const changeRoleStateIndex = usersData.findIndex(
      (i: any) => i.id === item.id
    );
    const nextState = produce(usersData, (draftData: any) => {
      draftData[changeRoleStateIndex].roleState =
        !draftData[changeRoleStateIndex].roleState;
    });

    fetch(
      "https://news-system-b1045-default-rtdb.asia-southeast1.firebasedatabase.app/users.json",
      { method: "PUT", body: JSON.stringify(nextState) }
    );
  };

  const deleteUserHandler = (item: any) => {
    console.log(item);
    const newUsersData = usersData.filter((user: any) => user.id !== item.id);
    // dispatch(setUserData(newUsersData));
    fetch(
      "https://news-system-b1045-default-rtdb.asia-southeast1.firebasedatabase.app/users.json",
      {
        method: "PUT",
        body: JSON.stringify(newUsersData),
      }
    );
  };

  const onCreate = (values: any) => {
    console.log("Received values of form: ", values);
    const newUsersData = usersData.concat({
      ...values,
      roleState: true,
      id: usersData.length + 1,
      default: false,
    });

    fetch(
      "https://news-system-b1045-default-rtdb.asia-southeast1.firebasedatabase.app/users.json",
      {
        method: "PUT",
        body: JSON.stringify(newUsersData),
      }
    );

    setOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://news-system-b1045-default-rtdb.asia-southeast1.firebasedatabase.app/users.json"
      );
      const data = await response.json();

      if (localStorageRoleId === 1) {
        const nextUsersData = produce(data, (draftData: any) => {
          draftData.map((item: any) => {
            if (item.roleId <= 1 && item.id !== localStorageId) {
              item.default = true;
            } else {
              item.default = false;
            }
          });
        });

        dispatch(setUserData(nextUsersData));
      }

      if (localStorageRoleId === 2) {
        const nextUsersData = produce(data, (draftData: any) => {
          draftData.map((item: any) => {
            if (item.roleId <= 2 && item.id !== localStorageId) {
              item.default = true;
            } else {
              item.default = false;
            }
          });
        });

        dispatch(setUserData(nextUsersData));
      }

      if (localStorageRoleId === 3) {
        const nextUsersData = produce(data, (draftData: any) => {
          draftData.map((item: any) => {
            if (item.roleId <= 3 && item.id !== localStorageId) {
              item.default = true;
            } else {
              item.default = false;
            }
          });
        });

        dispatch(setUserData(nextUsersData));
      }

      if (localStorageId === 1) {
        const nextUsersData = produce(data, (draftData: any) => {
          draftData.map((item: any) => {
            if (item.id !== 1) {
              item.default = false;
            }
          });
        });
        dispatch(setUserData(nextUsersData));
      }
    };
    fetchData();
  }, [usersData]);

  const columns: ColumnsType<DataType> = [
    {
      title: "区域",
      dataIndex: "region",
      filters: [
        ...regionsData.map((item: any) => {
          return { text: item.title, value: item.value };
        }),
        { text: "全球", value: "全球" },
      ],
      onFilter: (value: any, record: any) => {
        if (value === "全球") {
          return record.region === "全球";
        } else {
          return record.region === value;
        }
      },
      defaultFilteredValue: [region],

      render: (region: string) => {
        return <span>{region ? region : "全球"}</span>;
      },
    },
    {
      title: "角色名称",
      render: (item: any) => {
        return (
          <span>
            {item.roleId === 1
              ? "超级管理员"
              : item.roleId === 2
              ? "区域管理员"
              : "区域编辑"}
          </span>
        );
      },
    },
    {
      title: "用户名",
      dataIndex: "username",
    },
    {
      title: "用户状态",
      render: (item: any) => {
        return (
          <Switch
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            checked={item.roleState}
            disabled={item.default}
            onChange={roleStateHandler.bind(null, item)}
          />
        );
      },
    },
    {
      title: "操作",
      render: (item: any) => {
        return (
          <>
            <Button
              type="primary"
              shape="circle"
              icon={<UnorderedListOutlined />}
              style={{ marginRight: "0.5rem" }}
              onClick={onClickEditHandler.bind(null, item)}
              disabled={item.default}
            ></Button>

            <Popconfirm
              title="删除用户"
              description="您确定要删除此任务吗？"
              okText="确认"
              cancelText="取消"
              onConfirm={deleteUserHandler.bind(null, item)}
            >
              <Button
                type="primary"
                shape="circle"
                icon={<DeleteOutlined />}
                danger
                disabled={item.default}
              ></Button>
            </Popconfirm>
          </>
        );
      },
    },
  ];

  return (
    <>
      <Button
        type="primary"
        onClick={() => {
          setFormData({ title: "添加用户", okText: "创建", type: onCreate });
          setOpen(true);
          form.setFieldsValue({
            username: null,
            password: null,
            region: null,
            roleId: null,
          });
        }}
      >
        添加用户
      </Button>

      <CollectionCreateForm
        data={formData}
        form={form}
        // formValues={form.getFieldValue("roleId")}
        open={open}
        onCreate={formData.type}
        onCancel={() => {
          console.log("Cancel");

          setOpen(false);
        }}
      />

      <Table
        dataSource={usersData}
        columns={columns}
        rowKey={(record) => record.id}
        pagination={{ pageSize: 6 }}
      />
    </>
  );
};

export default UserList;
