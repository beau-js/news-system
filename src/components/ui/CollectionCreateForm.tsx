import { setRegionData } from "@/store/features/regionData-slice";
import { setRolesData } from "@/store/features/rolesData-slice";
import { Form, Input, Modal, Select } from "antd";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface Values {
  username: string;
  password: string;
  region: string;
  roleId: number;
}

interface CollectionCreateFormProps {
  open: boolean;
  data: any;
  // formValues: any;
  form: any;
  onCreate: (values: Values) => void;
  onCancel: () => void;
}

const CollectionCreateForm: React.FC<CollectionCreateFormProps> = ({
  open,
  onCreate,
  onCancel,
  data,
  // formValues,
  form,
}) => {
  // const [regionsData, setRegionsData] = useState<any[]>([]);

  // const [rolesData, setRolesData] = useState<any[]>([]);
  const [selectDisabled, setSelectDisabled] = useState<boolean>(false);
  const dispatch = useDispatch();
  const regionsData: any = useSelector((state: any) => state.regionsData);
  const rolesData: any = useSelector((state: any) => state.rolesData);
  const {
    roleId: localStorageRoleId,
    id: localStorageId,
    region: localStorageRegion,
  } = useSelector((state: any) => state.token);

  const handleChange = (value: number) => {
    console.log(`selected ${value}`, value);
    if (value === 1) {
      setSelectDisabled(true);
      form.setFieldsValue({ region: "全球" });
    } else {
      setSelectDisabled(false);
      // form.setFieldsValue({ region: null });
    }
  };

  useEffect(() => {
    const fetchRegionsData = async () => {
      const response = await fetch(
        "https://news-system-b1045-default-rtdb.asia-southeast1.firebasedatabase.app/regions.json"
      );
      const data = await response.json();
      dispatch(setRegionData(data));
    };
    fetchRegionsData();

    const fetchRolesData = async () => {
      const response = await fetch(
        "https://news-system-b1045-default-rtdb.asia-southeast1.firebasedatabase.app/roles.json"
      );
      const data = await response.json();
      dispatch(setRolesData(data));
    };
    fetchRolesData();
  }, []);

  return (
    <Modal
      open={open}
      title={data.title}
      okText={data.okText}
      cancelText="取消"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values: any) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info: any) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          modifier: "public",
          // region: "全球",
          // roleId: 1,
        }}
      >
        <Form.Item
          name="username"
          label="用户名"
          rules={[
            {
              required: true,
              message: "请输入用户名!",
            },
          ]}
        >
          <Input placeholder="请输入用户名" />
        </Form.Item>

        <Form.Item
          name="password"
          label="密码"
          rules={[
            {
              required: true,
              message: "请输入密码!",
            },
          ]}
        >
          <Input.Password placeholder="请输入密码" />
        </Form.Item>

        <Form.Item
          name="region"
          label="区域"
          rules={[
            {
              required: true,
              message: "请选择区域!",
            },
          ]}
        >
          <Select
            onChange={handleChange}
            disabled={selectDisabled}
            options={regionsData.map((item: any) => {
              return {
                value: item.title,
                label: item.title,
                disabled:
                  localStorageRoleId === 1
                    ? false
                    : item.title !== localStorageRegion,
              };
            })}
          />
        </Form.Item>

        <Form.Item
          name="roleId"
          label="角色"
          rules={[
            {
              required: true,
              message: "请输入角色名称!",
            },
          ]}
        >
          <Select
            onChange={handleChange}
            options={rolesData.map((item: any) => {
              return {
                value: item.id,
                label: item.roleName,
                disabled:
                  localStorageRoleId === 1
                    ? false
                    : item.id <= localStorageRoleId,
              };
            })}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CollectionCreateForm;
