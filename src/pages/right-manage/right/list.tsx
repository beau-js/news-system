import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import { Button, Modal, Popover, Switch, Table, Tag } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { produce } from "immer";
import { setChildrenData } from "@/store/features/ui/childrenData-slice";

const RightList = () => {
  const dispatch = useDispatch();
  const dataSource = useSelector((state: any) => state.childrenData);

  const { confirm } = Modal;

  const deleteMethod = (item: any) => {
    console.log(item);
    if (item.grade === 1) {
      //删除1级菜单
      dispatch(setChildrenData(dataSource.filter((i: any) => i !== item)));
    } else {
      const newData = produce(dataSource, (draftState: any) => {
        //删除2级菜单

        const parentIndex = draftState.findIndex(
          (i: any) => i.id === item.rightId
        );

        draftState[parentIndex].children = draftState[
          parentIndex
        ].children.filter((i: any) => i.id !== item.id);
      });

      dispatch(setChildrenData(newData));
    }
  };

  const showConfirm = (item: any) => {
    confirm({
      title: "您要删除这些项目吗？",
      icon: <ExclamationCircleFilled />,
      // content: "Some descriptions",
      onOk() {
        // console.log("OK");
        deleteMethod(item);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const switchChange = (item: any) => {
    const nextItem = produce(dataSource, (draftState: any) => {
      if (item.grade === 1) {
        //1级菜单
        const itemIndex = draftState.findIndex((i: any) => i.id === item.id);
        draftState[itemIndex].pagepermission =
          !draftState[itemIndex].pagepermission;
      } else {
        //2级菜单
        const parentIndex = dataSource.findIndex(
          (i: any) => i.id === item.rightId
        );

        const childIndex = draftState[parentIndex].children.findIndex(
          (i: any) => i.id === item.id
        );

        draftState[parentIndex].children[childIndex].pagepermission =
          !draftState[parentIndex].children[childIndex].pagepermission;
      }
    });
    dispatch(setChildrenData(nextItem));

    fetch(
      `https://news-system-b1045-default-rtdb.asia-southeast1.firebasedatabase.app/children.json`,
      {
        method: "PUT",
        body: JSON.stringify(nextItem),
      }
    );
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "权限名称",
      dataIndex: "title",
    },
    {
      title: "权限路径",
      dataIndex: "key",
      render: (key: string) => {
        return <Tag color="orange">{key}</Tag>;
      },
    },
    {
      title: "操作",
      render: (item: any) => {
        const content = (
          <div>
            <Switch
              checked={item.pagepermission}
              onChange={switchChange.bind(null, item)}
            />
          </div>
        );

        return (
          <div>
            <Popover
              content={content}
              title="Title"
              trigger={"click"}
            >
              <Button
                type="primary"
                shape="circle"
                icon={<EditOutlined />}
                style={{ marginRight: "0.5rem" }}
                // disabled={!item.pagepermission}
              ></Button>
            </Popover>

            <Button
              type="primary"
              shape="circle"
              icon={<DeleteOutlined />}
              danger
              onClick={showConfirm.bind(null, item)}
            ></Button>
          </div>
        );
      },
    },
  ];
  return (
    <div>
      <Table
        dataSource={dataSource}
        columns={columns}
        // loading={dataSource.length === 0}
      />
    </div>
  );
};

export default RightList;
