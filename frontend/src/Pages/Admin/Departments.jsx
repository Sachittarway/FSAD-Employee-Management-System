import { Table, Button, Avatar,Dropdown,Input,Space,Modal,Spin} from "antd";
import "./Departments.css";
import { Sidebar, Menu, MenuItem} from "react-pro-sidebar";
import {FolderViewOutlined,EditOutlined} from "@ant-design/icons";
import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";
import { useAuth } from "../../Auth/AuthContext";

const Departments = () => {
    const { user } = useAuth();
    const items = [
      {
        label: "Logout",
        key: "1",
        danger: true,
      },
    ];
    /* Table Columns!!! */ 
    const columns = [
      {
        title: "Department ID",
        dataIndex: "id",
        key: "id",
        render: (text) => <a>{text}</a>,
      },
      {
        title: "Department Name",
        dataIndex: "department_name",
        render: (text) => <a>{text}</a>,
      },
      {
        title: "Action",
        key: "action",
        render: (_, record) => (
          <Space size="middle">
            <Button type="primary" onClick={()=>{
              fetchProjectData(record.id);
              console.log("Fetching projects for department ID:", record.id);
              showProjectModal();
            }}><FolderViewOutlined /></Button>
            <Button variant="filled" color="danger" onClick={()=>{
              setDepartmentId(record.id);
              showProjectNewModal();
            }}><EditOutlined /></Button>
          </Space>
        ),
      },
    ];

    const projectColumns = [
      {
        title: "Project ID",
        dataIndex: "id",
        key: "id",
        render: (text) => <a>{text}</a>,
      },
      {
        title: "Project Name",
        dataIndex: "project_code",
        render: (text) => <a>{text}</a>,
      }
    ];

  const [departmentData, setDepartmentData] = useState([]);
  const [projectData, setProjectData] = useState([]);
  const [isProjectOpen, setIsProjectOpen] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [departmentId, setDepartmentId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const[departmentname, setDepartmentName] = useState("");
  const [isProjectNewOpen, setIsProjectNewOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isAddDepartmentLoading, setIsAddDepartmentLoading] = useState(false);
  const [isAddProjectLoading, setIsAddProjectLoading] = useState(false);
  const [loadingProjectData, setLoadingProjectData] = useState(false);
  const { Search } = Input;
  
  useEffect(() => {
    fetchDepartmentData();
  }, []);
  
  const fetchDepartmentData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}common/departments`, {
      method: 'GET',
      headers: { 
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      setDepartmentData(data);
    } catch (error) {
      console.error("Error fetching department data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchProjectData = async (departmentId) => {
    setLoadingProjectData(true);
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}common/project/department/${departmentId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      setProjectData(data);
      setLoadingProjectData(false);
    } catch (error) {
      console.error("Error fetching project data:", error);
    }
  };


  
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = async () => {
    if (!departmentname) {
      alert("Please enter a department name");
      return;
    }
    setIsAddDepartmentLoading(true);
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}admin/createDepartment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ department_name: departmentname })
      });
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      setIsAddDepartmentLoading(false);
      fetchDepartmentData(); 
      setIsModalOpen(false);
      setDepartmentName(""); 
    }
    catch (error) {
      console.error("Error adding department:", error);
    }
  }; 
  const handleCancel = () => {
    setIsModalOpen(false);
  }

  
  const showProjectModal = () => {
    setIsProjectOpen(true);
  };
  const handleProjectOk = () => {
    setIsProjectOpen(false);
  };
  const handleProjectCancel = () => {
    setIsProjectOpen(false);
  };  
  
  const showProjectNewModal = () => {
    setIsProjectNewOpen(true);
  }
  const handleProjectNewOk = async () => {
    if (projectName === "") {
      alert("Please enter a project name");
      return;
    }
    if (!departmentId) {
      alert("Please select a department");
      return;
    }
    setIsAddProjectLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}admin/createProject`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(
          { 
            project_code: projectName, 
            department_id: departmentId
          }
        )
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setIsAddProjectLoading(false);
      fetchProjectData(departmentId);
      setIsProjectNewOpen(false);
      setProjectName("");
    }
    catch (error) {
      console.error("Error adding project:", error);
    }
    setIsProjectNewOpen(false);
    setProjectName("");
  };
  const handleProjectNewCancel = () => {
    setIsProjectNewOpen(false);
  };

  const onSearchDepartments = async () => {
    setIsLoading(true);
    try{
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}common/searchDepartments?name=${searchText}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setDepartmentData(data);
      setIsLoading(false);
    }
    catch (error) {
      console.error("Error searching departments:", error);
    }
  }
  return (
        <div className="department-list">
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
                                localStorage.removeItem("role");
                                window.location.href = "/";
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
                <MenuItem component={<Link to="/AdminDashboard" />}>Dashboard</MenuItem>
                <MenuItem active>Departments</MenuItem>
                <MenuItem component={<Link to="/EmployeeList" />}>Employee List</MenuItem>
                <MenuItem component={<Link to="/Resources" />}>Requests</MenuItem>
                <MenuItem component={<Link to="/MyDetails" />}>My Details</MenuItem>
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
                  <div className="hello">Departments 🏬</div>
                  <div>
                    {
                      user.role === "ADMIN" && (
                        <Button type="primary" className="add-employee" size="large" onClick={showModal}>
                          Add Department
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
                      placeholder="Search by Department Name"
                      allowClear
                      size="large"
                      enterButton
                      style={{
                        width: 600,
                      }}
                      value={searchText}
                      onChange={(e) => setSearchText(e.target.value)}
                      onSearch={onSearchDepartments}
                    />
                  </div>
                </div>

                {/* Table Content Starts from here!!!!! */}
                {
                  isLoading ?
                    <Spin size="large" style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)'
                    }}/>
                    :(
                      <div style={{
                        width:"100%",
                        marginTop:"20px",
                      }}>
                        <Table 
                          columns={columns} 
                          dataSource={departmentData} 
                          className="custom-ant-table"
                        />
                      </div>
                    )
                }
                
        </div>
        {/* Main content Ends here !!! */}


      </div>
      {/* Sidebar and Main Content Ends here !!! */}

      <Modal
        title="Add Department"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={[
          <Button 
            key="cancel" 
            onClick={handleCancel}
          > 
            Cancel
          </Button>,
          <Button 
            key="submit" 
            type="primary" 
            loading={isAddDepartmentLoading} 
            onClick={handleOk}
          >
            Submit
          </Button>,
        ]}
      >
        <div style={{
          marginTop:"20px",
        }}>
        <label style={{
          fontSize:"20px",
          fontWeight:"bold",
        }}>Department Name</label>
        <Input size="large" placeholder="Department Name" 
          value={departmentname}
          onChange={(e) => setDepartmentName(e.target.value)}
        />
        </div>
      </Modal>

      <Modal
        title="Projects"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isProjectOpen}
        onOk={handleProjectOk}
        onCancel={handleProjectCancel}
        loading={loadingProjectData}
      >
        <div style={{
            width:"100%",
            marginTop:"20px",
          }}>
          <Table 
            columns={projectColumns} 
            dataSource={projectData} 
            className="custom-ant-table"
          />
          </div>
      </Modal>

      <Modal
        title="Add Projects"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isProjectNewOpen}
        onCancel={handleProjectNewCancel}
        footer={[
          <Button 
            key="cancel" 
            onClick={handleProjectNewCancel}
          > 
            Cancel
          </Button>,
          <Button 
            key="submit" 
            type="primary" 
            loading={isAddProjectLoading} 
            onClick={handleProjectNewOk}
          >
            Submit
          </Button>,
        ]}
      >
        <div style={{
          marginTop:"20px",
        }}>
        <label style={{
          fontSize:"20px",
          fontWeight:"bold",
        }}>Project Name</label>
        <Input size="large" 
          placeholder="Project Name" 
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />  
        </div>
      </Modal>
    </div>
    );
};

export default Departments;
