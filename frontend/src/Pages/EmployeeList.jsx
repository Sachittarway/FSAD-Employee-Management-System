import React from "react";
import { Table, Tag, Space, Button, Avatar, Input, Dropdown,Modal } from "antd";
import "./EmployeeList.css";
import { Sidebar, Menu, MenuItem} from "react-pro-sidebar";
import {FilterOutlined,EditOutlined,DeleteOutlined,FolderViewOutlined} from "@ant-design/icons";
import { Link } from 'react-router-dom';
import { useState } from "react";

const items = [
  {
    label: "Submit and continue",
    key: "1",
  },
];
const EmployeeList = () => {
  const { Search } = Input;

  /* Table Columns!!! */ 
  const columns = [
    {
      title: "Employee ID",
      dataIndex: "empid",
      key: "empid",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Full Name",
      dataIndex: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Position",
      dataIndex: "position",
      key: "position",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role) => {
        let color;
    
        switch (role) {
          case "Manager":
            color = "blue";
            break;
          case "Admin":
            color = "volcano";
            break;
          case "User":
            color = "green";
            break;
          default:
            color = "default";
        }
    
        return <Tag color={color}>{role.toUpperCase()}</Tag>;
      }
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary"><FolderViewOutlined /></Button>
          <Button variant="outlined" color="danger"><EditOutlined /></Button>
          <Button variant="filled" color="danger"><DeleteOutlined /></Button>
        </Space>
      ),
    },
  ];

  /* Table Data!!!*/
  const data = [
    {
      empid: "1",
      name: "John Brown",
      position: "Software Developer",
      role: "Admin",
      email:"sachit.tarway@gmail.com"
    },
    {
      empid: "2",
      name: "Jim Green",
      position: "Software Developer",
      role: "Manager",
      email:"sachit.tarway@gmail.com"
    },
    {
      empid: "3",
      name: "Joe Black",
      position: "Software Developer",
      role: "User",
      email:"sachit.tarway@gmail.com"
    },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="employee-list">

      {/* Top Navbar Starts from here !!! */}
      <div className="top_navbar">
        <div className="left-div">
          <span className="brand_name">My App</span>
        </div>

        <div className="right-div">
        <Dropdown menu={{ items }} placement="bottomLeft">
          <Avatar size="large" src={<img src={"https://img.freepik.com/premium-photo/happy-man-ai-generated-portrait-user-profile_1119669-1.jpg"}></img> }/>
        </Dropdown>
        </div>
      </div>
      {/* Top Navbar Ends here !!! */}

      {/* Sidebar and Main Content Starts from here !!! */}
      <div className="employee-body">
        
        {/* Sidebar Starts from here !!! */}
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
              <MenuItem component={<Link to="/Dashboard" />}>Dashboard</MenuItem>
              <MenuItem active>Employee List</MenuItem>
              <MenuItem>Requests</MenuItem>
              <MenuItem component={<Link to="/MyDetails" />}>My Details </MenuItem>
            </Menu>
          </Sidebar>
        </div>
        {/* Sidebar Ends here !!! */}
        
        {/* Main content Starts here !!! */}
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
              <Button type="primary" className="add-employee" size="large" onClick={showModal}>
                Add Employee
              </Button>
            </div>
          </div>


          <div style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop:"20px",
                width: "100%",
              }}>
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
            </div>

            <div style={{
              display:"flex",
              justifyContent:"space-between",
              gap: "20px"
            }}>
              <div>
                <Dropdown menu={{ items }} placement="bottomLeft" arrow>
                  <Button size="large">
                  <FilterOutlined /> All Departments
                  </Button>
                </Dropdown>
              </div>

              <div>
                <Dropdown menu={{ items }} placement="bottomLeft" arrow>
                  <Button size="large">
                  <FilterOutlined /> Roles
                  </Button>
                </Dropdown>
              </div>

              <div>
                <Dropdown menu={{ items }} placement="bottomLeft" arrow>
                  <Button size="large">
                  <FilterOutlined /> Location
                  </Button>
                </Dropdown>
              </div>

            </div>
          </div>

          {/* Table Content Starts from here!!!!! */}
          <div style={{
            width:"100%",
            marginTop:"20px",
          }}>
          <Table 
            columns={columns} 
            dataSource={data} 
            className="custom-ant-table"
          />
          </div>
          
        </div>
        {/* Main content Ends here !!! */}


      </div>
      {/* Sidebar and Main Content Ends here !!! */}

      {/* Modal - Add Employee Starts here !!! */}
      <Modal
        title="Add Employee"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>

    </div>
  );
};

export default EmployeeList;
