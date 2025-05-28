import React, { useEffect } from "react";
import { Table, Tag, Space, Button, Avatar, Input, Dropdown,Modal,Select } from "antd";
import "./EmployeeList.css";
import { Sidebar, Menu, MenuItem} from "react-pro-sidebar";
import {FilterOutlined,DeleteOutlined,FolderViewOutlined,UserOutlined} from "@ant-design/icons";
import { Link } from 'react-router-dom';
import { useState } from "react";
import { useAuth } from "../Auth/AuthContext";
import { notification} from 'antd';


const EmployeeList = () => {
  const { Search } = Input;
  const { user } = useAuth();
  const [searchText, setSearchText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("USER");
  const [api, contextHolder] = notification.useNotification();
  const[employeeList, setEmployeeList] = useState([]);
  const [departmentList, setDepartmentList] = useState([]);
  const [countryList, setCountryList] = useState([]);

  useEffect(() => {
    fetchEmployeeList();
    fetchDepartmentList();
    fetchCountryList();
  }, []);

  const fetchEmployeeList = async () => {
    try {
      const res = await fetch('http://localhost:8081/common/employeeList', {
        method: 'GET',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (res.status === 401) {
        console.error("Unauthorized access. Redirecting to login.");
        return;
      }
      if (!res.ok) {
        console.error("Failed to fetch employee list. Status:", res.status);
        return;
      }
      const data = await res.json();
      setEmployeeList(data);
      console.log("Employee List Data:", data);
      // You can set the data to state if needed
    }
    catch (err) {
      console.error("Error fetching employee list:", err);
    }
  }

  const fetchDepartmentList = async () => {
    try {
      const res = await fetch('http://localhost:8081/common/departments', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
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
  console.log("Employee List:", employeeList);

  const fetchCountryList = async () => {
    try {
      const res = await fetch('http://localhost:8081/common/getCountryList', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
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

  const items = [
    {
      label: "Logout",
      key: "1",
      danger: true,
    },
  ];
    
  const openNotification = (pauseOnHover, type, message, description) => () => {
    api.open({
      message,
      description,
      showProgress: true,
      pauseOnHover,
      type,
    });
  };

  /* Table Columns!!! */ 
  const columns = [
    {
      title: "Employee ID",
      dataIndex: "employeeId",
      key: "employeeId",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Full Name",
      dataIndex: "employeeName",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Position",
      dataIndex: "employeePosition",
      key: "employeePosition",
    },
    {
      title: "Role",
      dataIndex: "employeeRole",
      key: "employeeRole",
      render: (role) => {
        let color;
    
        switch (role) {
          case "MANAGER":
            color = "blue";
            break;
          case "ADMIN":
            color = "volcano";
            break;
          case "USER":
            color = "green";
            break;
          default:
            color = "default";
        }
    
        return <Tag color={color}>{role.toUpperCase()}</Tag>;
      }
    },
    {
      title: "Email",
      dataIndex: "employeeEmail",
      key: "employeeEmail",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary"><FolderViewOutlined /></Button>
          <Button variant="filled" color="danger" onClick={showDeleteModal}><DeleteOutlined /></Button>
        </Space>
      ),
    },
  ];

  /* Table Data!!!*/
  const data = [
    {
      empid: "1",
      name: "John Brown",
      position: "Software Developer",
      role: "Admin",
      email:"sachit.tarway@gmail.com"
    },
    {
      empid: "2",
      name: "Jim Green",
      position: "Software Developer",
      role: "Manager",
      email:"sachit.tarway@gmail.com"
    },
    {
      empid: "3",
      name: "Joe Black",
      position: "Software Developer",
      role: "User",
      email:"sachit.tarway@gmail.com"
    },
  ];

  
  const showModal = () => {
    setIsModalOpen(true);
  };

  // Function to handle the Register button click
  const handleOk = async () => {
  if (!fullname || !email || !role) {
    openNotification(false, 'error', 'All fields are required', 'Please fill in all the fields before submitting.')();
    return;
  }
  if (!email.includes("@") || !email.includes(".")) {
    openNotification(false, 'error', 'Invalid email', 'Please enter a valid email address.')();
    return;
  }
  if (fullname.length < 3) {
    openNotification(false, 'error', 'Invalid full name', 'Full name should be at least 3 characters long.')();
    return;
  }
  try {
    const res = await fetch('http://localhost:8081/admin/register', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ 
        name: fullname, 
        password: fullname,
        email,
        role 
      })
    });
    console.log("Response:", res);
    if (res.status === 401) {
      openNotification(false, 'error', 'Unauthorized', 'You are not authorized to perform this action.')();
      return;
    }
    if (!res.ok) {
      alert("Failed to add employee. Please try again.");
      return;
    }
    const data = await res.json();
    console.log(data);
    setIsModalOpen(false);
  } catch (err) {
    console.error(err);
  }
  setIsModalOpen(false);
  setFullname("");
  setEmail("");
  setRole("USER");
};

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const showDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };
  const handleDeleteOk = () => {
    setIsDeleteModalOpen(false);
  };
  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
  };
  

  

  const onSearch = (value) => {
    setSearchText(value);
    console.log(`searching for ${value}`);
  };
  
  const handleMenuClick = (e) => {
    if(e.key=="all") {
      fetchEmployeeList();
    }
    else{
      fetchEmployeeListByDepartment(e.key);
    }
  };

  const handleRoleFilter = (e) => {
    if(e.key === "MANAGER" || e.key === "USER") {
      fetchEmployeeListByRole(e.key);
    }
    else {
      fetchEmployeeList();
    }
  }

  const handleLocationFilter = (e) => {
    if(e.key === "all") {
      fetchEmployeeList();
    }
    else {
      console.log("Selected Location:", e);
      fetchEmployeeListByLocation(e.key);
    }
  }

  const fetchEmployeeListByDepartment = async (departmentId) => {
    try{
      const response = await fetch(`http://localhost:8081/common/searchEmployeesByDepartmentId?departmentId=${departmentId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`    
        }
      });
      if (response.status === 401) {
        console.error("Unauthorized access. Redirecting to login.");
        return;
      }
      if (!response.ok) {
        console.error("Failed to fetch employee list by department. Status:", response.status);
        return;
      }
      const data = await response.json();
      setEmployeeList(data);
      console.log("Filtered Employee List Data:", data);  
    }
    catch (err) {
      console.error("Error fetching employee list by department:", err);
    }
  }

  const fetchEmployeeListByRole = async (role) => {
    try{
      const response = await fetch(`http://localhost:8081/common/getEmployeeByRole?role=${role}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`    
        }
      });
      if (response.status === 401) {
        console.error("Unauthorized access. Redirecting to login.");
        return;
      }
      if (!response.ok) {
        console.error("Failed to fetch employee list by role. Status:", response.status);
        return;
      }
      const data = await response.json();
      setEmployeeList(data);
      console.log("Filtered Employee List Data:", data);  
    }
    catch (err) {
      console.error("Error fetching employee list by role:", err);
    }
  }

  const fetchEmployeeListByLocation = async (countryName) => {
    try{
      const response = await fetch(`http://localhost:8081/common/getEmployeeDetailsByCurrentLocation?currentLocation=${countryName}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`    
        }
      });
      if (response.status === 401) {
        console.error("Unauthorized access. Redirecting to login.");
        return;
      }
      if (!response.ok) {
        console.error("Failed to fetch employee list by location. Status:", response.status);
        return;
      }
      const data = await response.json();
      setEmployeeList(data);
      console.log("Filtered Employee List Data:", data);  
    }
    catch (err) {
      console.error("Error fetching employee list by location:", err);
    }
  }


  return (
    <div className="employee-list">
      {contextHolder}
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
          <Avatar size="large" src={<img src={"https://img.freepik.com/premium-photo/happy-man-ai-generated-portrait-user-profile_1119669-1.jpg"}></img>} />
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
                  // only apply styles on first level elements of the tree
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
                    <MenuItem active>Employee List</MenuItem>
                    <MenuItem component={<Link to="/Resources" />}>Requests</MenuItem>
                    <MenuItem component={<Link to="/MyDetails" />}>My Details</MenuItem>
                  </>
                )
              }
              {
                user.role === "MANAGER" && (
                  <>
                    <MenuItem component={<Link to="/ManagerDashboard" />}>Dashboard</MenuItem>
                    <MenuItem active>Employee List</MenuItem>
                    <MenuItem component={<Link to="/TeamList" />} >Team List</MenuItem>
                    <MenuItem component={<Link to="/Resources" />}>Requests</MenuItem>
                    <MenuItem component={<Link to="/MyDetails" />}>My Details </MenuItem>
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
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div className="hello">Employee List</div>
            <div>
              {
                user.role === "ADMIN" && (
                  <Button type="primary" className="add-employee" size="large" onClick={showModal}>
                    Add Employee
                  </Button>
                )
              }
            </div>
          </div>


          <div style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop:"20px",
                width: "100%",
              }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Search
                placeholder="Search ..."
                // onSearch={onSearch}
                size="large"
                enterButton
                style={{
                  width: 600,
                }}
                value={searchText}
                onChange={(e) => onSearch(e.target.value)}
              />
              <Dropdown.Button
                type="primary"
                size="large"
                menu={{
                  items: [
                    {
                      label: "Filter by Department",
                      key: "1",
                    },
                    {
                      label: "Filter by Role",
                      key: "2",
                    },
                    {
                      label: "Filter by Location",
                      key: "3",
                    },
                  ],
                  onClick: handleMenuClick,
                }}
                style={{
                  marginLeft: "10px",
                }}
              >
                Filter
              </Dropdown.Button>
            </div>

            <div style={{
              display:"flex",
              justifyContent:"space-between",
              gap: "20px"
            }}>
              <div>
                <Dropdown
                  menu={{
                    items: [
                      { label: "All Employees", key: "all" }, // Static option
                      ...departmentList.map(department => ({
                        label: department.department_name,
                        key: department.id,
                      })),
                    ],
                    onClick: handleMenuClick,
                  }}
                  placement="bottomLeft"
                  arrow
                >
                <Button size="large">
                  <FilterOutlined /> All Departments
                </Button>
              </Dropdown>
              </div>

              <div>
                <Dropdown menu={{ 
                  items: [
                    {
                      label: "All Roles",
                      key: "all",
                    },
                    {
                      label: "Manager",
                      key: "MANAGER",
                    },
                    {
                      label: "User",
                      key: "USER",
                    }
                  ],
                  onClick: handleRoleFilter,
                 }} placement="bottomLeft" arrow>
                  <Button size="large">
                  <FilterOutlined /> Roles
                  </Button>
                </Dropdown>
              </div>

              <div>
                <Dropdown menu={{ 
                  items: [
                    {
                      label: "All Locations",
                      key: "all",
                    },
                    ...countryList.map(country => ({
                      label: country.name,
                      key: country.name,
                    })),
                  ],
                  onClick: handleLocationFilter,
                 }} placement="bottomLeft" arrow>
                  <Button size="large">
                  <FilterOutlined /> Location 
                  </Button>
                </Dropdown>
              </div>

            </div>
          </div>

          {/* Table Content Starts from here!!!!! */}
          <div style={{
            width:"100%",
            marginTop:"20px",
          }}>
          <Table 
            columns={columns} 
            dataSource={employeeList} 
            className="custom-ant-table"
          />
          </div>
          
        </div>
        {/* Main content Ends here !!! */}


      </div>
      {/* Sidebar and Main Content Ends here !!! */}

      {/* Modal - Add Employee Starts here !!! */}
      <Modal
        title="Add Employee"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div style={{
          marginTop:"20px",
        }}>
        <label style={{
          fontSize:"20px",
          fontWeight:"bold",
        }}>Full Name</label>
        <Input size="large" placeholder="Employee Name" prefix={<UserOutlined />} 
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
        />
        </div>

        <div style={{
          marginTop:"20px",
        }}>
        <label style={{
          fontSize:"20px",
          fontWeight:"bold",
        }}>Email</label>
        <Input size="large" placeholder="Employee Email" prefix={<UserOutlined />} 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        </div>

        <div style={{
          marginTop:"20px",
        }}>
        <label style={{
          fontSize:"20px",
          fontWeight:"bold",
        }}>Role</label>
        <br />
        <Select
          defaultValue="USER"
          style={{ width: 220 }}
          onChange={(value) => setRole(value)}
          size="large"
          options={[
            { value: 'USER', label: 'User' },
            { value: 'MANAGER', label: 'Manager' },
          ]}
        />
        </div>
        
      </Modal>

      <Modal
        title="Delete Employee"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isDeleteModalOpen}
        onOk={handleDeleteOk}
        onCancel={handleDeleteCancel}
      >
        <p>Are you sure you want to delete this employee?</p>
      </Modal>

    </div>
  );
};

export default EmployeeList;
