import "./MyDetails.css";
import React from "react";
import { Avatar,Dropdown,Descriptions } from "antd";
import { Sidebar, Menu, MenuItem} from "react-pro-sidebar";
import { Link } from 'react-router-dom';
import { useAuth } from "../Auth/AuthContext";
import {  Button } from 'antd';
import axios from "axios";
import  { useEffect, useState } from "react";
import { FaPen, FaSave } from "react-icons/fa";


const MyDetails = () => {
    const { user } = useAuth();

    const items = [
        {
          label: "Submit and continue",
          key: "1",
        },
    ];
        
        const [isEditing, setIsEditing] = useState(false);
        const [password, setPassword] = useState("India"); // Masked actual value
        const [editedPassword, setEditedPassword] = useState(password);

        const handleEditClick = () => {
            setIsEditing(true);
        };

        const handleSaveClick = () => {
            setPassword(editedPassword);
            setIsEditing(false);
        };

        const role = "manager"; 

       

    // const [userDetails, setUserDetails] = useState(null);

    //     useEffect(() => {
    //     axios.get("http://localhost:8081/api/userdetails")
    //         .then((response) => {
    //         setUserDetails(response.data);
    //         })
    //         .catch((error) => {
    //         console.error("Error fetching user details:", error);
    //         });
    //     }, []);
        const [userDetails, setUserDetails] = useState({
            employeeName: "Ritika Sharma",
            phoneNumber: "+91 9876543210",
            yearsOfExperience: "3.5",
            currentIbu: "SAP IBU",

            employeeNumber: "EMP102938",
            projectCode: "SAPPROJ2024",
            currentLocation: "Bangalore",

            permanentAddress: "123 MG Road, New Delhi, India",
            localAddress: "Flat 502, Whitefield Residency, Bangalore",
            passportNo: "N8765432",
            passportOffice: "Delhi",
            passportIssueDate: "2019-04-15",
            passportExpiryDate: "2029-04-14",
            previousJobs: [
                {
                    organizationName: "Tata Consultancy Services",
                    duration: "Jan 2020 - Mar 2022",
                    designation: "Software Developer",
                    description: "Worked on enterprise-grade SAP solutions for international clients."
                },
                {
                    organizationName: "Infosys Ltd",
                    duration: "Apr 2022 - Jul 2023",
                    designation: "Full Stack Developer",
                    description: "Built and maintained web applications using React and Node.js."
                }
                ]
            }
        );

          const [editFields, setEditFields] = useState({
        currentIbu: false,
        currentLocation: false,
        projectCode: false
    });

    const [editedValues, setEditedValues] = useState({
        currentIbu: userDetails.currentIbu,
        currentLocation: userDetails.currentLocation,
        projectCode: userDetails.projectCode
    });

    const handleFieldsEditClick = (field) => {
        setEditFields(prev => ({ ...prev, [field]: true }));
    };

    const handlFieldseSaveClick = (field) => {
        setUserDetails(prev => ({ ...prev, [field]: editedValues[field] }));
        setEditFields(prev => ({ ...prev, [field]: false }));
    };


    
       
            

    const items1 = [
        {
          key: '1',
          label: 'UserName',
          children: 'Zhou Maomao',
        },
        {
          key: '2',
          label: 'Telephone',
          children: '1810000000',
        },
        {
          key: '3',
          label: 'Live',
          children: 'Hangzhou, Zhejiang',
        },
        {
          key: '4',
          label: 'Remark',
          children: 'empty',
        },
        {
          key: '5',
          label: 'Address',
          children: 'No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China',
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
                            {
                                user.role === "ADMIN" && (
                                    <>
                                        <MenuItem component={<Link to="/AdminDashboard" />}>Dashboard</MenuItem>
                                        <MenuItem>Departments</MenuItem>
                                        <MenuItem component={<Link to="/EmployeeList" />}>Employee List</MenuItem>
                                        <MenuItem component={<Link to="/Resources" />}>Requests</MenuItem>
                                        <MenuItem active>My Details</MenuItem>
                                    </>
                                )
                            }
                            {
                                user.role === "MANAGER" && (
                                    <>
                                        <MenuItem component={<Link to="/ManagerDashboard" />}>Dashboard</MenuItem>
                                        <MenuItem component={<Link to="/EmployeeList" />}>Employee List</MenuItem>
                                        <MenuItem>Team List</MenuItem>
                                        <MenuItem component={<Link to="/Resources" />}>Requests</MenuItem>
                                        <MenuItem active>My Details </MenuItem>
                                    </>
                                )
                            }
                        </Menu>
                    </Sidebar>
                </div>
                {/* Sidebar Ends here !!! */}
        
                {/* Main content Starts here !!! */}
                <div className="employee-content">
                      <div style={{
                            // backgroundColor: "white",
                            padding: "20px",
                            borderRadius: "10px",
                            width: "100%",
                            boxSizing: "border-box",
                            marginBottom: "20px",
                            }}>
                     <div style={{
                        display: "flex",
                        flexWrap: "wrap", //  allows wrapping on smaller screens
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: "10px", //  adds spacing if wrapped
                      }}
                    >
                        {/* <div className="hello">Employee List</div> */}
                        <div style={{
                                        alignItems:"center"
                                    }}>
                                    <h2>{userDetails?.employeeName}</h2>
                                    <p>Team Manager</p>
                        </div>
                        <div>
                        <Button type="primary" className="add-employee" size="large" >
                            Edit Profile
                        </Button>
                        </div>
                    </div>
                    </div>


               


                    <div style={{
                            backgroundColor: "white",
                            padding: "20px",
                            borderRadius: "10px",
                            width: "100%",
                            boxSizing: "border-box",
                            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                             marginBottom: "20px",
                        }}
                    >
                         <div style={{
                                    textAlign: "center",
                                    fontSize: "20px",
                                    fontWeight: "bold",
                                    marginBottom: "20px",
                                    }}>Personal Information</div>
                        <div style={{
                            display: "flex",
                            flexWrap: "wrap", //  allows wrapping on smaller screens
                            justifyContent: "space-between",
                            alignItems: "center",
                            gap: "10px"    
                            }}
                            >
                                
                           
                           <div className="user-section" >
                            <p><span className="label">Name: </span>{userDetails?.employeeName}</p>
                            <p><span className="label">Phone: </span>{userDetails?.phoneNumber}</p>
                            </div>
                            <div className="user-section">
                             <p><span className="label">Years of Experience: </span>{userDetails?.yearsOfExperience}</p>
                            <p><span className="label">Current IBU: </span>
                             {role === "manager" || role === "admin" ? (
                                        editFields.currentIbu ? (
                                            <>
                                                <input
                                                    type="text"
                                                    value={editedValues.currentIbu}
                                                    onChange={(e) =>
                                                        setEditedValues(prev => ({ ...prev, currentIbu: e.target.value }))
                                                    }
                                                />
                                                <FaSave
                                                    onClick={() => handlFieldseSaveClick("currentIbu")}
                                                    style={{ marginLeft: "8px", cursor: "pointer", color: "green" }}
                                                    title="Save Current IBU"
                                                />
                                            </>
                                        ) : (
                                            <>
                                                {userDetails.currentIbu}
                                                <FaPen
                                                    onClick={() => handleFieldsEditClick("currentIbu")}
                                                    style={{ marginLeft: "8px", cursor: "pointer" }}
                                                    title="Edit Current IBU"
                                                />
                                            </>
                                        )
                                    ) : (
                                        userDetails.currentIbu
                                    )}
                            </p>
                            </div>
                             <div className="user-section right-align">
                            <p>
                                <span className="label">Password: </span>
                                {role === "user" && isEditing ? (
                                    <>
                                        <input
                                        type="text"
                                        value={editedPassword}
                                        onChange={(e) => setEditedPassword(e.target.value)}
                                        style={{ marginRight: "5px" }}
                                        />
                                        <FaSave
                                        onClick={handleSaveClick}
                                        style={{ cursor: "pointer", color: "green" }}
                                        title="Save"
                                        />
                                    </>
                                    ) : (
                                    <>
                                        {"•".repeat(password.length)}
                                        {role === "user" && (
                                        <FaPen
                                            onClick={handleEditClick}
                                            style={{ marginLeft: "10px", cursor: "pointer" }}
                                            title="Edit Password"
                                        />
                                        )}
                                    </>
                                    )}
                            </p>
                            </div>
                      
                        </div>
                   </div>

                   <div style={{
                            backgroundColor: "white",
                            padding: "20px",
                            borderRadius: "10px",
                            width: "100%",
                            boxSizing: "border-box",
                            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                             marginBottom: "20px",
                        }}
                    >
                         <div style={{
                                    textAlign: "center",
                                    fontSize: "20px",
                                    fontWeight: "bold",
                                    marginBottom: "20px",
                                    }}>Employment Details</div>
                        <div style={{
                            display: "flex",
                            flexWrap: "wrap", //  allows wrapping on smaller screens
                            justifyContent: "space-between",
                            alignItems: "center",
                            gap: "10px"    
                            }}
                            >
                                
                            
                           <div className="user-section" >
                             <p><span className="label">Employee Number: </span>{userDetails?.employeeNumber}</p>
                            <p><span className="label">Project Code: </span>
                            {role === "manager" || role === "admin" ? (
                                        editFields.projectCode ? (
                                            <>
                                                <input
                                                    type="text"
                                                    value={editedValues.projectCode}
                                                    onChange={(e) =>
                                                        setEditedValues(prev => ({ ...prev, projectCode: e.target.value }))
                                                    }
                                                />
                                                <FaSave
                                                    onClick={() => handlFieldseSaveClick("projectCode")}
                                                    style={{ marginLeft: "8px", cursor: "pointer", color: "green" }}
                                                    title="Save Project Code"
                                                />
                                            </>
                                        ) : (
                                            <>
                                                {userDetails.projectCode}
                                                <FaPen
                                                    onClick={() => handleFieldsEditClick("projectCode")}
                                                    style={{ marginLeft: "8px", cursor: "pointer" }}
                                                    title="Edit Project Code"
                                                />
                                            </>
                                        )
                                    ) : (
                                        userDetails.projectCode
                                    )}
                            
                            
                            </p>
                            </div>
                            <div className="user-section">
                            <p><span className="label">Current Location: </span>
                            {role === "manager" || role === "admin" ? (
                                        editFields.currentLocation ? (
                                            <>
                                                <input
                                                    type="text"
                                                    value={editedValues.currentLocation}
                                                    onChange={(e) =>
                                                        setEditedValues(prev => ({ ...prev, currentLocation: e.target.value }))
                                                    }
                                                />
                                                <FaSave
                                                    onClick={() => handlFieldseSaveClick("currentLocation")}
                                                    style={{ marginLeft: "8px", cursor: "pointer", color: "green" }}
                                                    title="Save Current Location"
                                                />
                                            </>
                                        ) : (
                                            <>
                                                {userDetails.currentLocation}
                                                <FaPen
                                                    onClick={() => handleFieldsEditClick("currentLocation")}
                                                    style={{ marginLeft: "8px", cursor: "pointer" }}
                                                    title="Edit Current Location"
                                                />
                                            </>
                                        )
                                    ) : (
                                        userDetails.currentLocation
                                    )}
                            
                            
                            </p>
                            </div>
                            <div className="user-section right-align">
                            <p><span className="label">Live：</span>India</p>
                            </div>
                     
                        </div>
                   </div>
                 

                 <div style={{
                            backgroundColor: "white",
                            padding: "20px",
                            borderRadius: "10px",
                            width: "100%",
                            boxSizing: "border-box",
                            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                             marginBottom: "20px",
                        }}
                    >
                           <div style={{
                                    textAlign: "center",
                                    fontSize: "20px",
                                    fontWeight: "bold",
                                    marginBottom: "20px",
                                    }}>Primary Address & Passport Details</div>
                        <div style={{
                            display: "flex",
                            flexWrap: "wrap", //  allows wrapping on smaller screens
                            justifyContent: "space-between",
                            alignItems: "center",
                            gap: "10px"    
                            }}
                            >
                                
                         
                           <div className="user-section" >
                            <p><span className="label">Permanent Address: </span>{userDetails?.permanentAddress}</p>
                            <p><span className="label">Local Address: </span>{userDetails?.localAddress}</p>
                            </div>
                            <div className="user-section">
                            <p><span className="label">Passport No: </span>{userDetails?.passportNo}</p>
                            <p><span className="label">Passport Office: </span>{userDetails?.passportOffice}</p>
                            </div>
                            <div className="user-section right-align">
                            <p><span className="label">Issue Date: </span>{userDetails?.passportIssueDate}</p>
                            <p><span className="label">Expiry Date: </span>{userDetails?.passportExpiryDate}</p>
                            </div>
                     
                        </div>
                   </div>

                    <div style={{
                            backgroundColor: "white",
                            padding: "20px",
                            borderRadius: "10px",
                            width: "100%",
                            boxSizing: "border-box",
                            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                             marginBottom: "20px",
                        }}
                    >
                           <div style={{
                                    textAlign: "center",
                                    fontSize: "20px",
                                    fontWeight: "bold",
                                    marginBottom: "20px",
                                    }}>Previous Job Information</div>
                                     <div style={{
                                         display: "flex",
                                         flexWrap: "wrap", //  allows wrapping on smaller screens
                                         justifyContent: "space-between",
                                         alignItems: "center",
                                         gap: "10px"    
                                        }}
                                    >          
                                {userDetails?.previousJobs?.map((job, index) => (
                                <div key={index} style={{
                                    border: "1px solid #ddd",
                                    borderRadius: "8px",
                                    padding: "15px",
                                    backgroundColor: "#fafafa"
                                }}>
                                    <p><strong>Organization:</strong> {job.organizationName}</p>
                                    <p><strong>Duration:</strong> {job.duration}</p>
                                    <p><strong>Designation:</strong> {job.designation}</p>
                                    <p><strong>Description:</strong> {job.description}</p>
                                </div>
                                ))}
                                                
                     </div>
                   </div>



                 
                  
                           
                   
                   {/* Start your from here !!!!!!! */}
                   


                </div>
                {/* Main content Ends here !!! */}

            </div>
            {/* Sidebar and Main Content Ends here !!! */}
        </div>
    )
}
export default MyDetails;