import "./UserDetails.css";
import React from "react";
import { Avatar, Dropdown } from "antd";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { useAuth } from "../Auth/AuthContext";
import { Button, Input, Space } from "antd";

import { useEffect, useState } from "react";
import { FaPen, FaSave } from "react-icons/fa";
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
  const [editValues, setEditValues] = useState({});
  const location = useLocation();
  const { employeeId } = location.state || {};
  const [countryList, setCountryList] = useState([]);
  const [departmentList, setDepartmentList] = useState([]);
  const [projectCodeList, setProjectCodeList] = useState([]);
  const [previousJobs, setPreviousJobs] = useState([]);
  const [role, setRole] = useState("");

  console.log("User Role:", role);
  console.log("User Details:", userDetails);
  console.log("editValues:", editValues);
  // console.log("User Email:", email);

  useEffect(() => {
    fetchUserDetailsById(employeeId);
    fetchDepartmentList();
    fetchCountryList();
    fetchPreviousJobDetailsbyId(employeeId);
    fetchRoleById(employeeId);
  }, [employeeId]);

  // Fetch user details once on mount

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
  const handleLocationFilter = ({ key }) => {
    if (key !== "all") {
      handleInputChange({
        target: { name: "currentLocation", value: key },
      });
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

  const handleDepartmentFilter = async (e) => {
    const key = e.key;
    const selectedDeptName = departmentList
      .filter((item) => key.includes(item.id))
      .map((item) => item.department_name)[0];

    console.log("Selected Department Key:", e.key);
    console.log("Department list is :", departmentList);

    console.log("Selected Department Name :", selectedDeptName);
    // if (selectedDept) {

    handleInputChange({
      target: { name: "departmentName", value: selectedDeptName },
    });
    //   setEditValues(prev => ({
    //       ...prev,
    //       departmentName: selectedDept?.department_name ,

    //     }));
    //   }

    try {
      const response = await fetch(
        `http://localhost:8081/common/project/department/${e.key}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log("Response:", response);
      const data = await response.json();
      console.log(data);
      setProjectCodeList(data);
    } catch (error) {
      console.error("Error fetching project codes:", error);
      setProjectCodeList([]);
    }
  };

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
        departmentName: userDetails.departmentName || "",
        projectCode: userDetails.projectCode || "",
        departmentId: userDetails.departmentId || "",
        projectId: userDetails.projectId || "",
        // add other fields as needed
      });
    }
  }, [userDetails]);

  // Handlers

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

  return (
    <div className="mydetails">
      {/* Top Navbar Starts from here !!! */}
      <div className="top_navbar">
        <div className="left-div">
          <span className="brand_name">My App</span>
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
                  {role === "MANAGER" || role === "ADMIN"
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
                  {(role === "MANAGER" || role === "ADMIN") && editMode ? (
                    <Dropdown
                      menu={{
                        items: [
                          ...departmentList.map((department) => ({
                            label: department.department_name,
                            key: department.id,
                          })),
                        ],
                        onClick: handleDepartmentFilter,
                      }}
                      placement="bottomLeft"
                      arrow
                    >
                      <Space.Compact>
                        <Input
                          name="country"
                          value={editValues.departmentName}
                          onChange={handleInputChange}
                          // placeholder="Select or type country"
                          style={{ width: 220 }}
                        />
                      </Space.Compact>
                    </Dropdown>
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
                  {(role === "MANAGER" || role === "ADMIN") && editMode ? (
                    <Dropdown
                      menu={{
                        items: projectCodeList.map((project) => ({
                          label: project.project_code,
                          key: project.id,
                        })),

                        onClick: (e) => {
                          // Set selected project code to state
                          setEditValues((prev) => ({
                            ...prev,
                            projectCode: e.key, // since key is project_code
                          }));
                        },
                      }}
                      placement="bottomLeft"
                      arrow
                    >
                      <Space.Compact>
                        <Input
                          name="projectCode"
                          value={editValues.projectCode}
                          onChange={handleInputChange}
                          style={{ width: 220 }}
                        />
                      </Space.Compact>
                    </Dropdown>
                  ) : (
                    userDetails?.projectCode ?? "N/A"
                  )}
                </p>
              </div>
              <div className="user-section right-align">
                <p>
                  <span className="label">Current Location: </span>
                  {editMode ? (
                    <Dropdown
                      menu={{
                        items: [
                          {
                            label: "All Locations",
                            key: "all",
                          },
                          ...countryList.map((country) => ({
                            label: country.name,
                            key: country.name,
                          })),
                        ],
                        onClick: handleLocationFilter,
                      }}
                      placement="bottomLeft"
                      arrow
                    >
                      <Space.Compact>
                        <Input
                          name="country"
                          value={editValues.currentLocation}
                          onChange={handleInputChange}
                          // placeholder="Select or type country"
                          style={{ width: 220 }}
                        />
                      </Space.Compact>
                    </Dropdown>
                  ) : (
                    userDetails?.currentLocation ?? "N/A"
                  )}
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
                  <span className="label">Manager ID: </span>

                  {userDetails?.managerId ?? "N/A"}
                </p>
              </div>
              <div className="user-section">
                <p>
                  <span className="label">Manager Name: </span>
                  {userDetails?.managerName ?? "N/A"}
                </p>
              </div>

              <div className="user-section right-align">
                <p>
                  <span className="label">Manager Email: </span>

                  {userDetails?.managerEmail ?? "N/A"}
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
