import "./ResourceRequests.css";
import { Sidebar, Menu, MenuItem} from "react-pro-sidebar";
import { Link } from 'react-router-dom';
import { Table,Space, Button, Avatar,Dropdown,Tag,Input,Modal} from "antd";
import {FolderViewOutlined,} from "@ant-design/icons";
import { useAuth } from "../Auth/AuthContext";
import { useState } from "react";
const ResourceRequests = () => {
    const { user } = useAuth();
    const { Search } = Input;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [resourceRequests, setResourceRequests] = useState([]);
    const [resourceName, setResourceName] = useState("");
    const [message, setMessage] = useState("");
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
  
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
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
                            {
                                user.role === "USER" && (
                                    <>
                                        <MenuItem component={<Link to="/MyDetails" />}>My Details</MenuItem>
                                        <MenuItem active>
                                            My Requests
                                        </MenuItem>
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
                   <div
                    style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                    >
                        <div className="hello">Resource Requested 💡</div>
                    <div>
                        <Button type="primary" className="add-employee" size="large" onClick={showModal}>
                            Add Resource Request
                        </Button>
                    </div>
                    </div>
                    

                    <div className="resourcefilter" style={{
                        marginTop:"20px",
                    }}>
                        <Search
                            placeholder="input search text"
                            // onSearch={onSearch}
                            size="large"
                            enterButton
                            style={{
                                width: 600,
                            }}
                        />
                    </div>

                    <div style={{
                        width:"100%",
                        marginTop:"20px",
                    }}>
                        <Table 
                            columns={columns} 
                            dataSource={resourceRequests} 
                            className="custom-ant-table"
                        />
                    </div>

                </div>
                {/* Main content Ends here !!! */}

            </div>
            {/* Sidebar and Main Content Ends here !!! */}
            <Modal
                title="Resource Request"
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
               <div 
                style={{
                    marginTop:"20px",
                }}>
                    <label 
                        style={{
                            fontSize:"20px",
                            fontWeight:"bold",
                        }
                    }>
                        Resource Name
                    </label>
                    <Input size="large" placeholder="Resource Name"  
                        value={resourceName}
                        onChange={(e) => setResourceName(e.target.value)}
                    />
                </div>

                <div style={{
                    marginTop:"20px",
            }}>
                <label style={{
                    fontSize:"20px",
                    fontWeight:"bold",
                    }}
                >
                    Message
                </label>
                    <Input size="large" placeholder="Message" 
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                </div>
            </Modal>
        </div>
    )
}

export default ResourceRequests;