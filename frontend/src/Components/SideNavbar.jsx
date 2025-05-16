import React from "react";
import "./SideNavbar.css";
import { DashboardOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

const SideNavbar = ({ children }) => {
  return (
    <>
      <div className="sidebar active">
        <div class="logo_content">
          <div class="logo">
            <i class="bx bxl-c-plus-plus"></i>
            <div class="logo_name">Ekinoks</div>
          </div>
        </div>
        <ul class="nav_list">
          <li>
            <a href="#">
              <DashboardOutlined />
              <span className="links_name">Dashboard</span>
            </a>
            <span class="tooltip">Dashboard</span>
          </li>
          <li>
            <a href="#">
              <i class="bx bx-user"></i>
              <span class="links_name">User</span>
            </a>
            <span class="tooltip">User</span>
          </li>
          <li>
            <a href="#">
              <i class="bx bx-chat"></i>
              <span class="links_name">Messages</span>
            </a>
            <span class="tooltip">Messages</span>
          </li>
          <li>
            <a href="#">
              <i class="bx bx-pie-chart-alt-2"></i>
              <span class="links_name">Analytics</span>
            </a>
            <span class="tooltip">Analytics</span>
          </li>
          <li>
            <a href="#">
              <i class="bx bx-folder"></i>
              <span class="links_name">File Manager</span>
            </a>
            <span class="tooltip">File Manager</span>
          </li>
          <li>
            <a href="#">
              <i class="bx bx-cart-alt"></i>
              <span class="links_name">Order</span>
            </a>
            <span class="tooltip">Order</span>
          </li>
          <li>
            <a href="#">
              <i class="bx bx-heart"></i>
              <span class="links_name">Saved</span>
            </a>
            <span class="tooltip">Saved</span>
          </li>
          <li>
            <a href="#">
              <i class="bx bx-cog"></i>
              <span class="links_name">Setting</span>
            </a>
            <span class="tooltip">Setting</span>
          </li>
        </ul>
        <div class="profile_content">
          <div class="profile">
            <div class="profile_details">
              <img
                src="https://lh3.googleusercontent.com/a-/AOh14GjvKOdrR_Z-N4oaIqPg10NRav_6D9tiKWHNFXXftQ=s288-p-rw-no"
                alt=""
              />
              <div class="name_job">
                <div class="name">Email</div>
                <div class="job">Role</div>
              </div>
            </div>
            <i class="bx bx-log-out" id="log_out"></i>
          </div>
        </div>
      </div>

      <div className="top_navbar">
        
        <div className="left-div">
          <span className="brand_name">My App</span>
        </div>

        
        <div className="right-div">
          <Avatar size="large" icon={<UserOutlined />} />
        </div>
      </div>

      <div class="home_content">
        {children}
      </div>
    </>
  );
};
export default SideNavbar;
