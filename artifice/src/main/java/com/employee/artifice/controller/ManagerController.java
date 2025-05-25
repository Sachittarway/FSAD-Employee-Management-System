package com.employee.artifice.controller;

import com.employee.artifice.model.Department;
import com.employee.artifice.model.Project;
import com.employee.artifice.service.DepartmentService;
import com.employee.artifice.service.EmployeeUserService;
import com.employee.artifice.service.ProjectService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/manager")
//@CrossOrigin(origins = "*")
public class ManagerController {

    @Autowired
    EmployeeUserService employeeUserService;

    @Autowired
    DepartmentService departmentService;

    @Autowired
    ProjectService projectService;

    @GetMapping("/employeeList")
    public List<Map<String, Object>> getEmployeeList() {
        return employeeUserService.getAllEmployeesList();
    }

    @GetMapping("/departments")
    public List<Department> getDepartmentList() {
        return departmentService.getAllDepartments();
    }

    @GetMapping("department/{id}")
    public ResponseEntity<Department> getDepartmentById(@PathVariable Long id) {
        Optional<Department> department = departmentService.getDepartmentById(id);
        return department.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/projects")
    public List<Project> getProjectList() {
        return projectService.getAllProjects();
    }

    @GetMapping("project/{id}")
    public ResponseEntity<Project> getProjectById(@PathVariable Long id) {
        Optional<Project> project = projectService.getProjectById(id);
        return project.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("project/department/{departmentId}")
    public List<Project> getProjectByDepartment(@PathVariable Long departmentId) {
        List<Project> project = projectService.getAllProjectsInOneDepartment(departmentId);
        return project;
    }

}
