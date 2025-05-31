// import "./UserDetails.css";
import React from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { useAuth } from "../Auth/AuthContext";
import { Button, Space, Modal, Avatar, Dropdown } from "antd";
import {
  UserOutlined,
  UndoOutlined,
  SaveTwoTone
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { Input } from "antd";
import { FaPen, FaSave } from "react-icons/fa";
import { notification } from "antd";

const MyDetails = () => {
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
  const [isEditing, setIsEditing] = useState(false);
  const [editedPassword, setEditedPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState(editedPassword);
  const [countryList, setCountryList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previousJobs, setPreviousJobs] = useState([]);
  const [orgName, setOrgName] = useState("");
  const [duration, setJobDuration] = useState("");
  const [designation, setDesignation] = useState("");
  const [description, setDescription] = useState("");
  const [newJob, setNewJob] = useState({
    orgName: "",
    designation: "",
    duration: "",
    description: "",
  });
  console.log("Current Password:", currentPassword);

  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    fetchUserDetails();
    fetchCountryList();
    fetchPreviousJobDetails();
  }, []);

  // Fetch user details once on mount

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

  const fetchPreviousJobDetails = async () => {
    try {
      const response = await fetch(
        "http://localhost:8081/employees/pre-employment-details",
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
        previousJobs: userDetails.previousJobs || [],

        // add other fields as needed
      });
    }
  }, [userDetails]);

  // Handlers

  const handleEditClick = () => {
    setIsEditing(true);
  };

  
  const handleSaveClick = async () => {
    if (!editedPassword || editedPassword.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }
    try {
      await updatePassword(editedPassword);
      setCurrentPassword(editedPassword);
      setIsEditing(false);
    } catch (error) {
      alert("Failed to update password. Please try again.");
    }
  };


  const updatePassword = async (newPassword) => {
    try {
      const response = await fetch(
        "http://localhost:8081/common/updatePassword",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ newPassword }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update password");
      }

      const data = await response.text();
      console.log("Password updated:", data);
      localStorage.removeItem("token");
      window.location.href = "/login"; 
      return data;
    } catch (error) {
      console.error("Error updating password:", error);
      throw error;
    }
  };

  // const handleEditClick = () => {
  //   setIsEditing(true);
  // };

  // const handleSaveClick = () => {
  //   setPassword(editedPassword);
  //   setIsEditing(false);
  // };

  const handleEditProfileClick = () => {
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

  //Model Handlers
  const openNotification = (pauseOnHover, type, message, description) => () => {
    api.open({
      message,
      description,
      showProgress: true,
      pauseOnHover,
      type,
    });
  };
  const handleOk = async () => {
    const { orgName, duration, designation } = newJob;
    if (!orgName || !duration || !designation) {
      openNotification(
        false,
        "error",
        "All fields are required",
        "Please fill in all the fields before submitting."
      )();
      return;
    }

    if (orgName.length < 3) {
      openNotification(
        false,
        "error",
        "Invalid Organization name",
        "Organization Name should be at least 3 characters long."
      )();
      return;
    }
    try {
      // Make API call to add new job
      const res = await fetch(
        "http://localhost:8081/employees/pre-employment-details",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify([newJob]),
        }
      );
  

      if (res.status === 401) {
        openNotification(
          false,
          "error",
          "Unauthorized",
          "You are not authorized to perform this action."
        )();
        return;
      }
      if (!res.ok) {
        alert("Failed to add employee. Please try again.");
        return;
      }
      const data = await res.json();
      console.log(data);
      setPreviousJobs((prevJobs) => [...prevJobs, ...data]); // update UI
      setNewJob({
        orgName: "",
        designation: "",
        duration: "",
        description: "",
      });
    } catch (err) {
      console.error(err);
    }

    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="mydetails">
      {/* Top Navbar Starts from here !!! */}
      <div className="top_navbar">
        <div className="left-div">
          <span className="brand_name">My App</span>
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
              {user.role === "ADMIN" && (
                <>
                  <MenuItem component={<Link to="/AdminDashboard" />}>
                    Dashboard
                  </MenuItem>
                  <MenuItem component={<Link to="/Departments" />}>
                    Departments
                  </MenuItem>
                  <MenuItem component={<Link to="/EmployeeList" />}>
                    Employee List
                  </MenuItem>
                  <MenuItem component={<Link to="/Resources" />}>
                    Requests
                  </MenuItem>

                  <MenuItem active>My Details</MenuItem>
                </>
              )}
              {user.role === "MANAGER" && (
                <>
                  <MenuItem component={<Link to="/ManagerDashboard" />}>
                    Dashboard
                  </MenuItem>
                  <MenuItem component={<Link to="/EmployeeList" />}>
                    Employee List
                  </MenuItem>
                  <MenuItem component={<Link to="/TeamList" />}>
                    Team List
                  </MenuItem>
                  <MenuItem component={<Link to="/Resources" />}>
                    Requests
                  </MenuItem>
                  <MenuItem active>My Details </MenuItem>
                </>
              )}
              {
                user.role === "USER" && (
                  <>
                    <MenuItem active>My Details</MenuItem>
                    <MenuItem component={<Link to="/Resources" />}>
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
                  {editMode ? (
                    <Space.Compact>
                      <Input
                        name="phoneNumber"
                        value={editValues.phoneNumber}
                        onChange={handleInputChange}
                      />
                    </Space.Compact>
                  ) : (
                    userDetails?.phoneNumber && userDetails.phoneNumber.trim() !== ""
                      ? userDetails.phoneNumber
                      : "N/A"
                  )}
                </p>
              </div>
              <div className="user-section">
                <p>
                  <span className="label">Years of Experience: </span>
                  {editMode ? (
                    <Space.Compact>
                      <Input
                        name="yearsOfExperience"
                        value={editValues.yearsOfExperience}
                        onChange={handleInputChange}
                      />
                    </Space.Compact>
                  ) : (
                    userDetails?.yearsOfExperience ?? "N/A"
                  )}
                </p>
                <p>
                  <span className="label">Current IBU: </span>
                  {userDetails?.departmentName && userDetails.departmentName.trim() !== ""
                    ? userDetails.departmentName
                    : "N/A"}
                </p>
              </div>
              <div className="user-section right-align">
                <p>
                  <span className="label">Password: </span>
                  {isEditing ? (
                    <>
                       <Input.Password
                        value={editedPassword}
                        onChange={(e) => setEditedPassword(e.target.value)}
                        style={{ marginRight: "5px", width: 200 }}
                      />
                      <SaveTwoTone 
                        onClick={handleSaveClick}
                        style={{ cursor: "pointer", color: "green", fontSize: "22px", fontWeight: "bold" }}
                        title="Save"
                      />
                      <UndoOutlined 
                        style={{ marginLeft: "10px", cursor: "pointer", color: "red", fontSize: "22px", fontWeight: "bold" }}
                        onClick={() => {
                          setEditedPassword(currentPassword);
                          setIsEditing(false);
                        }}
                      />
                    </>
                  ) : (
                    <>
                      
                      ........
                      <FaPen
                        onClick={handleEditClick}
                        style={{ marginLeft: "10px", cursor: "pointer" }}
                        title="Edit Password"
                      />
                    </>
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
                  {userDetails?.id ?? "N/A"}
                </p>
              </div>
              <div className="user-section">
                <p>
                  <span className="label">Project Code: </span>
                  {userDetails?.projectCode && userDetails.projectCode.trim() !== "" ? userDetails.projectCode : "N/A"}
                </p>
              </div>
              <div className="user-section right-align">
                <p>
                  <span className="label">Current Location：</span>
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
                  {editMode ? (
                    <Space.Compact>
                      <Input
                        name="permanentAddress"
                        value={editValues.permanentAddress}
                        onChange={handleInputChange}
                      />
                    </Space.Compact>
                  ) : (
                    userDetails?.permanentAddress && userDetails.permanentAddress.trim() !== ""
                      ? userDetails.permanentAddress
                      : "N/A"
                  )}
                </p>

                <p>
                  <span className="label">Local Address: </span>
                  {editMode ? (
                    <Space.Compact>
                      <Input
                        name="localAddress"
                        value={editValues.localAddress}
                        onChange={handleInputChange}
                      />
                    </Space.Compact>
                  ) : (
                    userDetails?.localAddress && userDetails.localAddress.trim() !== ""
                      ? userDetails.localAddress
                      : "N/A"
                  )}
                </p>
              </div>
              <div className="user-section">
                <p>
                  <span className="label">Passport No: </span>

                  {userDetails?.passportNo && userDetails.passportNo.trim() !== ""
                    ? userDetails.passportNo
                    : "N/A"}
                </p>
                <p>
                  <span className="label">Passport Office: </span>

                  {userDetails?.passportOffice && userDetails.passportOffice.trim() !== ""
                    ? userDetails.passportOffice
                    : "N/A"}
                </p>
              </div>
              <div className="user-section right-align">
                <p>
                  <span className="label">Issue Date: </span>

                  {userDetails?.passportIssueDate ?? "N/A"}
                </p>
                <p>
                  <span className="label">Expiry Date: </span>

                  {userDetails?.passportExpiryDate ?? "N/A"}
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
                  {userDetails?.managerName && userDetails.managerName.trim() !== ""
                    ? userDetails.managerName
                    : "N/A"}
                </p>
              </div>

              <div className="user-section right-align">
                <p>
                  <span className="label">Manager Email: </span>

                  {userDetails?.managerEmail && userDetails.managerEmail.trim() !== ""
                    ? userDetails.managerEmail
                    : "N/A"}
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
              <div className="right-align">
                <Button
                  type="primary"
                  className="add-employee"
                  size="large"
                  onClick={() => setIsModalOpen(true)}
                >
                  Add Previous Job
                </Button>
              </div>
            </div>
            <div
              style={{
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

      {/* Modal - Add Employee Starts here !!! */}
      <Modal
        title="Add Employee"
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div
          style={{
            marginTop: "20px",
          }}
        >
          <label
            style={{
              fontSize: "20px",
              fontWeight: "bold",
            }}
          >
            Organization
          </label>
          <Input
            size="large"
            placeholder="Organization Name"
            prefix={<UserOutlined />}
            value={newJob.orgName}
            onChange={(e) =>
              setNewJob((prev) => ({ ...prev, orgName: e.target.value }))
            }
          />
        </div>

        <div
          style={{
            marginTop: "20px",
          }}
        >
          <label
            style={{
              fontSize: "20px",
              fontWeight: "bold",
            }}
          >
            Duration
          </label>
          <Input
            size="large"
            placeholder="Duration (e.g., 2 years)"
            prefix={<UserOutlined />}
            value={newJob.duration}
            onChange={(e) =>
              setNewJob((prev) => ({ ...prev, duration: e.target.value }))
            }
          />
        </div>

        <div
          style={{
            marginTop: "20px",
          }}
        >
          <label
            style={{
              fontSize: "20px",
              fontWeight: "bold",
            }}
          >
            Designation
          </label>
          <Input
            size="large"
            placeholder="Designation"
            prefix={<UserOutlined />}
            value={newJob.designation}
            onChange={(e) =>
              setNewJob((prev) => ({ ...prev, designation: e.target.value }))
            }
          />
        </div>

        <div
          style={{
            marginTop: "20px",
          }}
        >
          <label
            style={{
              fontSize: "20px",
              fontWeight: "bold",
            }}
          >
            Description
          </label>
          <Input
            size="large"
            placeholder="Description"
            prefix={<UserOutlined />}
            value={newJob.description}
            onChange={(e) =>
              setNewJob((prev) => ({ ...prev, description: e.target.value }))
            }
          />
        </div>
      </Modal>
    </div>
  );
};
export default MyDetails;
