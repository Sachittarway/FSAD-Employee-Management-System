# FSAD-Artifice-Management-System

The **Artifice Management System (AMS)** is a comprehensive intranet-based employee management solution designed to streamline the management of employee information and project resource allocation within an organization. The system facilitates secure, role-based access to sensitive employee data and supports efficient coordination between employees, managers, and administrators.

AMS aims to simplify HR processes by providing a centralized platform where employee profiles can be maintained, updated, and reviewed, while also enabling project managers and unit heads to allocate resources effectively to various projects.

---

## Features:
### Login Module:
- User Authentication
- Role based access (Employee / Manager / Admin)

### User Module:
- **Employee** can:
  - Login to the system
  - Change the password
  - View and edit profile with detailed personal info
  - Raise resource request to the manager

### Manager Module:
- Access and view all employee records
- Perform advanced searches using various employee attributes
- Edit the following:
  - Assigned team
  - Reporting manager
- Review and approve resource requests from team members

### Admin Module:
- Manage employee profiles with full Create and Read capabilities
- Assign roles to employees
- Manage departments and associate projects with departments

### Search or find:
- Provides comprehensive and efficient search functionality across employee records based on multiple criteria, including:
  - Employee ID
  - Employee name
  - Employee role
  - Department

### Resource Module:
- **Employee** can:
  - Raise resource requests for project allocation or transfer
- **Manager** can:
  - View, approve, or reject resource requests
- **Admin** can:
  - Manage overall resource allocation
  - Generate reports on resource utilization across projects and departments

## Tech Stack

| Layer       | Technology               |    
|-------------|--------------------------|
| Frontend    | React.js                 |
| Backend     | Spring Boot / Spring MVC |
| Database    | PostgreSQL               |
| API Protocol| REST                     |
| Auth        | Spring Security / JWT    |

-------
_This system enhances organizational efficiency by providing secure access control, facilitating resource management, and streamlining employee data handling through a user-friendly interface tailored for different roles._
