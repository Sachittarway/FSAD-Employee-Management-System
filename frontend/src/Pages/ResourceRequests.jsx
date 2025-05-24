import "./ResourceRequests.css";
import React from "react";
import { Sidebar, Menu, MenuItem} from "react-pro-sidebar";
import { Link } from 'react-router-dom';
import { Table,Space, Button, Avatar,Dropdown,Tag,Input,Select } from "antd";
import {FolderViewOutlined} from "@ant-design/icons";
import { useAuth } from "../Auth/AuthContext";
const ResourceRequests = () => {
    const { user } = useAuth();
    const { Search } = Input;
    const items = [
        {
          label: "Submit and continue",
          key: "1",
        },
    ];
      /* Table Columns!!! */ 
  const columns = [
    {
      title: "Employee ID",
      dataIndex: "empid",
      key: "empid",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Employee Name",
      dataIndex: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
        title: "Approver",
        dataIndex: "approver",
        key: "approver",
        render: (text) => <a>{text}</a>,
    },
    {
        title: "Resource",
        dataIndex: "resource",
        key: "resource",
        render: (resource) => {
            return <Tag color="volcano">{resource.toUpperCase()}</Tag>;
        }
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary"><FolderViewOutlined /></Button>
        </Space>
      ),
    },
  ];

  /* Table Data!!!*/
  const data = [
    {
      empid: "1",
      name: "John Brown",
      approver: "Ishan Sharma",
      email:"sachit.tarway@gmail.com",
      resource:"Laptop"
    },
    {
      empid: "2",
      name: "Jim Green",
      approver: "Ishan Sharma",
      email:"sachit.tarway@gmail.com",
      resource:"Laptop"
    },
    {
      empid: "3",
      name: "Joe Black",
      approver: "Ishan Sharma",
      email:"sachit.tarway@gmail.com",
      resource:"Laptop"
    },
  ];
  const onChange = value => {
    console.log(`selected ${value}`);
  };
  const onSearch = value => {
    console.log('search:', value);
  };
    return(
        <div className="resourcerequests">

            {/* Top Navbar Starts from here !!! */}
            <div className="top_navbar">
                <div className="left-div">
                    <span className="brand_name">My App</span>
                </div>

                <div className="right-div">
                    <Dropdown menu={{
                        items,
                        onClick: ({ key }) => {
                            if (key === "1") {
                                localStorage.removeItem("token");
                                localStorage.removeItem("user");
                                window.location.reload();
                            }
                        }
                    }} placement="bottomLeft">
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
                                    if (level === 0)
                                        return {
                                            color: disabled ? "#f5d9ff" : "black",
                                            backgroundColor: active ? "#72a2ff" : undefined,
                                        };
                                },
                            }}
                        >
                            {
                                user.role === "ADMIN" && (
                                    <>
                                        <MenuItem component={<Link to="/AdminDashboard" />}>Dashboard</MenuItem>
                                        <MenuItem component={<Link to="/Departments" />}>Departments</MenuItem>
                                        <MenuItem component={<Link to="/EmployeeList" />}>Employee List</MenuItem>
                                        <MenuItem active>Requests</MenuItem>
                                        <MenuItem component={<Link to="/MyDetails" />}>My Details</MenuItem>
                                    </>
                                )
                            }
                            {
                                user.role === "MANAGER" && (
                                    <>
                                        <MenuItem component={<Link to="/ManagerDashboard" />}>Dashboard</MenuItem>
                                        <MenuItem component={<Link to="/EmployeeList" />}>Employee List</MenuItem>
                                        <MenuItem component={<Link to ="/TeamList"/>}>Team List</MenuItem>
                                        <MenuItem active>Requests</MenuItem>
                                        <MenuItem component={<Link to="/MyDetails" />}>My Details </MenuItem>
                                    </>
                                              
                                )
                            }
                        </Menu>
                    </Sidebar>
                </div>
                {/* Sidebar Ends here !!! */}
        
                {/* Main content Starts here !!! */}
                <div className="employee-content">
                   
                   {/* Start your from here !!!!!!! */}
                    <div className="hello">Resource Requested 💡</div>

                    <div className="resourcefilter">
                        <Search
                            placeholder="input search text"
                            // onSearch={onSearch}
                            size="large"
                            enterButton
                            style={{
                                width: 600,
                            }}
                        />

                        <Select
                            showSearch
                            placeholder="Select a resource"
                            optionFilterProp="label"
                            onChange={onChange}
                            onSearch={onSearch}
                            size="large"
                            style={{
                                marginLeft:"10px"
                            }}
                            status="warning"
                            options={[
                                {
                                    value: 'laptop',
                                    label: 'Laptop',
                                },
                                {
                                    value: 'headphone',
                                    label: 'Headphone',
                                },
                                {
                                    value: 'keyboard',
                                    label: 'Keyboard',
                                },
                                
                            ]}
                        />
                    </div>

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
        </div>
    )
}

export default ResourceRequests;