import "./ManagerDashboard.css"
import React from "react";
import { Avatar,Dropdown } from "antd";
import { Sidebar, Menu, MenuItem} from "react-pro-sidebar";
import {UserOutlined,BarChartOutlined,CheckCircleOutlined,ClockCircleOutlined} from "@ant-design/icons";
import { Link } from 'react-router-dom';

const CardItem = ({ title, value, icon, trend, onClick }) => (
    <div className="card" onClick={onClick}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span className="title">{title}</span>
        {icon}
      </div>
      <div className="value">{value}</div>
    </div>
);


const ManagerDashboard = () =>{
    const items = [
        {
          label: "Logout",
          key: "1",
          danger: true,
        },
    ];

    const cards = [
        {
          title: 'Team Size',
          value: 15,
          icon: <UserOutlined style={{ color: '#888' }} />,
        },
        {
            title: 'Total Managers',
            value: 15,
            icon: <UserOutlined style={{ color: '#888' }} />,
          },
        {
          title: 'All Requests',
          value: 3,
          icon: <BarChartOutlined style={{ color: '#888' }} />,
        },
        {
          title: 'Approved Requests',
          value: 10,
          icon: <CheckCircleOutlined style={{ color: '#888' }} />,
        },
        {
          title: 'Pending Requests',
          value: 25,
          icon: <ClockCircleOutlined style={{ color: '#888' }} />,
        }
    ];

    return(
        <div className="dashboard">

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
                            <MenuItem active>Dashboard</MenuItem>
                            <MenuItem component={<Link to="/EmployeeList" />}>Employee List</MenuItem>
                            <MenuItem component={<Link to="/TeamList" />}>Team List</MenuItem>
                            <MenuItem component={<Link to="/Resources" />}>Requests</MenuItem>
                            <MenuItem component={<Link to="/MyDetails" />}>My Details </MenuItem>
                        </Menu>
                    </Sidebar>
                </div>
                {/* Sidebar Ends here !!! */}
        
                {/* Main content Starts here !!! */}
                <div className="employee-content">
                    <div className="hello">Hi, Sachit Tarway 👋</div>

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

export default ManagerDashboard;