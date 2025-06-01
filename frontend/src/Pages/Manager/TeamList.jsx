import { Table, Tag,Avatar, Input, Dropdown,Modal } from "antd";
import "./TeamList.css";
import { Sidebar, Menu, MenuItem} from "react-pro-sidebar";
import {UserOutlined} from "@ant-design/icons";
import { Link } from 'react-router-dom';
import { useState,useEffect} from "react";
import { useAuth } from "../../Auth/AuthContext";

const TeamList = () => {
  const { Search } = Input;
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const[employeeList, setEmployeeList] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const items = [
    {
      label: "Logout",
      key: "1",
      danger: true,
    },
  ];


  useEffect(() => {
      fetchTeamEmployeeList();
  }, []);

  const fetchTeamEmployeeList = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}manager/myTeam?name=${searchInput}`, {
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
    }
    catch (err) {
      console.error("Error fetching employee list:", err);
    }
  }

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
      
          return <Tag color={color}>{role?.toUpperCase()}</Tag>;
        }
      },
      {
        title: "Email",
        dataIndex: "employeeEmail",
        key: "employeeEmail",
      },
    ];

  
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  

  return (
    <div className="employee-list">

      {/* Top Navbar Starts from here !!! */}
      <div className="top_navbar">
        <div className="left-div">
          <span className="brand_name">ArtifexOne</span>
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
                    <MenuItem>Departments</MenuItem>
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
                    <MenuItem component={<Link to="/EmployeeList" />}>Employee List</MenuItem>
                    <MenuItem active>Team List</MenuItem>
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
            <div className="hello">Team List</div>
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
                placeholder="Search Employee by Name"
                onSearch={fetchTeamEmployeeList}
                size="large"
                enterButton
                style={{
                  width: 600,
                }}
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </div>

            {/* <div style={{
              display:"flex",
              justifyContent:"space-between",
              gap: "20px"
            }}>
              <div>
                <Dropdown menu={{ items }} placement="bottomLeft" arrow>
                  <Button size="large">
                  <FilterOutlined /> All Departments
                  </Button>
                </Dropdown>
              </div>

              <div>
                <Dropdown menu={{ items }} placement="bottomLeft" arrow>
                  <Button size="large">
                  <FilterOutlined /> Roles
                  </Button>
                </Dropdown>
              </div>

              <div>
                <Dropdown menu={{ items }} placement="bottomLeft" arrow>
                  <Button size="large">
                  <FilterOutlined /> Location
                  </Button>
                </Dropdown>
              </div>

            </div> */}
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
        <div>
        <label >Full Name</label>
        <Input size="large" placeholder="large size" prefix={<UserOutlined />} />
        </div>
        
      </Modal>

    </div>
  );
};

export default TeamList;
