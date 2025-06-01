import "./ResourceRequests.css";
import { Sidebar, Menu, MenuItem} from "react-pro-sidebar";
import { Link } from 'react-router-dom';
import { Table,Space, Button, Avatar,Dropdown,Tag,Input,Modal} from "antd";
import {CheckOutlined} from "@ant-design/icons";
import { useAuth } from "../Auth/AuthContext";
import { useEffect, useState } from "react";
import { notification } from "antd";

const ResourceRequests = () => {
    const { user } = useAuth();
    const { Search } = Input;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [resourceRequests, setResourceRequests] = useState([]);
    const [isModalConfirmOpen, setIsModalConfirmOpen] = useState(false);
    const [confirmStatusRecord, setConfirmStatusRecord] = useState([]);
    const [resourceItem, setResourceItem] = useState({
        item: "",
        message: "",
    });
    const [api, contextHolder] = notification.useNotification();
    const openNotification = (pauseOnHover, type, message, description) => () => {
    api.open({
      message,
      description,
      showProgress: true,
      pauseOnHover,
      type,
    });
  };

  useEffect(() => {
    fetchResourceRequests();
  }, []);
    
  const fetchResourceRequests = async () => {
    if(user.role === "USER") {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/resourceRequests`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            if (response.ok) {
                const data = await response.json();
                setResourceRequests(data);
            } else {
                openNotification(true, "error", "Failed to fetch resource requests", "Please try again later.");
            }
        } catch (error) {
            openNotification(true, "error", "Error", "An error occurred while fetching resource requests. Please try again later.");
        }
    }
    else if(user.role === "MANAGER"){
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}manager/resourceRequests`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            if (response.ok) {
                const data = await response.json();
                setResourceRequests(data);
            } else {
                openNotification(true, "error", "Failed to fetch resource requests", "Please try again later.");
            }
        } catch (error) {
            openNotification(true, "error", "Error", "An error occurred while fetching resource requests. Please try again later.");
        }
    }
    else{
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}admin/resourceRequests`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            if (response.ok) {
                const data = await response.json();
                setResourceRequests(data);
            } else {
                openNotification(true, "error", "Failed to fetch resource requests", "Please try again later.");
            }
        } catch (error) {
            openNotification(true, "error", "Error", "An error occurred while fetching resource requests. Please try again later.");
        }
    }
  };

    const items = [
    {
      label: "Logout",
      key: "1",
      danger: true,
    },
  ];
      /* Table Columns!!! */ 
const columns = [
    {
        title: "Resource ID",
        dataIndex: "id",
        key: "id",
        render: (text) => <a>{text}</a>,
    },
    {
        title: "Email",
        dataIndex: "employeeEmail",
        key: "employeeEmail",
    },
    {
            title: "Approver",
            dataIndex: "managerEmail",
            key: "managerEmail",
            render: (text) => <a>{text}</a>,
    },
    {
            title: "Resource",
            dataIndex: "item",
            key: "item",
            render: (resource) => {
                    return <Tag color="volcano">{resource?.toUpperCase()}</Tag>;
            }
    },
    {
        title: "Status",
        dataIndex: "accept",
        render: (boolean) => <a>{boolean ? "Accepted" : "Awaiting"}</a>,
    },
    {
            title: "Message",
            dataIndex: "message",
            key: "message",
            render: (text) => <span>{text}</span>,
    },
    ...(user.role === "MANAGER"
        ? [
                {
                    title: "Action",
                    key: "action",
                    render: (_, record) => (
                        <Space size="middle">
                            <Button type="primary" onClick={() => {
                                setConfirmStatusRecord(record);
                                setIsModalConfirmOpen(true);
                            }}
                            disabled={
                                record.accept === true
                            }><CheckOutlined /></Button>
                        </Space>
                    ),
                },
            ]
        : []),
];
console.log("Resource Requests:", confirmStatusRecord);
  
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = async () => {
    if(!resourceItem.item || !resourceItem.message) {
        alert("Please fill all the fields");
        return;
    }
    try{
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}user/createResourceRequest`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({
                item: resourceItem.item,
                message: resourceItem.message,
            }),
        });
        if (response.ok) {
            const data = await response.json();
            setIsModalOpen(false);
            fetchResourceRequests();
            openNotification(true, "success", "Resource request added successfully", "Your resource request has been submitted successfully.");
            setResourceItem({ item: "", message: "" });
        } else {
            openNotification(true, "error", "Failed to add resource request", "Please try again later.");
        }
    }
    catch (error) {
        openNotification(true, "error", "Error", "An error occurred while adding the resource request. Please try again later.");
    }
  };
  const handleCancel = () => {
    setResourceItem({ item: "", message: "" });
    setIsModalOpen(false);
  };

    const handleConfirmOk = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}manager/resourceRequest/${confirmStatusRecord.id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            if (response.ok) {
                const data = await response.json();
                fetchResourceRequests();
                setIsModalConfirmOpen(false);
                openNotification(true, "success", "Resource request accepted", "The resource request has been accepted successfully.");
            } else {
                openNotification(true, "error", "Failed to fetch resource requests", "Please try again later.");
            }
        } catch (error) {
            openNotification(true, "error", "Error", "An error occurred while fetching resource requests. Please try again later.");
        }
    }
    
    const handleConfirmCancel = () => {
        setIsModalConfirmOpen(false);
    };


    return(
        <div className="resourcerequests">
            {contextHolder}

            {/* Top Navbar Starts from here !!! */}
            <div className="top_navbar">
                <div className="left-div">
                    <span className="brand_name">ArtifexOne</span>
                </div>

                <div className="right-div">
                    <Dropdown
                                menu={{
                                  items,
                                  onClick: ({ key }) => {
                                    if (key === "1") {
                                      localStorage.removeItem("token");
                                      localStorage.removeItem("user");
                                      window.location.reload();
                                    }
                                  },
                                }}
                                placement="bottomLeft"
                              >
                                <Avatar
                                  size="large"
                                  src={
                                    <img
                                      src={
                                        "https://img.freepik.com/premium-photo/happy-man-ai-generated-portrait-user-profile_1119669-1.jpg"
                                      }
                                    ></img>
                                  }
                                />
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
                        {
                            user.role === "USER" &&(
                                <Button type="primary" className="add-employee" size="large" onClick={showModal}>
                                    Add Resource Request
                                </Button>
                            )
                        }
                    </div>
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
                        value={resourceItem.item}
                        onChange={(e) => setResourceItem({ ...resourceItem, item: e.target.value })}
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
                        value={resourceItem.message}
                        onChange={(e) => setResourceItem({ ...resourceItem, message: e.target.value })}
                    />
                </div>
            </Modal>

            <Modal
                title="Resource Request Confirmation"
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={isModalConfirmOpen}
                onOk={handleConfirmOk}
                onCancel={handleConfirmCancel}
            >
                <p>Are you sure you want to accept this resource request?</p>
            </Modal>
        </div>
    )
}

export default ResourceRequests;