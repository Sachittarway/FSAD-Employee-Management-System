package com.employee.artifice.controller;

import com.employee.artifice.dto.CreateUser;
import com.employee.artifice.model.Department;
import com.employee.artifice.model.EmployeeUser;
import com.employee.artifice.model.Project;
import com.employee.artifice.service.DepartmentService;
import com.employee.artifice.service.EmployeeUserService;
import com.employee.artifice.service.ProjectService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    EmployeeUserService service;

    @Autowired
    DepartmentService departmentService;

    @Autowired
    ProjectService projectService;

    @PostMapping("/register")
    public ResponseEntity<EmployeeUser> createUser(@RequestBody CreateUser user) {
        EmployeeUser newuser = service.createUser(user);
        return ResponseEntity.ok(newuser);
    }

    @GetMapping("/hello")
    public String getAllUsers(){
        return "Hello";
    }
    
    @PostMapping("/createDepartment")
    public ResponseEntity<Department> createDepartment(@RequestBody Department department) {
        Department newDepartment = departmentService.createDepartment(department);
        return ResponseEntity.ok(newDepartment);
    }

    @PostMapping("/createProject")
    public ResponseEntity<Project> createProject(@RequestBody Project project) {
        Project newProject = projectService.createProject(project);
        return ResponseEntity.ok(newProject);
    }
}
