import React from "react";
import { Table, Tag, Space, Button, Avatar, Input, Dropdown } from "antd";
import "./EmployeeList.css";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { UserOutlined } from "@ant-design/icons";
const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Tags",
    key: "tags",
    dataIndex: "tags",
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? "geekblue" : "green";
          if (tag === "loser") {
            color = "volcano";
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"],
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sydney No. 1 Lake Park",
    tags: ["cool", "teacher"],
  },
];

const items = [
  {
    label: "Submit and continue",
    key: "1",
  },
];
const EmployeeList = () => {
  const { Search } = Input;
  return (
    <div className="employee-list">
      <div className="top_navbar">
        <div className="left-div">
          <span className="brand_name">My App</span>
        </div>

        <div className="right-div">
          <Avatar size="large" icon={<UserOutlined />} />
        </div>
      </div>
      <div className="employee-body">
        <div>
          <Sidebar
            rootStyles={{
              height: "100vh",
            }}
          >
            <Menu
              menuItemStyles={{
                button: ({ level, active, disabled }) => {
                  // only apply styles on first level elements of the tree
                  if (level === 0)
                    return {
                      color: disabled ? "#f5d9ff" : "black",
                      backgroundColor: active ? "#72a2ff" : undefined,
                    };
                },
              }}
            >
              <SubMenu label="Charts">
                <MenuItem> Pie charts </MenuItem>
                <MenuItem> Line charts </MenuItem>
              </SubMenu>
              <MenuItem> Documentation </MenuItem>
              <MenuItem active> Calendar </MenuItem>
            </Menu>
          </Sidebar>
        </div>
        <div className="employee-content">
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div className="hello">Employee List</div>
            <div>
              <Button type="primary" className="add-employee">
                Add Employee
              </Button>
            </div>
          </div>

          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Search
                placeholder="input search text"
                // onSearch={onSearch}
                size="large"
                enterButton
                style={{
                  width: 600,
                }}
              />
              <Dropdown.Button
                type="primary"
                size="large"
                menu={{ items }}
                style={{
                  marginLeft: "10px",
                }}
              >
                Filter
              </Dropdown.Button>
              <Dropdown menu={{ items }} placement="bottomLeft" arrow>
                <Button size="large">
                  bottomLeft
                  <Avatar icon={<UserOutlined />} />
                </Button>
              </Dropdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeList;
