import "./MyDetails.css";
import "./Dashboard.css"
import React from "react";
import { Avatar,Dropdown } from "antd";
import { Sidebar, Menu, MenuItem} from "react-pro-sidebar";
import { Link } from 'react-router-dom';

const MyDetails = () => {

    const items = [
        {
          label: "Submit and continue",
          key: "1",
        },
    ];

    return(
        <div className="mydetails">

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
                                    if (level === 0)
                                        return {
                                            color: disabled ? "#f5d9ff" : "black",
                                            backgroundColor: active ? "#72a2ff" : undefined,
                                        };
                                },
                            }}
                        >
                            <MenuItem component={<Link to="/Dashboard" />}>Dashboard</MenuItem>
                            <MenuItem component={<Link to="/EmployeeList" />}>Employee List</MenuItem>
                            <MenuItem>Requests</MenuItem>
                            <MenuItem active>My Details </MenuItem>
                        </Menu>
                    </Sidebar>
                </div>
                {/* Sidebar Ends here !!! */}
        
                {/* Main content Starts here !!! */}
                <div className="employee-content">
                   
                   {/* Start your from here !!!!!!! */}

                </div>
                {/* Main content Ends here !!! */}

            </div>
            {/* Sidebar and Main Content Ends here !!! */}
        </div>
    )
}
export default MyDetails;