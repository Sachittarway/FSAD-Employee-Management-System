import "./UserDetails.css";
import React from "react";
import { Avatar, Dropdown, Select } from "antd";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { useAuth } from "../Auth/AuthContext";
import { Button, Input, Space } from "antd";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const UserDetails = () => {
  const items = [
    {
      label: "Logout",
      key: "1",
      danger: true,
    },
  ];
  const { user } = useAuth();
  const [userDetails, setUserDetails] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [managerValues, setManagerValues] = useState({
  managerId: userDetails?.managerId || "",
  managerName: userDetails?.managerName || "",
  managerEmail: userDetails?.managerEmail || ""
});
  const location = useLocation();
  const { employeeId } = location.state || {};
  const [countryList, setCountryList] = useState([]);
  const [departmentList, setDepartmentList] = useState([]);
  const [projectCodeList, setProjectCodeList] = useState([]);
  const [previousJobs, setPreviousJobs] = useState([]);
  const [role, setRole] = useState("");
  const [teamValues, setTeamValues] = useState({
    departmentId: null,
    projectId: null
  });

  const myrole = user.role;


  const handleManagerInputChange = (e) => {
  const { name, value } = e.target;
  setManagerValues((prev) => ({
    ...prev,
    [name]: value,
  }));
};

  useEffect(() => {
    fetchUserDetailsById(employeeId);
    fetchDepartmentList();
    fetchCountryList();
    fetchPreviousJobDetailsbyId(employeeId);
    fetchRoleById(employeeId);
  }, [employeeId]);

  console.log("User Details Sachit:", userDetails);

  const fetchRoleById = async (employeeId) => {
    try {
      const response = await fetch(
        `http://localhost:8081/common/getEmployeeRoleById/${employeeId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch role");
      }

      const role = await response.text(); // because response is plain text like "USER", not JSON
      console.log("Role fetched:", role);
      setRole(role);
    } catch (error) {
      console.error("Error fetching role:", error);
      return null;
    }
  };

  const fetchUserDetailsById = async (employeeiId) => {
    try {
      const response = await fetch(
        `http://localhost:8081/common/getEmployeeDetailsById/${employeeId}`,
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

  const fetchCountryList = async () => {
    try {
      const res = await fetch("http://localhost:8081/common/getCountryList", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.status === 401) {
        console.error("Unauthorized access. Redirecting to login.");
        return;
      }
      if (!res.ok) {
        console.error("Failed to fetch country list. Status:", res.status);
        return;
      }
      const data = await res.json();
      setCountryList(data);
      console.log("Country List Data:", data);
    } catch (err) {
      console.error("Error fetching country list:", err);
    }
  };

  const fetchDepartmentList = async () => {
    try {
      const res = await fetch("http://localhost:8081/common/departments", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.status === 401) {
        console.error("Unauthorized access. Redirecting to login.");
        return;
      }
      if (!res.ok) {
        console.error("Failed to fetch department list. Status:", res.status);
        return;
      }
      const data = await res.json();
      setDepartmentList(data);
      console.log("Department List Data:", data);
    } catch (err) {
      console.error("Error fetching department list:", err);
    }
  };
 

  const fetchProjectCodes = async (departmentId) => {
    console.log("department Id:", departmentId);
    
    try {
      const response = await fetch(
        `http://localhost:8081/common/project/department/${departmentId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const data = await response.json();
      console.log("Fetched Project Codes:", data);
      setProjectCodeList(data);
    } catch (error) {
      console.error("Error fetching project codes:", error);
      setProjectCodeList([]);
    }
  };

  /*
    Fetch previous job details by employeeId
  */
  const fetchPreviousJobDetailsbyId = async (employeeId) => {
    console.log("Fetching previous job details for employeeId:", employeeId);
    if (!employeeId) {
      console.error("No employeeId provided for fetching job details.");
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:8081/employees/pre-employment-details/${employeeId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("Fetching previous job details...", response);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("Previous Job Details:", data);
      setPreviousJobs(data);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };
  
  /*
    Toggle of edit mode and save changes
    When in edit mode, the user can update their team details like department and project code.
    When not in edit mode, the user can only view their details.
  */
  const handleEditProfileClick = async () => {
    if (editMode) {
      try {
        const response = await fetch("http://localhost:8081/manager/updateTeam",
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({
              departmentId: teamValues.departmentId,
              projectId: teamValues.projectId,
              email: userDetails?.userEmail,
            }),
          }
        );
        if (!response.ok) {
          throw new Error("Failed to update team details");
        }
        if(response.status === 401) {
          console.error("Unauthorized access. Redirecting to login.");
          return;
        }
        const data = await response.json();
        console.log("Team details updated successfully", data);
        setEditMode(false);
        fetchUserDetailsById(employeeId);
        alert("Profile updated successfully!");
      } catch (error) {
        console.error("Error updating team details:", error);
        alert("Failed to update profile. Please try again.");
      }
    } else {
      setEditMode(true);
    }
  };

  /*
    Assign manager to the employee
  */
  const handleAssignManager = async () => {
    try{
      const response = await fetch(`http://localhost:8081/manager/updateManager/${employeeId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to assign manager");
      }
      const data = await response.json();
      console.log("Manager assigned successfully", data);
      fetchUserDetailsById(employeeId); 
      alert("Manager assigned successfully!");
    } catch (error) {
      console.error("Error assigning manager:", error);
      alert("Failed to assign manager. Please try again.");
    }
  }
  
  return (
    <div className="mydetails">
      {/* Top Navbar Starts from here !!! */}
      <div className="top_navbar">
        <div className="left-div">
          <span className="brand_name">ArtifexOne</span>
        </div>

        <div className="right-div">
          <Dropdown menu={{ items }} placement="bottomLeft">
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
              {user.role === "ADMIN" && (
                <>
                  <MenuItem component={<Link to="/AdminDashboard" />}>
                    Dashboard
                  </MenuItem>
                  <MenuItem component={<Link to="/Departments" />}>
                    Departments
                  </MenuItem>
                  <MenuItem active> Employee List</MenuItem>
                  <MenuItem component={<Link to="/Resources" />}>
                    Requests
                  </MenuItem>
                  <MenuItem component={<Link to="/MyDetails" />}>
                    My Details
                  </MenuItem>
                </>
              )}
              {user.role === "MANAGER" && (
                <>
                  <MenuItem component={<Link to="/ManagerDashboard" />}>
                    Dashboard
                  </MenuItem>
                  <MenuItem active> Employee List</MenuItem>
                  <MenuItem component={<Link to="/TeamList" />}>
                    Team List
                  </MenuItem>
                  <MenuItem component={<Link to="/Resources" />}>
                    Requests
                  </MenuItem>
                  <MenuItem component={<Link to="/MyDetails" />}>
                    My Details
                  </MenuItem>
                </>
              )}
            </Menu>
          </Sidebar>
        </div>
        {/* Sidebar Ends here !!! */}

        {/* Main content Starts here !!! */}
        <div className="employee-content">
          <div
            style={{
              // backgroundColor: "white",
              padding: "20px",
              borderRadius: "10px",
              width: "100%",
              boxSizing: "border-box",
              marginBottom: "20px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexWrap: "wrap", //  allows wrapping on smaller screens
                justifyContent: "space-between",
                alignItems: "center",
                gap: "10px", //  adds spacing if wrapped
              }}
            >
              {/* <div className="hello">Employee List</div> */}
              <div
                style={{
                  alignItems: "center",
                }}
              >
                <h2>{userDetails?.employeeName}</h2>
                <p>
                  {role === "MANAGER"
                    ? "TEAM MANAGER"
                    : role === "USER"
                    ? "EMPLOYEE"
                    : "N/A"}
                </p>
              </div>
              <div>
                <Button
                  type="primary"
                  className="add-employee"
                  size="large"
                  onClick={handleEditProfileClick}
                >
                  {editMode ? "Save" : "Edit Profile"}
                </Button>
              </div>
            </div>
          </div>

          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "10px",
              width: "100%",
              boxSizing: "border-box",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
              marginBottom: "20px",
            }}
          >
            <div
              style={{
                textAlign: "center",
                fontSize: "20px",
                fontWeight: "bold",
                marginBottom: "20px",
              }}
            >
              Personal Information
            </div>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap", //  allows wrapping on smaller screens
                justifyContent: "space-between",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <div className="user-section">
                <p>
                  <span className="label">Name: </span>
                  {userDetails?.employeeName}
                </p>
                <p>
                  <span className="label">Phone: </span>
                  {userDetails?.phoneNumber}
                </p>
              </div>
              <div className="user-section">
                <p>
                  <span className="label">Years of Experience: </span>
                  {userDetails?.yearsOfExperience}
                </p>
                <p>
                  <span className="label">Current IBU: </span>
                  {(myrole === "MANAGER" || myrole === "ADMIN") && editMode ? (
                    <Select
                      showSearch
                      style={{ width: 220 }}
                      placeholder="Select department"
                      optionFilterProp="children"
                      onChange={(value) => {
                        const selectedDept = departmentList.find(
                          (d) => d.id === value
                        );
                        setTeamValues((prev) => ({
                          ...prev,
                          departmentId: selectedDept?.id,
                        }));
                        // Fetch related project codes using the departmentId
                        fetchProjectCodes(value);
                      }}
                      filterOption={(input, option) =>
                        option.children
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                      value={
                        departmentList.find(
                          (d) => d.id === teamValues.departmentId
                        )?.id
                      }
                    >
                      {departmentList.map((dept) => (
                        <Select.Option key={dept.id} value={dept.id}>
                          {dept.department_name}
                        </Select.Option>
                      ))}
                    </Select>
                  ) : (
                    userDetails?.departmentName ?? "N/A"
                  )}
                </p>
              </div>
              {/* <div className="user-section right-align">
                <p>
                  <span className="label">Password: </span>
                  {isEditing ? (
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
                      {"•".repeat(currentPassword.length)}
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
              </div> */}
            </div>
          </div>

          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "10px",
              width: "100%",
              boxSizing: "border-box",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
              marginBottom: "20px",
            }}
          >
            <div
              style={{
                textAlign: "center",
                fontSize: "20px",
                fontWeight: "bold",
                marginBottom: "20px",
              }}
            >
              Employment Details
            </div>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap", //  allows wrapping on smaller screens
                justifyContent: "space-between",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <div className="user-section">
                <p>
                  <span className="label">Employee Number: </span>
                  {userDetails?.employeeId || "N/A"}
                </p>
              </div>
              <div className="user-section">
                <p>
                  <span className="label">Project Code: </span>
                  {(myrole === "MANAGER" || myrole === "ADMIN") && editMode ? (
                    <Select
                      showSearch
                      style={{ width: 220 }}
                      placeholder="Select project code"
                      optionFilterProp="children"
                      onChange={(value) => {
                        const selectedProject = projectCodeList.find(
                          (p) => p.id === value
                        );
                        setTeamValues((prev) => ({
                          ...prev,
                          projectId: selectedProject?.id,
                        }));
                      }}
                      filterOption={(input, option) =>
                        option.children
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                      value={
                        projectCodeList.find(
                          (p) => p.id === teamValues.projectId
                        )?.id
                      }
                    >
                      {projectCodeList.map((project) => (
                        <Select.Option key={project.id} value={project.id}>
                          {project.project_code}
                        </Select.Option>
                      ))}
                    </Select>
                  ) : (
                    userDetails?.projectCode ?? "N/A"
                  )}
                </p>
              </div>
              <div className="user-section right-align">
                <p>
                  <span className="label">Current Location: </span>
                  {userDetails?.currentLocation ?? "N/A"}
                </p>
              </div>
            </div>
          </div>

          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "10px",
              width: "100%",
              boxSizing: "border-box",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
              marginBottom: "20px",
            }}
          >
            <div
              style={{
                textAlign: "center",
                fontSize: "20px",
                fontWeight: "bold",
                marginBottom: "20px",
              }}
            >
              Primary Address & Passport Details
            </div>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap", //  allows wrapping on smaller screens
                justifyContent: "space-between",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <div className="user-section">
                <p>
                  <span className="label">Permanent Address: </span>
                  {userDetails?.permanentAddress}
                </p>
                <p>
                  <span className="label">Local Address: </span>
                  {userDetails?.localAddress}
                </p>
              </div>
              <div className="user-section">
                <p>
                  <span className="label">Passport No: </span>
                  {userDetails?.passportNo}
                </p>
                <p>
                  <span className="label">Passport Office: </span>
                  {userDetails?.passportOffice}
                </p>
              </div>
              <div className="user-section right-align">
                <p>
                  <span className="label">Issue Date: </span>
                  {userDetails?.passportIssueDate}
                </p>
                <p>
                  <span className="label">Expiry Date: </span>
                  {userDetails?.passportExpiryDate}
                </p>
              </div>
            </div>
          </div>

          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "10px",
              width: "100%",
              boxSizing: "border-box",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
              marginBottom: "20px",
            }}
          >
            <div
              style={{
                textAlign: "center",
                fontSize: "20px",
                fontWeight: "bold",
                marginBottom: "20px",
              }}
            >
              Manager Details
            </div>
            {
              user.role === "MANAGER" && (
                <div>
                  <Button type="primary" onClick={handleAssignManager}>Assign Me</Button>
                </div>
              )
            }

            <div
              style={{
                display: "flex",
                flexWrap: "wrap", 
                justifyContent: "space-between",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <div className="user-section">
                <p>
                  <span className="label">Manager ID: </span>
                    {
                      userDetails?.managerId ?? "N/A"
                    }
                </p>
              </div>
              
              <div className="user-section">
                <p>
                  <span className="label">Manager Name: </span>
                  {userDetails?.managerName && userDetails?.managerName.trim() !== "" ? userDetails.managerName : "N/A"}
                </p>
              </div>

              <div className="user-section right-align">
                <p>
                  <span className="label">Manager Email: </span>
                    {userDetails?.managerEmail && userDetails?.managerEmail.trim() !== "" ? userDetails.managerEmail : "N/A"}
                </p>
              </div>
            </div>
          </div>

          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "10px",
              width: "100%",
              boxSizing: "border-box",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
              marginBottom: "20px",
            }}
          >
            <div
              style={{
                textAlign: "center",
                fontSize: "20px",
                fontWeight: "bold",
                marginBottom: "20px",
              }}
            >
              Previous Job Information
            </div>
            <div
              style={{
                // display: "flex",

                flexWrap: "wrap", //  allows wrapping on smaller screens
                justifyContent: "space-between",
                alignItems: "center",
                gap: "10px",
              }}
            >
              {previousJobs?.map((job, index) => (
                <div
                  key={index}
                  style={{
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    padding: "15px",
                    backgroundColor: "#fafafa",
                    marginBottom: "30px",
                  }}
                >
                  <p>
                    <strong>Organization:</strong>
                    {" " + job?.orgName || "N/A"}
                  </p>
                  <p>
                    <strong>Duration:</strong>
                    {" " + job?.duration || "N/A"}
                  </p>
                  <p>
                    <strong>Designation:</strong>
                    {" " + job?.designation || "N/A"}
                  </p>
                  <p>
                    <strong>Description:</strong>
                    {" " + job?.description || "N/A"}
                  </p>
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
  );
};
export default UserDetails;
