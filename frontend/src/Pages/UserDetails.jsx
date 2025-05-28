import "./UserDetails.css";
import React from "react";
import { Avatar,Dropdown } from "antd";
import { Sidebar, Menu, MenuItem} from "react-pro-sidebar";
import { Link } from 'react-router-dom';
import { useAuth } from "../Auth/AuthContext";
import {  Button , Input, Space} from 'antd';

import  { useEffect, useState } from "react";
import { FaPen, FaSave } from "react-icons/fa";


const UserDetails = () => {
     const { user } = useAuth();
        const role = user.role;
            const items = [
                {
                label: "Logout",
                key: "1",
                danger: true,
                },
            ];
            
            
      const [userDetails, setUserDetails] = useState(null);
      const [editMode, setEditMode] = useState(false);
      const [editValues, setEditValues] = useState({});
      const [isEditing, setIsEditing] = useState(false); // For password editing
      const [password, setPassword] = useState("India");
      const [editedPassword, setEditedPassword] = useState(password);
    
      // Fetch user details once on mount
      useEffect(() => {
       const fetchUserDetails = async () => {
          try {
            const response = await fetch(
              "http://localhost:8081/common/getEmployeeDetailsByEmail",
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }
            );
    
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
    
            const data = await response.json();
            setUserDetails(data);
          } catch (error) {
            console.error("Error fetching user details:", error);
          }
        };
    
        fetchUserDetails();
      }, []);
    
    
      // Initialize editValues when userDetails changes
      useEffect(() => {
        if (userDetails) {
          setEditValues({
            phoneNumber: userDetails.phoneNumber || "",
            yearsOfExperience: userDetails.yearsOfExperience || 0,
            permanentAddress: userDetails.permanentAddress || "",
            localAddress: userDetails.localAddress || "",
            passportNo: userDetails.passportNo || "",
            passportOffice: userDetails.passportOffice || "",
            passportIssueDate: userDetails.passportIssueDate || "",
            passportExpiryDate: userDetails.passportExpiryDate || "",
            employeeNumber: userDetails.employeeNumber || "",
            currentLocation: userDetails.currentLocation || "",
            // add other fields as needed
          });
        }
      }, [userDetails]);
    
      // Handlers
    
      const handleEditClick = () => {
        setIsEditing(true);
      };
    
      const handleSaveClick = () => {
        setPassword(editedPassword);
        setIsEditing(false);
      };
    
      const handleEditProfileClick = async () => {
        if (editMode) {
          // Save mode - PUT updated details to backend
          fetch("http://localhost:8081/common/updateDetails", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify(editValues),
          })
            .then((res) => {
              if (!res.ok) throw new Error("Failed to update");
              return res.json();
            })
            .then((updatedData) => {
              setUserDetails((prev) => ({ ...prev, ...editValues }));
              setEditMode(false);
              console.log("Update successful:", updatedData);
            })
            .catch((error) => {
              console.error("Update error:", error);
              alert("Failed to update details.");
            });
        } else {
          // Enter edit mode
          setEditMode(true);
        }
      };
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditValues((prev) => ({ ...prev, [name]: value }));
      };
      
        // const[editMode, setEditMode] = useState(null);
        // const [editValues, setEditValues] = useState({
        //         currentIbu: userDetails.currentIbu,
        //         currentLocation: userDetails.currentLocation,
        //         projectCode: userDetails.projectCode,
        //     });

        //     const handleEditProfileClick = () => {
        //         if (editMode) {
        //         setUserDetails(prev => ({ ...prev, ...editValues }));
        //         setEditMode(false);
        //         } else if (role === "MANAGER" || role === "ADMIN") {
        //         setEditMode(true);
        //         }
        //     };

        //         const handleInputChange = (e) => {
        //         const { name, value } = e.target;
        //         setEditValues(prev => ({ ...prev, [name]: value }));
        //     };


    
       
            

    

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
                                         <MenuItem component={<Link to="/Departments" />} >Departments</MenuItem>
                                        <MenuItem active > Employee List</MenuItem>
                                        <MenuItem component={<Link to="/Resources" />}>Requests</MenuItem>
                                         <MenuItem component={<Link to="/MyDetails" />}>My Details</MenuItem>

                                    </>
                                )
                            }
                            {
                                user.role === "MANAGER" && (
                                    <>
                                        <MenuItem component={<Link to="/ManagerDashboard" />}>Dashboard</MenuItem>
                                        <MenuItem component={<Link to="/Departments" />} >Departments</MenuItem>
                                        <MenuItem active > Employee List</MenuItem>
                                        <MenuItem component={<Link to="/TeamList" />}>Team List</MenuItem>
                                        <MenuItem component={<Link to="/Resources" />}>Requests</MenuItem>
                                        <MenuItem component={<Link to="/MyDetails" />}>My Details</MenuItem>

                                        
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
                        <Button type="primary" className="add-employee" size="large" onClick={handleEditProfileClick} >
                             {editMode ? "Save" : "Edit Profile"}
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
                            {
                            (role === "MANAGER" || role === "ADMIN") && editMode
                                ? (
                                <Space.Compact>
                                <Input
                                name="projectCode"
                                value={editValues.currentIbu}
                                onChange={handleInputChange}
                                />
                                </Space.Compact>
                            ) : (
                                 userDetails?.currenIbu ?? "N/A"
                            )
                            }
                            </p>
                            </div>
                             <div className="user-section right-align">
                            <p>
                                <span className="label">Password: </span>
                                {role === "USER" && isEditing ? (
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
                           {
                            (role === "MANAGER" || role === "ADMIN") && editMode
                                ? (
                                <Space.Compact>
                                <Input
                                name="projectCode"
                                value={editValues.projectCode}
                                onChange={handleInputChange}
                                />
                                </Space.Compact>
                            ) : (
                                 userDetails?.projectCode ?? "N/A"
                            )
                            }
                            
                            </p>
                            </div>
                            <div className="user-section">
                            <p><span className="label">Current Location: </span>
                            {
                            (role === "MANAGER" || role === "ADMIN") && editMode
                                ? (
                                <Space.Compact>
                                <Input
                                name="projectCode"
                                value={editValues.currentLocation}
                                onChange={handleInputChange}
                                />
                                </Space.Compact>
                            ) : (
                                 userDetails?.currentLocation ?? "N/A"
                            )
                            }
                                            
                            
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
export default UserDetails;