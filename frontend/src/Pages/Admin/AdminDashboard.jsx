import "./AdminDashboard.css"
import { Avatar,Dropdown } from "antd";
import { Sidebar, Menu, MenuItem} from "react-pro-sidebar";
import {UserOutlined,BarChartOutlined,CheckCircleOutlined,ClockCircleOutlined} from "@ant-design/icons";
import { Link } from 'react-router-dom' ;
import React, { useEffect, useState } from 'react';

const CardItem = ({ title, value, icon, trend, onClick }) => (
    <div className="card" onClick={onClick}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span className="title">{title}</span>
        {icon}
      </div>
      <div className="value">{value}</div>
    </div>
);


const AdminDashboard = () =>{

    const [dashboardDetails, setDashboardDetails] = useState({
        employeeCount: 0,
        managerCount: 0,
        departmentCount: 0,
        totalRequestCount: 0,
        approvedRequestCount: 0,
        pendingRequestCount: 0
    });
    const [employeeName, setEmployeeName] = useState("");
    
    useEffect(() => {
        fetchDashboardDetails();
        fetchEmployeeName();
    }, []);

    const fetchDashboardDetails = async () => {
        try {
            const response = await fetch('http://localhost:8081/admin/dashboardCounts', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch dashboard details');
            }
            const data = await response.json();
            setDashboardDetails(data);
        } catch (error) {
            console.error('Error fetching dashboard details:', error);
        }
    };

    const fetchEmployeeName = async () => {
        console.log("Fetching employee name...");
        try {
            const response = await fetch('http://localhost:8081/common/getEmployeeName', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch employee name');
            }
            const data = await response.json();
            setEmployeeName(data.name);
        } catch (error) {
            console.error('Error fetching employee name:', error);
        }
    }

    const items = [
        {
          label: "Logout",
          key: "1",
          danger: true,
        },
    ];

    const cards = [
        {
          title: 'All Employees',
          value: dashboardDetails.employeeCount || 0,
          icon: <UserOutlined style={{ color: '#888' }} />,
        },
        {
            title: 'All Managers',
            value: dashboardDetails.managerCount || 0,
            icon: <UserOutlined style={{ color: '#888' }} />,
        },
        {
            title: 'All Departments',
            value: dashboardDetails.departmentCount || 0,
            icon: <BarChartOutlined style={{ color: '#888' }} />,
        },
        {
          title: 'All Requests',
          value: dashboardDetails.totalRequestCount || 0,
          icon: <BarChartOutlined style={{ color: '#888' }} />,
        },
        {
          title: 'Approved Requests',
          value: dashboardDetails.approvedRequestCount || 0,
          icon: <CheckCircleOutlined style={{ color: '#888' }} />,
        },
        {
          title: 'Pending Requests',
          value: dashboardDetails.pendingRequestCount || 0,
          icon: <ClockCircleOutlined style={{ color: '#888' }} />,
        }
    ];

    return(
        <div className="admindashboard">

            {/* Top Navbar Starts from here !!! */}
            <div className="top_navbar">
                <div className="left-div">
                    <span className="brand_name">ArtifexOne</span>
                </div>

                <div className="right-div">
                    {/* logout functionality */}
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
                            <MenuItem active>Dashboard</MenuItem>
                            <MenuItem component={<Link to="/Departments" />}>Departments</MenuItem>
                            <MenuItem component={<Link to="/EmployeeList" />}>Employee List</MenuItem>
                            <MenuItem component={<Link to="/Resources" />}>Requests</MenuItem>
                            <MenuItem component={<Link to="/MyDetails" />}>My Details </MenuItem>
                        </Menu>
                    </Sidebar>
                </div>
                {/* Sidebar Ends here !!! */}
        
                {/* Main content Starts here !!! */}
                <div className="employee-content">
                    <div className="hello">Hi, {employeeName} 👋</div>

                    <div style={{
                        width:"100%"
                    }}>
                        <div style={{ padding: '24px',minHeight: '100vh' }}>
                            <div
                                style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                                    gap: '16px',
                                }}
                            >
                                {cards.map((card, idx) => (
                                <CardItem key={idx} {...card} onClick={() => alert(`Clicked on ${card.title}`)} />
                                ))}
                            </div>
                        </div>
                    </div>
          
                </div>
                {/* Main content Ends here !!! */}

            </div>
            {/* Sidebar and Main Content Ends here !!! */}
        </div>
    )
}

export default AdminDashboard;